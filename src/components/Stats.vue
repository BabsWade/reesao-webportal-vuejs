<script setup>
import { ref } from 'vue';
import uemoaLogo from "../assets/Logo_UEMOA.png";
import camesLogo from "../assets/Cames-Logo.svg.png";
import cedeaoLogo from "../assets/CEDEAO_Logo.svg.png";
import aufLogo from "../assets/Logo_AUF.svg.png";
import univlome from "../assets/univlome-siege.jpeg";
import univlomeLogo from "../assets/LOGO-COULEUR-TRANSP.png";
import { onMounted, onUnmounted } from 'vue';

const scrollContainer = ref(null);
let animationFrameId = null;
const isHovered = ref(false);
const isTemporarilyPaused = ref(false);
let tempPauseTimer = null;

const SCROLL_SPEED = 1; // Pixels par frame (vitesse du défilement)
const JUMP_AMOUNT = 320; // Distance parcourue lors d'un clic (ajustable)

const autoScroll = () => {
  // On ne fait défiler automatiquement que si la souris n'est pas dessus 
  // et si l'utilisateur n'est pas en train d'utiliser les flèches
  if (scrollContainer.value && !isHovered.value && !isTemporarilyPaused.value) {
    const el = scrollContainer.value;
    
    // Comme nous avons 3 blocs identiques, un bloc représente 1/3 de la largeur totale
    const singleBlockWidth = el.scrollWidth / 3;
    
    el.scrollLeft += SCROLL_SPEED;

    // Boucle infinie invisible : si on a dépassé le premier bloc, on le réinitialise
    if (el.scrollLeft >= singleBlockWidth) {
      el.scrollLeft -= singleBlockWidth;
    }
  }
  animationFrameId = requestAnimationFrame(autoScroll);
};

// Pause temporaire de l'auto-défilement pour laisser le "smooth scroll" manuel se faire
const pauseAutoScroll = () => {
  isTemporarilyPaused.value = true;
  if (tempPauseTimer) clearTimeout(tempPauseTimer);
  tempPauseTimer = setTimeout(() => {
    isTemporarilyPaused.value = false;
  }, 800); // Reprend l'auto-défilement environ 800ms après le clic
};

const slideLeft = () => {
  const el = scrollContainer.value;
  if (!el) return;
  
  pauseAutoScroll();
  const singleBlockWidth = el.scrollWidth / 3;

  // Si on est trop près du bord gauche, on saute instantanément dans le bloc 2 pour avoir de la marge
  if (el.scrollLeft < JUMP_AMOUNT) {
    el.scrollLeft += singleBlockWidth;
  }
  
  el.scrollBy({ left: -JUMP_AMOUNT, behavior: 'smooth' });
};

const slideRight = () => {
  const el = scrollContainer.value;
  if (!el) return;
  
  pauseAutoScroll();
  const singleBlockWidth = el.scrollWidth / 3;

  // Si on est trop près de la fin, on revient discrètement au début avant le slide
  if (el.scrollLeft >= singleBlockWidth * 2 - JUMP_AMOUNT) {
    el.scrollLeft -= singleBlockWidth;
  }
  
  el.scrollBy({ left: JUMP_AMOUNT, behavior: 'smooth' });
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(autoScroll);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  if (tempPauseTimer) clearTimeout(tempPauseTimer);
});

const activeIndex = ref(null);
const isMarqueePaused = ref(false);

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
    description: "Curricula finalisés en Sciences Économiques et Sciences de Gestion.",
    textColor: "text-[#0071bd]",
    accentPattern: "url(#texture-african-blue)",
    borderColor: "group-hover:border-[#0071bd]"
  }
];

// Informations dédiées au siège régional
const siege = {
  name: "Université de Lomé",
  country: "Togo",
  image: univlome,
  description: "Institution fondatrice (2005) et hébergeur officiel des instances dirigeantes du réseau. C'est ici que se coordonnent nos actions communes.",
  logo: univlomeLogo,
  url: "https://univ-lome.tg"
};

