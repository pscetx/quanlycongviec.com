"use client";

import { useState, useEffect } from "react";
import { addNoti } from "@/app/lib/actions";

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
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(
          `QUÁ HẠN HOÀN THÀNH SAU ${days} NGÀY ${hours} GIỜ ${minutes} PHÚT ${seconds} GIÂY.`
        );

        if (diff <= 48 * 60 * 60 * 1000) {
          // addNoti(id, "1");
        }
      } else {
        setTimeLeft("ĐÃ QUÁ HẠN HOÀN THÀNH.");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (status === "Đã làm") {
    return (
      <div className="pl-3 text-xs font-bold italic text-green-600">
        CÔNG VIỆC ĐÃ HOÀN THÀNH!
      </div>
    );
  } else if (status !== "Đã làm" && result_url !== "") {
    return (
      <div className="pl-3 text-xs font-bold italic text-yellow-600">
        ĐANG CHỜ ADMIN CẬP NHẬT TRẠNG THÁI..
      </div>
    );
  } else if (status !== "Đã làm" && result_url === "") {
    return (
      <div className="pl-3 text-xs font-bold italic text-red-600">
        {timeLeft && ` ${timeLeft}`}
      </div>
    );
  }
}
