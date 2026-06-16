<script setup>
import { ref, computed } from 'vue'

const activeCountryCode = ref('SN')

// Totaux ajustés pour correspondre aux données de démo fournies
const countries = [
  { code: 'SN', name: 'Sénégal', total: 3 },
  { code: 'BJ', name: 'Bénin', total: 2 },
  { code: 'CI', name: 'Côte d’Ivoire', total: 2 },
]

const universitiesData = [
  { id: "SN-01", country: "SN", name: "Université Cheikh Anta Diop", acronym: "UCAD", location: "Dakar", founded: "1957", status: "Publique", logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=400&q=80" },
  { id: "SN-02", country: "SN", name: "Université Gaston Berger", acronym: "UGB", location: "Saint-Louis", founded: "1990", status: "Publique", logo: "" },
  { id: "SN-03", country: "SN", name: "Université Amadou Mahtar Mbow", acronym: "UAM", location: "Diamniadio", founded: "2022", status: "Thématique", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80" },
  { id: "BJ-01", country: "BJ", name: "Université d'Abomey-Calavi", acronym: "UAC", location: "Cotonou", founded: "1970", status: "Publique", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80" },
  { id: "BJ-02", country: "BJ", name: "Université de Parakou", acronym: "UP", location: "Parakou", founded: "2001", status: "Publique", logo: "" },
  { id: "CI-01", country: "CI", name: "Université Félix Houphouët-Boigny", acronym: "UFHB", location: "Abidjan", founded: "1964", status: "Publique", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80" },
  { id: "CI-02", country: "CI", name: "Université Nangui Abrogoua", acronym: "UNA", location: "Abidjan", founded: "1996", status: "Scientifique", logo: "" }
]

// Séquence d'accents géométriques pour les ombres des cartes
const accentPatterns = ['url(#texture-african-blue)', 'url(#texture-african-green)', 'url(#texture-african-yellow)']

const filteredUniversities = computed(() => {
  return universitiesData
    .filter(univ => univ.country === activeCountryCode.value)
    .map((univ, index) => ({
      ...univ,
      // Attribution d'une texture tournante pour l'ombre portée au survol
      accentPattern: accentPatterns[index % accentPatterns.length]
    }))
})
</script>

<template>
  <section class="relative py-24 md:py-32 bg-[#f8f9fa] border-t border-[#0071bd]/10 font-sans" aria-label="Cartographie des Membres">
    
    <!-- NOUVEAU : Trame de fond unifiée (Losanges Traditionnels Bogolan) -->
    <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-members-diamonds" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#0071bd" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-members-diamonds)" />
      </svg>
    </div>

    <!-- Définition des textures SVG pour les ombres portées -->
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Motif Bleu : Losanges concentriques -->
        <pattern id="texture-african-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#005086" stroke-width="2" opacity="0.3" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.8"/>
        </pattern>

        <!-- Motif Vert : Chevrons / Zig-zag -->
        <pattern id="texture-african-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#236b21" stroke-width="2" opacity="0.4" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.6" />
        </pattern>

        <!-- Motif Jaune : Damier / Tissage -->
        <pattern id="texture-african-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#c2b100" opacity="0.1" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div class="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
      
      <!-- EN-TÊTE INSTITUTIONNEL Harmonisé -->
      <header class="mb-20">
        <div class="flex items-center gap-4 mb-6">
          <span class="w-2.5 h-2.5 bg-[#38a935] rotate-45 transform"></span>
          <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
          <span class="text-[#38a935] text-[11px] font-bold uppercase tracking-[0.2em] font-mono">
            Cartographie Institutionnelle
          </span>
        </div>

        <h2 class="text-4xl md:text-5xl lg:text-[56px] text-[#0071bd] font-bold leading-[1.05] tracking-tight">
          Institutions membres <br />
          <span class="text-[#38a935] relative inline-block">
            du réseau académique.
            <!-- Soulignement tissé -->
            <span class="absolute -bottom-2 left-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></span>
          </span>
        </h2>
      </header>

      <!-- NAVIGATION FILTRES (Style technique) -->
      <div class="flex flex-wrap gap-x-10 border-b border-[#0071bd]/10 mb-16 relative">
        <button 
          v-for="country in countries" 
          :key="country.code"
          @click="activeCountryCode = country.code"
          class="relative pb-5 flex items-center gap-3 outline-none group bg-transparent border-none cursor-pointer"
        >
          <!-- NOUVEAU : Puce losange devant l'onglet -->
          <span
  class="w-1.5 h-1.5 rotate-45 transform opacity-0 transition-opacity duration-300"
  :class="activeCountryCode === country.code ? 'opacity-100 bg-[#38a935]' : 'bg-[#0071bd]/40 group-hover:opacity-100'"
>
</span>

          <span 
            :class="[
              'text-[13px] uppercase tracking-[0.2em] font-bold transition-colors duration-300',
              activeCountryCode === country.code ? 'text-[#0071bd]' : 'text-[#0071bd]/40 group-hover:text-[#0071bd]/70'
            ]"
          >
            {{ country.name }}
          </span>
          <span 
            :class="[
              'font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 border transition-all duration-300',
              activeCountryCode === country.code ? 'bg-[#0071bd] text-white border-[#0071bd]' : 'bg-white text-[#0071bd]/40 border-[#0071bd]/10'
            ]"
          >
            0{{ country.total }}
          </span>
          
          <!-- Soulignement tissé diagonal au lieu d'une ligne pleine -->
          <div 
            class="absolute bottom-[-1.5px] left-0 h-[4px] transition-all duration-300 ease-out"
            :style="activeCountryCode === country.code ? 'width: 100%; background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);' : 'width: 0%;'"
          ></div>
        </button>
      </div>

      <!-- RÉPERTOIRE D'ARTICLES (Grille à effets asymétriques) -->
      <div class="relative min-h-[400px]">
        <TransitionGroup 
          name="directory-fade" 
          tag="div" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          <article 
            v-for="univ in filteredUniversities" 
            :key="univ.id"
            class="group relative h-full cursor-default"
          >
            <!-- NOUVEAU : Ombre portée texturée (Géométrique Africaine) -->
            <svg 
              class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full"
            >
              <rect width="100%" height="100%" :fill="univ.accentPattern" />
            </svg>
            
            <!-- Corps de carte principal (Se soulève au survol) -->
            <div class="relative bg-white border border-[#0071bd]/10 p-8 flex flex-col h-full z-10 transition-transform duration-300 ease-out group-hover:border-[#0071bd] group-hover:-translate-x-1 group-hover:-translate-y-1">
              
              <div class="flex justify-between items-start mb-8 gap-4">
                <!-- Wrapper Logo strict avec bordure tissée -->
                <div class="w-16 h-16 border border-[#0071bd]/10 bg-[#f8f9fa] flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 relative shrink-0">
                  <div class="absolute inset-0 opacity-[0.03]" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 1px, transparent 1px, transparent 3px);"></div>
                  <img 
                    v-if="univ.logo" 
                    :src="univ.logo" 
                    :alt="univ.acronym"
                    class="w-full h-full object-cover relative z-10"
                  />
                  <span v-else class="font-mono text-xs text-[#0071bd]/40 font-bold tracking-wider relative z-10">
                    {{ univ.acronym }}
                  </span>
                </div>
                <!-- Statut Institutionnel Harmonisé (avec micro-hachure) -->
                <span class="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] bg-[#0071bd] text-white group-hover:bg-[#38a935] transition-colors duration-300 relative overflow-hidden shrink-0">
                   <span class="absolute inset-0 bg-white/10" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);"></span>
                  {{ univ.status }}
                </span>
              </div>

              <!-- Bloc Identité Harmonisé (Tracking tight) -->
              <div class="flex-grow mb-10 relative">
                <!-- Ligne de registre technique latérale -->
             <div
  class="absolute left-[-20px] top-0 bottom-0 w-[1px] opacity-10"
  style="background: repeating-linear-gradient(0deg, #0071bd, #0071bd 4px, transparent 4px, transparent 8px);"
