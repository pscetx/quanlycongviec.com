import { areJobsNotisRead } from "@/app/lib/data";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export async function NotiButton() {
  try {
    const allRead = await areJobsNotisRead();
    if (allRead) {
      return (
        <div>
          <Link href={"/dashboard/notifications"}>
            <BellIcon className="w-6 h-6 text-yellow-500 hover:text-yellow-400 transition duration-200 ease-in-out" />
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link href={"/dashboard/notifications"}>
            <BellAlertIcon className="w-6 h-6 text-yellow-500 hover:text-yellow-400 transition duration-200 ease-in-out" />
          </Link>
        </div>
      );
    }
  } catch (error) {
    // Handle error
    console.error("Error checking notifications:", error);
  }
}
