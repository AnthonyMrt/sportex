"use server";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import { getPasswordResetTokenByToken, getUserByEmail } from ".";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Invalid token!" };
  }

  const validedFields = NewPasswordSchema.safeParse(values);

  if (!validedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      email: existingToken.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return { success: "Password reset" };
};
