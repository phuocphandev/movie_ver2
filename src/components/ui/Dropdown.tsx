import {Dropdown as DropdownA,  DropDownProps as DropDownPropsA} from 'antd'
import { DropdownButtonProps } from 'antd/es/dropdown';
import React from 'react';

type DropdownObject ={
    (props:DropDownPropsA):JSX.Element;
    Button:React.FC<DropdownButtonProps>
    

}

export const Dropdown:DropdownObject = (props) => {
  return  <DropdownA {...props}/>
    
}

export default Dropdown
Dropdown.Button=DropdownA.Button;