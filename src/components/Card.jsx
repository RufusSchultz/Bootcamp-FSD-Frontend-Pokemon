import "./Cards.css"
import {useEffect, useState} from "react";
import axios from "axios";


function Card({url}) {

    const [pokemon, setPokemon] = useState();
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        async function catchPokemon() {
            try {
                const pokemon = await axios.get(`${url}`);
                const result = pokemon.data;
                setPokemon(result);

            } catch (e) {
                console.error(e);
                setLoadError("Oeps!");

            } finally {

            }
        }
        catchPokemon();
    }, []);


    return (
        <>
            {pokemon && <div className="card_wrapper">
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
                            <li key={monsterAbility.ability.name} className="ability">{monsterAbility.ability.name}</li>
                        )
                    })}
                </div>
            </div>}
        </>

    )
}

export default Card;