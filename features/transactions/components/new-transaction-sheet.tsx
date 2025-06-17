import { z } from "zod";

import { insertTransactionSchema } from "@/db/schema";
import { useNewTransaction } from "../hooks/use-new-transactions";
import { useCreateTransaction } from "../api/use-create-transaction";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const formMutation = useCreateTransaction();

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
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>
        <p>Todo transa for</p>
      </SheetContent>
    </Sheet>
  );
};
