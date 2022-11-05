import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./NewPlayerPage.module.css";
import axios from "axios"

const url = "http://localhost:8000/api/players";

const NewPlayerPage = () => {

    const history = useHistory();

    const [nombre, setNombre] = useState("");
    const [posicion, setPosicion] = useState("");

    const [errors, setErrors] = useState({})

    const guardar = (e) => {
        e.preventDefault();
        let body = { nombre }
        if (posicion !== "") {
            body.posicion = posicion;
        }
        axios.post(url, body)
            .then(result => result.data)
            .then(response => {
                console.log(response);
                setErrors({});
                setNombre("");
                setPosicion("");
                history.push("/players/list");
            })
            .catch(err => {
                console.log(err.response.data);
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
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

                    <form onSubmit={guardar}>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            {
                                errors.nombre ?
                                    <p className="text-danger">{errors.nombre.message}</p> : null
                            }
                        </div>
                        <div className="form-group">
                            <label>Posición:</label>
                            <input className="form-control" name="posicion" type="text" value={posicion} onChange={(e) => setPosicion(e.target.value)} />
                            {
                                errors.posicion ?
                                    <p className="text-danger">{errors.posicion.message}</p> : null
                            }
                        </div>
                        <button type="submit" className="btn btn-primary my-3">Guardar</button>

                    </form>

                </div>

            </div>

        </div >
    );

}

export default NewPlayerPage;