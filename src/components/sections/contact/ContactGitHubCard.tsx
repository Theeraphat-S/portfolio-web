import React from "react";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

interface ContactGitHubCardProps {
  githubUrl: string;
  githubUsername: string;
}

export const ContactGitHubCard: React.FC<ContactGitHubCardProps> = ({
  githubUrl,
  githubUsername,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-cyan-500/40 transition-all gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200 shrink-0">
          <Github className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-mono text-zinc-400 block">
            GitHub Profile
          </span>
          <span className="text-sm sm:text-base font-bold font-mono text-zinc-100 block mt-0.5">
            github.com/{githubUsername}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800/80">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-text="GitHub"
          className="w-full py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>{t("เข้าชมโปรไฟล์ GitHub", "Visit GitHub Profile")}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
