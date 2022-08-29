import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state(){
    return{
      nombre:"",
      value:1,
      tiposArr:[],
      sprite:null,
      pkmnArr:[]
    }
  },
  getters: {
  },
  mutations: {
    showPkmn(state, dataPkmn){
      state.nombre= dataPkmn.data.name
      state.sprite= dataPkmn.data.sprites.other.home.front_default
      state.tiposArr.splice(0)
      state.tiposArr.push(dataPkmn.data.types[0].type.name)
      if(dataPkmn.data.types.length!==1){
        state.tiposArr.push(dataPkmn.data.types[1].type.name)
      }
      console.log(state.tiposArr)
    },
    allPkmn(state, getAllPkmn){
      state.pkmnArr=getAllPkmn.data.results
    }
    
  },
  actions: {
    getData: async function({ commit }, value){
      console.log(value)
      let dataPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
      let getAllPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      console.log(dataPkmn)
      commit('showPkmn', dataPkmn)
      commit('allPkmn',getAllPkmn)
    }
  },
  modules: {
  }
})
