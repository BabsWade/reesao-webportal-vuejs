<script setup>
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

// Image de fond institutionnelle
const bgImage = slide1;
</script>

<template>
  <section class="relative py-24 md:py-32 bg-[#0071bd] overflow-hidden font-sans border-y border-white/10" aria-label="Missions et Objectifs">
    
    <!-- ARRIÈRE-PLAN : Image texturée + Masque d'opacité sombre pour contraste maximal -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="bgImage" 
        alt="Architecture universitaire" 
        class="w-full h-full object-cover grayscale opacity-[0.08] scale-105 select-none pointer-events-none"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-[#0071bd]/40 via-transparent to-[#0071bd]/90"></div>
    </div>

    <!-- TRAME TECHNIQUE GÉOMÉTRIQUE (Losanges Traditionnels) -->
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
      
      <!-- EN-TÊTE DE SECTION -->
      <header class="mb-20 lg:mb-28 max-w-4xl">
        <div class="flex items-center gap-4 mb-6">
          <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
          <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
          <span class="text-[#ffe900] text-[11px] font-bold uppercase tracking-[0.2em] font-mono">
            Directives Stratégiques
          </span>
        </div>
        
        <h2 class="text-4xl md:text-5xl lg:text-[56px] text-white font-bold leading-[1.05] tracking-tight">
          Nos engagements fondamentaux <br />
          <span class="text-[#38a935] relative inline-block mt-2">
            pour l'espace universitaire ouest-africain.
            <!-- Soulignement tissé -->
            <span class="absolute -bottom-3 right-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></span>
          </span>
        </h2>
      </header>

      <!-- BLOC DE CONTENU ASYMÉTRIQUE -->
      <div class="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
        
        <!-- FLANC GAUCHE : MISSION FONDATRICE (Format Manifeste) -->
        <div class="lg:col-span-5 lg:sticky lg:top-32">
          <div class="border-b border-white/10 pb-6 mb-10">
            <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
              <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
              Mission Institutionnelle
            </h3>
          </div>
          
          <div 
            v-for="(item, i) in missions" 
            :key="'mission-' + i" 
            class="group bg-white/[0.02] border border-white/10 p-8 lg:p-10 transition-all duration-300 hover:border-[#ffe900]/30 hover:bg-white/[0.04] relative"
          >
            <!-- Ornement de coin -->
            <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 m-3 transition-colors group-hover:border-[#ffe900]/40"></div>

            <div class="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center text-[#ffe900] group-hover:bg-[#ffe900] group-hover:text-[#0071bd] group-hover:border-[#ffe900] transition-colors duration-300 mb-8">
              <i :class="item.icon" class="text-xl"></i>
            </div>
            
            <p class="text-white/80 font-light text-base lg:text-lg leading-relaxed transition-colors duration-300">
              {{ item.text }}
            </p>
          </div>
        </div>

        <!-- FLANC DROIT : OBJECTIFS STRATÉGIQUES (Grille texturée) -->
        <div class="lg:col-span-7">
          <div class="border-b border-white/10 pb-6 mb-10">
            <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
              <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></span>
              Objectifs de Modernisation
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <div 
              v-for="(obj, i) in objectifs" 
              :key="'obj-' + i"
              class="relative group h-full cursor-default"
            >
              <!-- Ombre 3D décalée (Style Vert REESAO) -->
              <div class="absolute inset-0 bg-[#38a935] translate-x-2 translate-y-2 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3 z-0"></div>
              
              <!-- Corps de la carte -->
              <div class="relative bg-[#0071bd] border border-white/10 p-8 flex flex-col h-full z-10 transition-colors duration-300 group-hover:border-white/30 backdrop-blur-sm">
                
                <!-- Index de registre -->
                <span class="absolute top-6 right-6 font-mono text-[10px] font-bold text-white/30 group-hover:text-[#ffe900] transition-colors duration-300">
                  // [0{{ i + 1 }}]
                </span>

                <div class="mb-12 text-[#ffe900] opacity-80 group-hover:opacity-100 transition-opacity flex">
                  <div class="relative">
                    <i :class="obj.icon" class="text-2xl relative z-10"></i>
                    <span class="absolute -bottom-1 -right-1 w-2 h-2 bg-[#38a935] rotate-45 block"></span>
                  </div>
                </div>
                
                <p class="text-sm lg:text-base font-semibold text-white leading-snug tracking-tight mt-auto">
                  {{ obj.text }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- PIED DE SECTION TECHNIQUE -->
      <footer class="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/30">
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