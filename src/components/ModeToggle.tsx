"use client";
import * as React from "react";
import { MoonIcon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
    >
      <SunMoon className="absolute scale-100 dark:scale-0 " />

      <MoonIcon className="absolute scale-0 dark:scale-100 " />
    </Button>
  );
}
