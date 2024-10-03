import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">Star Wars App</Link>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Favoritos ({store.favorites.length})
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {store.favorites.length > 0 ? (
                            store.favorites.map((item, index) => (
                                <li key={index}>
                                    <Link className="dropdown-item" to={`/${item.type}/${item.uid}`}>{item.name}</Link>
                                </li>
                            ))
                        ) : (
                            <li>No hay favoritos</li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
