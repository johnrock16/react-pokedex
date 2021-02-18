import React, { useEffect, useState } from 'react';
import SimpleModal from '../components/SimpleModal/SimpleModal';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { POKEMON_GENERATION } from '../constants/Pokemon';
import { searchAPI } from '../js/PokemonAPI';
import ModalPokemon from '../components/ModalPokemon/ModalPokemon';

const initialState = {
  listPokemons: [],
  generationIndex: 0,
  isVisible: false,
  selectedPokemon: {}
}

const Home = () => {

  const [state, setState] = useState(initialState);
  const { listPokemons, generationIndex, isVisible } = state;

  const onHandleVisible = (v) => {
    setState((pv) => ({ ...pv, isVisible: v }))
  }

  const onClickPokemon = ({ infoPokemon, number }) => {
    setState((pv) => ({ ...pv, isVisible: true, selectedPokemon: { pokemon: infoPokemon, number } }))
  }

  useEffect(() => {
    searchAPI('/getPokemon',{
      limit:(POKEMON_GENERATION[generationIndex].ends-POKEMON_GENERATION[generationIndex].starts)+1,
      offset:POKEMON_GENERATION[generationIndex].starts-1
  }).then((resolve)=>{
      if(resolve?.result){
        setState((pv)=>({...pv,listPokemons:resolve.result.results}))
      }
  });
  }, [generationIndex]);

  const gridColumns = parseInt(window.innerWidth / 200);

  return (
    <div style={styles.mainContainer}>
      <div style={styles.generationContainer}>
        {
          (POKEMON_GENERATION.map((generation, index) =>
            <button key={`btnGeneration${index}`} style={styles.secondGeneration} onClick={() => { setState((pv) => ({ ...pv, generationIndex: index })) }}>{generation.name}</button>
          ))
        }

      </div>
      <div style={{ ...styles.container, gridTemplateColumns: `repeat(${gridColumns},200px)`}}>
        {
          (listPokemons.length > 0) && (
            listPokemons.map((pokemon, index) => <PokemonCard key={`pokemonCard${index}`} onClick={onClickPokemon} pokemon={pokemon} number={index + POKEMON_GENERATION[generationIndex].starts} />)
          )
        }
        {
          (state.selectedPokemon?.pokemon) &&
          (
            <SimpleModal isVisible={isVisible} onHandleClose={() => { onHandleVisible(false) }}>
              <ModalPokemon infoPokemon={state.selectedPokemon?.pokemon} number={state.selectedPokemon?.number} />
            </SimpleModal>
          )
        }
      </div>
    </div>
  );
}
const styles = {
  mainContainer: {
    display: 'flex', flexDirection: 'column', backgroundColor: 'orange', flex: 1
  },
  generationContainer:{ 
    display: 'flex', width: '100%', justifyContent: 'center', backgroundColor: 'orange' 
  },
  container: { display: 'grid', flex: 1, backgroundColor: 'orange', padding: 20, justifyContent: 'center' },
  secondGeneration: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '150px',
    minHeight: '75px',
    backgroundColor: 'black',
    justifyContent: 'center',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
}

export default Home;