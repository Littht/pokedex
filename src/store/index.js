import { createStore } from 'vuex'
import axios from 'axios'
import img from '@/assets/rotate-pokeball.png'

const processPokemon = (pokemon) => {
  const pkmnStats = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    stat: stat.base_stat,
  }))

  return {
    nombre: pokemon.name,
    sprite: pokemon.sprites.other.home.front_default ?? img,
    spriteShiny: pokemon.sprites.other.home.front_shiny ?? img,
    baseExp: pokemon.base_experience,
    tiposArr: pokemon.types.map(({ type }) => type.name),
    pkmnStats,
    sumStats: pkmnStats.reduce((acc, curr) => acc + curr.stat, 0),
    height: `HEIGHT ${pokemon.height / 10} ${pokemon.height === 10 ? "Mt" : "Mts"}`,
    weight: `WEIGHT ${pokemon.weight / 10} ${pokemon.weight === 10 ? "Kg" : "Kgs"}`,
    abilities: pokemon.abilities,
    moves: pokemon.moves.map((move) => ({
      name: move.move.name, 
      url:move.move.url
    }))
  }
}

const mapPokemonEvolutions = (evolutionChain) => {
  console.log(evolutionChain)
  const evolutions = [{ name: evolutionChain.chain.species.name }]

  evolutionChain.chain.evolves_to.forEach((item) => {
    if(item.evolution_details[0].min_level != null && item.evolution_details[0].trigger.name=='level-up'){
      evolutions.push({
        name: item.species.name,
        lvl: item.evolution_details[0].min_level
      })
    }else if(item.evolution_details[0].trigger.name == 'use-item'){
      evolutions.push({
        name: item.species.name,
        lvl: item.evolution_details[0].trigger.name.replace("-"," ").toUpperCase(),
        item: item.evolution_details[0].item.name.replace("-"," ").toUpperCase()
      })
    }else if(item.evolution_details[0].trigger.name== 'trade' && item.evolution_details[0].held_item==null){
      evolutions.push({
        name: item.species.name,
        lvl: item.evolution_details[0].trigger.name.toUpperCase()
      })
    }else if(item.evolution_details[0].trigger.name== 'level-up' && item.evolution_details[0].known_move != null){
      evolutions.push({
        name: item.species.name,
        item: `KNOW MOVE ${item.evolution_details[0].known_move.name.replace("-"," ").toUpperCase()}`
      })
    }else if(item.evolution_details[0].trigger.name== 'level-up' && item.evolution_details[0].min_happiness != null){
      evolutions.push({
        name: item.species.name,
        item: `MIN HAPPINESS ${item.evolution_details[0].min_happiness}`
      })
    }else if(item.evolution_details[0].trigger.name== 'level-up' && item.evolution_details[0].min_happiness != null && time_of_day != null){
      evolutions.push({
        name: item.species.name,
        item: `MIN HAPPINESS ${item.evolution_details[0].min_happiness}`
      })
    }
    else if(item.evolution_details[0].location != null){
      evolutions.push({
        name: item.species.name,
        item: `TRAINING LOCATION ${item.evolution_details[0].location.name}`
      })
    }else{
      evolutions.push({
        name: item.species.name,
        lvl: item.evolution_details[0].trigger.name.replace("-"," ").toUpperCase(),
        item: item.evolution_details[0].held_item.name.replace("-"," ").toUpperCase()
      })
    }
   
    item.evolves_to.forEach((item) => {
      if(item.evolution_details[0].min_level != null && item.evolution_details[0].trigger.name=='level-up'){
        evolutions.push({
          name: item.species.name,
          lvl: item.evolution_details[0].min_level
        })
      }else if(item.evolution_details[0].trigger.name == 'use-item'){
        evolutions.push({
          name: item.species.name,
          lvl: item.evolution_details[0].trigger.name.replace("-"," ").toUpperCase(),
          item: item.evolution_details[0].item.name.replace("-"," ").toUpperCase()
        })
      }else if(item.evolution_details[0].trigger.name== 'trade' && item.evolution_details[0].held_item==null){
        evolutions.push({
          name: item.species.name,
          lvl: item.evolution_details[0].trigger.name.toUpperCase()
        })
      }else if(item.evolution_details[0].trigger.name== 'level-up' && item.evolution_details[0].known_move != null){
        evolutions.push({
          name: item.species.name,
          item: `KNOW MOVE ${item.evolution_details[0].known_move.name.replace("-"," ").toUpperCase()}`
        })
      }else if(item.evolution_details[0].trigger.name== 'level-up' && item.evolution_details[0].min_happiness != null){
        evolutions.push({
          name: item.species.name,
          item: `MIN HAPPINESS ${item.evolution_details[0].min_happiness}`
        })
      }else if(item.evolution_details[0].trigger.name== 'level-up' && item.evolution_details[0].min_happiness != null && time_of_day != null){
        evolutions.push({
          name: item.species.name,
          item: `MIN HAPPINESS ${item.evolution_details[0].min_happiness}`
        })
      }
      else if(item.evolution_details[0].location != null){
        evolutions.push({
          name: item.species.name,
          item: `TRAINING LOCATION ${item.evolution_details[0].location.name}`
        })
      }else{
        evolutions.push({
          name: item.species.name,
          lvl: item.evolution_details[0].trigger.name.replace("-"," ").toUpperCase(),
          item: item.evolution_details[0].held_item.name.replace("-"," ").toUpperCase()
        })
      }
    })
  })

  return evolutions
}

