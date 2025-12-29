import { FC } from "react";
import Link from "next/link";
import { db } from "@/db/db";
import { CEREMONY_START } from "@/common/constants";

export const AcademyAwardsSection: FC = async () => {
  // Fetch all categories
  const categories = await db.query.categories.findMany({
    orderBy: { name: "asc" },
  });

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const ceremonyDate = formatDate(CEREMONY_START);

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Vote for Academy Awards
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Select a category below to cast your vote.
            </p>
          </div>

          {/* Large image placeholder - user will provide actual image */}
          <div className="w-full max-w-4xl h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 opacity-30">
              <div className="w-8 h-8 bg-gray-400"></div>
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-gray-400"></div>
            </div>
          </div>

          {/* Categories list */}
          <div className="w-full max-w-4xl space-y-3">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/vote/${category.id}`}
                className="flex items-center gap-4 py-2 hover:opacity-70 transition-opacity"
              >
                {index > 0 && (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <div className="flex items-center gap-0.5 opacity-30">
                      <div className="w-2.5 h-2.5 bg-gray-400"></div>
                      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-gray-400"></div>
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black">
                    {category.name}
                  </h3>
                </div>
                <div className="text-gray-500 text-sm">
                  {ceremonyDate}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

