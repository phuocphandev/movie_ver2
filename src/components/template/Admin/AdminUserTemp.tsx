import { useAppDispatch } from "store";
import { layDSNguoiDungThunk, xoaNguoiDungThunk } from "store/quanTri/thunk";
import { useEffect, useState } from "react";
import { useAdmin } from "hooks/useAdmin";
import { Pagination, PaginationProps } from "antd";
import { Button } from "components/ui";
import Modal from "components/ui/Modal";


export const AdminUserTemp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { DSUser, isDelete, page } = useAdmin();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(layDSNguoiDungThunk(page));
  }, []);

  const onPage: PaginationProps["onChange"] = (page, _) => {
    dispatch(layDSNguoiDungThunk(page));
  };

  return (
    <div className="text-white translate-y-[20%] -translate-x-[40%] rounded-xl ">
      <table
        className=" text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl relative "
        style={{
          height: "300px",
        }}
      >
        <div className="absolute -top-8 right-0">
          <Button className="!bg-green-500" type="primary" htmlType="button" onClick={showModal}>
            Add User
          </Button>
        </div>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr style={{ height: "30px" }}>
            <th className="px-6 py-3 ">Tài khoản</th>
            <th className="px-6 py-3 ">Mật khẩu </th>
            <th className="px-6 py-3 ">Email</th>
            <th className="px-6 py-3 ">Số điện thoại</th>
            <th className="pl-2  ">Mã nhóm</th>
            <th className="pl-2">Mã loại người dùng</th>
            <th className="pl-6 pr-6">Họ tên</th>
            <th className="px-6 py-3 ">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {DSUser?.items?.map((user) => (
            <tr
              className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              style={{ height: "50px" }}
            >
              <td className="px-6 py-4 ">{user.taiKhoan}</td>
              <td className="px-6 py-4 ">{user.matKhau}</td>
              <td className="px-6 py-4 ">{user.email}</td>
              <td className="px-6 py-4 ">{user.soDt}</td>
              <td className="px-10 py-4 ">{user.maNhom}</td>
              <td className="px-10 py-4 ">{user.maLoaiNguoiDung}</td>
              <td className="px-6 py-4 ">{user.hoTen}</td>
              <td className="px-6 py-4 ">
                {" "}
                <Button
                  loading={isDelete}
                  className="w-full !bg-red-600"
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    if (DSUser?.items.length == 1) {
                      dispatch(
                        xoaNguoiDungThunk({
                          tkXoa: user.taiKhoan,
                          pageNow: page - 1,
                        })
                      );
                    } else {
                      dispatch(
                        xoaNguoiDungThunk({
                          tkXoa: user.taiKhoan,
                          pageNow: page,
                        })
                      );
                    }
                  }}
                >
                  XOÁ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className="translate-x-[59%]"
        onChange={onPage}
        defaultCurrent={page}
        total={(DSUser?.totalCount / 5) * 10}
      />
   {/* Modal */}
   <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default AdminUserTemp;
