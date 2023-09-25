import { z } from "zod";

const hoTenRegex = /^[\p{L}\s]+$/u;
const matKhauRegex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";

export const AddUserSchema = z.object({
  taiKhoan: z
    .string()
    .nonempty("Fill in blank")
    .min(6, "Require at least 6 characters")
    .max(16, "Require at most 6 characters"),
  matKhau: z
    .string()
    .nonempty("Fill in blank")
    .regex(
      new RegExp(matKhauRegex),
      "Your password required at least 8 character and 1 number"
    ),
  email:z.string().nonempty("Fill in blank").email("Invalid email"),
  soDt: z
    .string()
    .nonempty("Fill in blank")
    .regex(new RegExp(`^\\d+$`), { message: "Numbers only" }),
  hoTen: z.string().nonempty("Fill in blank").regex(new RegExp(hoTenRegex), {
    message: "Text only",
  }),
});

export type AddUserSchemaType = z.infer<typeof AddUserSchema>;

