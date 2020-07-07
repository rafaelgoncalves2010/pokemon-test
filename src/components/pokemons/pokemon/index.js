import React, {useState, useEffect} from 'react';
import api from '../../../service/api';
import Forms from './forms';
import loading from '../../../images/loading.gif';

import './style.scss';

function Pokemon(props) {
    const [pokemon,setPokemon] = useState({});
    const [load, setload] = useState(false);

    useEffect(() => {
        if(!load){
          const url = props.url.substr(25,props.url.length);
            api.get(url).then(res => {
                const response = res.data

                if(response !== {}){
                  setPokemon(response);
                  setload(true);
                }
            });
        }
    },[load, pokemon, props.url])

  return (
    <>
       {load ? (
         <div className="pokemon-item">
            <img alt={pokemon.name} src={pokemon.sprites.front_default}/>
            <h3>{pokemon.name} </h3>

            <div className="pokemon-box">
              <div className="pokemon-sizes">
                <h4> Height {pokemon.height} </h4> 
                <h4> Weight {pokemon.weight} </h4> 
              </div>
                <div className="pokemon-abilities">
                  <h4>Abilities </h4>
                  <div>
                    {pokemon.abilities.map(element => 
                      <h5> {element.ability.name} </h5>
                    )} 
                  </div>
                </div> 
                <div className="pokemon-forms">
                <h4>Forms </h4>
        
                {pokemon.forms.map(element => 
                  <Forms url={element.url} />
                )} 
              </div>  
            </div>
         </div>
      ):(
        <div className="pokemon-loading">
           <img src={loading} />
        </div>
       )}
    </>
  );
}

export default Pokemon;