<template>
  
  <div class="main_container">
    <div class="flex1">
      <div class="info_pkmn_container">
        <img class="rotate_pokeball" src="./assets/rotate-pokeball.png" alt="">
        <img class="sprite" :src="sprite" alt="">
        <div class="name">{{nombre.toUpperCase()}}</div>
        <TypesVue/>  
      </div>
      <div class="green_led"></div>
      <div class="search">
        <img src="../src/assets/pokeball.png" alt="" class="pokeball">
        <select v-model="value" @change="getData(value)">
          <option value="">Pick your Pokemon</option>
          <option v-for="(pokemon,index) in pkmnArr" :value="pokemon.name" :key="index"> {{index+1}} - {{pokemon.name.toUpperCase()}}</option>
        </select>
        <!--button :disabled= "value == '' ? true : false " @click="getData(value)">Search</button-->   
      </div>
    </div>
    <div class="flex2">
      <MoreInfoVue/>
    </div>
    
  </div> 
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import TypesVue from './components/TypesVue.vue'
  import MoreInfoVue from './components/MoreInfoVue.vue'

  export default{
    components:{
      TypesVue,
      MoreInfoVue
    },
    data(){
      return{
        value:"",
      }
    },

    computed:{
      ...mapState(['nombre','sprite','pkmnArr','pkmnStats','height','weight'])
    },

    methods:{
      ...mapActions(['getData','getArrPkmn']),

    },
    created(){
      this.getArrPkmn()
    },
    unmounted(){

    }
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
}
.info_pkmn_container{
  width: 250px;
  height: 300px;
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
.sprite{
  margin-top: -5px;
  z-index: 1;
}
.pokeball{
  position:absolute;
  bottom:0px;
  left: 48px;
}
.rotate_pokeball{
  top: 80px;
  width: 100px;
  height: 100px;
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
  height: 220px;
  gap: 5px;
  background-color: #dc0a2d;
  border-radius: 50% 50% 0 0;
  border-top: 5px solid #3d3d3d;
  border-right: 5px solid #3d3d3d;
  border-left: 5px solid #3d3d3d;
}
select{
  z-index: 1;
  width: 200px;
  padding: 5px;
  outline: none;
  border-radius: 4px;
  font-weight: 600;
}



img{
  height: 200px;
}


</style>
