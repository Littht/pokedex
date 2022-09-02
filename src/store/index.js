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
  const evolutions = [{ name: evolutionChain.chain.species.name }]

  evolutionChain.chain.evolves_to.forEach((item) => {
    evolutions.push({
      name: item.species.name,
      lvl: item.evolution_details[0].min_level
    })

    item.evolves_to.forEach((item) => {
      evolutions.push({
        name: item.species.name,
        lvl: item.evolution_details[0].min_level
      })
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
    evolves: [],
    movesInfo: []
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
    },

    SET_MORE_POKEMON_DATA: (state, speciesPkmn) => {
      state.dataSpeciesPkmn = speciesPkmn.data   
    },

    methodMoveInfo: (state, moveInfo) => {
      state.movesInfo = [{
        name: moveInfo.data.name,
        accuracity: moveInfo.data.accuracy,
        pp: moveInfo.data.pp,
        type: moveInfo.data.type.name
      }]
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
      // commit('SET_MORE_POKEMON_DATA', speciesPkmn)
    },

    getAllPokemons: async ({ commit }) => {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      commit('SET_POKEMONS', response.data.results)
    },

    getMoveInfo: async ({commit}, move) => {
      let moveInfo = await axios.get(move)
      console.log({moveInfo})
      // commit('methodMoveInfo', moveInfo)
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
