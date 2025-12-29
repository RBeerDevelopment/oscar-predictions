import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
    const { redirectToSignIn, userId } = await auth();

    if (userId !== process.env.ADMIN_USER_ID) {
      redirectToSignIn();
    }

  return children;
}
