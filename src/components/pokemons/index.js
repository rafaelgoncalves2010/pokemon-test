import React, {useState, useEffect} from 'react';
import api from '../../service/api';
import Pokemon from './pokemon';
import { Link } from 'react-router-dom';

import './style.scss';

function Pokemons() {
    const [pokemons,setPokemons] = useState([]);
    const [load, setload] = useState(false);
    const [nextUrl, setNextUrl] = useState(false);

    useEffect(() => {
        if(!load){
            api.get('pokemon').then(res => {
                const newUrl = res.data.next.substr(26,res.data.next.length);
                setNextUrl(newUrl);
                const response = res.data.results;
                if(response.length > 0){
                    setPokemons(response);
                }
            })
        setload(true);
        }
    }, [load, pokemons])

   function addPokemon(url){
      api.get(url).then(res => {
        const response = res.data.results;
        const newUrl = res.data.next.substr(26,res.data.next.length);
        setNextUrl(newUrl);

        if(response.length > 0){
            setPokemons([ ...pokemons, ...response]);
        }
      })
   } 

  return (
    <>
    <div className="container-pokemons">
      {pokemons.map( (el,index) =>    
         <Pokemon key={index} url={el.url}/> 
        )} 

      <div className="buttons-pokemons">
          <Link to="/">Voltar</Link>
          <button onClick={() => addPokemon(nextUrl)}>Mais pokemons</button>
      </div>
    </div>
    </>
  );
}

export default Pokemons;