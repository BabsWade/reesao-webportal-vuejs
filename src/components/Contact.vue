<script setup>
import slide1 from '../assets/hero.jpg'; // Image de fond pour le banner
</script>

<template>
  <main class="w-full bg-white font-sans selection:bg-[#ffe900] selection:text-[#0071bd] min-h-screen relative overflow-hidden">
    
    <!-- Pattern Géométrique de fond global -->
    <div 
      class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <!-- Textures SVG globales pour les ombres portées -->
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

    <!-- BANNER DE PAGE (HERO) -->
       <section class="relative pt-44 pb-24 lg:pt-52 lg:pb-32 bg-[#38a935] border-b border-[#0071bd]/20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          :src="slide1" 
          alt="Espace académique REESAO" 
          class="w-full h-full object-cover grayscale opacity-15 scale-105 contrast-125"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0071bd]/50 via-transparent to-[#38a935]"></div>
      </div>
      
      <div 
        class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-8" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</router-link>
          <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
          <span class="text-[#ffe900]">Contact</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-5xl lg:text-[64px] text-white font-black leading-[1.05] tracking-tight">
              Entrer en contact <br />
              <span class="text-[#ffe900] relative inline-block mt-2">
                avec le Réseau
                <span class="absolute -bottom-3 left-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 4px, transparent 4px, transparent 8px);"></span>
              </span>
            </h1>
          </div>
          <div class="lg:col-span-4 lg:pb-2">
            <p class="text-white/60 font-light text-sm lg:text-base leading-relaxed pl-6 border-l-2 border-[#38a935]">
              Le portail centralisé des publications, des réformes structurelles et des annonces officielles des universités membres.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION PRINCIPALE : INFORMATIONS DE CONTACT -->
    <section class="relative z-10 py-16 lg:py-24 max-w-[1400px] mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        <!-- COLONNE GAUCHE : Intro & Horaires -->
        <div class="lg:col-span-5 flex flex-col gap-10">
          
          <header class="flex flex-col gap-2">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
              <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></span>
              <h2 class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0071bd]">Secrétariat Général</h2>
            </div>
            <h3 class="text-3xl md:text-4xl font-black text-[#0071bd] leading-tight uppercase tracking-tight">
              Nos Coordonnées
            </h3>
            <p class="text-[#0071bd]/70 text-base mt-4 max-w-md leading-relaxed">
              Le secrétariat général du REESAO se tient à votre entière disposition pour toute demande d'information, d'adhésion institutionnelle ou de proposition de partenariat.
            </p>
          </header>

          <!-- Bloc Horaires d'ouverture -->
          <div class="relative bg-[#f8fafc] border border-[#0071bd]/10 p-8">
            <!-- Décoration haut gauche -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#0071bd] -translate-x-[1px] -translate-y-[1px]"></div>
            
            <h4 class="text-xs font-black uppercase tracking-[0.1em] text-[#0071bd] mb-6 flex items-center gap-3">
              <i class="ri-time-line text-[#38a935] text-lg"></i>
              Heures de réception
            </h4>
            
            <ul class="space-y-4 text-sm text-[#0071bd]/80">
              <li class="flex justify-between items-center border-b border-[#0071bd]/5 pb-3">
                <span class="font-medium">Lundi - Jeudi</span>
                <span class="font-bold text-[#0071bd]">08h00 - 16h00 (GMT)</span>
              </li>
              <li class="flex justify-between items-center border-b border-[#0071bd]/5 pb-3">
                <span class="font-medium">Vendredi</span>
                <span class="font-bold text-[#0071bd]">08h00 - 13h00 (GMT)</span>
              </li>
              <li class="flex justify-between items-center text-[#0071bd]/50">
                <span>Samedi - Dimanche</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- COLONNE DROITE : Grille des Cartes -->
        <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-8 lg:mt-0">
          
          <!-- Carte Siège (Pleine largeur sur la grille de droite) -->
          <div class="md:col-span-2 relative group">
            <svg class="absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-300 ease-out z-0 w-full h-full group-hover:translate-x-4 group-hover:translate-y-4">
              <rect width="100%" height="100%" fill="url(#texture-african-blue)" />
            </svg>
            <div class="relative bg-white border border-[#0071bd]/10 p-8 md:p-10 flex flex-col md:flex-row items-start gap-6 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 z-10">
              <div class="w-16 h-16 flex items-center justify-center bg-[#0071bd] text-white shrink-0 border border-white/20">
                <i class="ri-map-pin-2-fill text-2xl"></i>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-black uppercase tracking-[0.1em] text-[#0071bd] mb-3">Siège Social du REESAO</h4>
                <p class="text-[#0071bd]/80 text-base md:text-lg font-medium leading-relaxed">
                  Secrétariat Général du REESAO<br>
                  Université de Lomé (Togo)<br>
                  Campus Universitaire, BP 1515, Lomé, Togo
                </p>
              </div>
            </div>
          </div>

          <!-- Carte Email -->
          <div class="relative group">
            <svg class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full group-hover:translate-x-3 group-hover:translate-y-3">
              <rect width="100%" height="100%" fill="url(#texture-african-green)" />
            </svg>
            <div class="relative bg-white border border-[#0071bd]/10 p-6 lg:p-8 flex flex-col items-start gap-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 z-10 h-full">
              <div class="w-12 h-12 flex items-center justify-center bg-[#38a935] text-white shrink-0 border border-white/20">
                <i class="ri-mail-send-fill text-xl"></i>
              </div>
              <div>
                <h4 class="text-xs font-black uppercase tracking-[0.1em] text-[#38a935] mb-2">Courrier Électronique</h4>
                <a href="mailto:contact@reesao.org" class="text-[#0071bd]/80 text-sm font-medium hover:text-[#0071bd] transition-colors block mb-1">contact@reesao.org</a>
                <a href="mailto:sg@reesao.org" class="text-[#0071bd]/80 text-sm font-medium hover:text-[#0071bd] transition-colors block">sg@reesao.org</a>
              </div>
            </div>
          </div>

          <!-- Carte Téléphone -->
          <div class="relative group">
            <svg class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full group-hover:translate-x-3 group-hover:translate-y-3">
              <rect width="100%" height="100%" fill="url(#texture-african-yellow)" />
            </svg>
            <div class="relative bg-white border border-[#0071bd]/10 p-6 lg:p-8 flex flex-col items-start gap-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 z-10 h-full">
              <div class="w-12 h-12 flex items-center justify-center bg-[#ffe900] text-[#0071bd] shrink-0 border border-[#0071bd]/10">
                <i class="ri-phone-fill text-xl"></i>
              </div>
              <div>
                <h4 class="text-xs font-black uppercase tracking-[0.1em] text-[#0071bd] mb-2">Ligne Téléphonique</h4>
                <p class="text-[#0071bd]/80 text-sm font-medium block mb-1 hover:text-[#0071bd] transition-colors cursor-pointer">
                  +228 90 00 00 00
                </p>
                <p class="text-[#0071bd]/80 text-sm font-medium block hover:text-[#0071bd] transition-colors cursor-pointer">
                  +228 22 00 00 00
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* Lissage des polices */
main {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>