// Liste des partenaires
const partners = [
  { name: "CAMES", url: "https://www.lecames.org", logo: "https://placehold.co/200x80/ffffff/0071bd?text=CAMES", Image: camesLogo },
  { name: "UEMOA", url: "https://www.uemoa.int", logo: "https://placehold.co/200x80/ffffff/38a935?text=UEMOA", Image: uemoaLogo },
  { name: "AUF", url: "https://www.auf.org", logo: "https://placehold.co/200x80/ffffff/ffe900?text=AUF", Image: aufLogo },
  { name: "CEDEAO", url: "https://ecowas.int", logo: "https://placehold.co/200x80/ffffff/0071bd?text=CEDEAO", Image: cedeaoLogo }
];

const toggleMarquee = (state) => {
  isMarqueePaused.value = state;
};
</script>

<template>
  <section class="relative bg-white font-sans overflow-hidden border-y border-[#0071bd]/10 py-12 lg:py-20" id="stats" aria-label="Bandeau Indicateurs et Partenaires">
    
    <!-- Fond Filigrane -->
    <div 
      class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <!-- Définition des Textures Africaines -->
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
      
      <!-- ====================== -->
      <!-- 1. BLOC DES CHIFFRES -->
      <!-- ====================== -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-center">
        <!-- Titre -->
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

        <!-- Cartes -->
        <div class="xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
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

      <!-- Séparateur -->
      <div class="my-16 border-t border-dashed border-[#0071bd]/10 relative">
        <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#38a935] rotate-45 block"></span>
      </div>

      <!-- ========================== -->
      <!-- 2. BLOC DU SIÈGE RÉGIONAL  -->
      <!-- ========================== -->
      <div class="max-w-5xl mx-auto mb-20">
        <div class="relative group">
          
          <!-- Application de la texture africaine en fond -->
          <svg class="absolute inset-0 translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4 transition-transform duration-300 ease-out z-0 w-full h-full">
            <rect width="100%" height="100%" fill="url(#texture-african-blue)" />
          </svg>

          <!-- Carte Horizontale -->
          <div class="relative bg-white border border-[#0071bd]/10 flex flex-col md:flex-row z-10 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
            
            <!-- Gauche: Image de couverture -->
            <div class="w-full md:w-2/5 relative h-56 md:h-auto overflow-hidden bg-[#38a935] shrink-0">
              <div class="absolute inset-0 bg-[#38a935]/20 z-10 group-hover:bg-[#38a935]/10 transition-colors duration-500"></div>
              <img :src="siege.image" :alt="'Vue de ' + siege.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <!-- Badge Pays -->
              <div class="absolute top-4 left-4 z-20 bg-[#ffe900] text-[#38a935] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <span class="w-1.5 h-1.5 bg-[#38a935] rounded-sm rotate-45 block"></span>
                {{ siege.country }}
              </div>
            </div>

            <!-- Droite: Contenu textuel -->
            <div class="w-full md:w-3/5 relative p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              
              <!-- Logo Superposé à la jointure -->
              <div class="absolute -top-10 md:top-1/2 md:-translate-y-1/2 left-6 md:-left-12 w-20 h-20 bg-white border border-[#0071bd]/10 z-20 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <img :src="siege.logo" :alt="'Logo ' + siege.name" class="w-full h-full object-contain" />
              </div>

              <div class="md:ml-8 lg:ml-12">
                <div class="flex items-center gap-2 mb-3 mt-10">
                  <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span>
                  <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]">Siège Régional</h3>
                </div>
                
                <h4 class="text-2xl lg:text-3xl font-black text-[#38a935] mb-4 leading-tight">{{ siege.name }}</h4>
                <p class="text-[13px] text-[#0071bd]/75 leading-relaxed mb-8">{{ siege.description }}</p>
                
                <!-- Action Link -->
                <a :href="siege.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 group/link">
                  <span class="w-8 h-8 rounded-full bg-[#0071bd]/5 flex items-center justify-center text-[#0071bd] group-hover/link:bg-[#0071bd] group-hover/link:text-white transition-colors duration-300">
                    <i class="ri-arrow-right-line text-sm"></i>
                  </span>
                  <span class="text-[11px] font-bold text-[#0071bd] group-hover/link:text-[#38a935] transition-colors uppercase tracking-widest">
                    Visiter le portail officiel
                  </span>
                </a>
              </div>
            </div>

            

          </div>
        </div>
      </div>

      <!-- ========================== -->
      <!-- 3. BLOC DES PARTENAIRES    -->
      <!-- ========================== -->
