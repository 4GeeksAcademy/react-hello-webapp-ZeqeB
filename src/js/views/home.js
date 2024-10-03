import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCharacters(); // Fetch de personajes
        actions.getVehicles(); // Fetch de vehículos
        actions.getPlanets(); // Fetch de planetas
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Star Wars</h1>
            <div className="row">
                {store.loading ? (
                    <div className="col-12 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>Personajes</h2>
                        {store.characters.map(character => (
                            <div key={character.uid} className="col-md-4 mb-4">
                                <Card title={character.name} body="Personaje de Star Wars" id={character.uid} type="characters" />
                            </div>
                        ))}
                        <h2>Vehículos</h2>
                        {store.vehicles.map(vehicle => (
                            <div key={vehicle.uid} className="col-md-4 mb-4">
                                <Card title={vehicle.name} body="Vehículo de Star Wars" id={vehicle.uid} type="vehicles" />
                            </div>
                        ))}
                        <h2>Planetas</h2>
                        {store.planets.map(planet => (
                            <div key={planet.uid} className="col-md-4 mb-4">
                                <Card title={planet.name} body="Planeta de Star Wars" id={planet.uid} type="planets" />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
