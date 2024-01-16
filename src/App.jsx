import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "./components/Card.jsx";

function App() {
    const [monsters, setMonsters] = useState();
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0");

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchPokemon() {
            try {
                setLoading(true);
                const pokemon = await axios.get(endpoint, {signal: abortController.signal});
                const result = pokemon.data;
                setMonsters(result);
            } catch (e) {
                console.error(e);
                setLoadError("Oops, loading failed!");
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();

        return () => {
            abortController.abort();
        }

    }, [endpoint]);

    return (
        <div className="main">
            {loading && <h1>Loading...</h1>}
            {loadError && <h1>{loadError}</h1>}
            {monsters && !loading && <div className="main">
                <h1>Gotta catch em all!</h1>
                <div className="nav_buttons">
                    <button type="button"
                            disabled={monsters.previous === null}
                            onClick={() => setEndpoint(`${monsters.previous}`)}
                    >Previous
                    </button>
                    <button type="button"
                            disabled={monsters.next === null}
                            onClick={() => setEndpoint(`${monsters.next}`)}
                    >Next</button>
                </div>
                <div>
                    <ul className="pokemon_list">
                        {monsters.results.map((monster) => {
                            return (
                                <li key={monster.name}><Card url={monster.url}/></li>
                            )
                        })}
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default App
