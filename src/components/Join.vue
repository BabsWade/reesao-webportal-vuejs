<script setup>
import { ref } from 'vue';

// L'index 0 est ouvert par défaut. Mettre 'null' si vous voulez que tout soit fermé au chargement.
const activeStep = ref(0);

// Fonction pour ouvrir/fermer un accordéon
const toggleStep = (index) => {
  activeStep.value = activeStep.value === index ? null : index;
};

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
  <main class="relative bg-white font-sans min-h-screen pt-20 md:pt-32 pb-20 overflow-hidden" aria-labelledby="adhesion-title">
    
    <div 
      class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.5\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
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

    <div class="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
      
     <header class="mb-16 lg:mb-20 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
          <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
          <span class="text-[#ffe900] text-[11px] font-bold uppercase tracking-[0.2em] font-mono">
Procédure d'adhésion          </span>
          <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
          <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
        </div>
        
        <h2 class="text-4xl md:text-5xl lg:text-[56px] text-[#0071bd] font-bold leading-[1.05] tracking-tight">
          Rejoignez le Réseau pour l'Excellence de l'Enseignement Supérieur <br />
          <span class="text-[#38a935] relative inline-block mt-2">
            de l'espace ouest-africain.
            <span class="absolute -bottom-3 right-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></span>
          </span>
        </h2>
      </header>

      <div class="flex flex-col gap-4 md:gap-6">
        
        <div 
          v-for="(step, index) in steps" 
          :key="'acc-' + index"
          class="relative w-full group"
        >
          <div 
            class="absolute inset-0 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 z-0 pointer-events-none transition-all duration-500 ease-out"
            :class="activeStep === index ? 'opacity-100' : 'opacity-0 translate-x-0 translate-y-0'"
          >
            <svg class="w-full h-full">
              <rect width="100%" height="100%" :fill="step.pattern" />
            </svg>
          </div>

          <div 
            class="relative z-10 bg-white border flex flex-col transition-all duration-300 overflow-hidden"
            :class="activeStep === index ? 'border-[#0071bd]/20 shadow-xl' : 'border-[#0071bd]/10 hover:border-[#0071bd]/30'"
          >
            
            <button 
              @click="toggleStep(index)"
              class="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
              :aria-expanded="activeStep === index"
              :aria-controls="'content-' + index"
              :id="'header-' + index"
            >
              <div class="flex items-center gap-4 md:gap-6 pr-4">
                <div 
                  class="w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center border-2 transition-all duration-300"
                  :class="activeStep === index ? [step.bgColor, 'border-transparent text-white rotate-12 scale-110'] : 'bg-white border-[#0071bd]/10 text-[#0071bd]/40 group-hover:border-[#0071bd]/30 group-hover:text-[#0071bd]'"
                >
                  <i :class="[step.icon]" class="text-xl md:text-2xl transition-transform duration-300 activeStep === index ? '-rotate-12' : ''"></i>
                </div>
                
                <div>
                  <span 
                    class="block text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-1 transition-colors"
                    :class="activeStep === index ? step.color : 'text-[#0071bd]/40'"
                  >
                    Étape {{ step.number }}
                  </span>
                  <h2 
                    class="text-base md:text-lg lg:text-xl font-bold transition-colors m-0 leading-tight"
                    :class="activeStep === index ? 'text-[#0071bd]' : 'text-[#0071bd]/70 group-hover:text-[#0071bd]'"
                  >
                    {{ step.title }}
                  </h2>
                </div>
              </div>

              <div 
                class="w-8 h-8 rounded-full flex shrink-0 items-center justify-center bg-[#f8fafc] transition-transform duration-300"
                :class="activeStep === index ? 'rotate-180 bg-[#0071bd]/5' : ''"
              >
                <i class="ri-arrow-down-s-line text-[#0071bd]/50 text-xl"></i>
              </div>
            </button>

            <div 
              :id="'content-' + index"
              :aria-labelledby="'header-' + index"
              class="grid transition-all duration-300 ease-in-out"
              :class="activeStep === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <div class="relative p-4 pt-0 md:p-6 md:pt-0 border-t border-[#0071bd]/5 mt-2">
                  
                  <div class="hidden md:block absolute left-[52px] top-6 bottom-0 w-0.5 opacity-30" :style="`background: repeating-linear-gradient(to bottom, ${step.patternFill}, ${step.patternFill} 4px, transparent 4px, transparent 8px);`"></div>

                  <div class="md:pl-[88px] relative z-10 pt-4 md:pt-6">
                    <p class="text-[#0071bd]/70 leading-relaxed text-sm md:text-base mb-6">
                      {{ step.description }}
                    </p>

                    <ul v-if="step.list.length > 0" class="space-y-3 bg-[#f8fafc] p-4 md:p-6 border-l-4" :class="step.borderColor">
                      <li 
                        v-for="(item, iIdx) in step.list" 
                        :key="'list-' + index + '-' + iIdx"
                        class="flex items-start gap-3"
                      >
                        <i class="ri-arrow-right-s-fill mt-0.5 text-lg" :class="step.color"></i>
                        <span class="text-[#0071bd]/80 text-sm md:text-base leading-snug">{{ item }}</span>
                      </li>
                    </ul>
                  </div>

                  <div 
                    class="absolute right-0 bottom-0 text-[100px] md:text-[140px] font-black opacity-[0.03] pointer-events-none select-none leading-none translate-y-8 translate-x-4"
                    :style="{ color: step.patternFill }"
                  >
                    {{ step.number }}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="mt-20 border-t border-dashed border-[#0071bd]/20 pt-16 text-center flex flex-col items-center relative z-20">
        <span class="w-3 h-3 bg-[#ffe900] rotate-45 block mb-6"></span>
        <h2 class="text-xl md:text-2xl font-black text-[#0071bd] mb-4">Prêt à rejoindre le réseau ?</h2>
        <p class="text-[#0071bd]/60 text-sm max-w-lg mb-8">
          Préparez votre dossier et contactez le bureau exécutif pour initier la première étape de votre adhésion.
        </p>
        
        <a href="mailto:contact@reesao.org" class="relative group inline-block">
          <div class="absolute inset-0 bg-[#ffe900] translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          <div class="relative bg-[#0071bd] text-white px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] border border-white/20 flex items-center gap-3 transition-colors group-hover:bg-[#0071bd]">
            <i class="ri-mail-send-line text-lg"></i>
            Envoyer une demande
          </div>
        </a>
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>