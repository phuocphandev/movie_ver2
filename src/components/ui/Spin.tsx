import {Spin as SpinA,  SpinProps as SpinPropsA} from 'antd'
type SpinObject = {
    (propsA:SpinPropsA):JSX.Element,
}
export const Spin:SpinObject =(props)=>{
    return (<SpinA {...props}/>)
}