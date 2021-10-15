import React, {ReactNodeArray} from "react";
import {IImagesProps} from "./imagesProps";
import {ColumnsOrderEnum} from "../enums/columnsOrderEnum";

export declare interface IColumnProps extends IImagesProps{
    column: ColumnsOrderEnum,
    order: Array<ReactNodeArray>
}