<template>
  
  <div class="main_container">
    <transition name="modal">
      <ModalVue v-if="modalSearch == true"/>
    </transition>
    <div class="flex1">
      <div class="info_pkmn_container">
        <!--img v-if="value != ''" class="rotate_pokeball" src="./assets/rotate-pokeball.png" alt=""-->
        <img class="sprite" :src="shiny==false ? sprite : shiny == true ? spriteShiny : img" >
        <div class="name">{{nombre.toUpperCase()}}</div>
        <TypesVue/>  
      </div>
      <div class="btn_container">
        <button :disabled="shiny==false ? true : false" @click="shiny=false">NORMAL</button>
        <button :disabled="shiny==true ? true : false" @click="shiny=true">SHINY</button>
      </div>
      <div class="green_led"></div>
      <div class="search">
        <button @click="methodModalSearch" class="btn-search">SEARCH</button>
        <img src="../src/assets/pokeball.png" alt="" class="pokeball">
        <img src="../src/assets/pokeball.png" alt="" class="pokeball_2">
        <!-- <div class="pokemon_list">
          <input type="text" v-model="search" placeholder="Search a Pokemon" v-on:keyup.enter="getData(search.toLowerCase()), search=''">
          <div class="filtered">
            <ul>
              <li v-for="(pokemon,index) in filteredPokemons" :key="index" @click="getData(pokemon.name), search=''">{{pokemon.name.toUpperCase()}}</li>
            </ul>
          </div>
        </div> -->
        <!--select v-model="value" @change="getData(value)">
          <option value="">Pick your Pokemon</option>
          <option v-for="(pokemon,index) in pokemons" :value="index+1" :key="index"> {{index+1}} - {{pokemon.name.toUpperCase()}}</option>
        </select-->   
      </div>
    </div>
    <div class="flex2">
      <div class="more_info">
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is= "Component "></component>
          </transition>
        </router-view>
      </div>
      <div class="routes_container" >
        <router-link to="/">BASIC</router-link>
        <router-link to="/stats">STATS</router-link>
        <router-link to="/training">TRAINING</router-link>
        <router-link to="/moves">MOVES</router-link>
        <router-link to="/evolutions">EVOLUTIONS</router-link>
      </div>
    </div>   
  </div> 
</template>

<script>
  import { mapActions, mapState,mapMutations } from 'vuex'
  import TypesVue from './components/TypesVue.vue'
  import ModalVue from './components/ModalVue.vue'

  export default{
    components:{
      TypesVue,
      ModalVue
    },
    data(){
      return{
        value: "",
        shiny: false,
        search:"",
      }
    },

    computed:{
      ...mapState(['nombre', 'sprite', 'pokemons', 'spriteShiny','modalSearch']),
      filteredPokemons(){
        return this.pokemons.filter((pokemon)=>{
          return pokemon.name.match(this.search.toLowerCase())
        })
      }
    },

    methods:{
      ...mapActions(['getData', 'getAllPokemons', 'getEvolutionChain','methodModalSearch']),
      ...mapMutations(['methodModalSearch'])
    },
    mounted(){
      this.getAllPokemons()
    },
  }
</script>

<style>
*{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}
body{
  background-image: url(../src/assets/background.jpg);
  width: 100%;
  
}
.main_container{
  background-color: #797979;
  width: 700px;
  min-height: 540px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.377);
  border-radius: 2px;
  position: relative;
  justify-content: center;
}
.flex1{
  flex:1;
  display:flex;
  position:relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.flex2{
  border-left: 4px solid #3d3d3d;
  flex:1.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.info_pkmn_container{
  width: 250px;
  height: 305px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(../src/assets/pantalla-background.jpg);
  border:10px solid #3d3d3d;
  border-top: 35px solid #3d3d3d;
  border-radius: 0 0 0 10px;
  position: relative;
  
}
.name{
  font-weight: 600;
}

.green_led{
  position: absolute;
  right: 0px;
  top: 120px;
  width: 20px;
  height: 60px;
  background-color: #5ed290;
  border-left: 2px solid #3d3d3d;
  border-top: 2px solid #3d3d3d;
  border-bottom: 2px solid #3d3d3d;
}
img{
  height: 50px;
}
.sprite{
  z-index: 1;
  height: 200px;
  padding: 5px;
}
.btn_container{
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn_container button{
  padding: 5px;
  width: 100px;
  background-color: #5ed290;
  color: #3d3d3d;
  border: 2px solid #3d3d3d;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn_container button:disabled{
  background-color: #5ecc8d88;
  cursor: default;
}

.rotate_pokeball{
  top: calc(100% - 160px);
  width: 50px;
  height: 50px;
  animation: rotar 1s infinite;
  position:absolute;
}
@keyframes rotar{
  100% {transform: rotate(360deg);}
}
.search{
  position:relative;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 190px;
  gap: 5px;
  background-color: #dc0a2d;
  border-radius: 50% 50% 0 0;
  border-top: 5px solid #3d3d3d;
  border-right: 5px solid #3d3d3d;
  border-left: 5px solid #3d3d3d;
}

.btn-search{
  padding: 5px;
  color: #3d3d3d;
  background-color: #5ed290;
  border: 2px solid #3d3d3d;
  border-radius: 4px;
  width: 120px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  cursor:pointer;
}

.pokemon_list{
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 2;
  width:210px;
  margin-top: 20px;
}

.pokemon_list input{
  outline: none;
  height: 30px;
  padding: 2px;
  border-radius: 4px;
  border: 2px solid #3d3d3d;
}

.filtered{
  height: 120px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #5ed290;
  padding: 2px;
  border: 2px solid #3d3d3d;
  border-radius: 4px;
  
}

.filtered ul li{
  padding: 2px;
  cursor:pointer;
  transition: all .2s;
}

.filtered ul li:hover{
  background: #3d3d3d;
  color: #fff;
}

.pokeball{
  position:absolute;
  bottom:5px;
  left: 5px;
}
.pokeball_2{
  position:absolute;
  bottom:5px;
  right: 5px;
}

select{
  z-index: 1;
  width: 250px;
  padding: 5px;
  outline: none;
  border: 2px solid #3d3d3d;
  border-radius: 4px;
  font-weight: 600;
  background-color: #5ed290;
  color: #3d3d3d;
}
option{
  font-weight: 600;
}
option:active{
  background-color: #3d3d3d;
}
input{
  z-index: 1;
}
.more_info{
  background-image: url(../src/assets/pantalla-background.jpg);
  width: 350px;
  height: 400px;
  border:10px solid #3d3d3d;
  border-top: 35px solid #3d3d3d;
  border-radius: 0 0 10px 0; 
  overflow-y:scroll;
  overflow-x:hidden;
}

.routes_container{
  width: 370px;
  display: flex;
  gap:5px;
  flex-wrap: wrap;
}

.routes_container a{
  padding: 5px;
  color: #3d3d3d;
  background-color: #5ed290;
  border: 2px solid #3d3d3d;
  border-radius: 4px;
  width: 120px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f100; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background-color: #797979; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

/* route transition*/
.route-enter-from{
  opacity: 0;
  transform: translateX(350px);
}

.route-enter-active{
  transition: all .4s ease-out;
}

.route-leave-to{
  transform: translateX(-350px)
}

.route-leave-active{
  transition: all .4s ease-in
}

.modal-enter-from{
  opacity: 0;
}

.modal-enter-active{
  transition: all .2s ease-out;
}

.modal-leave-to{
  opacity:0;
}

.modal-leave-active{
  transition: all .2s ease-in
}
</style>
