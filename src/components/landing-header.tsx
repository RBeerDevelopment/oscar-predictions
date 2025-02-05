import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";

export const LandingHeader: FC = async () => {
  return (
    <nav className="w-full z-10 bg-gray-950 text-white flex flex-row py-4 px-6 justify-start gap-12 shadow-md items-center">
      <Link href="/">
        <h1 className="font-semibold text-2xl cursor-pointer">
          Oscar Predictions
        </h1>
      </Link>
      <div className="flex flex-row gap-3 ml-auto">
        <Link href="/dashboard">
          <Button variant="link" className="text-white text-xl">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
};
