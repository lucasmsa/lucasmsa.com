"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "pt", flag: "🇧🇷", name: "Português" },
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "es", flag: "🇪🇸", name: "Español" },
];

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("en");

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLang === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentLang(lang.code)}
          className="text-sm"
          title={lang.name}
        >
          {lang.flag}
        </Button>
      ))}
    </div>
  );
}
