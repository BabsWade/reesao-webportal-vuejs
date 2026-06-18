<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref(0);
const navContainer = ref(null);
const canScrollRight = ref(true);

// Vérifie s'il reste de l'espace pour scroller à droite
const checkScroll = () => {
  if (!navContainer.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = navContainer.value;
  // Marge de tolérance de 2px pour les arrondis de calcul sur mobile
  canScrollRight.value = Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2;
};

// Écouteurs pour le redimensionnement de la fenêtre afin d'adapter l'indicateur
onMounted(() => {
  // Un léger délai pour s'assurer que le DOM est totalement rendu
  setTimeout(checkScroll, 100);
  window.addEventListener('resize', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScroll);
});

// Données de la procédure d'adhésion
const steps = [
  {
    number: "01",
    shortTitle: "Soumission",
    title: "Soumission de la demande",
    description: "L’établissement souhaitant adhérer au REESAO adresse une lettre officielle de demande d’adhésion au Président du Réseau, exprimant formellement son intérêt à rejoindre le REESAO.",
    icon: "ri-mail-send-line",
    color: "text-[#0071bd]",
    bgColor: "bg-[#0071bd]",
    borderColor: "border-[#0071bd]",
    pattern: "url(#texture-african-blue)",
    patternFill: "#0071bd",
    list: []
  },
  {
    number: "02",
    shortTitle: "Dossier",
    title: "Constitution du dossier",
    description: "La lettre de demande est accompagnée d’un dossier numérique de présentation de l’établissement, comportant notamment les éléments suivants :",
    icon: "ri-folder-info-line",
    color: "text-[#38a935]",
    bgColor: "bg-[#38a935]",
    borderColor: "border-[#38a935]",
    pattern: "url(#texture-african-green)",
    patternFill: "#38a935",
    list: [
      "La date de création de l’établissement",
      "Les filières ou programmes de formation proposés",
      "Les effectifs d’étudiants et d’enseignants",
      "Toute autre information pertinente permettant d’apprécier le profil et les activités de l’établissement"
    ]
  },
  {
    number: "03",
    shortTitle: "Recevabilité",
    title: "Condition de recevabilité",
    description: "La demande d’adhésion est jugée recevable sous réserve de la participation effective d’un représentant officiel de l’établissement (le Recteur, le Directeur ou son représentant dûment mandaté) à la prochaine Conférence des Recteurs du REESAO.",
    icon: "ri-presentation-fill",
    color: "text-[#ffe900]",
    bgColor: "bg-[#ffe900]",
    borderColor: "border-[#ffe900]",
    pattern: "url(#texture-african-yellow)",
    patternFill: "#ffe900",
    list: []
  },
  {
    number: "04",
    shortTitle: "Examen",
    title: "Examen de la demande",
    description: "Le dossier d’adhésion est soumis à l’examen de la Conférence des Recteurs, qui émet un premier avis sur la demande.",
    icon: "ri-search-eye-line",
    color: "text-[#0071bd]",
    bgColor: "bg-[#0071bd]",
    borderColor: "border-[#0071bd]",
    pattern: "url(#texture-african-blue)",
    patternFill: "#0071bd",
    list: []
  },
  {
    number: "05",
    shortTitle: "Notification",
    title: "Notification et suite",
    description: "En cas d’avis favorable, le Président du REESAO adresse à l’établissement une notification officielle comprenant :",
    icon: "ri-checkbox-circle-line",
    color: "text-[#38a935]",
    bgColor: "bg-[#38a935]",
    borderColor: "border-[#38a935]",
    pattern: "url(#texture-african-green)",
    patternFill: "#38a935",
    list: [
      "Une lettre d’acceptation provisoire",
      "La liste des pièces et documents complémentaires requis pour la finalisation du processus d’adhésion"
    ]
  }
];
</script>

<template>
  <main class="relative bg-white font-sans min-h-screen pt-32 pb-20 overflow-hidden" aria-labelledby="adhesion-title">
    
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

    <div class="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8">
      
      <header class="text-center mb-16 flex flex-col items-center">
        <div class="flex gap-1 mb-6">
          <div class="w-8 h-1.5 bg-[#0071bd]"></div>
          <div class="w-8 h-1.5 bg-[#38a935]"></div>
          <div class="w-8 h-1.5 bg-[#ffe900]"></div>
        </div>
        
        <h1 id="adhesion-title" class="text-3xl md:text-4xl lg:text-5xl font-black text-[#001a2e] uppercase tracking-tighter mb-4">
          Procédure d'adhésion
        </h1>
        <p class="text-sm md:text-base font-bold text-[#0071bd] uppercase tracking-[0.2em] max-w-2xl text-center">
          Rejoignez le Réseau pour l'Excellence de l'Enseignement Supérieur
        </p>
      </header>

      <div class="flex flex-col gap-10">
        
        <div class="relative w-full">
          
          <nav 
            ref="navContainer"
            @scroll="checkScroll"
            class="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-4 border-b border-[#001a2e]/10 snap-x relative z-10" 
            role="tablist" 
            aria-label="Étapes d'adhésion"
          >
            <button
              v-for="(step, index) in steps"
              :key="'nav-' + index"
              role="tab"
              :aria-selected="activeTab === index"
              :aria-controls="'tabpanel-' + index"
              :id="'tab-' + index"
              @click="activeTab = index"
              class="relative flex-1 min-w-[140px] md:min-w-0 flex flex-col items-center justify-center p-4 transition-all duration-300 snap-center focus:outline-none group"
            >
              <div 
                class="absolute top-0 left-0 w-full h-[3px] transition-all duration-300 origin-left"
                :class="activeTab === index ? step.bgColor : 'bg-transparent scale-x-0 group-hover:scale-x-100 group-hover:bg-[#001a2e]/10'"
              ></div>

              <div class="flex flex-col items-center gap-2 relative z-10">
                <div 
                  class="w-12 h-12 flex items-center justify-center border-2 transition-all duration-300"
                  :class="activeTab === index ? [step.bgColor, 'border-transparent text-white shadow-lg rotate-12 scale-110'] : 'bg-white border-[#001a2e]/10 text-[#001a2e]/40 group-hover:border-[#0071bd]/30 group-hover:text-[#0071bd]'"
                >
                  <i :class="[step.icon]" class="text-xl transition-transform duration-300 activeTab === index ? '-rotate-12' : ''"></i>
                </div>
                <div class="text-center mt-2">
                  <span 
                    class="block text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 transition-colors"
                    :class="activeTab === index ? step.color : 'text-[#001a2e]/40'"
                  >
                    Étape {{ step.number }}
                  </span>
                  <span 
                    class="block text-sm font-bold transition-colors"
                    :class="activeTab === index ? 'text-[#001a2e]' : 'text-[#001a2e]/60 group-hover:text-[#001a2e]'"
                  >
                    {{ step.shortTitle }}
                  </span>
                </div>
              </div>
            </button>
          </nav>

          <transition name="fade">
            <div v-if="canScrollRight" class="absolute top-0 right-0 bottom-4 w-24 flex items-center justify-end pointer-events-none md:hidden z-20">
              <div class="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent"></div>
              <div class="relative right-2 w-8 h-8 rounded-full bg-white shadow-[0_2px_10px_rgba(0,113,189,0.2)] flex items-center justify-center text-[#0071bd] animate-bounce-x">
                <i class="ri-arrow-right-s-line text-lg"></i>
              </div>
            </div>
          </transition>

        </div>

        <div class="relative w-full min-h-[300px]">
          <transition name="tab-fade" mode="out-in">
            <div 
              :key="activeTab"
              role="tabpanel"
              :id="'tabpanel-' + activeTab"
              :aria-labelledby="'tab-' + activeTab"
              class="relative w-full"
            >
              <svg class="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 z-0 w-full h-full pointer-events-none">
                <rect width="100%" height="100%" :fill="steps[activeTab].pattern" />
              </svg>

              <div class="relative z-10 bg-white border border-[#001a2e]/10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 lg:gap-12 items-start overflow-hidden">
                
                <div 
                  class="absolute -right-8 -bottom-16 text-[200px] font-black opacity-5 pointer-events-none select-none leading-none"
                  :style="{ color: steps[activeTab].patternFill }"
                >
                  {{ steps[activeTab].number }}
                </div>

                <div class="hidden md:flex flex-col items-center gap-4 shrink-0 mt-2">
                  <div class="w-16 h-16 flex items-center justify-center border-4" :class="steps[activeTab].borderColor">
                    <i :class="[steps[activeTab].icon, steps[activeTab].color]" class="text-3xl"></i>
                  </div>
                  <div class="w-0.5 h-full min-h-[100px] opacity-30" :style="`background: repeating-linear-gradient(to bottom, ${steps[activeTab].patternFill}, ${steps[activeTab].patternFill} 4px, transparent 4px, transparent 8px);`"></div>
                </div>

                <div class="flex-grow relative z-10">
                  <div class="flex items-center gap-3 mb-4">
                    <span class="w-2.5 h-2.5 rotate-45 block" :class="steps[activeTab].bgColor"></span>
                    <span class="text-xs font-black uppercase tracking-[0.2em]" :class="steps[activeTab].color">
                      Étape {{ steps[activeTab].number }}
                    </span>
                  </div>
                  
                  <h2 class="text-2xl md:text-3xl lg:text-4xl font-black text-[#001a2e] mb-6">
                    {{ steps[activeTab].title }}
                  </h2>
                  
                  <p class="text-[#001a2e]/70 leading-relaxed text-base md:text-lg mb-8">
                    {{ steps[activeTab].description }}
                  </p>

                  <ul v-if="steps[activeTab].list.length > 0" class="space-y-4 bg-[#f8fafc] p-6 border-l-4" :class="steps[activeTab].borderColor">
                    <li 
                      v-for="(item, iIdx) in steps[activeTab].list" 
                      :key="'list-' + activeTab + '-' + iIdx"
                      class="flex items-start gap-3"
                    >
                      <i class="ri-arrow-right-s-fill mt-1 text-xl" :class="steps[activeTab].color"></i>
                      <span class="text-[#001a2e]/80 leading-snug">{{ item }}</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="mt-24 border-t border-dashed border-[#0071bd]/20 pt-16 text-center flex flex-col items-center relative z-20">
        <span class="w-3 h-3 bg-[#ffe900] rotate-45 block mb-6"></span>
        <h2 class="text-xl md:text-2xl font-black text-[#001a2e] mb-4">Prêt à rejoindre le réseau ?</h2>
        <p class="text-[#001a2e]/60 text-sm max-w-lg mb-8">
          Préparez votre dossier et contactez le bureau exécutif pour initier la première étape de votre adhésion.
        </p>
        
        <a href="mailto:contact@reesao.org" class="relative group inline-block">
          <div class="absolute inset-0 bg-[#ffe900] translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          <div class="relative bg-[#0071bd] text-white px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] border border-white/20 flex items-center gap-3 transition-colors group-hover:bg-[#001a2e]">
            <i class="ri-mail-send-line text-lg"></i>
            Envoyer une demande
          </div>
        </a>
      </div>

    </div>
  </main>
</template>

<style scoped>
/* Adoucissement global de la typo */
main {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Masquer la scrollbar pour le menu des onglets sur mobile tout en gardant le défilement */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Animations de transition pour le changement d'onglet */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.98);
}

/* Animation de disparition fluide pour l'indicateur de scroll */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Micro-animation personnalisée pour la flèche (mouvement de gauche à droite) */
@keyframes bounce-horizontal {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}
.animate-bounce-x {
  animation: bounce-horizontal 1.5s infinite ease-in-out;
}
</style>