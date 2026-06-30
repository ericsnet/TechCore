"use client";
import { useEffect, useRef } from "react";

export default function SeedInit() {
  const called = useRef(false);
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    fetch("/api/seed", { method: "POST" }).catch(() => {});
  }, []);
  return null;
}
