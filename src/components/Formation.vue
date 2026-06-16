<script setup>
import { ref, computed, onMounted } from 'vue'
import slide1 from '../assets/hero.jpg'

// Liste des filtres adaptés pour le volet Formation
const categories = ['Tous', 'Cursus & Maquettes', 'Certifications', 'Ateliers & Séminaires']
const activeFilter = ref('Tous')
const searchQuery = ref('')

// États pour l'API
const formations = ref([])
const isLoading = ref(true)
const error = ref(null)

// Fallbacks de couvertures Unsplash orientées éducation / formation
const coverFallbacks = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=850",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600&h=850",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=850",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=850"
]

// Convertir la taille (en octets) envoyée par WP en Mo ou Ko lisibles
const formatFileSize = (bytes) => {
  if (!bytes) return "N/A"
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${mb.toFixed(1)} Mo`
  const kb = bytes / 1024
  return `${kb.toFixed(0)} Ko`
}

// Convertir la date WP au format "Mois Année" en Français
const formatDateFrench = (dateString) => {
  if (!dateString) return "Date inconnue"
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
             .replace(/^\w/, (c) => c.toUpperCase())
}

// Assigner dynamiquement une catégorie selon le titre du document de formation
const inferCategory = (title) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes('curriculum') || lowerTitle.includes('maquette') || lowerTitle.includes('licence') || lowerTitle.includes('master') || lowerTitle.includes('lmd')) {
    return 'Cursus & Maquettes'
  }
  if (lowerTitle.includes('certif') || lowerTitle.includes('diplôme') || lowerTitle.includes('compétence')) {
    return 'Certifications'
  }
  return 'Ateliers & Séminaires' // Catégorie par défaut
}

// Récupération des données depuis l'API WordPress
const fetchFormations = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    // Appel de l'API avec une limite haute (per_page=100) pour scanner un maximum de médias
    const response = await fetch('https://reesao.org/wp-json/wp/v2/media?mime_type=application/pdf&per_page=100')
    if (!response.ok) throw new Error('Impossible de charger les documents de formation.')
    
    const data = await response.json()
    
    // FILTRAGE STRICT : On ne prend que ceux qui ont la légende "Formation"
    const donneesFiltrees = data.filter(item => item.caption?.rendered === '<p>Formation</p>\n')
    
    // Mapping des données
    formations.value = donneesFiltrees.map((item, index) => {
      const cleanTitle = item.title?.rendered || "Document de formation sans titre"
      
      const wpThumb = item.media_details?.sizes?.medium?.source_url || item.media_details?.sizes?.full?.source_url
      const finalImage = wpThumb || coverFallbacks[index % coverFallbacks.length]

      return {
        id: item.id,
        titre: cleanTitle,
        categorie: inferCategory(cleanTitle),
        date: formatDateFrench(item.date),
        taille: formatFileSize(item.media_details?.filesize),
        format: "PDF",
        image: finalImage,
        url: item.source_url
      }
    })
  } catch (err) {
    error.value = err.message
    console.error('API Error (Formation):', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchFormations()
})

// Logique de filtrage et recherche combinée
const filteredFormations = computed(() => {
  return formations.value.filter(formation => {
    const matchesCategory = activeFilter.value === 'Tous' || formation.categorie === activeFilter.value
    const matchesSearch = formation.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          formation.categorie.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <main class="w-full bg-[#0071bd]/02 font-sans selection:bg-[#ffe900] selection:text-[#0071bd] min-h-screen">
    
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="texture-card-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
        </pattern>
        <pattern id="texture-card-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.2" />
        </pattern>
      </defs>
    </svg>

    <section class="relative pt-40 pb-20 lg:pt-48 lg:pb-24 bg-[#0071bd] border-b border-[#0071bd]/20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          :src="slide1" 
          alt="Étudiants / Formation REESAO" 
          class="w-full h-full object-cover grayscale opacity-10 contrast-125 scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0071bd] to-transparent"></div>
      </div>

      <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-8" aria-label="Breadcrumb">
          <a href="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</a>
          <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
          <span class="text-[#ffe900]">Offre de Formation & Curricula</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 class="text-3xl md:text-5xl lg:text-[56px] text-white font-black leading-[1.05] tracking-tight max-w-4xl">
            Programmes & <br />
            <span class="text-[#ffe900] relative inline-block mt-2">
              Ressources Pédagogiques.
              <span class="absolute -bottom-2 left-0 w-1/3 h-[3px] bg-[#ffe900]"></span>
            </span>
          </h1>
        </div>
      </div>
    </section>

    <section class="bg-white border-b border-[#0071bd]/10 sticky top-[70px] z-30 shadow-sm">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        
        <nav class="flex flex-wrap gap-3" aria-label="Filtres des formations">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeFilter = cat"
            class="px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 rounded-none border"
            :class="activeFilter === cat 
              ? 'bg-[#0071bd] text-white border-[#0071bd]' 
              : 'bg-white text-[#0071bd]/70 border-[#0071bd]/10 hover:bg-[#0071bd]/05 hover:text-[#0071bd] hover:border-[#0071bd]/30'"
          >
            {{ cat }}
          </button>
        </nav>

        <div class="relative w-full lg:w-96 flex items-center">
          <label for="search-formations" class="sr-only">Rechercher une formation</label>
          <input
            id="search-formations"
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par cursus, mot-clé..."
            class="w-full bg-[#0071bd]/02 border border-[#0071bd]/10 pl-11 pr-4 py-3 text-sm font-sans focus:outline-none focus:border-[#0071bd] focus:bg-white transition-colors text-[#0071bd] placeholder-[#0071bd]/40"
          />
          <i class="ri-search-line absolute left-4 text-[#0071bd]/40 text-lg"></i>
          
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''" 
            class="absolute right-4 text-[#0071bd]/40 hover:text-red-500 transition-colors"
            aria-label="Effacer la recherche"
          >
            <i class="ri-close-line"></i>
          </button>
        </div>

      </div>
    </section>

    <section class="py-16 lg:py-24 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <header class="mb-14 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0071bd]/10 pb-6">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-[#0071bd] leading-tight tracking-tight uppercase flex items-center gap-3">
            <span class="w-1.5 h-6 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
            Documents Pédagogiques
          </h2>
          <p class="text-sm text-[#0071bd]/60 font-light mt-2 ml-4.5">Consultez et téléchargez les référentiels de formation du réseau REESAO.</p>
        </div>
        <span v-if="!isLoading && !error" class="font-mono text-[10px] font-bold text-[#0071bd]/50 bg-white border border-[#0071bd]/10 px-4 py-2 uppercase tracking-widest shadow-sm">
          {{ filteredFormations.length }} Résultat(s)
        </span>
      </header>

      <div v-if="isLoading" class="py-20 flex justify-center">
        <div class="flex flex-col items-center justify-center p-16 bg-white border border-[#0071bd]/10 w-full max-w-md text-center shadow-sm relative">
          <div class="absolute inset-0 bg-[#0071bd] translate-x-2.5 translate-y-2.5 -z-10"></div>
          <i class="ri-loader-4-line text-5xl text-[#0071bd] animate-spin block mb-4"></i>
          <p class="text-[#0071bd]/50 font-mono text-[10px] uppercase tracking-[0.2em]">Synchronisation des ressources...</p>
        </div>
      </div>

      <div v-else-if="error" class="py-20 flex justify-center">
        <div class="flex flex-col items-center justify-center p-16 bg-white border border-red-500/20 w-full max-w-md text-center shadow-sm relative">
          <div class="absolute inset-0 bg-red-500 translate-x-2.5 translate-y-2.5 -z-10 opacity-20"></div>
          <i class="ri-error-warning-line text-5xl text-red-500 block mb-4"></i>
          <h3 class="text-xl font-bold text-[#0071bd] mb-2">Erreur de chargement</h3>
          <p class="text-[#0071bd]/60 text-sm font-light mb-6">{{ error }}</p>
          <button 
            @click="fetchFormations" 
            class="text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-[#0071bd] px-6 py-3 hover:bg-red-600 transition-colors"
          >
            Relancer la requête
          </button>
        </div>
      </div>

      <div v-else-if="filteredFormations.length === 0" class="py-20 flex justify-center">
        <div class="flex flex-col items-center justify-center p-16 bg-white border border-[#0071bd]/10 w-full max-w-md text-center shadow-sm relative">
          <div class="absolute inset-0 bg-slate-200 translate-x-2.5 translate-y-2.5 -z-10"></div>
          <i class="ri-file-search-line text-5xl text-[#0071bd]/20 block mb-4"></i>
          <h3 class="text-xl font-bold text-[#0071bd] mb-2">Aucun document</h3>
          <p class="text-[#0071bd]/60 font-light text-sm">Aucune ressource ne correspond à "{{ searchQuery }}".</p>
          <button 
            @click="searchQuery = ''; activeFilter = 'Tous'" 
            class="mt-6 text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071bd] bg-[#ffe900] px-6 py-3 hover:bg-[#0071bd] hover:text-white transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-y-14 xl:gap-x-10">
        
        <article 
          v-for="(formation, index) in filteredFormations" 
          :key="formation.id"
          class="relative group h-full flex"
        >
          <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out group-hover:translate-x-3.5 group-hover:translate-y-3.5 z-0 w-full h-full">
            <rect width="100%" height="100%" :fill="index % 2 === 0 ? 'url(#texture-card-green)' : 'url(#texture-card-blue)'" />
          </svg>
          
          <div class="relative bg-white border border-[#0071bd]/10 z-10 w-full flex flex-col transition-all duration-300 group-hover:-translate-y-1 shadow-sm">
            
            <div class="w-full aspect-[1/1.414] overflow-hidden relative bg-[#0071bd]">
              <img 
                :src="formation.image" 
                :alt="`Couverture : ${formation.titre}`" 
                class="w-full h-full object-cover transition-all duration-700 mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />
              
              <span class="absolute top-4 left-4 bg-[#0071bd] border border-white/20 text-white font-mono text-[10px] font-bold px-3 py-1 tracking-widest uppercase shadow-sm">
                {{ formation.format }}
              </span>

              <div class="absolute inset-0 bg-[#0071bd]/90 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  :href="formation.url" 
                  download
                  target="_blank"
                  class="w-14 h-14 bg-[#38a935] text-white flex items-center justify-center text-2xl shadow-lg hover:bg-[#ffe900] hover:text-[#0071bd] transition-all duration-300"
                  :aria-label="`Télécharger ${formation.titre}`"
                >
                  <i class="ri-download-cloud-2-line"></i>
                </a>
                <span class="text-white text-[10px] font-mono font-bold uppercase tracking-widest">
                  {{ formation.taille }}
                </span>
              </div>
            </div>

            <div class="p-6 flex flex-col flex-grow bg-white">
              <span class="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#0071bd] mb-3 block border-b border-[#0071bd]/10 pb-2">
                // {{ formation.categorie }}
              </span>
              
              <h3 class="text-base font-bold text-[#0071bd] leading-snug line-clamp-3 mb-6 group-hover:text-[#38a935] transition-colors duration-300 flex-grow" v-html="formation.titre">
              </h3>

              <div class="mt-auto">
                <div class="flex items-center justify-between text-[#0071bd]/50 font-mono text-[10px] mb-4 uppercase tracking-wider">
                  <span class="flex items-center gap-1.5">
                    <i class="ri-calendar-event-line text-[#0071bd]"></i>
                    {{ formation.date }}
                  </span>
                  <span class="flex items-center gap-1">
                    <i class="ri-hard-drive-2-line"></i>
                    {{ formation.taille }}
                  </span>
                </div>

                <a 
                  :href="formation.url" 
                  download
                  target="_blank"
                  class="w-full flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071bd] bg-[#0071bd]/02 border border-[#0071bd]/10 py-3.5 hover:bg-[#ffe900] hover:border-[#ffe900] transition-colors duration-300"
                >
                  <i class="ri-file-download-line text-sm"></i>
                  Extraire
                </a>
              </div>
            </div>

          </div>
        </article>

      </div>
    </section>

  </main>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>