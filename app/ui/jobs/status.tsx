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
        "inline-flex items-center rounded-lg px-2 py-1 text-md font-bold",
        {
          "bg-red-500 text-white": status === "Chưa làm",
          "bg-yellow-300 text-black": status === "Đang làm",
          "bg-green-500 text-white": status === "Đã làm",
        }
      )}
    >
      {status === "Chưa làm" ? (
        <>
          Chưa làm
          <MinusCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "Đang làm" ? (
        <>
          Đang làm
          <ClockIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
      {status === "Đã làm" ? (
        <>
          Đã làm
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
