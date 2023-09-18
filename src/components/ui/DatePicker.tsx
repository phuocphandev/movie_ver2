import {DatePicker as DatePickerA, DatePickerProps as DatePickerPropsA} from 'antd'

type DatePickerPropsObject ={
    (props:DatePickerPropsA):JSX.Element,
}

export const DatePicker:DatePickerPropsObject = (props) =>{
    return <DatePickerA {...props} />
}

export default DatePicker;