import React, {ReactNode, ReactNodeArray} from "react";
import APIImages from '../api/imageAPI'
import {ImageResponseBody} from "../utils/interfaces";
import APIUser from "../api/authAPI";
import {parseImageListResponse} from "../utils/parsers";


export default class UserImages extends React.Component<
    {
        client: APIUser,
        saveImage: Function
    },
    {
        response: {},
        handleStates: Function,
        images: ReactNodeArray
    }>{
    private client: APIUser;
    private imagesClient: APIImages;
    constructor(props: any) {
        super(props);

        this.client = this.props.client
        this.state = {
            response: {},
            handleStates: this.handleStates,
            images: ([<>Error</>, ])
        }

        this.imagesClient = new APIImages()

    }

    componentDidMount() {
        console.log('componentDidMount. user: ', this.client.user)
        this.imagesClient.getImages(this.handleStates)
    }

    componentDidUpdate(prevProps: Readonly<{ client: APIUser }>, prevState: Readonly<any>, snapshot?: any) {
        if (this.client.user === "") return
        if (prevState.response !== this.state.response){
            this.parseImages()
        }
    }

    private handleStates = (response: Array<ImageResponseBody> | ImageResponseBody)=>{
        this.setState({response})
    }

    public parseImages = (): void=> {
        const response = this.state.response
        const images = parseImageListResponse(response)
        this.setState({images})
        this.props.saveImage(images)
    };

    // public addImage = (label:string, url:string): void =>{
    //     this.imagesClient.postImage({label:label, img_url: url}, console.log.bind(this, "postImage"))
    // }

    // public deleteImage = (label:string, url: string) => {
    //     this.imagesClient.deleteImage({label:label, img_url: url}, console.log.bind(this, "deleteImage"))
    // }


    render() {
        return false
    }
}