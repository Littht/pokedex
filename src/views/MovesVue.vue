<template>
    <div class="container" v-if="moves !=''">
        <h1>MOVES</h1>
        <ul>
            <li v-for="(move,index) in moves" :key="index" @click="getMoveInfo(move.url)">{{index+1}} - {{move.name.replace("-", " ").toUpperCase()}}</li>
        </ul>
        <div class="container_2" v-if="movesInfo != ''">
            <div>{{movesInfo.name}}</div>
            <div>{{movesInfo.pp}}</div>
            <div>{{movesInfo.acuracy}}</div>
            <div>{{movesInfo.type}}</div>
        </div>
    </div>
    
</template>

<script>
import { mapState, mapActions } from 'vuex';

    export default{
        computed:{
            ...mapState(['moves','movesInfo'])
        },
        methods:{
            ...mapActions(['getMoveInfo'])
        }
    }
</script>

<style scoped>
.container{
    padding: 5px;
}

.container_2{
    padding: 5px;
    position: absolute;
}

h1{
    font-size: 25px;
    margin-bottom: 5px;
}

ul{
    display: flex;
    flex-direction: column;
    gap: .5em;
}
li{
    cursor: pointer;
    min-width: 100px;
    display: inline-block;
    padding: 4px;
}

li:hover{
    border-radius: 4px;
    background-color: #5ed290;
    outline: 2px solid #3d3d3d;
}
</style>