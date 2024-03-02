import { FC } from "react";
import Image from "next/image";
import { LeaveFeedbackDialog } from "./feedback/leave-feedback-dialog";

import { Button } from "./ui/button";
import Link from "next/link";

export const Footer: FC = () => {
  return (
    <footer className="w-full z-100 bg-gray-900 flex flex-col py-2 justify-evenly flex-shrink-0 mt-auto">
      <LeaveFeedbackDialog />
      <div className="flex flex-row gap-1 items-center justify-center">
        <p className="text-xs text-white">Powered by</p>
        <a href="https://www.themoviedb.org" target="_blank">
          <Image
            src="/tmdb-logo.svg"
            alt="The movie database logo wide"
            width={100}
            height={24}
          />
        </a>
      </div>
      <Button
        variant="link"
        className="text-white text-sm font-light self-center pt-1"
      >
        <Link href="/imprint">Imprint</Link>
      </Button>
    </footer>
  );
};
