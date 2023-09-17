import {TabsProps as TabsPropsA, Tabs as TabsA} from 'antd'
type TabObject ={
    (props:TabsPropsA):JSX.Element,  
}
export const Tabs: TabObject = (props) => {
  return (
    <TabsA {...props}/>
  )
}

export default Tabs