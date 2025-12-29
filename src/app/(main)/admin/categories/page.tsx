import { AddCategoryForm } from "./add-category-form";

export default async function AddCategoryPage() {

  return (
    <div className="flex flex-col items-center overflow-y-hidden py-8 gap-8">
      <h1 className="text-2xl font-bold">Add Category</h1>
      <AddCategoryForm />
    </div>
  );
}

