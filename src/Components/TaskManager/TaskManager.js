import React, { useEffect, useState } from "react";

import Board from "../Board/Board";

import "./TaskManager.css";
import Editable from "../Editabled/Editable";

function TaskManager() {

    const intialState = [
        {
            id: 1,
            title: "Backlog",
            cards: []
        },
        {
            id: 2,
            title: "To Do",
            cards: []
        },
        {
            id: 3,
            title: "In Progress",
            cards: []
        },
        {
            id: 4,
            title: "Done",
            cards: []
        }
    ]

    const [boards, setBoards] = useState(
        JSON.parse(localStorage.getItem("kanban-data")) || intialState
    );

    const [targetCard, setTargetCard] = useState({
        bid: "",
        cid: "",
    });

    const addboardHandler = (title) => {
        const tempBoards = [...boards];
        tempBoards[0].cards.push({
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: "",
            stage: 1
        });
        setBoards(tempBoards);
    };


    const addCardHandler = (id, title) => {
        const index = boards.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempBoards = [...boards];
        tempBoards[index].cards.push({
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: "",
            tasks: [],
        });
        setBoards(tempBoards);
    };

    const removeCard = (bid, cid) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        cards.splice(cardIndex, 1);
        setBoards(tempBoards);
    };

    const dragEnded = (bid, cid = 0) => {
        let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
        s_boardIndex = boards.findIndex((item) => item.id === bid);
        if (s_boardIndex < 0) return;

        s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
            (item) => item.id === cid
        );
        if (s_cardIndex < 0) return;

        t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
        if (t_boardIndex < 0) return;

        t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
            (item) => item.id === targetCard.cid
        );
        
        const tempBoards = [...boards];
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        sourceCard.stage = targetCard.bid
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
        setBoards(tempBoards);

        setTargetCard({
            bid: "",
            cid: "",
        });
    };

    const next = (bid, cid) =>{
        let s_boardIndex, s_cardIndex;
        s_boardIndex = boards.findIndex((item) => item.id === bid);
        if (s_boardIndex < 0) return;

        s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
            (item) => item.id === cid
        );
        if (s_cardIndex < 0) return;

        const tempBoards = [...boards];
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        sourceCard.stage = sourceCard.stage + 1
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[s_boardIndex + 1].cards.push(sourceCard);
        setBoards(tempBoards);
    }

    const prev = (bid, cid) =>{
        let s_boardIndex, s_cardIndex;
        s_boardIndex = boards.findIndex((item) => item.id === bid);
        if (s_boardIndex < 0) return;

        s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
            (item) => item.id === cid
        );
        if (s_cardIndex < 0) return;

        const tempBoards = [...boards];
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        sourceCard.stage = sourceCard.stage - 1
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[s_boardIndex - 1].cards.push(sourceCard);
        setBoards(tempBoards);
    }

    const dragEntered = (bid, cid) => {
        if (targetCard.cid === cid) return;
        setTargetCard({
            bid,
            cid,
        });
    };

    const updateCard = (bid, cid, card) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].cards[cardIndex] = card;

        setBoards(tempBoards);
    };

   

    useEffect(() => {
        localStorage.setItem("kanban-data", JSON.stringify(boards));
    }, [boards]);

    return (
        <div className="task_manager">
            <div className="task_manager_boards_container">
                <div className="task_manager_boards">
                    {boards.map((item) => (
                        <Board
                            key={item.id}
                            board={item}
                            addCard={addCardHandler}
                            removeCard={removeCard}
                            dragEnded={dragEnded}
                            dragEntered={dragEntered}
                            updateCard={updateCard}
                            next={next}
                            prev={prev}
                        />
                    ))}
                    <div className="task_manager_boards_last">
                        <Editable
                            displayClass="task_manager_boards_add-board"
                            editClass="task_manager_boards_add-board_edit"
                            placeholder="Enter Card Name"
                            text="Add Card"
                            buttonText="Add Card"
                            onSubmit={addboardHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskManager;

