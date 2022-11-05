import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./WelcomePage.module.css";
import axios from "axios"

const url = "http://localhost:8000/api/players";

const WelcomePage = () => {
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

    const borrar = (id) => {
        console.log("BORRANDO: ", id);

        axios.delete(url + "/" + id)
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
                    <Link to="/players/list" ><h2>List</h2></Link>
                    <h2>|</h2>
                    <Link to="/players/addplayer"><h2>Add Player</h2></Link>
                </div>
                <div className="container">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Posición</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((item, index) => {
                                return (
                                    <tr key={item.nombre + index}>
                                        <td>{item.nombre}</td>
                                        <td>{item.posicion}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#deleteModal${item.nombre + index}`}>
                                                Borrar
                                            </button>

                                            <div className="modal fade" id={`deleteModal${item.nombre + index}`} tabIndex="-1" aria-labelledby={`deleteModal ${item.nombre + index}Label`} aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id={`deleteModal${item.nombre + index}Label`}>Confirmar Borrar</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Está a punto de borrar a {item.nombre}
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                            <button className="btn btn-danger" onClick={(e) => borrar(item._id)} data-bs-dismiss="modal">Borrar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default WelcomePage;