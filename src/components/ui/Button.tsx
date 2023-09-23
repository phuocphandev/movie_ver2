import { Button as ButtonA, ButtonProps as ButtonPropsA } from 'antd'

type ButtonProps = ButtonPropsA & {
    //  định nghĩa thêm các props có thể truyền xuống
}

export const Button = (props: ButtonProps) => {
    return <ButtonA {...props} />
}

export default Button
