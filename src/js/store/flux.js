const baseUrl = "https://www.swapi.tech/api";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            vehicles: [],
            planets: [],
            favorites: [], // Aquí guardamos los favoritos
            loading: false
        },
        actions: {
            // Fetch de personajes
            getCharacters: async () => {
                setStore({ loading: true });
                const resp = await fetch(`${baseUrl}/people`);
                if (!resp.ok) {
                    console.error(resp.statusText);
                    setStore({ loading: false });
                    return;
                }
                const data = await resp.json();
                setStore({ characters: data.results, loading: false });
            },
            // Fetch de vehículos
            getVehicles: async () => {
                setStore({ loading: true });
                const resp = await fetch(`${baseUrl}/vehicles`);
                if (!resp.ok) {
                    console.error(resp.statusText);
                    setStore({ loading: false });
                    return;
                }
                const data = await resp.json();
                setStore({ vehicles: data.results, loading: false });
            },
            // Fetch de planetas
            getPlanets: async () => {
                setStore({ loading: true });
                const resp = await fetch(`${baseUrl}/planets`);
                if (!resp.ok) {
                    console.error(resp.statusText);
                    setStore({ loading: false });
                    return;
                }
                const data = await resp.json();
                setStore({ planets: data.results, loading: false });
            },
            // Agregar o quitar favoritos
            toggleFavorite: (item) => {
                const store = getStore();
                const favorites = store.favorites;
                const isFavorite = favorites.find(fav => fav.uid === item.uid);

                if (isFavorite) {
                    // Si ya está en favoritos, lo eliminamos
                    setStore({
                        favorites: favorites.filter(fav => fav.uid !== item.uid)
                    });
                } else {
                    // Si no está en favoritos, lo agregamos
                    setStore({
                        favorites: [...favorites, item]
                    });
                }
            }
        }
    };
};

export default getState;
