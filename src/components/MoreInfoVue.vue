<template>
    <div class="more_info">
        <div class="stats">
          <ul>
            <li v-for="(stat,index) in pkmnStats" :key="index" >
              <div class="bar " >
                <div class="text_bar" >
                  {{stat.name.replace("-", " ").toUpperCase()}} {{stat.stat}}
                </div>
                <div :class="['progress' , stat.stat <= 29 ? 'bar_rank_1': stat.stat >= 30 && stat.stat <= 59 ? 'bar_rank_2': stat.stat >= 60 && stat.stat <= 89 ? 'bar_rank_3' : stat.stat >= 90 && stat.stat <= 109 ? 'bar_rank_4' : stat.stat >= 110 && stat.stat <= 139 ? 'bar_rank_5' : 'bar_rank_6']" :style="{width:`${(stat.stat*100)/255}%`}"></div>
              </div>
            </li>
          </ul>
          <div>{{weight}}</div>
          <div>{{height}}</div>
        </div>
      </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default{
    computed:{
      ...mapState(['pkmnStats','height','weight'])
    },
    methods:{
        ...mapActions(['getData'])
    }
}

</script>

<style scoped>
.more_info{
  background-image: url(../assets/pantalla-background.jpg);
  width: 350px;
  border:10px solid #3d3d3d;
  border-top: 35px solid #3d3d3d;
  border-radius: 0 0 10px 0;
  height: 350px;
}
.stats{
  padding: 4px;
  display: flex;
  gap: .5em;
  flex-direction: column;
  font-weight: 600;
}

ul{
  display: flex;
  gap: .5em;
  flex-direction: column;
}

ul li{
  list-style:none;
}

.bar{
  width: 320px;
  height: 34px;
  background-color: #9b9b9b80;
  border-radius: 10px;
  position: relative;
}


.progress{
  width: 0%;
  height: 100%;
  background-color: rgba(255,255,255, 1);
  border-radius: 10px;
  position: absolute;
  top: 0;
  animation: aumentar ease-in-out 1s;
  transition: all .5s;  
}

.bar_rank_1{
    background-color: #f34444;
}

.bar_rank_2{
    background-color: #ff7f0f;
}

.bar_rank_3{
    background-color: #ffdd57;
}

.bar_rank_4{
    background-color: #a0e515;
}   

.bar_rank_5{
    background-color: #23cd5e;
}

.bar_rank_6{
    background-color: #00c2b8;
}


@keyframes aumentar{
  0%{width: 0%} 
}

.text_bar{
  z-index: 1;
  position: absolute;
  top: 10px;
  left: 5px;
}
</style>