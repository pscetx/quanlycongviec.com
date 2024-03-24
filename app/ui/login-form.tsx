"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { lusitana } from "@/app/ui/fonts";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1">
        <h1 className={`${lusitana.className} mb-3 text-gray-900 text-2xl`}>
          Đăng nhập với email.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-[9px] pl-10 outline-2 text-sm text-black placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm font-medium text-gray-900"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-[9px] pl-10 outline-2 text-sm text-black placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-emerald-600" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-start justify-end">
      <Button
        className="mt-4 gap-5 bg-emerald-700 hover:bg-emerald-500 active:bg-yellow-700"
        aria-disabled={pending}
      >
        Xác nhận
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </div>
  );
}
