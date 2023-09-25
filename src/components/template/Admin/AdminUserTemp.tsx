import { useAppDispatch } from "store";
import {
  layDSNguoiDungThunk,
  xoaNguoiDungThunk,
  timKiemNguoiDungThunk,
} from "store/quanTri/thunk";
import { useEffect, useState } from "react";
import { useAdmin } from "hooks/useAdmin";
import { Pagination, PaginationProps, Space } from "antd";
import { Button, Dropdown, Input, Modal } from "components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema, AddUserSchemaType } from "schema";
import { QuanTri } from "services/quanTri";
import { toast } from "react-toastify";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "rc-menu";
import { useDispatch } from "react-redux";
import { QuanTriActions } from "store/quanTri/slice";



export const AdminUserTemp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trangTimKiem, setTrangTimKiem] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [selectOption, setSelectOption] = useState(null);
  const [typeNguoiDungError, setTypeNguoiDungError] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const handleInput = (event) => {
    setSearchData(event.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { DSUser, isDelete, timKiemUser, UpdateUser } = useAdmin();
  console.log("TimKiemUser: ", timKiemUser);
  //Kỹ thuật đổi tên key: xóa (tách phần tử cần xóa và những phần tử còn lại) => thêm vào
  const timKiemUserEdit = timKiemUser?.map(({ soDT, ...rest }) => {
    return { ...rest, soDt: soDT };
  });

  //chia Arr timKiemUserEdit
  let timKiemUserEditSort = [];
  let indexArr = [];
  let index = 0;
  for (var i = 0; i <= timKiemUserEdit?.length - 1; i++) {
    indexArr.push(timKiemUserEdit[i]);
    index++;
    if (index == 5) {
      timKiemUserEditSort.push(indexArr);
      index = 0;
      indexArr = [];
    }
  }
  timKiemUserEditSort.push(indexArr);
  console.log("TimKiemUserSort: ", timKiemUserEditSort);
  //================================

  const dispatch = useAppDispatch();
  const dispatchOrigin = useDispatch();

  useEffect(() => {
    dispatch(layDSNguoiDungThunk(trangTimKiem));
  }, [trangTimKiem]);

  useEffect(() => {}, [trangTimKiem]);

  const onPage: PaginationProps["onChange"] = (page, _) => {
    // if (timKiemUserEditSort) {
    //   setTrangTimKiem(timKiemUserEditSort[page - 1]);
    // } else {
    //   dispatch(layDSNguoiDungThunk(page));
    // }
    if (timKiemUser) {
      setTrangTimKiem(page - 1);
    } else {
      setTrangTimKiem(page);
    }
    console.log("Page dang co ne: ", page);
    console.log("timKiemUserEditSort:", timKiemUserEditSort);
  };
  //form-modal
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<AddUserSchemaType>({
    mode: "onChange",
    resolver: zodResolver(AddUserSchema),
  });
  // console.log("selectOption ne", selectOption);
  const onSubmit: SubmitHandler<AddUserSchemaType> = async (value) => {
    if (!UpdateUser) {
      if (selectOption == "QuanTri" || selectOption == "KhachHang") {
        await QuanTri.themNguoiDung({
          ...value,
          maLoaiNguoiDung: selectOption,
          maNhom: "GP00",
        })
          // try catch là dùng cho extrareducer của redux còn thencatch là call api trực tiếp
          .then(() => {
            toast.success("Create Successfully!");
            reset({
              taiKhoan: "",
              matKhau: "",
              email: "",
              soDt: "",
              hoTen: "",
            });
            handleCancel();
            dispatch(layDSNguoiDungThunk(trangTimKiem));
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.content);
          });
      } else {
        setTypeNguoiDungError("Please choose the type!");
        return;
      }
    } else {
      if (selectOption == "QuanTri" || selectOption == "KhachHang") {
        await QuanTri.capNhatThongTin({
          ...value,
          maLoaiNguoiDung: selectOption,
          maNhom: "GP00",
        })
          // try catch là dùng cho extrareducer của redux còn thencatch là call api trực tiếp
          .then(() => {
            toast.success("Update Successfully!");
            reset({
              taiKhoan: "",
              matKhau: "",
              email: "",
              soDt: "",
              hoTen: "",
            });
            handleCancel();
            dispatchOrigin(QuanTriActions.xoaUser());
            dispatch(layDSNguoiDungThunk(trangTimKiem));
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.content);
          });
      } else {
        setTypeNguoiDungError("Please choose the type!");
        return;
      }
    }
  };
  // Dropdown
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectOption(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: "KhachHang",
      key: "KhachHang",
    },
    {
      label: "QuanTri",
      key: "QuanTri",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  //End Dropdown
  const fetchDataList = (arr) => {
    return (
      // Khi nào dùng trong return của component mới dùng {arr.?map(()....)}
      arr?.map((user) => (
        <tr
          className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          style={{ height: "40px"}}
        >
          <td className="px-2 py-4 ">{user?.taiKhoan}</td>
          <td className="px-2 py-4 ">{user?.matKhau}</td>
          <td className="px-2 py-4 ">{user?.email}</td>
          <td className="px-2 py-4 ">{user?.soDt}</td>
          <td className="px-10 py-4 ">{user?.maLoaiNguoiDung}</td>
          <td className="px-2 py-4 ">{user?.hoTen}</td>
          <td className="px-2 py-4 ">
            {" "}
            <Button
              loading={isDelete}
              className="w-full !bg-red-600"
              type="primary"
              htmlType="button"
              onClick={() => {
                if (timKiemUser) {
                  if (timKiemUserEditSort.length == 1) {
                    dispatch(xoaNguoiDungThunk({ tkXoa: user.taiKhoan })).unwrap().then(()=>{
                      dispatch(timKiemNguoiDungThunk(searchData))
                    });
                    setTrangTimKiem(trangTimKiem - 1);
                  } else {
                    dispatch(
                      xoaNguoiDungThunk({
                        tkXoa: user.taiKhoan,
                      })).unwrap().then(()=>{
                        dispatch(timKiemNguoiDungThunk(searchData))
                      });
                      setTrangTimKiem(trangTimKiem)
                  }
                } else {
                  if (DSUser?.items.length == 1) {
                    setTrangTimKiem(trangTimKiem - 1);
                    dispatch(
                      xoaNguoiDungThunk({
                        tkXoa: user.taiKhoan,
                        pageNow: trangTimKiem,
                      })
                    );
                  } else {
                    dispatch(
                      xoaNguoiDungThunk({
                        tkXoa: user.taiKhoan,
                        pageNow: trangTimKiem,
                      })
                    );
                  }
                }
              }}
            >
              XOÁ
            </Button>
            {/* Button Update */}
            <Button
              className="w-full !bg-blue-500"
              type="primary"
              htmlType="button"
              onClick={() => {
                dispatchOrigin(QuanTriActions.luuUser(user));
                showModal();
                setSelectOption(user?.maLoaiNguoiDung);
                reset(user);
              }}
            >
              UPDATE
            </Button>
          </td>
        </tr>
      ))
    );
  };
  return (
      <div className="text-white rounded-xl w-[90%] ">
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl relative !w-[100%]">
          <div className="flex ">
            <div className="absolute -top-14 left-0">
              <form>
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[50px]"
                    placeholder={searchData? searchData: ""}
                    onChange={handleInput}
                    defaultValue={searchData}
                    // khi nào có return thì mới cần handleInput()
                  />
                  <button
                    type="button"
                    className="text-white absolute right-1 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      if(searchData == undefined || searchData == "" ){
                        toast.error("Vui lòng nhập thông tin tài khoản tìm kiếm")
                        dispatchOrigin(QuanTriActions.xoaTimKiemUser())
                      }else{
                        dispatch(timKiemNguoiDungThunk(searchData));
                      }
                    }}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="absolute -top-8 right-0">
              <Button
                className="!bg-green-500"
                type="primary"
                htmlType="button"
                onClick={showModal}
              >
                Add User
              </Button>
            </div>
          </div>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" >
            <tr>
              <th className="px-2 py-3 ">Tài khoản</th>
              <th className="px-2 py-3 ">Mật khẩu </th>
              <th className="px-2 py-3 ">Email</th>
              <th className="px-2 py-3 ">Số điện thoại</th>
              <th className="pl-2">Mã loại người dùng</th>
              <th className="pl-6 pr-6">Họ tên</th>
              <th className="px-2 py-3 ">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {timKiemUser
              ? fetchDataList(timKiemUserEditSort[trangTimKiem])
              : fetchDataList(DSUser?.items)}
          </tbody>
        </table>
        <Pagination
          pageSize={5}
          className="flex justify-center items-center"
          onChange={onPage}
          defaultCurrent={trangTimKiem}
          total={timKiemUser ? timKiemUser.length : DSUser?.totalPages * 5}
          showSizeChanger={false}
        />
        {/* Modal */}
        <Modal
          title={UpdateUser ? "UPDATE USER" : "ADD USER"}
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          centered
        >
          <form onSubmit={handleSubmit(onSubmit)} id="formAddUser">
            <Input
              disabled={UpdateUser ? true : false}
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
                  disabled
                  register={register}
                  name="maNhom"
                  type="text"
                  placeholder="Group ID"
                  value="GP00"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <Space wrap>
                <Dropdown menu={menuProps} placement="bottomRight">
                  <Button className="!px-[40px] !h-[50px] text-[40px] !bg-[#333] !text-[rgb(255,255,255,0.5)]">
                    <Space>
                      {selectOption || "Select type!"}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Space>
              <p className="text-red-500">{typeNguoiDungError}</p>
            </div>
            <Input
              register={register}
              name="hoTen"
              type="text"
              placeholder="Fullname"
              error={errors?.hoTen?.message}
            />
            <div className="mt-4">
              {!UpdateUser ? (
                <button
                  type="submit"
                  className="text-white bg-[#304ffe] hover:bg-red-800 font-medium rounded-full text-sm text-center mr-2 mb-2 transition-all ease-in-out px-5 py-[16px] text-20 w-full"
                >
                  Add User
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-green-500 hover:bg-red-800 font-medium rounded-full text-sm text-center mr-2 mb-2 transition-all ease-in-out px-5 py-[16px] text-20 w-full"
                >
                  Update
                </button>
              )}
              <button
                type="button"
                className="text-white bg-[#727273] hover:bg-red-800 font-medium rounded-full text-sm text-center mr-2 mb-2 transition-all ease-in-out px-5 py-[16px] text-20 w-full"
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
  );
};

export default AdminUserTemp;
