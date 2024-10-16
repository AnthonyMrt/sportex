import { ModalContext } from "@/provider/modal-provider";
import { useContext } from "react";

export const UseModalProvider = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
