import { AvatarProps as AvatarPropsA, Avatar as AvatarA } from "antd" 
type AvatarObject = {
    (props:AvatarPropsA):JSX.Element,
    
}
export const Avatar:AvatarObject = (props) => {
  return (
    <AvatarA {...props}/>)
}

export default Avatar