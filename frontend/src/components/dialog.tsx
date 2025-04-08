import { ActionItem } from "@/pages/dashboard/users";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Trash } from "lucide-react";
import React from "react";

interface Props {
  children: React.ReactElement;
  title: string;
  description: string;
  onConfirm: () => void;
}

export const Dialog = ({ children, description, onConfirm, title }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center w-[480px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#0B2B25] text-2xl mb-2">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="w-32 h-14 text-[#0B2B25]">
            Não
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-32 h-14 bg-[#0290A4] text-white"
            onClick={onConfirm}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
