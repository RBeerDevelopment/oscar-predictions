import Link from "next/link";
import { FC } from "react";
import { DoneIcon } from "./done-icon";
import { Card } from "../ui/card";

export const CategoryElement: FC<{
  id: number;
  hasVoted: boolean;
  name: string | null;
}> = async ({ id, hasVoted, name }) => {
  return (
    <>
      <Link
        className={`flex md:hidden flex-row items-center gap-4 text-lg w-full h-10 py-6 px-2 rounded-xl ${
          hasVoted ? "text-white bg-pink-600" : ""
        }`}
        href={`/vote/${id}`}
      >
        {hasVoted && <DoneIcon className="text-white" />}
        {name}
      </Link>
      <Link className="hidden md:block" key={id} href={`/vote/${id}`}>
        <Card
          className={`relative px-3 py-4 min-h-[10rem] flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow ${
            hasVoted ? "bg-pink-600 text-white" : ""
          }`}
        >
          {hasVoted && (
            <DoneIcon className="absolute top-4 right-4 text-white" />
          )}
          <p className="text-center">{name}</p>
        </Card>
      </Link>
    </>
  );
};
