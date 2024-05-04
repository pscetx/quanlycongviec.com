import { areJobsNotificationsRead } from "@/app/lib/data";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export async function NotificationsButton() {
  const allRead = await areJobsNotificationsRead();
  try {
    if (allRead) {
      return (
        <div>
          <Link href={"/dashboard/notifications"}>
            <div className="flex flex-row w-32 gap-2 p-1 bg-neutral-100 border text-neutral-600 font-bold border-neutral-300 rounded-xl text-gray-800 hover:text-green-500 transition duration-300 ease-in-out">
              <BellIcon className="w-6 h-6" />
              Thông báo
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link href={"/dashboard/notifications"}>
            <div className="flex flex-row w-32 gap-2 p-1 bg-neutral-100 border text-yellow-600 font-bold border-neutral-300 rounded-xl text-gray-800 hover:text-yellow-500 transition duration-300 ease-in-out">
              <BellAlertIcon className="w-6 h-6" />
              Thông báo
            </div>
          </Link>
        </div>
      );
    }
  } catch (error) {
    console.error("Error checking notifications:", error);
  }
}
