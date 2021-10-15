import React, {ReactNode} from "react";

const parseImageListResponse = (response: any) => {
    let images: Array<ReactNode> = []
    if (Array.isArray(response)){
        console.log(response)
        // means is ok
        response.forEach((image,index) => {
            images.push((<img key={index.toString()} src={image.img_file} alt={image.label} data-pk={image.pk}/>))
        })
    } else{
        console.log("Something went wrong: " + response)
        images = [<>Error</>, ]
    }
    return images
}

export {
    parseImageListResponse
}