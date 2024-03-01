import { FC } from "react";
import { FeatureEntry } from "./feature-entry";
import { BarChart3Icon, CrownIcon, TrophyIcon } from "lucide-react";
import { SectionHeader } from "./section-header";

export const FeatureSection: FC = () => {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 grid items-center gap-6 md:px-6 lg:grid-cols-2 lg:gap-10">
        <SectionHeader
          title="Features"
          subtitle="One place to keep track of all your predictions for the 2024 Academy Awards."
        />
        <div className="grid items-start gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-1">
          <FeatureEntry
            title="Predictions"
            description=" Vote on and see all your predictions in one place. No more note
              file or piece of paper needed."
            icon={<TrophyIcon />}
          />
          <FeatureEntry
            title="Statistics"
            description="See how often you picked which movie and see how your vote compares
            to everyone else."
            icon={<BarChart3Icon />}
          />

          <FeatureEntry
            title="Compete"
            description="Compete with your friends by seeing how their predictions did and
            share your results on social media."
            icon={<CrownIcon />}
            isComingSoon={true}
          />
        </div>
      </div>
    </section>
  );
};