></div>
                <p class="font-mono text-[11px] text-[#0071bd]/40 font-bold tracking-wider mb-2.5 flex items-center gap-2">
                   <span class="w-1 h-1 bg-[#ffe900] rotate-45 transform"></span>
                  {{ univ.acronym }} // {{ univ.id }}
                </p>
                <h3 class="text-xl font-bold text-[#0071bd] leading-[1.2] tracking-tight group-hover:text-[#38a935] transition-colors duration-300">
                  {{ univ.name }}
                </h3>
              </div>

              <!-- Métadonnées Techniques Harmonisées (Pointillé + Puces Losanges) -->
              <div class="pt-6 border-t border-[#0071bd]/10 flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#0071bd]/50">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 transform block opacity-70"></span>
                  {{ univ.location }}
                </div>
                <div>
                  Est. <span class="text-[#0071bd] font-black">{{ univ.founded }}</span>
                </div>
              </div>
            </div>

          </article>
        </TransitionGroup>
      </div>

      <!-- PIED DE SECTION Harmonisé -->
      <footer class="mt-24 pt-8 border-t border-[#0071bd]/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]/40 px-6">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block opacity-60"></span> 
          <span>Base de données officielle des membres REESAO</span>
        </div>
        <div class="flex items-center gap-2 font-mono">
           <span class="w-4 h-[1px] bg-[#0071bd]/20"></span>
          Année Académique 2026
        </div>
      </footer>

    </div>
  </section>
</template>

<style scoped>
.directory-fade-move,
.directory-fade-enter-active,
.directory-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.directory-fade-enter-from,
.directory-fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.directory-fade-leave-active {
  position: absolute;
  width: calc(100% - 1.5rem); 
}

@media (min-width: 768px) {
  .directory-fade-leave-active {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .directory-fade-leave-active {
    width: calc(33.333% - 1.666rem);
  }
}
</style>