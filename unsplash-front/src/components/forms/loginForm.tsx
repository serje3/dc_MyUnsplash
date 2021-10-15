import React from "react";
import Form from "./base/form";
import {IFormInheritProps} from "../../utils/props/formInheritProps";
import {eventHandlers} from "../../utils/events/handlers";
import {FormRefs} from "../../utils/references/formRefs";

export default class LoginForm extends React.Component<IFormInheritProps, any>{

    render() {
        return (
            <Form method={'POST'} actionUrl={'/'} onSubmit={eventHandlers.form.loginForm.onSubmit} reference={FormRefs.LoginFormRef}>
                <div className="card login_card">
                    <div className="title__card">Login or Register</div>
                    <div className="username__card">
                        <div className="text__label">Username</div>
                        <input type="text" id="username__login" className="input__label" name="username" placeholder="John" required/>
                    </div>
                    <div className="password__card">
                        <div className="text__password">Password</div>
                        <input type="password" id="password__login" className="input__password" name="password" autoComplete={'no'} placeholder="******************" required/>
                    </div>
                    <input type="submit" className="submit__card" value="Login"/>
                    <div className="cancel__card" onClick={eventHandlers.form.cancelButton.onClick.bind(this,FormRefs.LoginFormRef)}>Cancel</div>
                </div>
            </Form>
        );
    }
}