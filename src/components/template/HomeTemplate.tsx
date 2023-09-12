import { Card } from "components/ui";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { quanLyPhimThunk } from "store/quanLyPhim/thunk";

export const HomeTemplate = () => {
  const dispatch = useAppDispatch();
  const { movieList } = useSelector((state: RootState) => state.quanLyPhim);

  useEffect(() => {
    dispatch(quanLyPhimThunk());
  }, []);

  return (
    <div className=" p-5 rounded-sm ">
      <div className="grid grid-cols-4 gap-[30px]">
      {movieList?.map((movie) => (
        <Card
          key={movie.maPhim}
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={movie.hinhAnh} />}
        >
          <Card.Meta
            title={movie.tenPhim}
            description={movie.moTa.substring(0, 50)}
          />
        </Card>
      ))}
    </div>
    </div>
  );
};

export default HomeTemplate;
