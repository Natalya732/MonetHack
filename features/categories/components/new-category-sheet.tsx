import { z } from "zod";

import { insertCategorySchema } from "@/db/schema";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { useCreateCategory } from "../api/use-create-category";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  console.log("inside sheet", isOpen);
  const formMutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    formMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your transaction.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          defaultValues={{
            name: "",
          }}
          disabled={formMutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
