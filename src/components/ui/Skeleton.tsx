import { Skeleton as SkeletonA, SkeletonProps as SkeletonPropsA, AvatarProps } from "antd";
import { SkeletonButtonProps } from "antd/es/skeleton/Button";
import { SkeletonImageProps } from "antd/es/skeleton/Image";
import { SkeletonInputProps } from "antd/es/skeleton/Input";
import React from "react";
type SkeletonObject = {
  (props: SkeletonPropsA): JSX.Element;
  Input: React.FC<SkeletonInputProps>;
  Avatar: React.FC<AvatarProps>;
  Button: React.FC<SkeletonButtonProps>;
  Image: React.FC<SkeletonImageProps>;
};
export const Skeleton:SkeletonObject = (props) => {
  return <SkeletonA {...props} />;
};
Skeleton.Input = SkeletonA.Input;
Skeleton.Image = SkeletonA.Image;
Skeleton.Button = SkeletonA.Button;
Skeleton.Avatar = SkeletonA.Avatar;
export default Skeleton;
