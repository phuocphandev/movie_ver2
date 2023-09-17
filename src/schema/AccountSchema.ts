import { z } from "zod";
const matKhauRegex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
const hoTenRegex = /^[\p{L}\s]+$/u;

export const AccountSchema = z.object({
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
  email: z.string().nonempty("Fill in blank").email("Invalid email"),
  soDt: z
    .string()
    .nonempty("Fill in blank")
    .regex(new RegExp(`^\\d+$`), { message: "Numbers only" }),
  maNhom: z.string().nonempty("Fill in blank"),
  hoTen: z.string().nonempty("Fill in blank").regex(new RegExp(hoTenRegex), {
    message: "Text only",
  }),
  maLoaiNguoiDung: z.string(),
});
export type AccountSchemaType = z.infer<typeof AccountSchema>;
