<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import slide1 from '../assets/hero.jpg' 

const missions = [
  { 
    text: "Le REESAO a pour mission de définir, dans un esprit de solidarité et de synergie, les voies et les moyens indispensables à la mise en place du LMD (Licence - Master - Doctorat) en partenariat avec les institutions nationales et internationales (telles que l'AUF, le CAMES, l'UEMOA, etc.) ;", 
    icon: "ri-links-line" 
  },
];

const objectifs = [
  { text: "Créer un espace ouest-africain de l’enseignement supérieur ;", icon: "ri-flight-takeoff-line" },
  { text: "Promouvoir une politique de coopération universitaire axée prioritairement sur la modernisation de l’offre de formation ;", icon: "ri-global-line" },
  { text: "Assurer l’harmonisation, la comparabilité et la lisibilité des formations et des qualifications ;", icon: "ri-shield-user-line" },
  { text: "Faciliter la mobilité des étudiants et des personnels ;", icon: "ri-group-line" },
  { text: "Favoriser la mutualisation des ressources et l’insertion professionnelle ;", icon: "ri-hand-coin-line" },
  { text: "Développer la recherche et l’innovation.", icon: "ri-microscope-line" },
];

const bgImage = slide1;

// --- LOGIQUE DU CARROUSEL ---
const carouselRef = ref(null);
const autoplayInterval = ref(null);
const isHovered = ref(false);

const scrollNext = () => {
  if (!carouselRef.value) return;
  const el = carouselRef.value;
  const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
  
  if (isAtEnd) {
    el.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    const cardWidth = el.children[0].offsetWidth + 32; 
    el.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
};

const scrollPrev = () => {
  if (!carouselRef.value) return;
  const el = carouselRef.value;
  
  if (el.scrollLeft <= 0) {
    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  } else {
    const cardWidth = el.children[0].offsetWidth + 32;
    el.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }
};

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    if (!isHovered.value) {
      scrollNext();
    }
  }, 4000);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <section class="relative py-24 md:py-32 bg-[#0071bd]/50 overflow-hidden font-sans border-y border-white/10" aria-label="Missions et Objectifs">
    
    <svg width="0" height="0" class="absolute pointer-events-none">
      <defs>
        <pattern id="objectifs-texture-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div class="absolute inset-0 z-0">
      <img 
        :src="bgImage" 
        alt="Architecture universitaire" 
        class="w-full h-full object-cover scale-105 select-none pointer-events-none"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-[#38a935]/80 via-[#38a935]/80 to-[#0071bd]/80"></div>
    </div>

    <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-missions-diamonds" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#ffffff" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-missions-diamonds)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <header class="mb-16 lg:mb-20 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
          <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></span>
          <span class="text-[#ffe900] text-[11px] font-bold uppercase tracking-[0.2em] font-mono">
            Directives Stratégiques
          </span>
          <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></span>
          <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
        </div>
        
        <h2 class="text-4xl md:text-5xl lg:text-[56px] text-white font-bold leading-[1.05] tracking-tight">
          Nos engagements fondamentaux <br />
          <span class="text-[#0071bd] relative inline-block mt-2">
            pour l'espace ouest-africain.
            <span class="absolute -bottom-3 right-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></span>
          </span>
        </h2>
      </header>

      <div class="mb-20">
        <div class="border-b border-white/10 pb-6 mb-8 flex justify-center">
          <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
            <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
            Mission Institutionnelle
            <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
          </h3>
        </div>
        
        <div 
          v-for="(item, i) in missions" 
          :key="'mission-' + i" 
          class="group bg-white/[0.02] border border-white/10 p-8 lg:p-12 transition-all duration-300 hover:border-[#ffe900]/30 hover:bg-white/[0.04] relative flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 m-3 transition-colors group-hover:border-[#ffe900]/40"></div>
          <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 m-3 transition-colors group-hover:border-[#ffe900]/40"></div>

          <div class="w-20 h-20 shrink-0 border border-white/10 bg-white/5 flex items-center justify-center text-[#ffe900] group-hover:bg-[#ffe900] group-hover:text-[#0071bd] group-hover:border-[#ffe900] transition-colors duration-500">
            <i :class="item.icon" class="text-3xl"></i>
          </div>
          
          <p class="text-white/80 font-light text-lg lg:text-xl leading-relaxed transition-colors duration-300 text-center md:text-left">
            {{ item.text }}
          </p>
        </div>
      </div>

      <div 
        class="relative"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div class="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6 mb-8">
          <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
            <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></span>
            Objectifs de Modernisation
          </h3>
          
          <div class="flex items-center gap-3">
            <button 
              @click="scrollPrev"
              class="w-10 h-10 flex items-center justify-center border border-white/20 text-white/50 hover:bg-[#ffe900] hover:text-[#0071bd] hover:border-[#ffe900] transition-all duration-300 focus:outline-none"
              aria-label="Objectif précédent"
            >
              <i class="ri-arrow-left-line text-lg"></i>
            </button>
            <button 
              @click="scrollNext"
              class="w-10 h-10 flex items-center justify-center border border-white/20 text-white/50 hover:bg-[#ffe900] hover:text-[#0071bd] hover:border-[#ffe900] transition-all duration-300 focus:outline-none"
              aria-label="Objectif suivant"
            >
              <i class="ri-arrow-right-line text-lg"></i>
            </button>
          </div>
        </div>

        <div 
          ref="carouselRef"
          class="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-8 hide-scrollbar scroll-smooth"
        >
          <div 
            v-for="(obj, i) in objectifs" 
            :key="'obj-' + i"
            class="snap-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21px)] flex-none relative group h-auto min-h-[220px] cursor-default"
          >
            <svg class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3 z-0 w-full h-full">
              <rect width="100%" height="100%" fill="url(#objectifs-texture-green)" />
            </svg>
            
            <div class="relative bg-[#0071bd]/40 border border-white/10 p-8 flex flex-col h-full z-10 transition-all duration-500 group-hover:border-[#ffe900]/30 backdrop-blur-md group-hover:-translate-x-1 group-hover:-translate-y-1">
              
              <span class="absolute top-6 right-6 font-mono text-[10px] font-bold text-white/30 group-hover:text-[#ffe900] transition-colors duration-300">
                // [0{{ i + 1 }}]
              </span>

              <div class="mb-10 text-[#ffe900] opacity-80 group-hover:opacity-100 transition-opacity flex">
                <div class="relative">
                  <i :class="obj.icon" class="text-3xl relative z-10"></i>
                  <span class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#38a935] rotate-45 block"></span>
                </div>
              </div>
              
              <p class="text-sm lg:text-base font-semibold text-white leading-snug tracking-tight mt-auto">
                {{ obj.text }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer class="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/30">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 bg-[#ffe900] rotate-45 block"></span>
          <span>Cadre Stratégique Harmonisé</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-[1px] bg-white/10"></span>
          Secrétariat Exécutif du REESAO • Réglementation 2026
        </div>
      </footer>
      
    </div>
  </section>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>