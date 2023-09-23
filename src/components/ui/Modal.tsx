import {Modal as ModalA, ModalProps as ModalPropsA} from 'antd'

type ModalPropsObject ={
    (props:ModalPropsA):JSX.Element,
}

export const Modal:ModalPropsObject = (props) =>{
    return <ModalA {...props} />
}

export default Modal;