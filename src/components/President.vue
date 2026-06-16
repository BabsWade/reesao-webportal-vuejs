<script setup>
import presidentImg from "../assets/president.jpg";

// Extraction des axes stratégiques mentionnés dans le discours
const priorities = [
  {
    num: "01",
    title: "Structuration Institutionnelle",
    desc: "Consolidation du réseau pour l'ériger en acteur de référence dans la réflexion stratégique et la coordination académique en Afrique de l'Ouest.",
    color: "#ffe900" // Jaune REESAO
  },
  {
    num: "02",
    title: "Harmonisation & Mobilité",
    desc: "Rapprochement des universités, harmonisation des curricula, renforcement de la mobilité et promotion de standards communs.",
    color: "#38a935" // Vert REESAO
  },
  {
    num: "03",
    title: "Gouvernance & Projets à Fort Impact",
    desc: "Renforcement de la gouvernance et préparation de projets structurants pour répondre aux exigences d'innovation et de compétitivité.",
    color: "#ffffff" // Blanc
  }
];
</script>

<template>
  <section class="relative py-12 md:py-20 bg-[#0071bd] overflow-hidden select-none text-white font-sans" aria-label="Gouvernance et Haute Direction">
    
    <!-- NOUVEAU : Maillage Géométrique (Losanges) adapté pour fond bleu -->
    <div 
      class="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <!-- Définition des textures SVG pour les ombres portées -->
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Motif Jaune : Damier / Tissage -->
        <pattern id="texture-african-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.1" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div class="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
      
      <!-- Grille principale asymétrique -->
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        <!-- 1. PORTRAIT ÉDITORIAL (Sticky à l'écran lors du défilement) -->
        <div class="lg:col-span-5 lg:sticky lg:top-28">
          <div class="space-y-8 group">
            
            <!-- Cadre Asymétrique Harmonisé -->
            <div class="relative mt-2">
              <!-- NOUVEAU : Ombre texturée jaune au lieu d'un fond uni -->
              <svg class="absolute inset-0 translate-x-4 translate-y-4 transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2 z-0 w-full h-full">
                <rect width="100%" height="100%" fill="url(#texture-african-yellow)" />
              </svg>
              
              <!-- Conteneur d'image principal -->
              <div class="relative z-10 aspect-[4/5] bg-[#0071bd] overflow-hidden border border-white/20">
                <img 
                  :src="presidentImg" 
                  alt="Portrait officiel du Président du REESAO" 
                  class="w-full h-full object-cover object-top grayscale contrast-[1.05] transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105 mix-blend-luminosity hover:mix-blend-normal"
                />
              </div>
            </div>
            
            <!-- Légende Institutionnelle Harmonisée -->
            <div class="relative pl-6 py-1 space-y-1.5 mt-6">
              <!-- NOUVEAU : Bordure tissée au lieu d'une ligne pleine -->
              <span class="absolute left-0 top-0 bottom-0 w-[4px]" style="background: repeating-linear-gradient(0deg, #ffe900, #ffe900 6px, transparent 6px, transparent 10px);"></span>
              
              <span class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#ffe900]/90">
                <span class="w-1.5 h-1.5 bg-[#ffe900] rotate-45 block opacity-70"></span>
                Présidence en exercice
              </span>
              <h3 class="text-2xl font-bold tracking-tight text-white">
                Pr Mamadou Babacar NDIAYE
              </h3>
              <p class="text-sm font-light text-white/75 leading-relaxed max-w-sm">
                Recteur de l'Université Iba Der Thiam de Thiès, Sénégal
              </p>
            </div>

          </div>
        </div>

        <!-- 2. ZONE ÉDITORIALE & MANIFESTE -->
        <div class="lg:col-span-7 space-y-10">
          
          <!-- Titre Principal de Section Harmonisé -->
          <div>
            <div class="flex items-center gap-4 mb-5">
              <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 transform"></span>
              <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
              <span class="text-[#ffe900] text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                Gouvernance Régionale
              </span>
            </div>
            
            <h2 class="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.05] tracking-tight">
              Le Mot du <br />
              <span class="text-[#ffe900] relative inline-block mt-1">
                Président.
                <!-- NOUVEAU : Soulignement texturé vert -->
                <span class="absolute -bottom-1 left-0 w-1/2 h-[5px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 4px, transparent 4px, transparent 8px);"></span>
              </span>
            </h2>
          </div>

          <!-- Discours Officiel -->
          <div class="text-white/85 font-light text-base lg:text-lg leading-relaxed space-y-6 max-w-2xl pt-2">
            <p>
              <strong class="font-bold text-white border-b border-[#ffe900]/40 pb-0.5">Chères et chers collègues,</strong>
            </p>
            <p>
              Le Réseau pour l’Excellence de l’Enseignement Supérieur en Afrique de l’Ouest (REESAO) est né d’une conviction forte : celle que l’avenir de notre espace universitaire repose sur la coopération, l’harmonisation et la solidarité entre nos institutions.
            </p>
            <p>
              Dans un contexte marqué par des transformations profondes de l’enseignement supérieur — exigences accrues de qualité, d’employabilité, d’innovation et de compétitivité internationale — le REESAO se positionne comme une plateforme stratégique au service de l’intégration académique régionale. À travers ses actions, le Réseau œuvre à rapprocher les universités, à harmoniser les curricula, à renforcer la mobilité académique et à promouvoir des standards communs adaptés aux réalités africaines.
            </p>

            <p>
              L’année en cours marque une étape importante dans la consolidation du REESAO. Elle est placée sous le signe de la structuration institutionnelle, de la poursuite des travaux d’harmonisation des formations, du renforcement de la gouvernance et de la préparation de projets structurants à fort impact régional. Notre ambition est claire : faire du REESAO un acteur de référence dans la réflexion stratégique, la coordination académique et le développement de l’enseignement supérieur en Afrique de l’Ouest.
            </p>

            <!-- Citation Majeure style Harmonisé -->
            <blockquote class="relative my-10 bg-white/5 border border-white/10 p-8 max-w-2xl group">
              <!-- NOUVEAU : Ornements géométriques aux coins -->
              <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ffe900]"></div>
              <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ffe900]"></div>
              
              <!-- Icône de guillemet -->
              <span class="absolute -top-6 left-4 text-[120px] font-serif text-[#ffe900]/10 leading-none pointer-events-none select-none transition-transform group-hover:-translate-y-2">“</span>
              
              <p class="font-serif text-xl md:text-2xl font-normal italic text-white leading-snug relative z-10">
                « Cette ambition ne peut se réaliser qu’avec l’engagement collectif [...] en faveur d'une vision partagée : une université africaine ouverte, innovante, inclusive et tournée vers l’avenir. »
              </p>
            </blockquote>

            <p>
              Je tiens à remercier l’ensemble des institutions membres pour leur confiance et leur engagement, et j’invite toutes les universités de la sous-région à rejoindre et à renforcer cette dynamique collective au service de l’excellence académique.
            </p>
          </div>

          <!-- Double Séparateur Structurel (Tissé) pour marquer la fin -->
          <div class="flex h-[4px] w-32 mt-12">
            <div class="flex-1" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></div>
            <div class="flex-1" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 4px, transparent 4px, transparent 8px);"></div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>