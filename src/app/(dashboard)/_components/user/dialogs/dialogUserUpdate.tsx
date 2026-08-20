import {
  DialogContent,
  DialogTitle,
} from "@/components/dialog";
import FormUser from "../formUser";
import { Dialog } from "radix-ui";
import { FormEvent, useState } from "react";
import { userType } from "@/types/user";
import { updateUser } from "@/actions/user";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useUsersStore } from "@/store/useUser";
import { toast } from "react-toastify";

type DialogUserProps = {
  title: string;
  children: React.ReactNode;
  user: userType;
};

export default function DialogUserUpdate({
  title,
  user,
  children,
}: DialogUserProps) {
  const [open, setOpen] = useState<boolean>();
  const { token, user: loggedUser } = useAuth();
  const { setCurrentUser } = useAuthStore();
  const { editUser } = useUsersStore();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(
      e.currentTarget as HTMLFormElement
    );
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("image");
    }

    formData.forEach((value, key) => {
      if (formData.get(key) === "") {
        formData.delete(key);
      }
    });

    updateUser(formData, user.id, token ?? "")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((updatedUser: any) => {
        if (
          updatedUser?.errors &&
          Array.isArray(updatedUser.errors)
        ) {
          updatedUser.errors.forEach((message: string) => {
            toast.error(message);
          });
          return;
        }
        editUser(updatedUser);

        if (loggedUser?.id === updatedUser.id) {
          setCurrentUser(updatedUser);
        }

        setOpen(false);
        toast.success("Usuário atualizado!");
      });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <DialogContent className="font-nunito px-0 md:max-w-md">
        <DialogTitle className="border-b pb-4.25 text-center text-xl md:text-[40px]">
          {title}
        </DialogTitle>
        <div className="flex flex-col items-center justify-center px-4">
          <FormUser
            user={user}
            handleSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog.Root>
  );
}
