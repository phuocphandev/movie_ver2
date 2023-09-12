import { z } from "zod";

const matKhauRegex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";

export const LoginSchema = z.object({
  taiKhoan: z
    .string()
    .nonempty("Fill in blank")
    .min(6, "Required at least 6 characters")
    .max(16, "Required at most 16 characters"),
  matKhau: z
    .string()
    .nonempty("Fill in blank")
    .regex(
      new RegExp(matKhauRegex),
      "Your password included a single word and a number!"
    ),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
