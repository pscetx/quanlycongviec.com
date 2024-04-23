"use client";

import { useState } from "react";
import { updateProfile } from "@/app/lib/actions";
import { Button } from "../button";

export function UploadPic() {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());

      await updateProfile();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center space-x-4 mb-4">
      Thay đổi ảnh đại diện:
      <label className="ml-4 relative inline-flex flex-col items-center w-32 h-10 bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-emerald-500 focus-within:border-emerald-500">
        <input
          type="file"
          name="file"
          className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <span className="text-gray-500">
          {file ? file.name : "Choose file"}
        </span>
      </label>
      <Button
        type="submit"
        className="justify-center w-24 ml-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
      >
        Thay đổi
      </Button>
    </form>
  );
}
