import {settings} from "../settings";
import APIBase from "./base/ajax";
import {ImageResponseBody} from "../utils/interfaces";


export default class APIImages extends APIBase{
    public getImages = (handleState: (response: (Array<ImageResponseBody> | ImageResponseBody)) => void):JQuery.jqXHR =>{
        return this.sendRequest(settings.API.IMAGE.REQUEST.url,"GET", undefined, {
            error: ()=>{}
        })
            .done(data => {
                handleState(data)
            })
            .fail((jqXHR, _, reason)=>{
                if (reason === 'Unauthorized'){
                    alert("Login to see or add image")
                } else {
                    alert(`[${reason || _ + " status: " + jqXHR.status}] Some shit happened.... on get images. `)
                }
            })

    }

    public postImage = (
        data: {
            label: string,
            img_url: string
        },
        handleState: (response: (Array<ImageResponseBody> | ImageResponseBody)) => void
    ): JQuery.jqXHR =>
        this.sendRequest(
            settings.API.IMAGE.REQUEST.url,
            "POST",
            data,
            {
                error: ()=>{}
            }
            ).done(data => handleState(data))
            .fail((jqXHR, _, reason)=>{
                if (reason === 'Unauthorized'){
                    alert("Login to add image")
                } else{
                    alert(`[${reason || _ + " status: " + jqXHR.status}]Some shit happened.... on create images`)
                }
            })

    public deleteImage = (pk: string, username:string, password:string,
        handleState: (response: (Array<ImageResponseBody> | ImageResponseBody)) => void
    ): JQuery.jqXHR =>
        this.sendRequest(
        settings.API.IMAGE.DELETE.url+pk,
        "DELETE",
        {
            username: username,
            password: password
        }
    ).done(data => handleState(data))
            .fail((jqXHR, _, reason)=>{
                if (reason === 'Unauthorized'){
                    alert("Login to delete images")
                } else {
                    alert(`[${reason || _ + " status: " + jqXHR.status}]Some shit happened.... on delete images`)
                }
            })
}