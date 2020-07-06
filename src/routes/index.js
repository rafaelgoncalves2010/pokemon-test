import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pokemons from '../components/pokemons';
import SearchPokemon from '../components/searchPokemon';

function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={SearchPokemon} />
            <Route path="/pokemons" component={Pokemons} />
        </Switch>
    )
}

export default Routes;