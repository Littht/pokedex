<template>
<div class="container">
    <div class="modal">
      <button @click="methodModalSearch">X</button>

      <div class="pokemon_list">
        <input type="text" v-model="search" placeholder="Search by name" v-on:keyup.enter="getData(search.toLowerCase()), methodModalSearch(),search=''">
        <div class="filtered">
          <ul>
            <li v-for="(pokemon,index) in filteredPokemons" :key="index" @click="getData(pokemon.name), methodModalSearch(), search=''">{{pokemon.name.toUpperCase()}}</li>
          </ul>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default{
    data(){
        return{
            search:""
        }
    },
    computed:{
      ...mapState(['pokemons', 'modalSearch']),
      filteredPokemons(){
        return this.pokemons.filter((pokemon)=>{
          return pokemon.name.match(this.search.toLowerCase())
        })
      }
    },
    methods:{
        ...mapActions(['getData']),
        ...mapMutations(['methodModalSearch'])
    },

}
</script>

<style scoped>
.container{
    background-color: rgba(0, 0, 0, 0.377);
    width: 100vw;
    height: 100vh;
    position: absolute;
    margin-top: -50px;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal{
  border-radius: 4px;
  width: 350px;
  height: 500px;
  background-color: #797979;
  display: flex;
  position: relative;
  justify-content: center;
}
button{
  position: absolute;
  left: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  border: 2px solid #3d3d3d;
  cursor:pointer
}
</style>