"use client";

import { FC, useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { addNomination } from "@/db/actions/add-nomination";
import { toast } from "sonner";
import { EntityType } from "@/common/types/entity-type";
import { buildImageUrl } from "@/common/utils/build-image-url";
import { MinimalCategory } from "@/types";

type Nominee = {
  id: string;
  name: string | null;
  type: EntityType | null;
  tmdbPosterPath: string | null;
};

type NominationEntry = {
  nomineeId: string;
  secondaryNomineeId: string | null;
  description: string;
  year: "2024" | "2025" | "2026";
};

const DEFAULT_NOMINATIONS = [
  {
    nomineeId: "",
    secondaryNomineeId: null,
    description: "",
    year: "2026",
  },
  {
    nomineeId: "",
    secondaryNomineeId: null,
    description: "",
    year: "2026",
  },
  {
    nomineeId: "",
    secondaryNomineeId: null,
    description: "",
    year: "2026",
  },
  {
    nomineeId: "",
    secondaryNomineeId: null,
    description: "",
    year: "2026",
  },
  {
    nomineeId: "",
    secondaryNomineeId: null,
    description: "",
    year: "2026",
  },
] as const satisfies NominationEntry[];

export const AddNominationForm: FC<{
  categories: MinimalCategory[];
  nominees: Nominee[];
}> = ({ categories, nominees }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [nominations, setNominations] = useState<NominationEntry[]>(DEFAULT_NOMINATIONS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const movies = nominees.filter((n) => n.type === "movie");
  const people = nominees.filter((n) => n.type === "person");

  const nomineeOptions: ComboboxOption[] = useMemo(() => {
    const movieOptions: ComboboxOption[] = movies.map((movie) => ({
      value: movie.id,
      label: `🎬 ${movie.name}`,
    }));
    const peopleOptions: ComboboxOption[] = people.map((person) => ({
      value: person.id,
      label: `👤 ${person.name}`,
    }));
    return [...movieOptions, ...peopleOptions];
  }, [movies, people]);

  const movieOptions: ComboboxOption[] = useMemo(() => {
    return movies.map((movie) => ({
      value: movie.id,
      label: movie.name || "",
    }));
  }, [movies]);

  const addNominationEntry = () => {
    setNominations([
      ...nominations,
      {
        nomineeId: "",
        secondaryNomineeId: null,
        description: "",
        year: "2026",
      },
    ]);
  };

  const updateNomination = (index: number, updates: Partial<NominationEntry>) => {
    const updated = [...nominations];
    updated[index] = { ...updated[index], ...updates };
    setNominations(updated);
  };

  const removeNomination = (index: number) => {
    setNominations(nominations.filter((_, i) => i !== index));
  };

  const getSelectedNominee = (nomineeId: string): Nominee | undefined => {
    return nominees.find((n) => n.id === nomineeId);
  };

  const handleSubmit = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category");
      return;
    }

    if (nominations.length === 0) {
      toast.error("Please add at least one nomination");
      return;
    }

    // Validate all nominations
    for (let i = 0; i < nominations.length; i++) {
      const nom = nominations[i];
      if (!nom.nomineeId) {
        toast.error(`Nomination ${i + 1}: Please select a nominee`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const promises = nominations.map((nom) =>
        addNomination(
          nom.nomineeId,
          selectedCategoryId,
          nom.description || null,
          nom.year,
          nom.secondaryNomineeId
        )
      );

      const results = await Promise.all(promises);
      const failed = results.filter((r) => !r.success);

      if (failed.length > 0) {
        toast.error(`Failed to add ${failed.length} nomination(s)`);
      } else {
        toast.success(`Successfully added ${nominations.length} nomination(s)`);
        setSelectedCategoryId(undefined);
        setNominations([]);
      }
    } catch (error) {
      toast.error("Failed to add nominations");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Add Nominations</CardTitle>
        <CardDescription>
          Select a category and add nominees to it. For people, you can optionally add a movie.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={selectedCategoryId || undefined}
            onValueChange={(value) => {
              setSelectedCategoryId(value);
              setNominations(DEFAULT_NOMINATIONS);
            }}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategoryId && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Nominations</Label>
              <Button onClick={addNominationEntry} variant="outline" size="sm">
                Add Nomination
              </Button>
            </div>

            {nominations.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Click "Add Nomination" to start adding nominees
              </p>
            )}

            {nominations.map((nomination, index) => {
              const selectedNominee = getSelectedNominee(nomination.nomineeId);
              const isPerson = selectedNominee?.type === "person";

              return (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">Nomination {index + 1}</h3>
                      <Button
                        onClick={() => removeNomination(index)}
                        variant="ghost"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Nominee</Label>
                      <Combobox
                        options={nomineeOptions}
                        value={nomination.nomineeId || undefined}
                        onValueChange={(value) => {
                          updateNomination(index, {
                            nomineeId: value,
                            secondaryNomineeId: null, // Reset when changing nominee
                          });
                        }}
                        placeholder="Select a nominee"
                        searchPlaceholder="Search nominees..."
                        emptyMessage="No nominees found."
                      />
                    </div>

                    {selectedNominee && (
                      <div className="flex gap-4 items-center p-3 bg-muted rounded-md">
                        {selectedNominee.tmdbPosterPath && (
                          <img
                            src={buildImageUrl(selectedNominee.tmdbPosterPath, false)}
                            alt={selectedNominee.name || "Nominee"}
                            className="w-16 h-24 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-medium">{selectedNominee.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Type: {selectedNominee.type}
                          </p>
                        </div>
                      </div>
                    )}

                    {isPerson && (
                      <div className="space-y-2">
                        <Label>Movie (Optional)</Label>
                        <Combobox
                          options={movieOptions}
                          value={
                            nomination.secondaryNomineeId
                              ? nomination.secondaryNomineeId
                              : undefined
                          }
                          onValueChange={(value) => {
                            updateNomination(index, {
                              secondaryNomineeId: value === "" ? null : value,
                            });
                          }}
                          placeholder="Select a movie"
                          searchPlaceholder="Search movies..."
                          emptyMessage="No movies found."
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Description (Optional)</Label>
                      <Textarea
                        placeholder="Enter description..."
                        value={nomination.description}
                        onChange={(e) =>
                          updateNomination(index, { description: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Select
                        value={nomination.year}
                        onValueChange={(value) => {
                          updateNomination(index, {
                            year: value as "2024" | "2025" | "2026",
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              );
            })}

            {nominations.length > 0 && (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : `Submit ${nominations.length} Nomination(s)`}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

