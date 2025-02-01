import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { FC } from "react";
import { HeaderNavigation } from "./header-navigation";

export const Header: FC = async () => {
  return (
    <nav className="w-full z-10 bg-gray-950 text-white flex flex-row py-4 px-6 justify-start gap-12 shadow-md items-center">
      <Link href="/">
        <h1 className="font-semibold text-2xl cursor-pointer">
          Oscar Predictions
        </h1>
      </Link>
      <SignedIn>
        <HeaderNavigation />
      </SignedIn>
      <div className="flex flex-row gap-3 ml-auto">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard" />
        </SignedOut>
      </div>
    </nav>
  );
};
