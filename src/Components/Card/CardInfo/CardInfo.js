import React, { useEffect, useState } from "react";
import {
  Calendar,
  List,
  Tag,
  Type,
  X,
} from "react-feather";

import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";

import "./CardInfo.css";

function CardInfo(props) {
  // const colors = [
  //   "#a8193d",
  //   "#4fcc25",
  //   "#1ebffa",
  //   "#8da377",
  //   "#9975bd",
  //   "#cf61a1",
  //   "#240959",
  // ];

  const colors = [
    {
      labelColor:"#a8193d",
      labelName: "high"
    },
    {
      labelColor: "#4fcc25",
      labelName: "medium"
    },
    {
      labelColor: "#1ebffa",
      labelName: "low"
    }
  ];

  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({
    ...props.card,
  });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };
 
  const updateDate = (date) => {
    if (!date) return;

    setValues({
      ...values,
      date,
    });
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <p>Title</p>
          </div>
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <p>Labels</p>
          </div>
          <div className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <div className="cardinfo_box_labels">
            {colors.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.labelColor , color: "#fff" }}
                className={selectedColor === item.labelColor  ? "li_active" : ""}
                onClick={() => {setSelectedColor(item.labelColor) 
                  addLabel({ color: item.labelColor, text: item.labelName })}}
              >
                {item.labelName}
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
