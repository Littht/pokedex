<template>
    <div class="container" v-if="evolves != null">
        <h1>EVOLUTIONS</h1>
        <ul>
            <li v-for="(pkmn, index) in evolves" :key="index">{{index+1}} - {{pkmn.name.toUpperCase()}} {{pkmn.lvl}} {{pkmn.item}}</li>
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
        padding:5px
    }
    h1{
        font-size: 25px;
    }
    ul li{
        font-weight: 600;
    }
</style>