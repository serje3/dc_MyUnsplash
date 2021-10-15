import {Dispatch, ReactNode, RefObject, SetStateAction, SyntheticEvent} from "react";
import APIUser from "../../api/authAPI";
import {FormRefs} from "../references/formRefs";
import APIImages from "../../api/imageAPI";

export const eventHandlers = {
    form: {
        openButton: {
            onClick: (reference: RefObject<HTMLDivElement>) => {
                reference.current?.style.setProperty("display", "block")
                setTimeout(()=>reference.current?.classList.add('appear'), 100)

            }
        },
        cancelButton: {
            onClick: (reference: RefObject<HTMLDivElement>) => {
                reference.current?.classList.remove('appear')
                setTimeout(()=> reference.current?.style.setProperty("display", "none"),350)

            }
        },
        loginForm: {
            onSubmit: (event: SyntheticEvent) => {
                event.preventDefault()
                const API = new APIUser();
                const usernameField: HTMLInputElement | null = document.querySelector('#username__login')
                const passwordField: HTMLInputElement | null = document.querySelector('#password__login')
                if (usernameField && passwordField && (usernameField.value && passwordField.value)){
                    API.loginUser(
                        usernameField.value,
                        passwordField.value
                    )
                        .then(()=>{
                            window.location.reload()
                        })
                    eventHandlers.form.cancelButton.onClick(FormRefs.LoginFormRef)

                    
                } else {
                    alert("No data input fields were found:(")
                    return
                }

                usernameField.value = ""
                passwordField.value = ""

            }
        },
        photoForm: {
            onSubmit: (event: any) => {
                console.log(event, this)
                event.preventDefault()
                if (typeof event.target === "object" && event.target !== null) {
                    const label = event.target[0].value
                    const url = event.target[1].value
                    const imagesClient = new APIImages()

                    imagesClient.postImage({label:label, img_url: url}, console.log.bind(this, "postImage"))
                        .then(()=>{
                            window.location.reload()
                        })

                    event.target[0].value = ""
                    event.target[1].value = ""
                } else {
                    alert("Something went wrong")
                }
            }
        },
        passwordForm: {
            onSubmit: (event: any)=>{
                event.preventDefault()
                const password = event.target[0].value
                const username = event.target[1].value
                const pk = event.target[2].value

                const imagesClient = new APIImages()

                imagesClient.deleteImage(pk, username, password, console.log.bind(this, 'deleteImage')).done(
                    ()=> {
                        window.location.reload()
                    }
                )
            }
        }
    },
    images: {
        photoDeleteButton: {
            onClick: (reference: RefObject<HTMLDivElement>, img:ReactNode) => {
                if (typeof img === "object" && img !== null && "props" in img) {
                    // eslint-disable-next-line

                    const pkInput:any = document.getElementById('input__pk__hidden')
                    if (pkInput && "value" in pkInput){
                        pkInput.value = img.props["data-pk"]
                        eventHandlers.form.openButton.onClick(reference)
                    }
                }

            }
        },
        inputUrl: {
            onChange: (e:any)=>{
                const input = e.target
                if (typeof input === "object" && input!== null && "value" in input) {
                    // Здесь мог быть нормальный валидатор но мне лень честно говоря
                    // console.log("changed")
                }
            }
        },
        inputSearch: {
            onChange: (e:any, setFilter: Dispatch<SetStateAction<Function>>) => {
                const filter = (images: Array<ReactNode>)=>{
                    const searchQueryRegExp = RegExp(e.target.value.toLowerCase())
                    if (images === undefined){
                        return []
                    }
                    // @ts-ignore
                    return images.filter((value => value?.props?.alt.toLowerCase().match(searchQueryRegExp) !== null))
                }

                setFilter(()=>filter)
            }
        }

    }
}