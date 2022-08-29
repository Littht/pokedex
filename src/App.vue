<template>
  
  <div class="main_container">
    <div class="info_pkmn_container">
      <img :src="sprite" alt="">
      <div>{{nombre.toUpperCase()}}</div>
      <TypesVue/>
    </div>
    <div class="green_led"></div>
    <div class="search">
      <input type="number" v-model="number" v-on:keyup.enter="getData(number)"/>
       <select v-if="pkmnArr.length > 0">
        <option value="">Pick your Pokemon</option>
        <option v-for="(pokemon,index) in pkmnArr" :number="pokemon[index]" :key="index">{{index+1}} - {{pokemon.name.toUpperCase()}}</option>
        {{sprite}}
      </select>
      <button @click="getData(number)">Search</button>   
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import TypesVue from './components/TypesVue.vue'
  export default{
    components:{
      TypesVue,
    },
    data(){
      return{
        number:1
      }
    },

    computed:{
      ...mapState(['nombre','sprite','pkmnArr'])
    },

    methods:{
      ...mapActions(['getData']),

      /*getDataByName(){
        this.getData(this.nombre)
      },

      getDataById(){
        this.getData(this.id)
      }*/

      /*async getData(){
        let dataPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.value}/`)
        let getAllPkmn= await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
        console.log(dataPkmn)
        this.pkmnArr=getAllPkmn.data.results
        this.nombre=dataPkmn.data.name
        this.tiposArr.splice(0)
        this.tiposArr.push(dataPkmn.data.types[0].type.name)
        if(dataPkmn.data.types.length!==1){
          this.tiposArr.push(dataPkmn.data.types[1].type.name)
        }
        this.sprite= dataPkmn.data.sprites.other.home.front_default
        console.log(this.nombre)
      },*/

    },
    /*watch:{
      value(){
        getDataById()
      }
    },*/
    created(){
      this.getData(this.number)
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
  width: 300px;
  min-height: 540px;
  background-color: #797979;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.377);
  border-radius: 2px;
  position: relative;
}

.info_pkmn_container{
  width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(../src/assets/pantalla-background.jpg);
  border:10px solid #3d3d3d;
  border-top: 35px solid #3d3d3d;
  border-radius: 0 0 0 10px;
  
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

.search{
  display:flex;
  flex-direction: column;
  width: 300px;
  gap: 5px;
  padding:90px 10px 50px 10px;
  background-color: #dc0a2d;
  border-radius: 50% 50% 0 0;
  border-top: 5px solid #3d3d3d;
  border-right: 5px solid #3d3d3d;
  border-left: 5px solid #3d3d3d;
}

img{
  height: 200px;
  margin-top: -5px;
  
}


</style>
