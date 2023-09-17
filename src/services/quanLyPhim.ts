import { apiInstance } from "constant";
import { Movie } from "types/QuanLyPhim";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_PHIM_API,
});
export const quanLyPhim = {
  getMovieList: () =>
    api.get<ApiResponse<Movie[]>>("/LayDanhSachPhim?MaNhom=GP09"),
};
