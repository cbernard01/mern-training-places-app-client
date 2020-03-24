import React from "react";
import {useParams} from "react-router-dom";

import PlaceList from "../components/PlaceList";

export const PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world.",
    imageURL: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/33/e6.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {lat: 40.7484405, lng: -73.9856644},
    creator: "u1"
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world.",
    imageURL: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/33/e6.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {lat: 40.7484405, lng: -73.9856644},
    creator: "u2"
  }
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = PLACES.filter(place => place.creator === userId);
  return (
    <PlaceList items={loadedPlaces}/>
  );
};

export default UserPlaces;
