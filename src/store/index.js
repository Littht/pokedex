import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state(){
    return{
      nombre:"",
      value:1,
      tiposArr:[],
      sprite:null,
      pkmnArr:[],
      pkmnStats:[],
      weight:null,
      height:null,
    }
  },
  getters: {
  },
  mutations: {
    showPkmn(state, dataPkmn){
      state.nombre= dataPkmn.data.name
      state.sprite= dataPkmn.data.sprites.other.home.front_default
      state.height= `WEIGHT ${dataPkmn.data.height / 10} ${dataPkmn.data.height === 10 ? "M" : "Mts"}`
      state.weight= `HEIGHT ${dataPkmn.data.weight / 10} ${dataPkmn.data.weight === 10 ? "Kg" : "Kgs"}`

      state.tiposArr.splice(0)
      state.tiposArr.push(dataPkmn.data.types[0].type.name)
      if(dataPkmn.data.types.length!==1){
        state.tiposArr.push(dataPkmn.data.types[1].type.name)
      }
      state.pkmnStats= dataPkmn.data.stats.map((stat,key)=>{
        return {
          name:stat.stat.name,
          stat:stat.base_stat
        }
      })
    },

    allPkmn(state, getAllPkmn){
      state.pkmnArr=getAllPkmn.data.results
      console.log(getAllPkmn)
    }
    
  },
  actions: {
    getData: async function({ commit }, value){
      let dataPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
      commit('showPkmn', dataPkmn)
    },

    getArrPkmn: async function({ commit }){
      let getAllPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      commit('allPkmn',getAllPkmn)
    }

  },
  modules: {
  }
})
