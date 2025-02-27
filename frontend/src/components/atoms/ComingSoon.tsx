import React from "react";
import Typography from "./Typography";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 space-y-4">
      <Typography color="var(--primary)" size={30} weight="700">
        🚧 This Page is in Progress
      </Typography>
      <Typography color="var(--gray-text)" size={18}>
        This page isn&apos;t ready yet, but we&apos;re working on it. Stay
        tuned! ⏳✨
      </Typography>
      <Typography color="var(--gray-text)" size={16}>
        In the meantime, feel free to explore the rest of the app! 😊
      </Typography>
    </div>
  );
}
