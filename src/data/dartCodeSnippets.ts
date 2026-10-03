export interface DartCodeSnippet {
  fileName: string;
  filePath: string;
  architectureLayer: string;
  code: string;
  explanationTh: string;
  explanationEn: string;
}

export const DART_SNIPPETS: Record<string, DartCodeSnippet> = {
  "ncds-screening": {
    fileName: "risk_assessment_bloc.dart",
    filePath:
      "lib/features/screening/presentation/bloc/risk_assessment_bloc.dart",
    architectureLayer: "Presentation (BLoC) & Domain Logic",
    explanationTh:
      "BLoC State Machine คำนวณคะแนนความเสี่ยง NCDs ฝั่ง Client ทันทีแบบ Zero Latency พร้อมบันทึกข้อมูลเข้ารหัสลง SQLite ท้องถิ่น",
    explanationEn:
      "Client-side BLoC State Machine evaluating NCDs risk algorithms with zero-latency offline persistence via Encrypted SQLite.",
    code: `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

// --- EVENTS ---
abstract class RiskAssessmentEvent extends Equatable {
  const RiskAssessmentEvent();
  @override
  List<Object?> get props => [];
}

class UpdateVitalsEvent extends RiskAssessmentEvent {
  final double glucose; // mg/dL
  final int systolicBp; // mmHg
  final int diastolicBp;

  const UpdateVitalsEvent({
    required this.glucose,
    required this.systolicBp,
    required this.diastolicBp,
  });

  @override
  List<Object?> get props => [glucose, systolicBp, diastolicBp];
}

// --- STATES ---
enum RiskTier { low, moderate, high }

class RiskEvaluatedState extends Equatable {
  final int totalScore;
  final RiskTier tier;
  final Map<String, String> diseaseFlags;
  final bool isPersistedOffline;

  const RiskEvaluatedState({
    required this.totalScore,
    required this.tier,
    required this.diseaseFlags,
    this.isPersistedOffline = true,
  });

  @override
  List<Object?> get props => [totalScore, tier, diseaseFlags, isPersistedOffline];
}

// --- BLOC IMPLEMENTATION ---
class RiskAssessmentBloc extends Bloc<RiskAssessmentEvent, RiskEvaluatedState> {
  final LocalSqliteRepository _sqliteRepo;

  RiskAssessmentBloc(this._sqliteRepo)
      : super(const RiskEvaluatedState(
          totalScore: 2,
          tier: RiskTier.low,
          diseaseFlags: {'diabetes': 'Normal', 'hypertension': 'Optimal'},
        )) {
    on<UpdateVitalsEvent>(_onUpdateVitals);
  }

  void _onUpdateVitals(
    UpdateVitalsEvent event,
    Emitter<RiskEvaluatedState> emit,
  ) async {
    int score = 0;
    final flags = <String, String>{};

    // Fasting Blood Sugar scoring rule
    if (event.glucose >= 126) {
      score += 6;
      flags['diabetes'] = 'Diabetes Suspected';
    } else if (event.glucose >= 100) {
      score += 3;
      flags['diabetes'] = 'Pre-Diabetic';
    } else {
      flags['diabetes'] = 'Normal';
    }

    // Blood Pressure scoring rule
    if (event.systolicBp >= 140) {
      score += 5;
      flags['hypertension'] = 'Stage 2 Hypertension';
    } else if (event.systolicBp >= 130) {
      score += 3;
      flags['hypertension'] = 'Pre-Hypertension';
    } else {
      flags['hypertension'] = 'Optimal';
    }

    final tier = score >= 8
        ? RiskTier.high
        : score >= 4
            ? RiskTier.moderate
            : RiskTier.low;

    // Offline-first: Guarantee zero data loss even in dead zones
    await _sqliteRepo.saveAssessmentDraft(
      glucose: event.glucose,
      bp: '\${event.systolicBp}/\${event.diastolicBp}',
      score: score,
    );

    emit(RiskEvaluatedState(
      totalScore: score,
      tier: tier,
      diseaseFlags: flags,
      isPersistedOffline: true,
    ));
  }
}`,
  },

  "pinto-app": {
    fileName: "hybrid_bridge_controller.dart",
    filePath: "lib/features/bridge/controllers/hybrid_bridge_controller.dart",
    architectureLayer: "Platform Bridge & Event-Driven State",
    explanationTh:
      "JavascriptChannel เชื่อมต่อ HTML5 WebView เข้ากับ Flutter BLoC เพื่อซิงค์ราคาสินค้า และระบบ Gamification Chat Streaks",
    explanationEn:
      "Two-way JavaScript bridge controller synchronizing dynamic HTML5 menus with native Flutter cart and gamified streak rewards.",
    code: `import 'dart:convert';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HybridBridgeController {
  final WebViewController webController;
  final CartBloc cartBloc;
  final StreakBloc streakBloc;

  HybridBridgeController({
    required this.webController,
    required this.cartBloc,
    required this.streakBloc,
  });

  JavascriptChannel createChannel() {
    return JavascriptChannel(
      name: 'FlutterNativeBridge',
      onMessageReceived: (JavascriptMessage msg) {
        final payload = jsonDecode(msg.message) as Map<String, dynamic>;
        final action = payload['action'] as String;

        switch (action) {
          case 'SYNC_MENU_CART':
            final items = payload['items'] as List<dynamic>;
            final total = (payload['total'] as num).toDouble();
            cartBloc.add(SyncExternalCartEvent(items: items, total: total));
            break;

          case 'CLAIM_CHAT_STREAK':
            streakBloc.add(const ClaimDailyStreakEvent());
            _notifyWebviewStreakSuccess();
            break;
        }
      },
    );
  }

  void _notifyWebviewStreakSuccess() {
    webController.runJavascript(
      'window.dispatchEvent(new CustomEvent("STREAK_SYNC_ACK", { detail: { points: 50 } }));',
    );
  }
}`,
  },

  "pos-system": {
    fileName: "idempotent_pos_sync_queue.dart",
    filePath: "lib/features/checkout/data/idempotent_pos_sync_queue.dart",
    architectureLayer: "Data Layer / Fault-Tolerant Persistence",
    explanationTh:
      "ระบบคิวสั่งซื้อแบบ Idempotent UUID ที่บันทึกลง Local SQLite ทันที และซิงค์ขึ้น MySQL หลังบ้านอัตโนมัติเมื่อเครือข่ายกลับมาทำงาน",
    explanationEn:
      "Fault-tolerant client transaction queue using UUID idempotency keys and local SQLite caching with auto-reconnection flushing.",
    code: `import 'package:uuid/uuid.dart';
import 'package:sqflite/sqflite.dart';
import 'package:http/http.dart' as http;

class IdempotentPosSyncQueue {
  final Database db;
  final http.Client httpClient;
  static const String endpoint = 'https://api.retail.com/v1/pos/checkout';

  IdempotentPosSyncQueue({required this.db, required this.httpClient});

  Future<TransactionResult> processCheckout({
    required List<CartItem> items,
    required double totalAmount,
    required bool isOnline,
  }) async {
    // Generate unique client idempotency UUID
    final idempotencyKey = const Uuid().v4();

    final record = {
      'id': idempotencyKey,
      'total': totalAmount,
      'item_count': items.length,
      'status': isOnline ? 'SYNCING' : 'QUEUED_OFFLINE',
      'created_at': DateTime.now().toIso8601String(),
    };

    // 1. Write to local SQLite first (Write-Ahead Log)
    await db.insert('offline_transactions', record);

    if (!isOnline) {
      // Return optimistic success with offline stamp
      return TransactionResult.offlineQueued(
        transactionId: idempotencyKey,
        pendingSyncCount: await _getPendingCount(),
      );
    }

    // 2. Perform Idempotent HTTP Commit
    try {
      final res = await httpClient.post(
        Uri.parse(endpoint),
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey,
        },
        body: jsonEncode(record),
      );

      if (res.statusCode == 200) {
        await db.update(
          'offline_transactions',
          {'status': 'COMMITTED'},
          where: 'id = ?',
          whereArgs: [idempotencyKey],
        );
        return TransactionResult.success(transactionId: idempotencyKey);
      }
    } catch (_) {
      // In case of timeout / disconnect during request
      await db.update(
        'offline_transactions',
        {'status': 'QUEUED_OFFLINE'},
        where: 'id = ?',
        whereArgs: [idempotencyKey],
      );
    }

    return TransactionResult.offlineQueued(
      transactionId: idempotencyKey,
      pendingSyncCount: await _getPendingCount(),
    );
  }

  Future<int> _getPendingCount() async {
    final res = await db.rawQuery(
      "SELECT COUNT(*) as cnt FROM offline_transactions WHERE status = 'QUEUED_OFFLINE'",
    );
    return Sqflite.firstIntValue(res) ?? 0;
  }
}`,
  },
};
