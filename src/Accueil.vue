<template>
  <div class="font-sans">
   
    <Hero />
   <section id="stats">
    <Stats />
  </section>
    <MeetingSection />
    <President />
       
    <NewsSection />
 
    
    <MissionsObjectifs />
   
    <Members />
    <Join />
   
    
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import MeetingSection from "./components/MeetingSection.vue"
import NewsSection from "./components/NewsSection.vue"
import MissionsObjectifs from "./components/MissionsObjectifs.vue"

import President from './components/President.vue'
import Stats from './components/Stats.vue'
import Missions from './components/Missions.vue'
import News from './components/News.vue'
import Members from './components/Members.vue'
import Join from './components/Join.vue'
import Footer from './components/Footer.vue'

</script>