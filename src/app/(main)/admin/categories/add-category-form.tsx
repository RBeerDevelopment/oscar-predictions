"use client";

import { FC, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategory } from "@/db/actions/add-category";
import { toast } from "sonner";
import { EntityType } from "@/common/types/entity-type";

export const AddCategoryForm: FC = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState<EntityType>("movie");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addCategory(name.trim(), type);

      if (result.success) {
        toast.success("Category added successfully");
        setName("");
        setType("movie");
      } else {
        toast.error(result.error || "Failed to add category");
      }
    } catch (error) {
      toast.error("Failed to add category");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
        <CardDescription>
          Create a new category for the Academy Awards. Select a type to specify what kind of nominees this category accepts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g., Best Picture, Best Actor, Best Original Song"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as EntityType)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="person">Person</SelectItem>
                <SelectItem value="song">Song</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="w-full"
          >
            {isSubmitting ? "Adding..." : "Add Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

