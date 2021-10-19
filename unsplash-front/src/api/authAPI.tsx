import APIBase from "./base/ajax";
import {settings} from "../settings";
import Cookies from "js-cookie";

export default class APIUser extends APIBase{
    constructor() {
        super();
        this.authorizationCheck();
    }

    get user() {
        return APIUser._user;
    }
    private static set user(value: string) {
        APIUser._user = value;
    }

    private static _user: string = "";

    public authorizationCheck(): void {
        this.sendRequest(
            settings.API.AUTH.GET_USER.url, "GET", undefined, {
                error:()=>{}
            }
        )
            .done((response)=>{
                APIUser.user = response.username
            })
            .fail((jqXHR, ErrorText, reason)=>{
                if (reason === 'Unauthorized'){
                    this.refreshToken().done(()=>{
                        window.location.reload()
                    })
                }
            })
    }

    public loginUser(username: string, password: string): JQuery.jqXHR{
        // console.log('login: ', username)
        return this.sendRequest(settings.API.AUTH.JWT_CREATE.url, "POST", {
            username:username,
            password:password
        }).fail((jqXHR, timeout, reason)=>{
            if (reason === 'Unauthorized'){
                APIUser.user = ""
                this.registerUser(username, password)
            }
        })
            .done((response)=>{
                APIUser.saveJWT(response.access, response.refresh)
                APIUser.user = username
            })
    }

    private registerUser(username:string, password: string): boolean{
        let user = false;
        this.sendRequest(settings.API.AUTH.CREATE_USER.url, "POST", {
            username:username,
            password:password
        }, {
            headers:{
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        })
            .done((response)=>{
                this.loginUser(username, password)
            })

        return user
    }

    private refreshToken(){
        return this.sendRequest(settings.API.AUTH.JWT_REFRESH.url, "POST", {
            "refresh": localStorage.getItem("refresh")
        },
            {
                error: ()=>{}
            }).done((response)=>{
            APIUser.saveJWT(response.access, response.refresh)
            this.authorizationCheck()
        })
            .fail((_,__,reason)=>{
                if (reason === 'Unauthorized'){
                    alert("Login to see or add image")
                }
            })
    }

    private static saveJWT(access: string, refresh: string){
        Cookies.set("access", access)
        localStorage.setItem("refresh", refresh)
    }

}