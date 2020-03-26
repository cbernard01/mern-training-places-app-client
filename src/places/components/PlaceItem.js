import React, {useContext, useState} from "react";

import Card from "../../common/components/UIElements/Card";
import Button from "../../common/components/FormElements/Button";
import Modal from "../../common/components/UIElements/Modal";
import Map from "../../common/components/UIElements/Map";
import {AuthContext} from "../../common/context/authentication-context";
import "./PlaceItem.css";

const PlaceItem = props => {
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openDeleteWarningHandler = () => setShowConfirmModal(true);
  const closeDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = () => setShowConfirmModal(false);

  const renderButtons = () => {
    if (auth.isLoggedIn) {
      return (
        <React.Fragment>
          <Button to={`/places/${props.id}`}>EDIT</Button>
          <Button danger onClick={openDeleteWarningHandler}>DELETE</Button>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={"place-item__modal-content"}
        footerClass={"place-item__modal-actions"}
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className={"map-container"}>
          <Map center={props.location} zoom={16}/>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        header={"Are you sure?"}
        footerClass={"place-item__modal-actions"}
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this place? (Cannot be undone.)</p>
      </Modal>
      <li className={"place-item"}>
        <Card className={"place-item__content"}>
          <div className={"place-item__image"}>
            <img src={props.image} alt={props.title}/>
          </div>
          <div className={"place-item__info"}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={"place-item__actions"}>
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {renderButtons()}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
