import { FC } from "react";
import { db } from "@/db/db";
import { CEREMONY_START } from "@/common/constants";

export const AcademyAwardsSection: FC = async () => {
  // Fetch all categories

  return null;
  
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
          
        </div>
      </div>
    </section>
  );
};

