import { formatDateToLocal } from "@/app/lib/utils";
import { fetchJobsNotifications } from "@/app/lib/data";
import Image from "next/image";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { updateIsRead } from "@/app/lib/actions";
import { Button } from "../button";

export default async function NotificationsTable() {
  const notifications = await fetchJobsNotifications();
  const formatDateToGMT7 = (dateString: string) => {
    const date = new Date(dateString);
    const gmtPlus7Offset = 7 * 60 * 60 * 1000;
    const gmt7Date = new Date(date.getTime() + gmtPlus7Offset);
    const options = {
      timeZone: "Asia/Bangkok",
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const,
      hour12: true,
    };
    return gmt7Date.toLocaleString("vi-VN", options);
  };

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col mt-6 items-center gap-5">
        <Image
          src="/no-results.png"
          alt="logo"
          width={200}
          height={50}
          priority
        />
        <p className="text-3xl font-bold text-gray-600 mb-4">
          BẠN CHƯA CÓ THÔNG BÁO.
        </p>
      </div>
    );
  }

  return (
    <div className="inline-block min-w-full align-middle">
      <div className="min-w-full">
        {notifications?.map((noti) => (
          <form
            key={noti.job_id + "_" + noti.type}
            action={updateIsRead.bind(null, noti.job_id, noti.type)}
          >
            <div
              className={`w-full rounded-lg p-4 border-2 border-gray-300 m-3 hover:bg-neutral-50 transition duration-300 ease-in-out last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg ${
                noti.is_read ? "bg-neutral-200" : "bg-neutral-100"
              }`}
            >
              {noti.type === "1" && (
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    <ExclamationTriangleIcon className="w-10 h-10 mr-3 text-yellow-500" />
                    <div>
                      <div className="flex flex-row w-full">
                        Công việc còn ít hơn 48 giờ để hoàn thành:
                        <div className="px-1 font-bold text-emerald-700">
                          {noti.job_name}
                        </div>
                        thuộc dự án
                        <div className="pl-1 font-bold text-emerald-700">
                          {noti.project_name}
                        </div>
                        . Hạn hoàn thành: {formatDateToLocal(noti.deadline)}.
                      </div>
                      <div className="text-gray-500 text-sm italic">
                        {formatDateToGMT7(noti.created_at)}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-16 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
                  >
                    Xem
                  </Button>
                </div>
              )}
              {noti.type === "2" && (
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    <ExclamationCircleIcon className="w-10 h-10 mr-3 text-red-500" />
                    <div>
                      <div className="flex flex-row">
                        Công việc đã quá hạn hoàn thành:
                        <div className="px-1 font-bold text-emerald-700">
                          {noti.job_name}
                        </div>
                        thuộc dự án
                        <div className="pl-1 font-bold text-emerald-700">
                          {noti.project_name}
                        </div>
                        . Hạn hoàn thành: {formatDateToLocal(noti.deadline)}.
                      </div>
                      <div className="text-gray-500 text-sm italic">
                        {formatDateToGMT7(noti.created_at)}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-16 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
                  >
                    Xem
                  </Button>
                </div>
              )}
              {noti.type === "3" && (
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    <InformationCircleIcon className="w-10 h-10 mr-3 text-green-500" />
                    <div>
                      <div className="flex flex-row">
                        Công việc đã được cập nhật kết quả:
                        <div className="px-1 font-bold text-emerald-700">
                          {noti.job_name}
                        </div>
                        thuộc dự án
                        <div className="pl-1 font-bold text-emerald-700">
                          {noti.project_name}
                        </div>
                        . Vui lòng kiểm tra và cập nhật trạng thái công việc.
                      </div>
                      <div className="text-gray-500 text-sm italic">
                        {formatDateToGMT7(noti.created_at)}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-16 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
                  >
                    Xem
                  </Button>
                </div>
              )}
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
