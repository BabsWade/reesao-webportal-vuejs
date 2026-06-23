<script setup>
import { ref, computed, onMounted } from 'vue'
import slide1 from '../assets/hero.jpg' // Image de fond pour le banner de page

// Liste des filtres disponibles
const categories = ['Tous', 'Rapports Annuels', 'Bilans Financiers', 'Études & Projets']
const activeFilter = ref('Tous')
const searchQuery = ref('')

// États pour l'API
const rapports = ref([])
const isLoading = ref(true)
const error = ref(null)

// Fallbacks de couvertures Unsplash (utilisés si le PDF n'a pas de miniature générée par WP)
const coverFallbacks = [
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600&h=850",
  "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600&h=850",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600&h=850",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600&h=850"
]

// Convertir la taille (en octets) envoyée par WP en Mo ou Ko lisibles
const formatFileSize = (bytes) => {
  if (!bytes) return "N/A"
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${mb.toFixed(1)} Mo`
  const kb = bytes / 1024
  return `${kb.toFixed(0)} Ko`
}

// Convertir la date WP "YYYY-MM-DD..." au format "Mois Année" en Français
const formatDateFrench = (dateString) => {
  if (!dateString) return "Date inconnue"
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
             .replace(/^\w/, (c) => c.toUpperCase())
}

// Assigner dynamiquement une catégorie selon le contenu du titre du document
const inferCategory = (title) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes('financier') || lowerTitle.includes('audit') || lowerTitle.includes('bilan') || lowerTitle.includes('comptable')) {
    return 'Bilans Financiers'
  }
  if (lowerTitle.includes('annuel') || lowerTitle.includes('crpdg') || lowerTitle.includes('conférence') || lowerTitle.includes('rapport')) {
    return 'Rapports Annuels'
  }
  return 'Études & Projets' // Catégorie par défaut
}

// Associer une thématique visuelle à chaque catégorie
const getThemeByCategory = (category) => {
  switch(category) {
    case 'Rapports Annuels':
      return { pattern: 'url(#texture-african-blue)', colorCode: '#0071bd', hoverBorder: 'group-hover:border-[#0071bd]' }
    case 'Bilans Financiers':
      return { pattern: 'url(#texture-african-yellow)', colorCode: '#eab308', hoverBorder: 'group-hover:border-[#ffe900]' } // #eab308 pour lisibilité texte
    case 'Études & Projets':
      return { pattern: 'url(#texture-african-green)', colorCode: '#38a935', hoverBorder: 'group-hover:border-[#38a935]' }
    default:
      return { pattern: 'url(#texture-african-blue)', colorCode: '#0071bd', hoverBorder: 'group-hover:border-[#0071bd]' }
  }
}

// Récupération des données depuis l'API WordPress
const fetchRapports = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    // per_page=100 permet d'analyser un grand volume de PDF avant de filtrer
    const response = await fetch('https://reesao.org/wp-json/wp/v2/media?mime_type=application/pdf&per_page=100')
    if (!response.ok) throw new Error('Impossible de charger les documents institutionnels.')
    
    const data = await response.json()
    
    // ÉTAPE DE FILTRAGE : On ne garde que les médias ayant la légende <p>Rapport</p>\n
    const donneesFiltrees = data.filter(item => item.caption?.rendered === '<p>Rapport</p>\n')
    
    // Mapping des données filtrées vers la structure locale
    rapports.value = donneesFiltrees.map((item, index) => {
      const cleanTitle = item.title?.rendered || "Document sans titre"
      const categorie = inferCategory(cleanTitle)
      const wpThumb = item.media_details?.sizes?.medium?.source_url || item.media_details?.sizes?.full?.source_url
      const finalImage = wpThumb || coverFallbacks[index % coverFallbacks.length]

      return {
        id: item.id,
        titre: cleanTitle,
        categorie: categorie,
        theme: getThemeByCategory(categorie),
        date: formatDateFrench(item.date),
        taille: formatFileSize(item.media_details?.filesize),
        format: "PDF",
        image: finalImage,
        url: item.source_url
      }
    })
  } catch (err) {
    error.value = err.message
    console.error('API Error:', err)
  } finally {
    isLoading.value = false
  }
}

// Appel au montage du composant
onMounted(() => {
  fetchRapports()
})

// Logique de filtrage et recherche combinée
const filteredRapports = computed(() => {
  return rapports.value.filter(rapport => {
    const matchesCategory = activeFilter.value === 'Tous' || rapport.categorie === activeFilter.value
    const matchesSearch = rapport.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          rapport.categorie.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <main class="w-full bg-white font-sans selection:bg-[#ffe900] selection:text-[#0071bd] overflow-hidden">
    
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
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-8" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</router-link>
          <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
          <span class="text-[#ffe900]">Rapports</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-5xl lg:text-[64px] text-white font-black leading-[1.05] tracking-tight">
              Rapports et <br />
              <span class="text-[#ffe900] relative inline-block mt-2">
                Comptes rendus
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

    <section class="bg-white border-b border-[#0071bd]/10 sticky top-[70px] z-30 shadow-sm">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        
        <nav class="flex flex-wrap gap-2" aria-label="Filtres de rapports">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeFilter = cat"
            class="px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 rounded-none border flex items-center gap-2"
            :class="activeFilter === cat 
              ? 'bg-[#0071bd] text-white border-[#0071bd]' 
              : 'bg-white text-[#0071bd]/60 border-[#0071bd]/10 hover:bg-[#0071bd]/5 hover:text-[#0071bd]'"
          >
            <span v-if="activeFilter === cat" class="w-1.5 h-1.5 bg-[#ffe900] rotate-45 block"></span>
            {{ cat }}
          </button>
        </nav>

        <div class="relative w-full lg:w-96 flex items-center">
          <label for="search-reports" class="sr-only">Rechercher un rapport</label>
          <input
            id="search-reports"
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par titre ou mot-clé..."
            class="w-full bg-white border border-[#0071bd]/10 pl-11 pr-4 py-3 text-sm font-sans focus:outline-none focus:border-[#0071bd] focus:ring-1 focus:ring-[#0071bd] transition-colors text-[#0071bd]"
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

    <section class="relative py-16 lg:py-24">
      
      <div 
        class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        
        <header class="mb-14 flex items-start justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="hidden sm:flex flex-col items-center gap-1.5 mt-2">
              <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
              <span class="w-1.5 h-12 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
            </div>
            <div>
              <h2 class="text-3xl md:text-4xl font-black text-[#0071bd] leading-tight tracking-tight uppercase">
                Documents Institutionnels
              </h2>
              <p class="text-sm text-[#0071bd]/60 font-light mt-2">Accédez et téléchargez les publications de gouvernance du réseau.</p>
            </div>
          </div>
          <span v-if="!isLoading && !error" class="hidden md:inline-block font-mono text-[10px] font-bold text-[#0071bd]/40 border border-[#0071bd]/10 bg-white px-3 py-1.5 mt-2">
            {{ filteredRapports.length }} RÉSULTAT(S)
          </span>
        </header>

        <div v-if="isLoading" class="flex flex-col items-center justify-center p-16 max-w-xl mx-auto my-12 text-center bg-white border border-[#0071bd]/10">
          <i class="ri-loader-4-line text-5xl text-[#0071bd] animate-spin block mb-4"></i>
          <p class="text-[#0071bd]/50 font-mono text-[10px] uppercase tracking-[0.2em]">Connexion au portail et récupération des documents...</p>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 p-12 text-center max-w-xl mx-auto my-12 relative">
          <i class="ri-error-warning-line text-5xl text-red-500 block mb-4"></i>
          <h3 class="text-lg font-bold text-red-700 mb-2 uppercase tracking-wider">Erreur de synchronisation</h3>
          <p class="text-[#0071bd]/60 text-sm font-light mb-6">{{ error }}</p>
          <button 
            @click="fetchRapports" 
            class="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-white bg-red-600 px-5 py-3 hover:bg-red-700 transition-colors duration-300"
          >
            Réessayer la synchronisation
          </button>
        </div>

        <div v-else-if="filteredRapports.length === 0" class="bg-white border border-[#0071bd]/10 p-16 text-center max-w-xl mx-auto my-12">
          <i class="ri-file-search-line text-5xl text-[#0071bd]/20 block mb-4"></i>
          <h3 class="text-lg font-bold text-[#0071bd] mb-2 uppercase tracking-wider">Aucun document trouvé</h3>
          <p class="text-[#0071bd]/60 font-light text-sm">Aucun rapport ne correspond à vos critères de recherche ("{{ searchQuery }}").</p>
          <button 
            @click="searchQuery = ''; activeFilter = 'Tous'" 
            class="mt-6 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#0071bd] border border-[#0071bd] px-4 py-2.5 hover:bg-[#0071bd] hover:text-white transition-colors duration-300"
          >
            Réinitialiser les filtres
          </button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          
          <article 
            v-for="rapport in filteredRapports" 
            :key="rapport.id"
            class="relative group h-full flex cursor-default"
          >
            <svg 
              class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out z-0 w-full h-full"
            >
              <rect width="100%" height="100%" :fill="rapport.theme.pattern" />
            </svg>
            
            <div 
              class="relative bg-white border border-[#0071bd]/10 z-10 w-full flex flex-col transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1"
              :class="rapport.theme.hoverBorder"
            >
              
              <div class="w-full aspect-[1/1.414] overflow-hidden relative bg-white border-b border-[#0071bd]/10 group/img">
                <img 
                  :src="rapport.image" 
                  :alt="`Couverture : ${rapport.titre}`" 
                  class="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover/img:scale-105 group-hover/img:opacity-100"
                  loading="lazy"
                />
                
                <span class="absolute top-4 left-4 bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 tracking-wider shadow">
                  {{ rapport.format }}
                </span>

                <div class="absolute inset-0 bg-[#0071bd]/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                  <a 
                    :href="rapport.url" 
                    download
                    target="_blank"
                    class="w-12 h-12 bg-[#ffe900] text-[#0071bd] flex items-center justify-center text-xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                    :aria-label="`Télécharger ${rapport.titre}`"
                  >
                    <i class="ri-download-cloud-2-line"></i>
                  </a>
                  <span class="text-white text-[10px] font-mono font-bold uppercase tracking-widest mt-1">Télécharger ({{ rapport.taille }})</span>
                </div>
              </div>

              <div class="p-6 flex flex-col flex-grow bg-white">
                
                <span class="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" :style="{ color: rapport.theme.colorCode }">
                  <span class="w-1.5 h-1.5 rotate-45 block" :style="{ backgroundColor: rapport.theme.colorCode }"></span>
                  {{ rapport.categorie }}
                </span>
                
                <h3 class="text-sm font-bold text-[#0071bd] leading-snug line-clamp-3 mb-6 transition-colors duration-300 flex-grow" v-html="rapport.titre">
                </h3>

                <div class="mt-auto">
                  <div class="w-full h-[2px] mb-4 opacity-20" :style="`background: repeating-linear-gradient(45deg, ${rapport.theme.colorCode}, ${rapport.theme.colorCode} 2px, transparent 2px, transparent 4px);`"></div>
                  
                  <div class="flex items-center justify-between text-[#0071bd]/40 font-mono text-[10px] mb-4 uppercase tracking-wider">
                    <span class="flex items-center gap-1.5">
                      <i class="ri-calendar-event-line"></i>
                      {{ rapport.date }}
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="ri-hard-drive-2-line"></i>
                      {{ rapport.taille }}
                    </span>
                  </div>

                  <a 
                    :href="rapport.url" 
                    download
                    target="_blank"
                    class="w-full flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#0071bd] bg-white border border-[#0071bd]/20 py-3 hover:bg-[#ffe900] hover:text-[#0071bd] hover:border-[#ffe900] transition-colors duration-300 group-hover:bg-[#0071bd]/5"
                  >
                    <i class="ri-file-download-line text-sm"></i>
                    Télécharger
                  </a>
                </div>

              </div>
            </div>
          </article>

        </div>
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

.backdrop-blur-xs {
  backdrop-filter: blur(2px);
}
</style>