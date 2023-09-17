import { Carousel as CarouselA, CarouselProps as CarouselPropsA } from "antd";

type CarouselObject = {
  (props: CarouselPropsA): JSX.Element;
} & {
  margin?: string;
  height?: string;
  color?: string;
  lineHeight?: string;
  textAlign?: string;
  background?: string;
};
export const Carousel: CarouselObject = (props) => {
  return <CarouselA {...props} />;
};

export default Carousel;