export default createStore({
  state: () => ({
    nombre: "",
    tiposArr: [],
    sprite: null,
    spriteShiny: null,
    baseExp: 0,
    pokemons: [],
    pkmnStats: [],
    weight: null,
    height: null,
    sumStats: 0,
    abilities: [],
    dataSpeciesPkmn: [],
    moves: [],
    evolves: null,
    movesInfo: [],
    
  }),
  mutations: {
    SET_POKEMON: (state, result) => {
      for (const attribute in result) {
        state[attribute] = result[attribute]
      }
    },
    SET_POKEMON_EVOLUTIONS: (state, evolutions) => {
      state.evolves = evolutions
    },

    SET_POKEMONS: (state, pokemons) => {
      state.pokemons = pokemons
      console.log(state.pokemons)
    },

    SET_MORE_POKEMON_DATA: (state, speciesPkmn) => {
      state.dataSpeciesPkmn = speciesPkmn  
      
    },

    methodMoveInfo: (state, moveInfo) => {
      state.movesInfo = {
        name: moveInfo.data.name,
        power: moveInfo.data.power,
        accuracy: moveInfo.data.accuracy,
        pp: moveInfo.data.pp,
        type: moveInfo.data.type.name
      }
    },

  },
  actions: {
    getData: async ({ commit }, value) => {
      const pokemonData = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)).data
      const species = (await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${value}/`)).data
      const evolutionChain  = (await axios.get(species.evolution_chain.url)).data
      const pokemon = processPokemon(pokemonData)
      const evolutions = mapPokemonEvolutions(evolutionChain)
      commit('SET_POKEMON', pokemon)
      commit('SET_POKEMON_EVOLUTIONS', evolutions)

      // console.log({ dataPkmn, speciesPkmn, evolutionChain })

      // commit('getEvolves', evolutionChain)
      // commit('showPkmn', dataPkmn)
      commit('SET_MORE_POKEMON_DATA', species)
    },

    getAllPokemons: async ({ commit }) => {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      commit('SET_POKEMONS', response.data.results)
    },

    getMoveInfo: async ({commit}, move) => {
      let moveInfo = await axios.get(move)
      //console.log({moveInfo})
      commit('methodMoveInfo', moveInfo)
    },

    validarpkm: ({ commit }, pkm) => {
      const pokemon = {...pkm}
      if (pokemon.min_level == null){
      pokemon.lvl = item.evolution_details[0].trigger.name
      } else {
        pokemon.lvl = item.evolution_details[0].min_level
      }

      console.log({ pokemon })
      
      // commit('validarPkmn', pokemon)
    },
  },
})
