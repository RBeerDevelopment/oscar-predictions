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
        <div className="flex flex-row gap-6 hidden md:flex">
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-lg">
            How It Works
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-lg">
            Statistics
          </Link>
          <Link href="/vote" className="text-gray-600 hover:text-gray-900 text-lg">
            Play Now
          </Link>
        </div>
      </div>
      <Link href="/dashboard">
        <Button className="bg-black text-white hover:bg-gray-800 rounded-lg px-6">
          Sign Up
        </Button>
      </Link>
    </nav>
  );
};
