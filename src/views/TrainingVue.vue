<template>
    <div class="container" v-if="dataSpeciesPkmn != ''">
        <h1 >TRAINING</h1>
        <div class="info_container">
            <div>{{`CAPTURE RATE ${dataSpeciesPkmn.capture_rate}`}}</div>
            <div>{{`BASE HAPPINESS ${dataSpeciesPkmn.base_happiness}`}}</div>
            <div>{{`GROWTH RATE ${dataSpeciesPkmn.growth_rate.name.replace("-", " ").toUpperCase()}`}}</div>
            <div>{{`BASE EXPERIENCE ${baseExp}`}}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default{
        computed:{
            ...mapState(['dataSpeciesPkmn','baseExp'])
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

.info_container{
    display: flex;
    flex-direction: column;
    gap: .5em;
    font-weight: 600;
}
</style>