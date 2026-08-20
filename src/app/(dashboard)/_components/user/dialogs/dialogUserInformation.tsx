import {
  DialogContent,
  DialogTitle,
} from "@/components/dialog";
import FormUser from "../formUser";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { userType } from "@/types/user";

type DialogUserProps = {
  title: string;
  children: React.ReactNode;
  user: userType;
};

export default function DialogUserInformation({
  title,
  user,
  children,
}: DialogUserProps) {
  const [open, setOpen] = useState<boolean>();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <DialogContent className="font-nunito px-0 md:max-w-sm">
        <DialogTitle className="border-b pb-4.25 text-center text-xl md:text-[40px]">
          {title}
        </DialogTitle>
        <div className="flex flex-col items-center justify-center px-4">
          <FormUser readOnly={true} user={user} />
        </div>
      </DialogContent>
    </Dialog.Root>
  );
}
