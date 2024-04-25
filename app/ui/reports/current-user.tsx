import { getServerSession, Session } from "next-auth";
import { getCurrentUserId } from "@/app/lib/data";

export async function CurrentUser() {
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);

  return <div>{currentUserId}</div>;
}
