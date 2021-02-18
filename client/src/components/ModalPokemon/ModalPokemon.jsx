import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { searchAPI } from '../../js/PokemonAPI';
import { POKEMON_TYPES_COLORS } from '../../constants/Pokemon';


const initialStateCard={
    image:'',
    pokedexData:{
        flavor_text_entries:[]
    },
}

const ModalPokemon=({infoPokemon,number})=>{

    const [state,setState] = useState(initialStateCard);
    const {pokedexData} = state;

    useEffect(()=>{
        searchAPI(`/pokemon-species`,{number}).then((resolve)=>{
            if(resolve?.result){
                setState((pv)=>({...pv,pokedexData:resolve.result}))
            }
        });
    },[number]);
    
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return(
        <div style={modalStyle} className={classes.paper}>
            <div style={{backgroundImage:`url("${infoPokemon.sprites.front_default}")`}} className={classes.image}/>
            <div className={classes.infoContainer}>
                {
                    (infoPokemon.name)&& (
                        <h2 style={{textAlign:'center'}} id="simple-modal-title">{infoPokemon.name.toUpperCase()}</h2>
                    )
                }
                <div style={{display:'flex',padding:10}}>
                    {
                        (infoPokemon?.types) && (infoPokemon.types.map(({type},index)=>(
                            <div key={`modalPokemonType${number}${index}`} style={{backgroundColor:POKEMON_TYPES_COLORS[type.name].background}} className={classes.typeContainer}>
                                <p id="simple-modal-description" style={{fontSize:9,textTransform:'capitalize',color:POKEMON_TYPES_COLORS[type.name].text}}>{type.name}</p>
                            </div>
                        )))
                    }
                </div>
            </div>
            {
                (pokedexData?.flavor_text_entries.length>0) && ( pokedexData.flavor_text_entries.map((data,index)=>(
                    (data?.language.name==='en' && index<=0)?<p id="simple-modal-description" style={{fontSize:14,textTransform:'uppercase'}}>{data.flavor_text}</p>:null
                )))
            }
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
      display:'flex',
      flexDirection:'column',
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    image:{
        display:'flex',
        height:150,
        borderBottom:'solid',
        borderWidth:2,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition:'center',
        backgroundColor:'whitesmoke',
    },
    infoContainer:{
        display:'flex',justifyContent:'center',alignItems:'center'
    },
    typeContainer:{
        padding:'4px 10px',margin:2,borderRadius:10
    }
}));

const getModalStyle=()=>{
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const rand=()=>{
    return Math.round(Math.random() * 20) - 10;
}

export default ModalPokemon;