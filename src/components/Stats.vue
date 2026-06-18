<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const metrics = [
  {
    value: "41",
    label: "Institutions Membres",
    description: "Universités et centres de recherche interconnectés dans 7 pays.",
    textColor: "text-[#0071bd]",
    accentPattern: "url(#texture-african-blue)",
    borderColor: "group-hover:border-[#0071bd]"
  },
  {
    value: "20 Ans",
    label: "D'Impact Régional",
    description: "Au service de l'enseignement supérieur ouest-africain (2005–2025).",
    textColor: "text-[#38a935]",
    accentPattern: "url(#texture-african-green)",
    borderColor: "group-hover:border-[#38a935]"
  },
  {
    value: "20",
    label: "Éditions CRPDG",
    description: "Conférences annuelles réunissant plus de 30 responsables universitaires.",
    textColor: "text-[#ffe900]",
    accentPattern: "url(#texture-african-yellow)",
    borderColor: "group-hover:border-[#ffe900]"
  },
  {
    value: "2",
    label: "Domaines Harmonisés",
    description: "Curricula finalisés en Sciences Économiques et de Gestion.",
    textColor: "text-[#0071bd]",
    accentPattern: "url(#texture-african-blue)",
    borderColor: "group-hover:border-[#0071bd]"
  }
];

// Liste des partenaires (URLs officielles et fallbacks visuels)
const partners = [
  { name: "CAMES", url: "https://www.lecames.org", logo: "https://placehold.co/200x80/ffffff/0071bd?text=CAMES" },
  { name: "UEMOA", url: "https://www.uemoa.int", logo: "https://placehold.co/200x80/ffffff/38a935?text=UEMOA" },
  { name: "AUF", url: "https://www.auf.org", logo: "https://placehold.co/200x80/ffffff/ffe900?text=AUF" },
  { name: "Université de Lomé", url: "https://univ-lome.tg", logo: "https://placehold.co/200x80/ffffff/0071bd?text=Si%C3%A8ge+Lom%C3%A9" }
];
</script>

<template>
  <section class="relative bg-white font-sans overflow-hidden border-y border-[#0071bd]/10 py-12 lg:py-16" aria-label="Bandeau Indicateurs et Partenaires">
    
    <div 
      class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="texture-african-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.8"/>
        </pattern>

        <pattern id="texture-african-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.4" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.6" />
        </pattern>

        <pattern id="texture-african-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.1" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        <div class="xl:col-span-3 flex items-start gap-4 border-b xl:border-b-0 xl:border-r border-[#0071bd]/10 pb-6 xl:pb-0 pr-4 shrink-0">
          <div class="hidden sm:flex flex-col items-center gap-1.5 mt-1">
            <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
            <span class="w-1.5 h-10 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
            <span class="w-1.5 h-1.5 border border-[#0071bd] rotate-45 block mt-0.5"></span>
          </div>

          <div class="flex flex-col gap-1.5">
            <h2 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd] flex items-center gap-3">
              Le REESAO en chiffres
              <span class="w-6 h-[1px] bg-[#0071bd]/30"></span>
            </h2>
            <p class="text-sm font-bold text-[#0071bd] uppercase tracking-widest">Expansion & Impact</p>
          </div>
        </div>

        <div class="xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
          <article 
            v-for="(metric, index) in metrics" 
            :key="'metric-' + index"
            @mouseenter="activeIndex = index"
            @mouseleave="activeIndex = null"
            class="relative group cursor-default"
          >
            <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out z-0 w-full h-full">
              <rect width="100%" height="100%" :fill="metric.accentPattern" />
            </svg>
            
            <div 
              class="relative flex flex-col gap-3 py-5 px-6 bg-white border border-[#0071bd]/10 transition-transform duration-300 ease-out z-10 group-hover:-translate-x-1 group-hover:-translate-y-1"
              :class="metric.borderColor"
            >
              <div 
                class="text-2xl lg:text-3xl font-black tracking-tighter leading-none transition-transform duration-300 origin-left flex items-start gap-2"
                :class="[metric.textColor, activeIndex === index ? 'scale-105' : '']"
              >
                <span class="w-2 h-2 mt-2 shrink-0 bg-current opacity-30 rotate-45 block"></span>
                {{ metric.value }}
              </div>

              <div class="leading-relaxed mt-1 relative">
                <div class="absolute left-0 -top-2 w-8 h-[2px]" :style="`background: repeating-linear-gradient(45deg, currentColor, currentColor 2px, transparent 2px, transparent 4px); opacity: 0.3;`" :class="metric.textColor"></div>
                <h3 class="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0071bd] transition-colors duration-200 mt-2">
                  {{ metric.label }}
                </h3>
                <p class="text-xs text-[#0071bd]/70 font-light mt-1.5 leading-snug">
                  {{ metric.description }}
                </p>
              </div>
            </div>
          </article>
        </div>

      </div>

      <div class="my-12 border-t border-dashed border-[#0071bd]/10 relative">
        <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#38a935] rotate-45 block"></span>
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <span class="w-1.5 h-1.5 bg-[#0071bd] rotate-45 block"></span>
          <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]">Partenaires & Alliances Régionales</h3>
        </div>

        <div class="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-white after:to-transparent">
          
          <div class="marquee-wrapper flex w-max gap-8 py-2">
            
            <div class="flex gap-8 shrink-0">
              <a 
                v-for="(partner, pIdx) in partners" 
                :key="'p1-' + pIdx"
                :href="partner.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative block w-44 h-20 bg-white border border-[#0071bd]/10 p-4 transition-all hover:border-[#0071bd] focus:outline-none"
                :aria-label="'Visiter le site de ' + partner.name"
              >
                <div class="absolute inset-0 bg-[#ffe900]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <img 
                  :src="partner.logo" 
                  :alt="'Logo ' + partner.name" 
                  class="w-full h-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
              </a>
            </div>

            <div class="flex gap-8 shrink-0" aria-hidden="true">
              <a 
                v-for="(partner, pIdx) in partners" 
                :key="'p2-' + pIdx"
                :href="partner.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative block w-44 h-20 bg-white border border-[#0071bd]/10 p-4 transition-all hover:border-[#0071bd] focus:outline-none"
              >
                <div class="absolute inset-0 bg-[#ffe900]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <img 
                  :src="partner.logo" 
                  :alt="'Logo ' + partner.name" 
                  class="w-full h-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-wrapper {
  animation: marquee 25s linear infinite;
}

/* Pause l'animation au survol pour améliorer l'accessibilité lors du clic */
.marquee-wrapper:hover {
  animation-play-state: paused;
}
</style>