import { createRouter, createWebHistory } from 'vue-router'
import StatsVue from '@/views/StatsVue.vue'
import BasicInfoVue from '@/views/BasicInfoVue.vue'
import TrainingVue from '@/views/TrainingVue.vue'
import MovesVue from '@/views/MovesVue.vue'
import EvolutionsVue from '@/views/EvolutionsVue.vue'

const routes = [
  {
    path: '/',
    name: 'basicInfo',
    component: BasicInfoVue
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsVue
  },
  {
    path: '/training',
    name: 'training',
    component: TrainingVue
  },
  {
    path: '/moves',
    name: 'moves',
    component: MovesVue
  },
  {
    path: '/evolutions',
    name: 'evolutions',
    component: EvolutionsVue
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
