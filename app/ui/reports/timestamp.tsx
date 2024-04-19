"use client";

import { useState, useEffect } from "react";

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const day = currentTime.getDate();
  const month = currentTime.toLocaleString("default", { month: "long" });
  const year = currentTime.getFullYear();
  const time = currentTime.toLocaleTimeString();

  const formattedDate = `${month} ${day} ${year} ${time}`;

  return <div>{formattedDate}</div>;
}

export default function Time() {
  return (
    <div className="flex flex-row">
      <span className="mr-1">Thời gian tạo báo cáo:</span>
      <CurrentTime />
    </div>
  );
}
