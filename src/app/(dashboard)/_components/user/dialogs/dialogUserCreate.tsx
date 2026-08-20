import {
  DialogContent,
  DialogTitle,
} from "@/components/dialog";
import { FormEvent } from "react";
import FormUser from "../formUser";
import { createUser } from "@/actions/user";
import { useAuth } from "@/store/useAuth";
import { useUsersStore } from "@/store/useUser";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { toast } from "react-toastify";

type DialogUserProps = {
  title: string;
  children: React.ReactNode;
};

export default function DialogUserCreate({
  title,
  children,
}: DialogUserProps) {
  const { token } = useAuth();
  const { addUser } = useUsersStore();
  const [open, setOpen] = useState<boolean>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(
      e.currentTarget as HTMLFormElement
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createUser(formData, token ?? "").then((user: any) => {
      if (user?.errors && Array.isArray(user.errors)) {
        user.errors.forEach((message: string) => {
          toast.error(message);
        });
        return;
      }
      addUser(user);
      setOpen(false);
      toast.success("Usuário criado!");
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <DialogContent className="font-nunito max-w-md px-0">
        <DialogTitle className="border-b pb-4.25 text-center text-2xl md:text-[40px]">
          {title}
        </DialogTitle>
        <div className="flex flex-col items-center justify-center px-2">
          <FormUser handleSubmit={(e) => handleSubmit(e)} />
        </div>
      </DialogContent>
    </Dialog.Root>
  );
}
