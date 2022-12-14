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
      evolves:[],
      movesInfo:[]
    }
  },
  getters: {
  },
  mutations: {
    showPkmn(state, dataPkmn){
      //console.log(dataPkmn)
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
      //console.log(state.moves)
    },

    allPkmn(state, getAllPkmn){
      state.pkmnArr=getAllPkmn.data.results
    },

    moreDataPkmn(state, speciesPkmn){
      //guardando info en variable
      state.dataSpeciesPkmn=speciesPkmn.data   
      //console.log(state.dataSpeciesPkmn)

    },
    

    getEvolves(state, evolutionChain){
      state.evolves=[]
      state.evolves.push({name:evolutionChain.data.chain.species.name})
      //console.log("12",evolutionChain.data.chain.evolves_to) 
      evolutionChain.data.chain.evolves_to.forEach( (item) => {
        let pkm = {
          name:item.species.name,
          lvl:item.evolution_details[0].min_level
        }
        //console.log("comprobacion",item.evolution_details[0])
        state.evolves.push (pkm)
        item.evolves_to.forEach( (item) => {
            let pkm = {
                        name:item.species.name,
                        lvl:item.evolution_details[0].min_level
                      }
            state.evolves.push (pkm)
        })
      })

      //console.log("evoluciones",state.evolves)
    },

    methodMoveInfo(state, moveInfo){
      state.movesInfo=[{
        name: moveInfo.data.name,
        accuracity: moveInfo.data.accuracy,
        pp: moveInfo.data.pp,
        type: moveInfo.data.type.name
      }]
      console.log(state.movesInfo)
    },
    
  },
  actions: {
    getData: async function({ commit }, value){
      let dataPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
      let speciesPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${value}/`)
      let evolutionChain = await axios.get(speciesPkmn.data.evolution_chain.url)
      //console.log("first",evolutionChain.data.chain)

      

      commit('getEvolves', evolutionChain)
      commit('showPkmn', dataPkmn)
      commit('moreDataPkmn', speciesPkmn)
    },

    getArrPkmn: async function({ commit }){
      let getAllPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      commit('allPkmn',getAllPkmn)
    },

    getMoveInfo: async function({commit},move){
      let moveInfo= await axios.get(move)
      console.log(moveInfo)
      commit('methodMoveInfo', moveInfo)
    },

    validarpkm ({commit}, pkm){
      const pokemon = {...pkm}
      if(pokemon.min_level==null){
      pokemon.lvl=item.evolution_details[0].trigger.name
      }else{
        pokemon.lvl=item.evolution_details[0].min_level
      }
      
      commit('validarPkmn', pokemon)
    },

  },
  modules: {
  }
})
