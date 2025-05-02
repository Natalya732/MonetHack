import { z } from "zod";

import { insertAccountSchema } from "@/db/schema";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";
import { useCreateAccount } from "../api/user-create-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const formMutation = useCreateAccount();

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
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transaction.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
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
