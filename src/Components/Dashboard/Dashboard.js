import React, { useEffect, useState } from "react";

import "./Dashboard.css";

function Dashboard() {

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
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user-data")) || null
    );
    const profilePIcDefault =
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";
    const [pending, setPending] = useState(0)
    const [done, setDone] = useState(0)

    useEffect(() => {
        let pendingTaskCount = 0;
        let doneTaskCount = 0;
        boards.forEach(element => {
            if (element.id === 4) {
                doneTaskCount += element.cards.length
            } else {
                pendingTaskCount += element.cards.length
            }
        });
        setDone(doneTaskCount)
        setPending(pendingTaskCount)
    }, [boards])

    useEffect(() => {
        localStorage.setItem("kanban-data", JSON.stringify(boards));
    }, [boards]);

    return (
        <div className="dashboard">
            <div className="dashboard_container">
            <div >
                <div >
                    <img
                        src={
                            localStorage.getItem("img")
                                ? localStorage.getItem("img")
                                : profilePIcDefault
                        }
                        alt="profile_pic"
                        className="img-thumbnail"
                        height={200}
                        width={200}
                    />
                </div>
            </div>
            <div>
                <div className="user_info_container">
                    <h2>
                        Name :{" "}
                        {user
                            ? user.name
                            : "NA"}
                    </h2>
                    <h2>
                        Email :{" "}
                        {user
                            ? user.email
                            : "NA"}
                    </h2>
                    <h2>
                        Contact :{" "}
                        {user
                            ? user.number
                            : "NA"}
                    </h2>
                    <h2>
                        Total Compleat Task : {done}
                    </h2>
                    <h2>
                        Total Pending Task : {pending}
                    </h2>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Dashboard;

      // <div>
        //     <div className="container content">
        //         <div className="border mt-4 p-4">
        //             <div className="row profilePic">
        //                 <div className="col-md-4">
        //                     <div className="d-flex flex-column align-items-center ">
        //                         <img
        //                             src={
        //                                 localStorage.getItem("img")
        //                                     ? localStorage.getItem("img")
        //                                     : profilePIcDefault
        //                             }
        //                             alt="profile_pic"
        //                             className="img-thumbnail"
        //                             height={200}
        //                             width={200}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div className="col-sm-5 head">
        //                     <h1>Welcome to the Dasboard</h1>
        //                 </div>
        //                 <div className="col-md-6 d-flex align-items-center">
        //                     <div className="ms-4">
        //                         <h4>
        //                             Name :{" "}
        //                             {localStorage.getItem("name")
        //                                 ? localStorage.getItem("name")
        //                                 : "NA"}
        //                         </h4>
        //                         <h4>
        //                             Email :{" "}
        //                             {localStorage.getItem("email")
        //                                 ? localStorage.getItem("email")
        //                                 : "NA"}
        //                         </h4>
        //                         <h4>
        //                             Total Compleat Task :{done}
        //                         </h4>
        //                         <h4>
        //                             Total Pending Task :{pending}
        //                         </h4>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

