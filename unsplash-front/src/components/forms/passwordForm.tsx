import React from "react";
import Form from "./base/form";
import {IFormInheritProps} from "../../utils/props/formInheritProps";
import {eventHandlers} from "../../utils/events/handlers";
import {FormRefs} from "../../utils/references/formRefs";


export default class PasswordForm extends React.Component<IFormInheritProps, any>{
    render() {
        return (
            <Form method={'DELETE'} actionUrl={'/'} onSubmit={eventHandlers.form.passwordForm.onSubmit} reference={FormRefs.PasswordFormRef}>
                <div className="card enter_password_card">
                    <div className="title__card">Are you sure?</div>

                    <div className="password__card">
                        <div className="text__password">Password</div>
                        <input type="password" className="input__password" autoComplete={'no'} placeholder="******************" required/>
                    </div>

                    <input type="text" id={"input__username__hidden"} name={"username"} defaultValue={this.props.username} hidden/>
                    <input type="text" id={"input__pk__hidden"} name={"pk"} hidden/>
                    <input type="submit" className="delete__card" value="Delete" />
                        <div className="cancel__card_1" onClick={eventHandlers.form.cancelButton.onClick.bind(this,FormRefs.PasswordFormRef)}>Cancel</div>
                </div>
            </Form>
        );
    }
}