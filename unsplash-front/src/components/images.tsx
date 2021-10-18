import React, {CSSProperties, PropsWithChildren, ReactNode, ReactNodeArray} from "react";
import '../css/images.css'
import {IImagesProps} from "../utils/props/imagesProps";
import {ColumnsOrderEnum} from "../utils/enums/columnsOrderEnum";
import {Column} from "./column";
import {ColumnCount} from "../utils/enums/columnCountEnum";


export class Images extends React.Component<IImagesProps> {

    getStyles = (): CSSProperties => {
        return {
            gridTemplateColumns: `repeat(${this.props.columnCount}, minmax(0,1fr))`,
            justifyItems: (this.props.columnCount === 1)?'center':'end',
            maxWidth: (this.props.columnCount === 2)? '850px': 'inherit',
            marginLeft:'auto',
            marginRight:'auto'
        }
    }

    isEmpty = (): boolean => {
        document.querySelectorAll('.col').forEach(colElem => {
            if (colElem.childElementCount > 0)
                return false
        })
        return true
    }

    getOrder = (): Array<ReactNodeArray> => {
        // if (this.props.filterImages)
        //     console.log("GET ORDER", this.props.filterImages(this.props.children))
        let filteredImages: any = this.props.children;
        if (this.props.filterImages)
            filteredImages = this.props.filterImages(this.props.children) || [];

        if (Array.isArray(filteredImages)){
            const imageArray: Array<ReactNodeArray> = []
            filteredImages.forEach((current, index)=>{
                const row_index: number = Math.trunc(index / (this.props.columnCount || ColumnCount.Three))
                if (!imageArray[row_index]){
                    imageArray.push([])
                }
                imageArray[row_index].push(current)
            })
            return imageArray
        } else {
            const image: ReactNode = filteredImages
            return [[image, ], ]
        }

    }

    getColumns = (): Array<ReactNode> => {
        const order = this.getOrder()
        const columnArray: Array<ReactNode> = [];
        for (let column = ColumnsOrderEnum.First; column < (this.props.columnCount || 3); column++){
            columnArray.push(
                (
                    <Column key={column} column={column} order={order}>
                        {this.props.children}
                    </Column>
                )
            )
        }

        return columnArray
    }

    render() {
        if (!this.props.children)
            return (
                <div className="images">
                    No^)
                </div>
            )


        return (
            <div className="images" style={this.getStyles()}>
                {this.getColumns()}
            </div>
        );
    }
}