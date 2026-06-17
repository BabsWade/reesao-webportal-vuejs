<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import slide1 from '../assets/hero.jpg' 

const slides = [
  {
    tag: "Gouvernance Régionale",
    titlePrefix: "Conférence des Recteurs :",
    highlight: "L'Harmonisation",
    text: "Harmonisation des politiques d'enseignement supérieur et coopération académique stratégique à l'échelle de l'Afrique de l'Ouest.",
    img: slide1
  },
  {
    tag: "Innovation & Recherche",
    titlePrefix: "Propulser la recherche par",
    highlight: "L'Excellence",
    text: "Connecter les universités ouest-africaines aux standards mondiaux grâce au levier technologique et aux plateformes partagées.",
    img: slide1
  },
  {
    tag: "Synergie Panafricaine",
    titlePrefix: "Bâtir un espace uni via",
    highlight: "La Synergie",
    text: "Fédérer les compétences et les ressources des institutions pour former les leaders et concevoir les solutions de demain.",
    img: slide1
  }
]

const stats = [
  { value: "15", label: "Pays membres" },
  { value: "80+", label: "Universités" },
  { value: "2.5M", label: "Étudiants" },
  { value: "120", label: "Projets" }
]

const current = ref(0)
const slideDuration = 8000
const progress = ref(0)
let progressTimer = null

const startTimer = () => {
  let startTime = Date.now()
  progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = (elapsed / slideDuration) * 100
    if (elapsed >= slideDuration) {
      startTime = Date.now()
      nextSlide()
    }
  }, 50)
}

const resetTimer = () => {
  if (progressTimer) clearInterval(progressTimer)
  progress.value = 0
  startTimer()
}

const nextSlide = () => {
  current.value = (current.value + 1) % slides.length
  progress.value = 0
}

const prevSlide = () => {
  current.value = (current.value - 1 + slides.length) % slides.length
  progress.value = 0
}

const handleNext = () => { nextSlide(); resetTimer() }
const handlePrev = () => { prevSlide(); resetTimer() }

const formattedCurrent = computed(() => String(current.value + 1).padStart(2, '0'))
const formattedTotal = computed(() => String(slides.length).padStart(2, '0'))

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  if (progressTimer) clearInterval(progressTimer)
})
</script>

<template>
  <section class="relative h-screen w-full bg-[#0071bd] overflow-hidden font-sans">

    <div class="absolute inset-0 z-0">
      <div
        v-for="(slide, i) in slides"
        :key="'bg-'+i"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <img :src="slide.img" :alt="slide.titlePrefix" class="w-full h-full object-cover object-center scale-105 transform origin-center animate-[pulse_20s_ease-in-out_infinite_alternate]" />
      </div>

      <div class="absolute inset-0 bg-gradient-to-r from-[#0071bd]/0 via-[#0071bd]/0 to-transparent lg:from-[#0071bd]/0 lg:via-[#0071bd]/10 lg:to-transparent z-20 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0071bd]/100 via-[#0071bd]/0 to-transparent z-20"></div>
      
      <div 
        class="absolute inset-0 z-20 opacity-5 pointer-events-none mix-blend-overlay"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.7\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>
    </div>

    <div class="relative z-30 max-w-[1400px] mx-auto px-6 lg:px-8 h-full flex flex-col pt-24 pb-12 lg:pt-32">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 flex-1">
        
        <div class="lg:col-span-8 flex flex-col justify-end h-full text-white pb-6">
          <div class="flex flex-col justify-end">
            
            <transition 
              mode="out-in" 
              enter-active-class="transition duration-700 ease-out" 
              enter-from-class="opacity-0 translate-y-8" 
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0 -translate-y-4"
            >
              <div :key="current" class="space-y-6 relative">
                
                <div class="flex items-center gap-4">
                  <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 transform"></span>
                  <span class="w-12 h-[2px] bg-[#38a935]"></span>
                  <span class="text-[#38a935] text-xs font-bold uppercase tracking-[0.25em]">
                    {{ slides[current].tag }}
                  </span>
                </div>
                
                <h1 class="text-4xl md:text-6xl lg:text-[50px] font-bold tracking-tight leading-[1.05] max-w-4xl text-white">
                  {{ slides[current].titlePrefix }}
                  <span class="block text-[#ffe900] mt-2 xl:mt-4 relative inline-block">
                    {{ slides[current].highlight }}
                    <span 
                      class="absolute -bottom-3 left-0 w-1/2 h-[6px]" 
                      style="background: repeating-linear-gradient(45deg, #38a935, #38a935 4px, transparent 4px, transparent 8px);"
                    ></span>
                  </span>
                </h1>
                
                <p class="max-w-2xl text-white/90 text-base md:text-lg lg:text-xl font-light leading-relaxed pt-6 pl-6 mt-8 relative">
                  <span class="absolute left-0 top-6 bottom-0 w-[4px]" style="background: repeating-linear-gradient(0deg, #ffe900, #ffe900 8px, transparent 8px, transparent 12px);"></span>
                  {{ slides[current].text }}
                </p>
              </div>
            </transition>

          </div>

          <div class="flex flex-wrap items-center gap-8 mt-14">
            
            <a href="#decouvrir" class="relative group">
              <div class="absolute inset-0 bg-[#38a935] translate-x-3 translate-y-3 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div class="relative bg-[#ffe900] text-[#0071bd] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 border-2 border-transparent group-hover:border-[#0071bd] transition-colors">
                <span class="w-1.5 h-1.5 bg-[#0071bd] rotate-45 mr-1"></span>
                Découvrir le réseau
                <i class="ri-arrow-right-line text-lg transform transition-transform group-hover:translate-x-1 ml-2"></i>
              </div>
            </a>
            
            <a href="#etablissements" class="relative group">
              <div class="absolute inset-0 border border-white/20 translate-x-3 translate-y-3 transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-[#ffe900]/50"></div>
              <div class="relative text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] border border-white/20 bg-[#0071bd]/30 backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#0071bd]/50 group-hover:text-[#ffe900]">
                Nos établissements
              </div>
            </a>

          </div>
        </div>

        <div class="hidden lg:flex lg:col-span-3 lg:col-start-10 flex-col justify-end h-full relative pb-6">
            <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ffe900]"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ffe900]"></div>
            
          

            <div class=" pt-6 flex items-center justify-between">
               
               <div class="w-12 h-[4px]" style="background: repeating-linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.3) 2px, transparent 2px, transparent 4px);"></div>

               <div class="flex gap-3">
                 <button @click="handlePrev" class="w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-[#ffe900] hover:text-[#0071bd] hover:border-[#ffe900] transition-all transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#38a935]">
                   <i class="ri-arrow-left-line"></i>
                 </button>
                 <button @click="handleNext" class="w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-[#ffe900] hover:text-[#0071bd] hover:border-[#ffe900] transition-all transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#38a935]">
                   <i class="ri-arrow-right-line"></i>
                 </button>
               </div>
            </div>
        
        </div>

      </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full h-[4px] bg-white/10 z-40">
      <div class="h-full bg-[#38a935] transition-all duration-75 ease-linear relative" :style="{ width: `${progress}%` }">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-[#ffe900] rotate-45"></div>
      </div>
    </div>

  </section>
</template>