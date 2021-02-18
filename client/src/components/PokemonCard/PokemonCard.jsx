import React, { useEffect, useState } from 'react';
import { POKEMON_TYPES_COLORS } from '../../constants/Pokemon';
import { searchAPI } from '../../js/PokemonAPI';

const initialStateCard = {
  image: '',
  infoPokemon: {},
}

const PokemonCard = ({ pokemon, number, onClick = () => { } }) => {

  const [state, setState] = useState(initialStateCard);
  const { name } = pokemon;
  const { image, infoPokemon } = state;

  useEffect(() => {
    searchAPI(`/pokemon`,{number}).then((resolve) => {
      if (resolve?.result) {
        setState((pv) => ({ ...pv, image: resolve.result.sprites.front_default, infoPokemon: resolve.result }))
      }
    });
  }, [number]);

  return (
    <div style={styles.container} onClick={() => onClick({ infoPokemon, number })}>
      <div style={{ ...styles.image, backgroundImage: `url("${image}")` }}/>
      <div style={styles.textContainer}>
        <span style={styles.number}>Nº{number}</span>
        <span style={styles.cardTitle}>{name.toUpperCase()}</span>
        <div style={styles.typesContainer}>
          {
            (infoPokemon?.types) && (infoPokemon.types.map(({ type },index) => (
              <div key={`infoPokemon${number}${index}`} style={{ ...styles.typeContainer, backgroundColor: POKEMON_TYPES_COLORS[type.name].background }}>
                <span style={{ ...styles.typeText, color: POKEMON_TYPES_COLORS[type.name].text }}>{type.name}</span>
              </div>
            )))
          }
        </div>
      </div>
    </div>
  )
}


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    backgroundColor: 'white',
    border: 'solid',
    borderWidth: 2,
    cursor: 'pointer',
  },
  textContainer:{
    display: 'flex', width: '100%', flexDirection: 'column' 
  },
  number:{ 
    textAlign: 'left', fontSize: 14, color: 'lightgray', fontWeight: 'bold' 
  },
  cardTitle:{
    textAlign: 'center', fontSize: 20, fontWeight: 'bold' 
  },
  typesContainer:{
    display: 'flex', padding: 10
  },
  typeContainer:{
    padding: '5px 20px', margin: 2, borderRadius: 10,
  },
  typeText:{
    fontSize: 14, textTransform: 'capitalize'
  },
  image: {
    display: 'flex',
    height: 150,
    borderBottom: 'solid',
    borderWidth: 2,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundColor: 'whitesmoke',
  }
}

export default PokemonCard;