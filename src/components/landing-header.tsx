import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";

export const LandingHeader: FC = async () => {
  return (
    <nav className="w-full z-10 bg-white flex flex-row py-4 px-6 justify-between items-center">
      <div className="flex flex-row items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-semibold text-xl text-black">Oscar Predictions</span>
        </Link>
      </div>
      <Link href="/dashboard">
        <Button className="bg-black text-white hover:bg-gray-800 rounded-lg px-6">
          Sign In
        </Button>
      </Link>
    </nav>
  );
};
