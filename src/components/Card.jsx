import "./Cards.css"
import {useEffect, useState} from "react";
import axios from "axios";

function Card({url}) {

    const [pokemon, setPokemon] = useState();
    const [loadError, setLoadError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        async function catchPokemon() {
            try {
                setLoading(true);
                const pokemon = await axios.get(`${url}`, {signal: abortController.signal});
                const result = pokemon.data;
                setPokemon(result);
            } catch (e) {
                console.error(e);
                setLoadError("Oops, loading failed!");
            } finally {
                setLoading(false);
            }
        }

        catchPokemon();

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <>
            {pokemon && <div className="card_wrapper">
                {loading && <h1>Loading...</h1>}
                {loadError && <h1>{loadError}</h1>}
                <h2 className="name">{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt="" className="sprite"/>
                <div className="moves_wrapper">
                    <h4>Moves: </h4>
                    <p>{pokemon.moves.length}</p>
                </div>
                <div className="weight_wrapper">
                    <h4>Weight: </h4>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="abilities_wrapper">
                    <h4>Abilities:</h4>
                    {pokemon.abilities.map((monsterAbility) => {
                        return (
                            <ul key={monsterAbility.ability.name} className="ability">
                                <li>{monsterAbility.ability.name}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>}
        </>
    )
}

export default Card;