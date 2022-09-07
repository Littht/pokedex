<template>
    <div class="container" v-if="moves.length > 0">
        <h1>MOVES</h1>
        <ul>
            <li v-for="(move,index) in moves" :key="index" @click="getMoveInfo(move.url) , moveModal=true">{{index+1}} - {{move.name.replace("-", " ").toUpperCase()}}</li>
        </ul>
        <div class="container_2" v-if="movesInfo.length != 0 && moveModal == true">
            <div class="header_moves">
                <div class="close" @click="moveModal=false">CLOSE</div>
                <div>{{movesInfo.name.replace("-", " ").toUpperCase()}}</div>
            </div>
            <div class="move_info">
                <div>{{`PP ${movesInfo.pp}`}}</div>
                <div>{{`POWER ${movesInfo.power}`}}</div>
                <div>{{`ACCURACY ${movesInfo.accuracy}`}}</div>
                <div :class="`type ${movesInfo.type}`">{{movesInfo.type.toUpperCase()}}</div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapState, mapActions } from 'vuex';

    export default{
        data(){
            return{
                moveModal: false
            }
        },
        computed:{
            ...mapState(['moves','movesInfo']),
        },
        methods:{
            ...mapActions(['getMoveInfo'])
        }
    }
</script>

<style scoped>
.container{
    padding: 5px;
    position: relative;
}

.container_2{
    padding: 5px;
    position: fixed;
    top: 300px;
    background-color: #5ed290;
    border-radius: 4px;
    border: 2px solid #3d3d3d;
    transition: transform .3s ease-in-out;
    transform-style: preserve-3d;
    width: 320px;
    font-weight: 600;
}


h1{
    font-size: 25px;
    margin-bottom: 5px;
}

ul{
    display: flex;
    flex-direction: column;
    gap: .5em;
    margin-bottom: 140px;
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

.header_moves{
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 4px;
}
.close{
    cursor: pointer;
    padding: 4px;
    border: 2px solid #3d3d3d;
    border-radius: 4px;
    transition: all .3s;
}
.close:hover{
    background: #3d3d3d;
    border: 2px solid #fff;
    color: #fff;
}

.type{
    padding: 5px;
    color: white;
    font-weight: 600;
    background-color: black;
    display: inline-block;
    border-radius: 12px;
    min-width: 60px;
    text-align: center;
    border: 2px solid white;
    outline: 1px solid #424242;
}


.dark{
    background-color: #4e3828;
}

.dragon{
    background-color: #6d5cc8;
}

.electric{
    background-color: #fbbc1b;
}

.fairy{
    background-color: #e8aae8;
}

.fighting{
    background-color: #853721;
}

.flying{
    background-color: #8798e5;
}

.ghost{
    background-color: #464591;
}

.ground{
    background-color: #ccae59;
}

.ice{
    background-color: #8cdef9;
}

.rock{
    background-color: #ad9249;
}

.normal{
    background-color: #c6c2bc;
}

.psychic{
    background-color: #ed4882;
}

.steel{
    background-color: #aeaebc;
}
.water{
    background-color: #4a96ee;
}

.bug{
    background-color: #88980f;
}

.fire{
    background-color: #d93307;
}

.grass{
    background-color: #68b230;
}

.poison{
    background-color: #772d78;
}
</style>