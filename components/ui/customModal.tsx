import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { UseModalProvider } from "@/hooks/use-modal-provider";

type Props = {
  title: string;
  subHeading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const customModal = ({ title, subHeading, children, defaultOpen }: Props) => {
  const { isOpen, setClose } = UseModalProvider();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-auto max-h-[700px] z-[300] h-fit bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subHeading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default customModal;
