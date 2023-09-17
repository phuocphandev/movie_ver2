import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import PATH from "constant/config";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "schema";
import { useAppDispatch } from "store";
import { loginThunk } from "store/quanLyNguoiDung/thunk";
import { toast } from "react-toastify";
import Input from "components/ui/Input";

export const LoginTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchemaType> = async (value) => {
    dispatch(loginThunk(value))
      .unwrap()
      .then(() => {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.content);
      });
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <div className={styles.inputFormLogin}>
        <div className={styles.formLogo}>
          <span className="flex flex-col item-center">
            <img
              src="../../../../image/navbar/Logo.png"
              className="h-full w-1/5 mr-2 pt-1  self-center"
              alt="Logo"
            />
            <span className=" text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Movids
            </span>
          </span>
          {/* Description  */}
          <div className="text-white  flex flex-col items-center">
            <p className="text-3xl">Welcome back</p>
            <p className="text-xl">Please login to continue</p>
          </div>
        </div>
        <div className={styles.formContainer}>
          {/* Title  */}
          <div
            className="px-3 flex justify-between"
            style={{ flexWrap: "wrap" }}
          >
            <h1 className="text-white text-3xl font-bold font-600 ">Login</h1>
            <span
              className="text-white flex items-center gap-1 hover:text-blue-400 transition-all ease-in-out cursor-pointer"
              onClick={() => navigate(PATH.register)}
            >
              <img
                src="./image/LogiAndRegis/navigation.png"
                alt="arrow"
                className="h-5"
              />
              Create new account
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
            <div className="mt-10">
              <button className="text-white bg-[#304ffe] hover:bg-red-800 font-medium rounded-full text-sm text-center mr-2 mb-2 transition-all ease-in-out px-5 py-[16px] text-20 w-full">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
