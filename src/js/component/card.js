import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Importar el contexto

export default function Card({ title, body, id, type }) {
    const { actions, store } = useContext(Context);
    const isFavorite = store.favorites.find(item => item.uid === id);

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
                <Link to={`/${type}/${id}`} className="btn btn-primary">Leer más...</Link>
                <button 
                    className="btn btn-warning"
                    onClick={() => actions.toggleFavorite({ uid: id, name: title, type })}
                >
                    {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
                </button>
            </div>
        </div>
    );
}
