import Image from "next/image";
import { sql } from "@vercel/postgres";

type User =
  | {
      email?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default async function Card({ user, pagetype }: Props) {
  const response = await sql`
    SELECT name, profile_url FROM account WHERE email=${user?.email}`;
  const name = response.rows[0]?.name;
  const url = response.rows[0]?.profile_url;

  const nameDisplay = name ? <div>{name}</div> : null;

  const userImage = url ? (
    <Image
      className="rounded-full w-6"
      src={url}
      width={200}
      height={200}
      alt={name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  return (
    <section className="flex flex-row gap-4">
      {userImage}
      {nameDisplay}
    </section>
  );
}
