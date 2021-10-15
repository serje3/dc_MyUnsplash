import React from "react";
import {eventHandlers} from "../utils/events/handlers";
import {FormRefs} from "../utils/references/formRefs";
export const WhiteSpaceArea: React.FC<{
    isAnonymous:boolean
}> = (props) =>{
    return (
        <div className={"whitespace"}>
            {props.isAnonymous?
                "Login to see and add images"
                :
                [
                <div key={"addphoto_whitespace"} className={"addphoto__whitespace"} onClick={eventHandlers.form.openButton.onClick.bind(this, FormRefs.PhotoFormRef)}>Add photo</div>,
                    <span key={"addphoto_span"} className={"addphoto_span"}>to see images</span>
                ]
            }
        </div>
    )
}