import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import Modal from 'react-awesome-modal';
import { useForm } from "react-hook-form";

import './style.scss';

function SearchPokemon() {
  const [pokemon,setPokemon] = useState({});
  const [ statusModal, setStatusModal ] = useState(false);
  const [ statusModalError, setStatusModalError ] = useState(false);
  const [load, setload] = useState(false);
  const { handleSubmit, register } = useForm();

  const showPokemon = (res, element) => {
    const name = res.searchedPokemon;
    element.target.firstChild.value = "";
    setload(false);

    if(name.length>0){

      api.get(`pokemon/${name}`).then(res => {
        const response = res.data;

          if(!load){     
            setPokemon(response);
            setload(true);
            setStatusModal(true);
          }

      }).catch(error => {
        setStatusModalError(true);
    });
    }else{
      setStatusModalError(true);
    }
    res.searchedPokemon = "";
 } 

 const changeStatusModal = () =>{
  setStatusModal(!statusModal);
}

const changeStatusModalError = () =>{
  setStatusModalError(!statusModalError);
}

  return (
    <>
      <Modal visible={statusModalError} effect="fadeInUp" width="200px" height="10%"   onClickAway={changeStatusModalError}> 
        <div className="modalPokemonError">
          <p>Pokemon não encontrado</p>
           <a onClick={changeStatusModalError}>Fechar</a>     
        </div>
       </Modal>
      
      <Modal visible={statusModal} effect="fadeInUp" width="250px" height="40%" onClickAway={changeStatusModal}> 
         
      {load ? (
        <div className="container-pokemon">
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
              </div>  
            </div>
         </div>
          <a className="botao" onClick={changeStatusModal}>Fechar</a>
                
      </div>
      ):(<></>)}
    </Modal>
            
      <div className="searchPokemon-container">
        <div className="main-box">
          <h1>Descubra tudo sobre o seu pokemon</h1>
          <h2>Nós vamos ajudar você</h2>

          <form className="search" onSubmit={handleSubmit(showPokemon)}>
            <input  id="mySearch" ref={register} name="searchedPokemon" placeholder="Digite o nome do seu pokemon" />
            <button id="myBtn" type="submit">Pesquisar</button>    
          </form>

        <div className="seeMore">
        <Link to="pokemons">Ver todos</Link>
        </div>
        </div>
      </div>
    </>
  );
}

export default SearchPokemon;