import React from "react";
import {ColumnCount} from "../enums/columnCountEnum";


export declare interface IImagesProps{
    children?: React.ReactNode | React.ReactNodeArray
    columnCount?: ColumnCount
    filterImages?: Function
}