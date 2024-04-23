"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  TagIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import Link from "next/link";

export default function Form() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu nhập lại không khớp.");
      setIsSubmitting(false);
      return;
    }

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        user_name: formData.get("user_name"),
      }),
    });

    if (!response.ok) {
      setErrorMessage("Đăng ký không thành công.");
    } else {
      router.push("/");
      router.refresh();
    }
    setIsSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1">
        <h1 className={`${lusitana.className} mb-3 text-gray-900 text-xl`}>
          Đã có tài khoản?
          <Link
            className="hover:text-sky-700 transition duration-300 ease-in-out"
            href="/"
          >
            {" "}
            Đăng nhập tại đây
          </Link>
          .
        </h1>
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-sm font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full transition duration-200 ease-in-out rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-[9px] pl-10 outline-2 text-sm text-black placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Nhập địa chỉ email"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-sky-600" />
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
                className="peer block w-full transition duration-200 ease-in-out rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-[9px] pl-10 outline-2 text-sm text-black placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-sky-600" />
            </div>
          </div>
          <div className="relative">
            <input
              className="mt-2 peer block w-full transition duration-200 ease-in-out rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-[9px] pl-10 outline-2 text-sm text-black placeholder:text-gray-500"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-sky-600" />
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm font-medium text-gray-900"
              htmlFor="user_name"
            >
              Họ và tên
            </label>
            <div className="relative">
              <input
                className="peer block w-full transition duration-200 ease-in-out rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-[9px] pl-10 outline-2 text-sm text-black placeholder:text-gray-500"
                id="user_name"
                type="user_name"
                name="user_name"
                placeholder="Nhập họ và tên"
                required
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-sky-600" />
            </div>
          </div>
        </div>
        {errorMessage && (
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
        className="mt-4 bg-sky-500 hover:bg-yellow-700 active:bg-sky-700 transition duration-300 ease-in-out"
        aria-disabled={isSubmitting}
      >
        ĐĂNG KÝ
        <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
      </Button>
    </div>
  );
}
