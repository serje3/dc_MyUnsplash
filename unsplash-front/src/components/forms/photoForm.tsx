import React from "react";
import Form from "./base/form";
import {IFormInheritProps} from "../../utils/props/formInheritProps";
import {eventHandlers} from "../../utils/events/handlers";
import {FormRefs} from "../../utils/references/formRefs";

export default class PhotoForm extends React.Component<IFormInheritProps, any>{

    render() {
        return (
            <Form method={'POST'} actionUrl={'/'} onSubmit={
                (event => {
                    eventHandlers.form.photoForm.onSubmit(event)
                })

            } reference={FormRefs.PhotoFormRef}>
                <div className="card add_photo_card">
                    <div className="title__card">Add a new photo</div>
                    <div className="label__card">
                        <div className="text__label">Label</div>
                        <input type="text" className="input__label" name="label" placeholder="Suspendisse elit massa" required/>
                    </div>
                    <div className="url__card">
                        <div className="text__url">Photo URL</div>
                        <input type="url" className="input__url" name="url"
                               placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
                               onChange={eventHandlers.images.inputUrl.onChange}
                               required/>
                    </div>
                    <input type="submit" className="submit__card" value="Submit" />
                        <div className="cancel__card" onClick={eventHandlers.form.cancelButton.onClick.bind(this,FormRefs.PhotoFormRef)}>Cancel</div>
                </div>
            </Form>
        );
    }
}