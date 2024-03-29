import {
  CheckIcon,
  ClockIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function JobStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-red-300 text-black": status === "Chưa làm",
          "bg-yellow-300 text-black": status === "Đang làm",
          "bg-green-500 text-white": status === "Đã làm",
        }
      )}
    >
      {status === "Chưa làm" ? (
        <>
          Pending
          <MinusCircleIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
      {status === "Đang làm" ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
      {status === "Đã làm" ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
