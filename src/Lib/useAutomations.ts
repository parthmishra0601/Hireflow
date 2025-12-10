"use client";

import { useEffect, useState } from "react";
import { AutomationDef, fetchAutomations } from "./mockApi";

export function useAutomations() {
  const [automations, setAutomations] = useState<AutomationDef[]>([]);

  useEffect(() => {
    fetchAutomations().then(setAutomations).catch(() => setAutomations([]));
  }, []);

  return { automations };
}