<div class="w-full border-t border-[#0071bd]/10 pt-10">
        
        <!-- En-tête Partenaires -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-1.5 h-1.5 bg-[#ffe900] rotate-45 block"></span>
              <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]">Synergie & Coopération</h3>
            </div>
            <h4 class="text-xl font-black text-[#38a935]">Partenaires Stratégiques</h4>
          </div>
          
          <!-- Contrôles Gauche/Droite -->
          <div class="flex items-center gap-1 border border-[#0071bd]/20 p-0.5 bg-white shrink-0">
            <button 
              @click="slideLeft" 
              class="w-8 h-8 flex items-center justify-center text-[#0071bd]/50 hover:bg-[#0071bd]/5 hover:text-[#0071bd] transition-colors focus:outline-none"
              aria-label="Défiler à gauche"
            >
              <i class="ri-arrow-left-s-line text-lg"></i>
            </button>
            <button 
              @click="slideRight" 
              class="w-8 h-8 flex items-center justify-center text-[#0071bd]/50 hover:bg-[#0071bd]/5 hover:text-[#0071bd] transition-colors focus:outline-none"
              aria-label="Défiler à droite"
            >
              <i class="ri-arrow-right-s-line text-lg"></i>
            </button>
          </div>
        </div>

        <!-- Zone d'animation (Pleine largeur) -->
        <div class="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
          
          <!-- Conteneur défilant -->
          <div 
            ref="scrollContainer"
            class="flex w-full overflow-x-auto gap-8 py-2 hide-scrollbar cursor-grab active:cursor-grabbing"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
            <!-- Bloc 1 -->
            <div class="flex gap-8 shrink-0">
              <a 
                v-for="(partner, pIdx) in partners" 
                :key="'p1-' + pIdx"
                :href="partner.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative block w-48 h-24 bg-white border border-[#0071bd]/10 p-5 transition-all hover:border-[#0071bd] focus:outline-none"
              >
                <div class="absolute inset-0 bg-[#ffe900]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <img 
                  :src="partner.Image" 
                  :alt="'Image ' + partner.name" 
                  class="w-full h-full object-contain filter contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
              </a>
            </div>

            <!-- Bloc 2 (Clone indispensable pour la boucle infinie) -->
            <div class="flex gap-8 shrink-0" aria-hidden="true">
              <a 
                v-for="(partner, pIdx) in partners" 
                :key="'p2-' + pIdx"
                :href="partner.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative block w-48 h-24 bg-white border border-[#0071bd]/10 p-5 transition-all hover:border-[#0071bd] focus:outline-none"
              >
                <div class="absolute inset-0 bg-[#ffe900]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <img 
                  :src="partner.Image" 
                  :alt="'Image ' + partner.name" 
                  class="w-full h-full object-contain filter contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
              </a>
            </div>
            
             <!-- Bloc 3 (Clone supplémentaire pour les retours en arrière fluides) -->
             <div class="flex gap-8 shrink-0" aria-hidden="true">
              <a 
                v-for="(partner, pIdx) in partners" 
                :key="'p3-' + pIdx"
                :href="partner.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative block w-48 h-24 bg-white border border-[#0071bd]/10 p-5 transition-all hover:border-[#0071bd] focus:outline-none"
              >
                <div class="absolute inset-0 bg-[#ffe900]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <img 
                  :src="partner.Image" 
                  :alt="'Image ' + partner.name" 
                  class="w-full h-full object-contain filter contrast-125 group-hover:grayscale-0 transition-all duration-300"
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
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.33%); } /* Ajusté car on a 3 blocs pour éviter les blancs */
}

.marquee-wrapper {
  animation: marquee 20s linear infinite;
}

/* Interruption de l'animation via les boutons ou au survol */
.marquee-paused,
.marquee-wrapper:hover {
  animation-play-state: paused;
}
/* Permet de cacher la barre de défilement générée par "overflow-x-auto" */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;    /* Firefox */
}

</style>