import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const { type, id } = useParams(); // Accedemos al tipo y al ID de la entidad
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    // Hacemos un fetch de la entidad específica basada en el tipo y el id
    const fetchEntity = async () => {
      const resp = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
      const data = await resp.json();
      setEntity(data.result.properties); // Asegúrate de ajustar dependiendo de la estructura del JSON
    };

    fetchEntity();
  }, [type, id]); // Dependemos del tipo y el ID

  return (
    <div className="text-center mt-5">
      {entity ? (
        <div className="card" style={{ "width": "24rem" }}>
          <img
            src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`}
            className="card-img-top"
            alt={entity.name}
          />
          <div className="card-body">
            <h5 className="card-title">{entity.name}</h5>
            {/* Mostrar información adicional dependiendo del tipo */}
            {type === "planets" && (
              <p className="card-text">
                Climate: {entity.climate} <br />
                Population: {entity.population} <br />
                Terrain: {entity.terrain}
              </p>
            )}
            {type === "people" && (
              <p className="card-text">
                Height: {entity.height} cm <br />
                Mass: {entity.mass} kg <br />
                Gender: {entity.gender}
              </p>
            )}
            {type === "vehicles" && (
              <p className="card-text">
                Model: {entity.model} <br />
                Manufacturer: {entity.manufacturer} <br />
                Cost: {entity.cost_in_credits} credits
              </p>
            )}

            {/* Botón para agregar o quitar de favoritos */}
            <button
              className="btn btn-warning"
              onClick={() => actions.toggleFavorite(entity.name)}
            >
              {store.favorites.includes(entity.name)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        </div>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
