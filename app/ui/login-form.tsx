"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });
    if (response?.error) {
      setErrorMessage("Thông tin không chính xác.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
    setIsSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
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
        {errorMessage && ( // Render error message if present
          <div className="flex items-center text-red-500 text-sm mt-1">
            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
            <span>{errorMessage}</span>
          </div>
        )}
        <LoginButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}

interface LoginButton {
  isSubmitting: boolean;
}

function LoginButton({ isSubmitting }: LoginButton) {
  return (
    <div className="flex items-start justify-end">
      <Button
        type="submit"
        className="mt-4 gap-5 bg-emerald-500 hover:bg-yellow-700 active:bg-emerald-700"
        aria-disabled={isSubmitting}
      >
        Xác nhận
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </div>
  );
}
