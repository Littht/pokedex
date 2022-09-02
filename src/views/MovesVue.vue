<template>
    <div class="container" v-if="moves !=''">
        <h1>MOVES</h1>
        <ul>
            <li v-for="(move,index) in moves" :key="index">{{index+1}} - {{move.name.replace("-", " ").toUpperCase()}}</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

    export default{
        computed:{
            ...mapState(['moves'])
        }
    }
</script>

<style scoped>
.container{
    padding: 5px;
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
</style>