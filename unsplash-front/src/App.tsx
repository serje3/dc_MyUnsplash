import React, {Dispatch, SetStateAction, useState} from 'react';
import './css/style.css'
import './css/add_photo.css'
import './css/enter_password.css'
import './css/login.css'
import './css/whitespace.css'
import {Header} from "./components/header";
import {Images} from "./components/images";
import {ColumnCount} from "./utils/enums/columnCountEnum";
import PhotoForm from "./components/forms/photoForm";
import PasswordForm from "./components/forms/passwordForm";
import LoginForm from "./components/forms/loginForm";
import {useMediaPredicate} from "react-media-hook";
import UserImages from "./components/userImages";
import APIUser from "./api/authAPI";
import {WhiteSpaceArea} from "./components/whiteSpaceArea";

const UserAPI = new APIUser()

function GetMediaPredicates(): {[key:string]: boolean} {
    return {
        smallerThan700: useMediaPredicate("(max-width: 700px)"),
        smallerThan850: useMediaPredicate("(max-width: 850px)"),
        smallerThan1304: useMediaPredicate("(max-width: 1304px)"),
    }
}

function App(){
    // states
    const [images, setImages] = useState([null,null])
    const [filter, setFilter]: [Function | undefined, Dispatch<SetStateAction<Function>>] = useState<Function | undefined>(undefined)
    // --------------

    // fields
    const username = UserAPI.user;
    const isWindow: {
        [key: string]: boolean
    } = GetMediaPredicates()
    let columnsCount = ColumnCount.Three
    // --------------

    // functions
    const saveImages = (_images: []) => setImages(_images)
    // --------------


    if (isWindow.smallerThan850){
        columnsCount = ColumnCount.One
    } else if (isWindow.smallerThan1304){
        columnsCount = ColumnCount.Two
    }

    return (
      <>
      <PhotoForm />
      <PasswordForm username={username}/>
      <LoginForm />
      <div className="wrapper">
          <Header isWindow={isWindow} username={username} setFilterImages={setFilter}/>
          {images.length > 0?
              <Images columnCount={columnsCount} filterImages={filter}>
                  {images}
              </Images>
              :
              <WhiteSpaceArea isAnonymous={username === ""}/>
          }


              <footer>
                  <hr className={"hr__footer"} />
                  <div className={"div__footer"}>
                  created by <a href="https://github.com/serje3" className="username__footer">serje3</a> -
                  devChallenges.io
                  </div>
              </footer>

      </div>
          {/* render returns false */}
          <UserImages client={UserAPI} saveImage={saveImages}/>

      </>
  );
}
export default App;

