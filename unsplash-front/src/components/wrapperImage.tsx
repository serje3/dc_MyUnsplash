import React from "react";
import {IImagesProps} from "../utils/props/imagesProps";
import {eventHandlers} from "../utils/events/handlers";
import {FormRefs} from "../utils/references/formRefs";

export default class WrapperImg extends React.Component<IImagesProps> {
    render() {
        const img: {props?:{
                alt?: string
            }} = this.props.children || {};

        return (
            <figure>
                <div className="pre_img">
                    <div className="text__pre">{img.props?.alt}</div>
                    <div className="delete__pre" onClick={eventHandlers.images.photoDeleteButton.onClick.bind(this, FormRefs.PasswordFormRef, this.props.children)}>delete</div>
                </div>
                {this.props.children}
            </figure>
        )
    }
}
