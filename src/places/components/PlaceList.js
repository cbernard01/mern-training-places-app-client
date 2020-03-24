import React from "react";

import Card from "../../common/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className={"place-list center"}>
        <Card className={"place-item__content"}>
          <div className={"place-item__info"}>
            <h2>No places found. Maybe create one?</h2>
          </div>
          <div className={"place-item__actions"}>
            <button>Share Place</button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ul className={"place-list"}>
      {props.items.map(place => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageURL}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            location={place.location}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
