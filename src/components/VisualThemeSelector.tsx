import { Orbit } from "lucide-react";
import { useLanguage, useTheme } from "../context";

export const VisualThemeSelector = () => {
  const { t } = useLanguage();
  const { visualTheme, setVisualTheme } = useTheme();

  return (
    <label className="visual-theme-selector">
      <Orbit className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">{t("รูปแบบภาพ", "Visual theme")}</span>
      <select
        value={visualTheme}
        onChange={(event) =>
          setVisualTheme(event.target.value === "space" ? "space" : "original")
        }
      >
        <option value="original">{t("เดิม", "Original")}</option>
        <option value="space">{t("อวกาศ", "Space")}</option>
      </select>
    </label>
  );
};
