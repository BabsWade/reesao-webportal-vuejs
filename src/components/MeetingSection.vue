<script setup>
import slide1 from '../assets/hero.jpg' 
const videoUrl = "https://youtube.com/playlist?list=PLaWW_NW0uRaBcsb5MpAypH5lmaTDHB0YO&si=rjAApX83InJZXUYR";
const thumbnail = slide1;
</script>

<template>
  <section class="relative py-24 lg:py-32 bg-[#f8f9fa] overflow-hidden font-sans" aria-label="Médiathèque et Archives REESAO">
    
    <!-- NOUVEAU : Fond géométrique unifié (Losanges) en filigrane (Adapté pour fond clair) -->
    <div 
      class="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <!-- Définition des textures SVG pour les ombres portées -->
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Motif Bleu : Losanges concentriques -->
        <pattern id="texture-african-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.8"/>
        </pattern>

        <!-- Motif Jaune : Damier / Tissage -->
        <pattern id="texture-african-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.1" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <!-- 1. EN-TÊTE INSTITUTIONNEL -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-end">
        <div class="lg:col-span-7">
          
          <!-- Label Institutionnel Harmonisé -->
          <div class="flex items-center gap-4 mb-6">
            <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 transform"></span>
            <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
            <span class="text-[#38a935] text-[11px] font-bold uppercase tracking-[0.2em]">
              Rencontre
            </span>
          </div>
          
          <!-- Titre Principal avec soulignement tissé -->
          <h2 class="text-4xl md:text-5xl lg:text-[56px] text-[#0071bd] font-bold leading-[1.05] tracking-tight">
            Conférence des Recteurs, Présidents et Directeurs Généraux (CRPDG) du REESAO<br />
            <span class="text-[#38a935] relative inline-block mt-2">
              à l'UCAD, Sénégal
              <span class="absolute -bottom-2 left-0 w-1/2 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></span>
            </span>
          </h2>
        </div>

        <!-- Description Éditoriale Harmonisée -->
        <div class="lg:col-span-5 pb-2">
          <p class="text-[#0071bd]/70 text-base lg:text-lg font-light leading-relaxed max-w-lg relative pl-6">
            <span class="absolute left-0 top-1 bottom-1 w-[4px]" style="background: repeating-linear-gradient(0deg, #ffe900, #ffe900 6px, transparent 6px, transparent 10px);"></span>
            Thème 2025 : «Insertion professionnelle et entrepreneuriat étudiant: Interfaces entre universités, incubateurs, transferts de technologie et initiatives publiques-privées».
          </p>
        </div>
      </div>

      <!-- 2. LAYOUT PRINCIPAL (8 / 4) -->
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- ZONE VIDÉO PRINCIPALE (Col 8) -->
        <div class="lg:col-span-8 relative group">
          
          <!-- NOUVEAU : Ombre décalée texturée (Bleue) -->
          <svg class="absolute inset-0 translate-x-3.5 translate-y-3.5 transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2 z-0 w-full h-full">
            <rect width="100%" height="100%" fill="url(#texture-african-blue)" />
          </svg>
          
          <a 
            :href="videoUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="block relative aspect-[16/9] bg-[#0071bd] overflow-hidden border border-[#0071bd]/20 focus:outline-none z-10"
            aria-label="Lancer la vidéo de la conférence plénière"
          >
            <!-- Image avec effet de zoom -->
            <img 
              :src="thumbnail" 
              alt="Archive vidéo conférence" 
              class="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-105" 
            />
            
            <!-- Masque coloré institutionnel -->
            <div class="absolute inset-0 bg-[#0071bd]/30 transition-colors duration-500 group-hover:bg-transparent mix-blend-multiply"></div>
            
            <!-- Bouton Play Harmonisé (Géométrique) -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="relative w-20 h-20 group-hover:scale-110 transition-transform duration-500 ease-out">
                <div class="absolute inset-0 bg-[#38a935] translate-x-2 translate-y-2 border border-[#38a935]/50"></div>
                <div class="relative w-full h-full bg-[#ffe900] flex items-center justify-center border border-[#0071bd]/10">
                  <span class="absolute top-1 left-1 w-1.5 h-1.5 bg-[#0071bd] rotate-45"></span>
                  <i class="ri-play-fill text-4xl text-[#0071bd] ml-1"></i>
                </div>
              </div>
            </div>

            <!-- Cartouche d'information strict -->
            <div class="absolute bottom-0 left-0 bg-white p-6 lg:p-8 max-w-[90%] sm:max-w-md border-t border-r border-[#0071bd]/10">
              <!-- Ornement coin -->
              <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0071bd] m-2"></div>
              
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 bg-[#0071bd] text-white text-[9px] font-bold uppercase tracking-[0.2em] relative overflow-hidden">
                  Conférence
                  <span class="absolute inset-0 bg-white/10" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);"></span>
                </span>
                <span class="text-[10px] font-bold text-[#0071bd]/50 tracking-[0.2em] uppercase">
                  04:28:00
                </span>
              </div>
              <h3 class="text-10 lg:text-10 font-bold text-[#0071bd] leading-snug">
                Thème 2025 : «Insertion professionnelle et entrepreneuriat étudiant: Interfaces entre universités, incubateurs...»
              </h3>
            </div>
          </a>
        </div>

        <!-- 3. COLONNE LATÉRALE (Col 4 - Données & Navigation) -->
        <div class="lg:col-span-4 flex flex-col h-full">
          
          <!-- Chiffres Institutionnels (Harmonisés avec puces losanges) -->
          <div class="grid grid-cols-2 lg:grid-cols-1 gap-8 mb-12 lg:mb-auto relative pl-6 lg:pl-8">
            <!-- NOUVEAU : Bordure tissée au lieu de ligne pleine -->
            <div class="absolute left-0 top-0 bottom-0 w-[2px]" style="background: repeating-linear-gradient(0deg, rgba(0,113,189,0.15), rgba(0,113,189,0.15) 4px, transparent 4px, transparent 8px);"></div>
            
            <div class="flex flex-col relative group">
              <span class="text-4xl lg:text-5xl font-bold text-[#0071bd] mb-2 transition-transform origin-left group-hover:translate-x-1 duration-300 flex items-start gap-2">
                <span class="w-2 h-2 mt-3 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                80+
              </span>
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]/60">Vidéos institutionnelles</span>
            </div>
            
            <div class="flex flex-col relative group">
              <span class="text-4xl lg:text-5xl font-bold text-[#0071bd] mb-2 transition-transform origin-left group-hover:translate-x-1 duration-300 flex items-start gap-2">
                <span class="w-2 h-2 mt-3 shrink-0 bg-[#38a935] rotate-45 block"></span>
                35
              </span>
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]/60">Conférences archivées</span>
            </div>

            <div class="flex flex-col relative group">
              <span class="text-4xl lg:text-5xl font-bold text-[#0071bd] mb-2 transition-transform origin-left group-hover:translate-x-1 duration-300 flex items-start gap-2">
                <span class="w-2 h-2 mt-3 shrink-0 bg-[#0071bd] rotate-45 block opacity-50"></span>
                12
              </span>
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]/60">Webinaires annuels</span>
            </div>
          </div>

          <!-- Sommaire / Index de Navigation Harmonisé -->
          <div class="mt-8 lg:mt-16 relative group cursor-pointer">
            
            <!-- NOUVEAU : Décalage jaune texturé -->
            <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out z-0 w-full h-full">
              <rect width="100%" height="100%" fill="url(#texture-african-yellow)" />
            </svg>
            
            <!-- Contenu Blanc principal -->
            <div class="relative bg-white p-8 border border-[#0071bd]/20 z-10 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
              
              <!-- NOUVEAU : Ornements géométriques aux coins -->
              <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#0071bd]"></div>
              <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#0071bd]"></div>

              <h4 class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0071bd] mb-6 flex items-center gap-3">
                <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
                Parcourir les archives
              </h4>
              
              <div class="flex flex-col">
                <a target='_blank' href="https://youtube.com/playlist?list=PL2cakhJIVeeqyQW3M1eBsFcM0pPbiPa30&si=UIztzw8GxQwfq52j" class="group/link flex items-center justify-between py-4 border-b border-[#0071bd]/10 text-[13px] font-bold text-[#0071bd]/80 hover:text-[#0071bd] transition-colors">
                  <span class="flex items-center gap-2">
                    <span class="w-1 h-1 bg-[#ffe900] rotate-45 opacity-0 transition-opacity group-hover/link:opacity-100"></span>
                    CRPDG 2024 - UAM-Dakar, Sénégal
                  </span>
                  <i class="ri-arrow-right-line text-[#38a935] opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-lg"></i>
                </a>
                <a href="#" class="group/link flex items-center justify-between py-4 border-b border-[#0071bd]/10 text-[13px] font-bold text-[#0071bd]/80 hover:text-[#0071bd] transition-colors">
                  <span class="flex items-center gap-2">
                    <span class="w-1 h-1 bg-[#ffe900] rotate-45 opacity-0 transition-opacity group-hover/link:opacity-100"></span>
                    Rapports d'activités
                  </span>
                  <i class="ri-arrow-right-line text-[#38a935] opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-lg"></i>
                </a>
                <a href="#" class="group/link flex items-center justify-between py-4 text-[13px] font-bold text-[#0071bd]/80 hover:text-[#0071bd] transition-colors">
                  <span class="flex items-center gap-2">
                    <span class="w-1 h-1 bg-[#ffe900] rotate-45 opacity-0 transition-opacity group-hover/link:opacity-100"></span>
                    Interviews & panels
                  </span>
                  <i class="ri-arrow-right-line text-[#38a935] opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-lg"></i>
                </a>
              </div>

              <!-- Call to Action Secondaire -->
              <a href="#mediatheque" class="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd] hover:text-[#38a935] transition-colors group/cta">
                <span class="w-2 h-2 border border-current rotate-45 flex items-center justify-center p-2">
                  <i class="ri-add-line text-[10px] transform transition-transform group-hover/cta:rotate-90 text-[#ffe900] scale-150"></i>
                </span>
                Accéder au catalogue complet
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>