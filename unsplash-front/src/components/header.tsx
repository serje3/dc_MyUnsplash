import React, {Dispatch, SetStateAction} from "react";
import search_img from "../img/svg/search_black_24dp.svg";
import '../css/header.css'
import {eventHandlers} from "../utils/events/handlers";
import {FormRefs} from "../utils/references/formRefs";

export const Header: React.FC<{
    isWindow: {
        [key: string]: boolean
    },
    username:string,
    setFilterImages: Dispatch<SetStateAction<Function>>
}> = (props) => (

        <div className="header">
        <div className="wrapper__header">
            <div className="logo__header" onClick={()=>window.location.href="/"}>
                <div className="img__logo">
                    <div className="top__logo"/>
                    <div className="bottom__logo"/>
                </div>
                <div className="text__logo">
                    <div className="top_text__logo">My Unsplash</div>
                    <div className="bottom_text__logo">devchallenges.io</div>
                </div>
            </div>
            <div className="search__header" onClick={(event)=>{
                console.log(event)
                // @ts-ignore
                if (event.target.className === "search__header"){
                    console.log(event.target)
                    // @ts-ignore
                    event.target.children[1].focus()
                }
            }}>
                <img src={search_img} alt="search" className="img__search" />
                <input type="text" className="input__search" placeholder="Search by name" onChange={
                    (event) =>
                        eventHandlers.images.inputSearch.onChange(event, props.setFilterImages)
                }/>
            </div>

            <div className="login__header" onClick={eventHandlers.form.openButton.onClick.bind(this, FormRefs.LoginFormRef)}
                style={props.username?{
                    justifyContent: "start"
                }: undefined}
            >{props.username || "Login"}</div>

            <div className="add__header" onClick={eventHandlers.form.openButton.onClick.bind(this, FormRefs.PhotoFormRef)}>{
                    "Add a photo"
            }</div>
        </div>
    </div>
)