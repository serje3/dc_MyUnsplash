import {settings} from "../settings";
import APIBase from "./base/ajax";
import {ImageResponseBody} from "../utils/interfaces";


export default class APIImages extends APIBase{
    public getImages = (handleState: (response: (Array<ImageResponseBody> | ImageResponseBody)) => void):JQuery.jqXHR =>{
        return this.sendRequest(settings.API.IMAGE.REQUEST.url)
            .done(data => {
                console.log("DONE: ", data)
                handleState(data)
            })
            .fail((jqXHR, _, reason)=>{
                console.log(reason)
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
            data
            ).done(data => handleState(data))

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
}