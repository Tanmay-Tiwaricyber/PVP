"use client";

import { useEffect, useState } from "react";

export default function LocalClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 20000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} aria-label="Local time in Kanpur, India">
      {time ? `${time} IST · Kanpur` : "IST · Kanpur"}
    </span>
  );
}
