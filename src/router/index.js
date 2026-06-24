// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MotFondateurs from '../components/MotFondateurs.vue'
import Statuts from '../components/Statuts.vue'
import ReglementInterieur from '../components/ReglementInterieur.vue'
import ConseilExecutif from '../components/ConseilExecutif.vue'

import Accueil from '../Accueil.vue' // <-- DÉCOMMENTER ICI
import Rapports from '../components/Rapports.vue'
import Actualites from '../components/Actualites.vue'
import DetailsActualite from '../components/DetailsActualite.vue'
import DetailsActualite2 from '../components/DetailsActualite2.vue'
import Formation from '../components/Formation.vue'
import Mediatheque from '../components/Mediatheque.vue'
import Contact from '../components/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil // <-- DÉCOMMENTER ICI
  },
  {
    path: '/presentation/mot-des-fondateurs',
    name: 'MotFondateurs',
    component: MotFondateurs
  },
  {
    path: '/presentation/statuts',
    name: 'Statuts',
    component: Statuts
  },
  {
    path: '/presentation/reglement',
    name: 'ReglementInterieur',
    component: ReglementInterieur
  },
  {
    path: '/presentation/conseil',
    name: 'ConseilExecutif',
    component: ConseilExecutif
  },
  {
    path: '/rapports',
    name: 'Rapports',
    component: Rapports
  },
  {
    path: '/formation',
    name: 'Formation',
    component: Formation
  },
  {
    path: '/actualites',
    name: 'Actualites',
    component: Actualites
  },
  {
    path: '/mediatheque',
    name: 'Mediatheque',
    component: Mediatheque
  },
  {
    // Le ":slug" définit le paramètre dynamique qui variera pour chaque article
    path: '/actualites/:slug',
    name: 'DetailsActualite',
    component: DetailsActualite
  },
  {
    // Le ":slug" définit le paramètre dynamique qui variera pour chaque article
    path: '/actualites/:slug',
    name: 'DetailsActualite2',
    component: DetailsActualite2
  },
  {
    // Le ":slug" définit le paramètre dynamique qui variera pour chaque article
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router