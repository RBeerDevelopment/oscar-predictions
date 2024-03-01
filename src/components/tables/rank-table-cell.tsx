import { FC } from "react";
import { TableCell } from "../ui/table";

export const RankTableCell: FC<{ rank: number }> = ({ rank }) => {
  return (
    <TableCell>
      <p className="text-lg text-center font-semibold p-1 pt-[3px] text-white bg-pink-600 rounded-full w-8 h-8">
        {rank}
      </p>
    </TableCell>
  );
};
