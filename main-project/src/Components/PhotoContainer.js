import React from "react";
import NotFound from "./NotFound";
import Photo from "./Photo";

const PhotoContainer = (props) => {

    const matches = props.photos;
    let title = `Results for: ${props.query}`;
    let photoList;

    //If there are any photos returned, then photoList contains each photo. Otherwise, photoList is set to the "NotFound" component.
    if (matches.length > 1) {
        photoList = matches.map( 
            (photo, index) => <Photo key={index} data={photo} />
            );
    } else {
        title = '';
        photoList = <NotFound />
    }

    //The value of photoList is displayed.
    
    return (
        <div className="photo-container">
            <h2>{title}</h2>
            <ul>
                {photoList}
            </ul>
        </div>
    );
}

export default PhotoContainer;