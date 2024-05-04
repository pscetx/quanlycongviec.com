"use client";

import { useState, useEffect } from "react";
import { addJobNotification } from "@/app/lib/actions";

export default function StatusCheck({
  status,
  result_url,
  deadline,
  id,
}: {
  status: string;
  result_url: string;
  deadline: string;
  id: string;
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(deadline);
      const diff = end.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(
          `QUÁ HẠN HOÀN THÀNH SAU ${days} NGÀY ${hours} GIỜ ${minutes} PHÚT.`
        );
        clearInterval(interval);

        if (diff <= 48 * 60 * 60 * 1000 && status !== "Đã làm") {
          addJobNotification(id, "1");
        }
      } else {
        const elapsed = now.getTime() - end.getTime();
        const elapsedDays = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const elapsedHours = Math.floor(
          (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const elapsedMinutes = Math.floor(
          (elapsed % (1000 * 60 * 60)) / (1000 * 60)
        );

        setElapsedTime(
          `ĐÃ QUÁ HẠN HOÀN THÀNH ${elapsedDays} NGÀY ${elapsedHours} GIỜ ${elapsedMinutes} PHÚT.`
        );
        clearInterval(interval);
        if (status !== "Đã làm") {
          addJobNotification(id, "2");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (status === "Đã làm") {
    return (
      <div className="pl-3 mb-1 text-xs font-bold italic text-green-600">
        CÔNG VIỆC ĐÃ HOÀN THÀNH!
      </div>
    );
  } else if (status !== "Đã làm" && result_url !== "") {
    return (
      <div className="pl-3 mb-1 text-xs font-bold italic text-yellow-600">
        ĐANG CHỜ ADMIN CẬP NHẬT TRẠNG THÁI..
      </div>
    );
  } else if (status !== "Đã làm" && result_url === "") {
    return (
      <div className="pl-3 mb-1 text-xs font-bold italic text-red-600">
        {timeLeft && ` ${timeLeft}`}
        {elapsedTime && ` ${elapsedTime}`}
      </div>
    );
  }
}
