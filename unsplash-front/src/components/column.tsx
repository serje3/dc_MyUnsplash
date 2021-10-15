import React, {ReactNode, ReactNodeArray} from "react";
import {ColumnsOrderEnum} from "../utils/enums/columnsOrderEnum";
import {IColumnProps} from "../utils/props/columnProps";
import WrapperImg from "./wrapperImage";


export class Column extends React.Component<IColumnProps>{
    getContentColumn = (index: ColumnsOrderEnum): ReactNodeArray => {
        const order: Array<ReactNodeArray> = this.props.order
        const contentColList = (): Array<ReactNode> => {
            const imgListColumn: Array<ReactNode> = []
            order.forEach((imgList => {
                if (index+1 <= imgList.length){
                    imgListColumn.push(imgList[index])
                }
            }))
            return imgListColumn
        }
        const wrapContentCol = (): ReactNodeArray =>{
            return contentColList().map((img, index) => {
                return (<WrapperImg key={index}>{img}</WrapperImg>)
            })
        }
        return wrapContentCol()
    }

    render() {
        return (
            <div className="col" style={{
                justifyContent: (this.props.column === 2 && this.props.columnCount === 2)?'start': 'end'
            }}>
                {this.getContentColumn(this.props.column)}
            </div>
        );
    }
}