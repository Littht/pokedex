<template>
    <div class="container">
        <div v-for="(tipo,index) in tiposArr" :key="index"
          :class="`type ${tipo}`"
           >
            {{tipo.toUpperCase()}}
        </div>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex';
export default{
    data(){
        return{

        }
    },
    computed:{
        ...mapState(['tiposArr'])
    },
    methods:{
        ...mapActions(['getData'])
    }
}
</script>

<style scoped>

.container{
    display: flex;
    gap: 5px;
    padding: 5px;
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


