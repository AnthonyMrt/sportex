"use server";

import { signOut } from "@/auth";

export const logOut = async () => {
  // sign out the user
  await signOut();
};
