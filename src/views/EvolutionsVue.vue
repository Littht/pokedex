<template>
    <div class="container">
        <h1>EVOLUTIONS</h1>
        <ul>
            <li v-for="(pkmn, index) in evolves" :key="index">{{pkmn.name.toUpperCase()}} {{pkmn.lvl}}</li>
        </ul>
    </div>
</template>

<script>
import { mapActions , mapState } from 'vuex'

    export default{
        computed:{
            ...mapState(['evolves'])
        },
        methods:{
            
        }
    }
</script>

<style scoped>
    .container{

    }
    h1{
        font-size: 25px;
    }
    ul li{
        font-weight: 600;
    }
</style>