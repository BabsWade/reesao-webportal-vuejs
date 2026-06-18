<script setup>
import { ref, computed } from 'vue'

const activeCountryCode = ref('SN')

const countries = [
  { code: 'BJ', name: 'Bénin', total: 2 },
  { code: 'BF', name: 'Burkina Faso', total: 5 },
  { code: 'CI', name: 'Côte d’Ivoire', total: 5 },
  { code: 'ML', name: 'Mali', total: 5 },
  { code: 'NE', name: 'Niger', total: 8 },
  { code: 'SN', name: 'Sénégal', total: 6 },
  { code: 'TG', name: 'Togo', total: 2 }
]

const universitiesData = [
  // Bénin
  { id: "BJ-01", country: "BJ", name: "Université d'Abomey-Calavi", acronym: "UAC", location: "Abomey-Calavi", founded: "1970", status: "Publique", logo: "" },
  { id: "BJ-02", country: "BJ", name: "Université de Parakou", acronym: "UP", location: "Parakou", founded: "2001", status: "Publique", logo: "" },

  // Burkina Faso
  { id: "BF-01", country: "BF", name: "Université Joseph Ki-Zerbo", acronym: "UJKZ", location: "Ouagadougou", founded: "1974", status: "Publique", logo: "" },
  { id: "BF-02", country: "BF", name: "Université Nazi Boni", acronym: "UNB", location: "Bobo-Dioulasso", founded: "1995", status: "Publique", logo: "" },
  { id: "BF-03", country: "BF", name: "Université Norbert Zongo", acronym: "UNZ", location: "Koudougou", founded: "2005", status: "Publique", logo: "" },
  { id: "BF-04", country: "BF", name: "Université Saint Thomas d’Aquin", acronym: "USTA", location: "Ouagadougou", founded: "2004", status: "Privée", logo: "" },
  { id: "BF-05", country: "BF", name: "Université Thomas Sankara", acronym: "UTS", location: "Ouagadougou", founded: "2007", status: "Publique", logo: "" },

  // Côte d'Ivoire
  { id: "CI-01", country: "CI", name: "Université d’Abobo-Adjamé", acronym: "UNA", location: "Abidjan", founded: "1995", status: "Publique", logo: "" },
  { id: "CI-02", country: "CI", name: "Université Alassane Ouattara de Bouaké", acronym: "UAO", location: "Bouaké", founded: "1992", status: "Publique", logo: "" },
  { id: "CI-03", country: "CI", name: "Université de Cocody Abidjan", acronym: "UFHB", location: "Abidjan", founded: "1964", status: "Publique", logo: "" },
  { id: "CI-04", country: "CI", name: "Université Peleforo Gon Coulibaly", acronym: "UPGC", location: "Korhogo", founded: "2012", status: "Publique", logo: "" },
  { id: "CI-05", country: "CI", name: "INPHB de Yamoussoukro", acronym: "INPHB", location: "Yamoussoukro", founded: "1996", status: "Grande École", logo: "" },

  // Mali
  { id: "ML-01", country: "ML", name: "Université de Ségou", acronym: "US", location: "Ségou", founded: "2009", status: "Publique", logo: "" },
  { id: "ML-02", country: "ML", name: "Université de Sikasso", acronym: "USIK", location: "Sikasso", founded: "2010", status: "Publique", logo: "" },
  { id: "ML-03", country: "ML", name: "Université des Sciences Juridiques et Politiques", acronym: "USJPB", location: "Bamako", founded: "2011", status: "Publique", logo: "" },
  { id: "ML-04", country: "ML", name: "Université des Sciences Sociales et de Gestion", acronym: "USSGB", location: "Bamako", founded: "2011", status: "Publique", logo: "" },
  { id: "ML-05", country: "ML", name: "Université des Sciences, des Techniques et des Technologies", acronym: "USTTB", location: "Bamako", founded: "2011", status: "Publique", logo: "" },

  // Niger
  { id: "NE-01", country: "NE", name: "Université Abdou Moumouni de Niamey", acronym: "UAM", location: "Niamey", founded: "1971", status: "Publique", logo: "" },
  { id: "NE-02", country: "NE", name: "Université d’Agadez", acronym: "UA", location: "Agadez", founded: "2014", status: "Publique", logo: "" },
  { id: "NE-03", country: "NE", name: "Université de Diffa", acronym: "UDA", location: "Diffa", founded: "2014", status: "Publique", logo: "" },
  { id: "NE-04", country: "NE", name: "Université de Dosso", acronym: "UDO", location: "Dosso", founded: "2014", status: "Publique", logo: "" },
  { id: "NE-05", country: "NE", name: "Université Djibo Hamani de Tahoua", acronym: "UDH", location: "Tahoua", founded: "2010", status: "Publique", logo: "" },
  { id: "NE-06", country: "NE", name: "Université de Tilabéri", acronym: "UTI", location: "Tillabéri", founded: "2014", status: "Publique", logo: "" },
  { id: "NE-07", country: "NE", name: "Université de Zinder", acronym: "UZ", location: "Zinder", founded: "2008", status: "Publique", logo: "" },
  { id: "NE-08", country: "NE", name: "Université UDDDM de Maradi", acronym: "UDDDM", location: "Maradi", founded: "2008", status: "Publique", logo: "" },

  // Sénégal
  { id: "SN-01", country: "SN", name: "Université Iba Der Thiam de Thiès", acronym: "UIDT", location: "Thiès", founded: "2007", status: "Publique", logo: "" },
  { id: "SN-02", country: "SN", name: "Université Alioune Diop de Bambey", acronym: "UADB", location: "Bambey", founded: "2007", status: "Publique", logo: "" },
  { id: "SN-03", country: "SN", name: "Université Assane Seck de Ziguinchor", acronym: "UASZ", location: "Ziguinchor", founded: "2007", status: "Publique", logo: "" },
  { id: "SN-04", country: "SN", name: "Université Gaston Berger de Saint-Louis", acronym: "UGB", location: "Saint-Louis", founded: "1990", status: "Publique", logo: "" },
  { id: "SN-05", country: "SN", name: "Université Amadou Mahtar Mbow", acronym: "UAM", location: "Diamniadio", founded: "2022", status: "Thématique", logo: "" },
  { id: "SN-06", country: "SN", name: "École Inter-États des Sciences et Médecine Vétérinaires", acronym: "EISMV", location: "Dakar", founded: "1968", status: "Inter-États", logo: "" },

  // Togo
  { id: "TG-01", country: "TG", name: "Université de Kara", acronym: "UK", location: "Kara", founded: "2004", status: "Publique", logo: "" },
  { id: "TG-02", country: "TG", name: "Université de Lomé", acronym: "UL", location: "Lomé", founded: "1970", status: "Publique", logo: "" }
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
  <section class="relative py-24 md:py-32 bg-[#0071bd]/3 border-t border-[#0071bd]/10 font-sans" aria-label="Cartographie des Membres">
    
    <div 
        class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="texture-african-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#005086" stroke-width="2" opacity="0.3" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.8"/>
        </pattern>

        <pattern id="texture-african-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#236b21" stroke-width="2" opacity="0.4" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.6" />
        </pattern>

        <pattern id="texture-african-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#c2b100" opacity="0.1" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div class="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
      
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
            <span class="absolute -bottom-2 left-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></span>
          </span>
        </h2>
      </header>

      <div class="flex flex-wrap gap-x-10 border-b border-[#0071bd]/10 mb-16 relative">
        <button 
          v-for="country in countries" 
          :key="country.code"
          @click="activeCountryCode = country.code"
          class="relative pb-5 flex items-center gap-3 outline-none group bg-transparent border-none cursor-pointer"
        >
          <span
            class="w-1.5 h-1.5 rotate-45 transform transition-opacity duration-300"
            :class="activeCountryCode === country.code ? 'opacity-100 bg-[#38a935]' : 'opacity-0 bg-[#0071bd]/40 group-hover:opacity-100'"
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
            {{ String(country.total).padStart(2, '0') }}
          </span>
          
          <div 
            class="absolute bottom-[-1.5px] left-0 h-[4px] transition-all duration-300 ease-out"
            :style="activeCountryCode === country.code ? 'width: 100%; background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);' : 'width: 0%;'"
          ></div>
        </button>
      </div>

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
            <svg 
              class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full"
            >
              <rect width="100%" height="100%" :fill="univ.accentPattern" />
            </svg>
            
            <div class="relative bg-white border border-[#0071bd]/10 p-8 flex flex-col h-full z-10 transition-transform duration-300 ease-out group-hover:border-[#0071bd] group-hover:-translate-x-1 group-hover:-translate-y-1">
              
              <div class="flex justify-between items-start mb-8 gap-4">
                <div class="w-16 h-16 border border-[#0071bd]/10 bg-[#f8f9fa] flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 relative shrink-0">
                  <div class="absolute inset-0 opacity-[0.03]" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 1px, transparent 1px, transparent 3px);"></div>
                  <img 
                    v-if="univ.logo" 
                    :src="univ.logo" 
                    :alt="univ.acronym"
                    class="w-full h-full object-cover relative z-10"
                  />
                  <span v-else class="font-mono text-xs text-[#0071bd]/40 font-bold tracking-wider relative z-10 text-center px-1">
                    {{ univ.acronym }}
                  </span>
                </div>
                <span class="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] bg-[#0071bd] text-white group-hover:bg-[#38a935] transition-colors duration-300 relative overflow-hidden shrink-0">
                   <span class="absolute inset-0 bg-white/10" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);"></span>
                  {{ univ.status }}
                </span>
              </div>

              <div class="flex-grow mb-10 relative">
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