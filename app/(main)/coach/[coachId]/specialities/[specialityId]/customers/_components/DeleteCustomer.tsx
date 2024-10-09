"use client";
import Loading from "@/components/global/loading";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/ui/customModal";
import { UseModalProvider } from "@/hooks/use-modal-provider";
import React, { useState } from "react";

type Props = {
  customerId: string;
};

const DeleteCustomer = ({ customerId }: Props) => {
  const { setOpen, setClose } = UseModalProvider();
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async () => {
    try {
      setIsLoading(true);
      setClose();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={() =>
        setOpen(
          <CustomModal
            title="Are you absolutly sure?"
            subHeading="this action can not be undone. This will permantly delete the user."
          >
            <Button onClick={setClose} variant="outline" className="w-full">
              Cancel
            </Button>
            <Button
              onClick={deleteUser}
              variant="outline"
              className="bg-destructive text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Delete"}
            </Button>
          </CustomModal>
        )
      }
    >
      Delete
    </button>
  );
};

export default DeleteCustomer;
