import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import PATH from "constant/config";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "schema/RegisterSchema";
import { quanLyNguoiDung } from "services";
import { toast } from "react-toastify";
import Input from "components/ui/Input";

export const RegisterTemplate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (value) => {
    try {
      await quanLyNguoiDung.register(value);
      toast.success("Create account success!");
      navigate(PATH.login);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.content);
    }
  };

  return (
    <div className={styles.inputFormRegister}>
      <div className={styles.formLogo}>
        <span className="flex flex-col item-center">
          <img
            src="/image/navbar/navbar_logo.png"
            className="h-full w-1/5 mr-2 pt-1  self-center"
            alt="Logo"
          />
          <span className=" text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Movids
          </span>
        </span>
        {/* Description  */}
        <div className="text-white  flex flex-col items-center">
          <p className="text-3xl">Greeting :)</p>
          <p className="text-xl">Please register to join with us</p>
        </div>
      </div>
      <div className={styles.formContainer}>
        {/* Title  */}
        <div className="px-3 flex justify-between" style={{ flexWrap: "wrap" }}>
          <h1 className="text-white text-3xl font-bold font-600 ">Register</h1>
          <span
            className="text-white flex items-center gap-1 hover:text-blue-400 transition-all ease-in-out cursor-pointer"
            onClick={() => navigate(PATH.login)}
          >
            <img
              src="./image/LogiAndRegis/navigation.png"
              alt="arrow"
              className="h-5"
            />
            <p>Already have account?</p>
          </span>
        </div>
        {/* signIn with socialMedia  */}
        <div className="flex justify-center gap-5 mt-3 mb-3 flex-wrap md:flex-nowrap ">
          <span className="bg-[#5856d6] text-white rounded-3xl px-5 py-1 flex gap-1 h-10 hover:bg-blue-800 transition-all ease-in-out cursor-pointer">
            <img
              src="./image/LogiAndRegis/social-facebook.png"
              className="w-3/4 h-3/4 m-auto"
              alt="google"
            />
            <p className="flex items-center">Facebook</p>
          </span>
          <span className="bg-[#00bcd4] text-white rounded-3xl px-5 py-1 flex gap-1 h-10 hover:bg-cyan-800 transition-all ease-in-out cursor-pointer">
            <img
              src="./image/LogiAndRegis/social-twitter.png"
              className="w-3/4 h-3/4 m-auto"
              alt="google"
            />
            <p className="flex items-center">Twitter</p>
          </span>
          <span className="bg-[#d84226] text-white rounded-3xl px-5 py-1 flex gap-1 h-10 hover:bg-red-800 transition-all ease-in-out cursor-pointer">
            <img
              src="./image/LogiAndRegis/social-google.png"
              className="w-3/4 h-3/4 m-auto"
              alt="google"
            />
            <p className="flex items-center">Google</p>
          </span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="bg-white w-1/5 h-[1px]"></div>
          <p className="text-white">Or register with email</p>
          <div className="bg-white w-1/5 h-[1px]"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="taiKhoan"
            type="text"
            placeholder="Username"
            error={errors?.taiKhoan?.message}
          />
          <Input
            register={register}
            name="matKhau"
            type="password"
            placeholder="Password"
            error={errors?.matKhau?.message}
          />
          <Input
            register={register}
            name="email"
            type="text"
            placeholder="Email"
            error={errors?.email?.message}
          />
          <div className="flex justify-between gap-5">
            <div className="flex flex-col w-1/2">
              <Input
                register={register}
                name="soDt"
                type="text"
                placeholder="Phone Number"
                error={errors?.soDt?.message}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <Input
                register={register}
                name="maNhom"
                type="text"
                placeholder="Group ID"
                error={errors?.maNhom?.message}
              />
            </div>
          </div>

          <Input
            register={register}
            name="hoTen"
            type="text"
            placeholder="Fullname"
            error={errors?.hoTen?.message}
          />
          <div className="mt-10">
            <button className="text-white bg-[#304ffe] hover:bg-red-800 font-medium rounded-full text-sm text-center mr-2 mb-2 transition-all ease-in-out px-5 py-[16px] text-20 w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTemplate;
