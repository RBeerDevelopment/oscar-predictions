import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";
import { HeaderNavigation } from "./header-navigation";

export const Header: FC = () => {
  const { userId } = auth();

  const isSignedIn = Boolean(userId);

  return (
    <nav className="w-full z-10 bg-gray-950 text-white flex flex-row py-4 px-6 justify-start gap-12 shadow-md items-center">
      <Link href={isSignedIn ? "/dashboard" : "/"}>
        <h1 className="font-semibold text-2xl cursor-pointer">
          Oscar Predictions
        </h1>
      </Link>
      {isSignedIn ? <HeaderNavigation /> : null}
      <div className="flex flex-row gap-3 ml-auto">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton afterSignInUrl="/dashboard" />
        )}
      </div>
    </nav>
  );
};
