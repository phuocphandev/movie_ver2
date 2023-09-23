import {Pagination as PaginationA, PaginationProps as PaginationPropsA} from 'antd'

type PaginationObject = {
    (props:PaginationPropsA):JSX.Element,  
}

export const Pagination:PaginationObject = (props) =>  {
    return <PaginationA {...props} />
}


export default Pagination