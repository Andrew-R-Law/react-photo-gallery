import React from "react";
import { withRouter } from "react-router";
import NotFound from "./NotFound";
import Photo from "./Photo";

const PhotoContainer = (props) => {

    let searched = props.match.params.query;
    let title = `Results for: ${searched}`;
    let matches = props.photos;
    let photoList;

    // If the searched term does not match the previous query, then the query is updated.
    // Otherwise, if there are any photos returned, photoList contains each photo. Otherwise, photoList is set to the "NotFound" component.

    if (searched !== props.query) {
        props.updateQuery(searched);
    } else {
        if (matches.length > 0) {
            photoList = matches.map( 
                (photo, index) => <Photo key={index} data={photo} />
                );
        } else {
            title = '';
            photoList = <NotFound />
        }
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

export default withRouter(PhotoContainer);