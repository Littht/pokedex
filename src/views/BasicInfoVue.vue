<template>
    <div class="container" v-if="dataSpeciesPkmn.length != []">
        <h1>BASIC INFO</h1>
        <div>{{weight}}</div>
        <div>{{height}}</div>
        <div>{{`N° POKEDEX ${dataSpeciesPkmn.id}`}}</div>
        <div>{{dataSpeciesPkmn.genera[7].genus.toUpperCase()}}</div>
        <h2>- ABILITIES</h2>
        <ul>
            <li v-for="(ability,index) in abilities" :key="index">
                {{index+1}} - {{ability.ability.name.replace("-", " ").toUpperCase()}}
            </li>
        </ul>
    </div>
    
</template>

<script>
    import { mapState } from 'vuex'
    
    export default{
        computed:{
          ...mapState(['height','weight', 'abilities','dataSpeciesPkmn'])
        },

    }
</script>

<style scoped>
    .container{
        padding: 8px;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    h1{
        font-size: 25px;
    }
    li{
      margin-bottom: 8px; 
    }
</style>