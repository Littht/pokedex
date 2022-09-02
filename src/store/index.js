import { createStore } from 'vuex'
import axios from 'axios'
import img from '@/assets/rotate-pokeball.png'

export default createStore({
  state(){
    return{
      nombre:"",
      tiposArr:[],
      sprite:null,
      spriteShiny:null,
      baseExp:0,
      pkmnArr:[],
      pkmnStats:[],
      weight:null,
      height:null,
      sumStats:0,
      abilities:[],
      dataSpeciesPkmn:[],
      moves:[],
    }
  },
  getters: {
  },
  mutations: {
    showPkmn(state, dataPkmn){

      //guardando nombre,sprites baseExp
      state.nombre= dataPkmn.data.name
      state.sprite= dataPkmn.data.sprites.other.home.front_default
      state.spriteShiny= dataPkmn.data.sprites.other.home.front_shiny
      state.baseExp= dataPkmn.data.base_experience


      //validando si algun sprite es null
      if(state.sprite==null && state.spriteShiny == null){
        state.sprite=img
        state.spriteShiny=img
      }

      //guardado tipos en un array
      state.tiposArr.splice(0)
      state.tiposArr.push(dataPkmn.data.types[0].type.name)
      if(dataPkmn.data.types.length!==1){
        state.tiposArr.push(dataPkmn.data.types[1].type.name)
      }

      //guardando stats en un array y sumarlos
      state.sumStats= 0
      state.pkmnStats= dataPkmn.data.stats.map((stat,key)=>{
        return {
          name:stat.stat.name,
          stat:stat.base_stat,
        }
      })
      for(let item of state.pkmnStats){
        state.sumStats= state.sumStats + item.stat
      }

      //guardando en variables atributos basicos del pokemon
      state.weight= `WEIGHT ${dataPkmn.data.weight / 10} ${dataPkmn.data.weight === 10 ? "Kg" : "Kgs"}`
      state.height= `HEIGHT ${dataPkmn.data.height / 10} ${dataPkmn.data.height === 10 ? "Mt" : "Mts"}`
      state.abilities= dataPkmn.data.abilities

      //guardando movimientos del pokemon en array
      state.moves= dataPkmn.data.moves.map((move,key)=>{
        return{
          name: move.move.name, 
          url:move.move.url
        }  
      })
      console.log(state.moves[0].url)
    },

    allPkmn(state, getAllPkmn){
      state.pkmnArr=getAllPkmn.data.results
    },

    moreDataPkmn(state, speciesPkmn){
      //guardando info en variable
      state.dataSpeciesPkmn=speciesPkmn.data   
      //console.log(state.dataSpeciesPkmn)

    },
    
  },
  actions: {
    getData: async function({ commit }, value){
      let dataPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
      let speciesPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${value}/`)
      let evolutionChain = await axios.get(speciesPkmn.data.evolution_chain.url)
      console.log(dataPkmn)
      commit('showPkmn', dataPkmn)
      commit('moreDataPkmn', speciesPkmn)
    },

    getArrPkmn: async function({ commit }){
      let getAllPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      commit('allPkmn',getAllPkmn)
    },

  },
  modules: {
  }
})
