import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from "./ManagePlayerPage.module.css";
import axios from "axios"

const url = "http://localhost:8000/api/players";

const ManagePlayerPage = () => {

    const { id: gameNumber } = useParams();

    const [lista, setLista] = useState([])

    const history = useHistory();


    const get_all = () => {
        axios.get(url)
            .then(result => result.data)
            .then(response => {
                console.log("PLAYERS", response);
                setLista(response);
            })
    }

    useEffect(() => {
        get_all();
    }, [])

    const update = (id, value, estado) => {
        console.log("ACTUALIZANDO: ", id);
        estado[parseInt(gameNumber) - 1] = value;
        axios.put(url + "/" + id, {
            estado
        })
            .then(result => result.data)
            .then(response => {
                console.log(response);
                get_all();
            })
    }

    return (
        <div className="container">
            <div className={`${styles.spacedRow}`}>
                <Link to="/players/list" ><h1>Manage Players</h1></Link>
                <h1>|</h1>
                <Link to="/status/game/1"><h1>Manage Player Status</h1></Link>
            </div>
            <div className={`container ${styles.borderContainer}`}>
                <div className={`${styles.spacedRow}`}>
                    <h2>PLAYER STATUS GAME {parseInt(gameNumber)}</h2>
                </div>
                <div className={`${styles.spacedRow}`}>
                    <Link to="/status/game/1" ><h1>GAME 1</h1></Link>
                    <h1>|</h1>
                    <Link to="/status/game/2"><h1>GAME 2</h1></Link>
                    <h1>|</h1>
                    <Link to="/status/game/3"><h1>GAME 3</h1></Link>
                </div>
                <div className="container">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((item, index) => {
                                return (
                                    <tr key={item.nombre + index}>
                                        <td>{item.nombre}</td>
                                        <td>
                                            <button className={item.estado[parseInt(gameNumber) - 1] === "playing" ? "btn btn-success me-2" : "btn btn-outline-success me-2"} onClick={(e) => update(item._id, "playing", item.estado)} >Playing</button>
                                            <button className={item.estado[parseInt(gameNumber) - 1] === "not playing" ? "btn btn-danger me-2" : "btn btn-outline-danger me-2"} onClick={(e) => update(item._id, "not playing", item.estado)} >Not Playing</button>
                                            <button className={item.estado[parseInt(gameNumber) - 1] === "undecided" ? "btn btn-warning me-2" : "btn btn-outline-warning me-2"} onClick={(e) => update(item._id, "undecided", item.estado)} >Undecided</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>

        </div >
    );

}

export default ManagePlayerPage;