import React, { useState } from "react";
import {  Clock, MoreHorizontal } from "react-feather";

import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, labels } = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => !props.dumyCard && setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            {!props.dumyCard ? <MoreHorizontal /> : null}
            {showDropdown&& !props.dumyCard && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete
                </p>
                {props.boardId !== 4 && <p onClick={() => props.next(props.boardId, id)}>
                  Next
                </p>}
                {props.boardId !== 1 && <p onClick={() => props.prev(props.boardId, id)}>
                  Back
                </p>}
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{props.dumyCard ? "Add New Cards": title}</div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
