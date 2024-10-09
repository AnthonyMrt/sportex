"use client";

import CreateProgramForm from "@/components/forms/CreateProgramForm";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/ui/customModal";
import { UseModalProvider } from "@/hooks/use-modal-provider";
import { PlusCircle } from "lucide-react";
import React from "react";

type Props = {
  customerId: string;
};

const AddProgram = ({ customerId }: Props) => {
  const { setOpen } = UseModalProvider();

  return (
    <Button
      size={"sm"}
      className="h-8 gap-1"
      onClick={() =>
        setOpen(
          <CustomModal
            title="Add Customer"
            subHeading="Add a new customer to your list"
          >
            <CreateProgramForm customerId={customerId} />
          </CustomModal>
        )
      }
    >
      <PlusCircle className="w-3.5 h-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add Program
      </span>
    </Button>
  );
};

export default AddProgram;
