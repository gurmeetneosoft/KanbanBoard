import Card from "../Card/Card";

import "./Board.css";

function Board(props) {

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.length > 0 ? props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
            next={props.next}
            prev={props.prev}
          />
        )) : (
          <Card
            dumyCard
            key={props.board.id}
            card={{id: 1}}
            boardId={props.board.id}
            dragEntered={props.dragEntered}
          />
        )}
      </div>
    </div>
  );
}

export default Board;
