import {
  DialogContent,
  DialogTitle,
} from "@/components/dialog";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { userType } from "@/types/user";
import { deleteUser } from "@/actions/user";
import { useAuth } from "@/store/useAuth";
import { Button } from "@/components/button";
import { useUsersStore } from "@/store/useUser";
import { toast } from "react-toastify";

type DialogUserProps = {
  children: React.ReactNode;
  user: userType;
};

export default function DialogUserDelete({
  user,
  children,
}: DialogUserProps) {
  const [open, setOpen] = useState<boolean>();
  const { token } = useAuth();
  const { removeUser } = useUsersStore();

  function handleDelete() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteUser(user.id, token ?? "").then((user: any) => {
      if (user?.errors && Array.isArray(user.errors)) {
        user.errors.forEach((message: string) => {
          toast.error(message);
        });
        return;
      }
      removeUser(user.id);
      setOpen(false);
      toast.success("Usuário deletado!");
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <DialogContent className="font-nunito text-md rounded-md px-2 md:max-w-sm">
        <DialogTitle className="border-b pb-4.25 text-center text-xl md:text-[40px]">
          <p className="font-bold">ATENÇÃO!</p>
        </DialogTitle>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center">
            {`Você está prestes a excluir o usuário: `}
            <span className="font-bold">{user.name}</span>,
            essa opção não tem como ser desfeita após
            confirmada.
          </p>
          <div className="flex justify-center gap-6">
            <Button
              onClick={() => handleDelete()}
              variant={"destructive"}
              className="cursor-pointer font-bold"
            >
              Confirmar
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant={"default"}
              className="cursor-pointer bg-[#3b5394] font-bold hover:bg-[#3b5394]/90"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog.Root>
  );
}
