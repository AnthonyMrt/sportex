"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from ".";
import { generateVerificationToken } from "@/lib/token";
import { sendTwoFactorTokenEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validationFields = RegisterSchema.safeParse(values);

  if (!validationFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validationFields.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exists! " };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  await db.coach.create({
    data: {
      User: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendTwoFactorTokenEmail(
    verificationToken.email,
    verificationToken.token
  );

  return { success: "OTP code send!", twoFactor: true };
};
