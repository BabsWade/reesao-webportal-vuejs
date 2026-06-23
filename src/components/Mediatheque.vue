<script setup>
import slide1 from '../assets/hero.jpg' 
import { ref, computed, onMounted } from 'vue'

// Métadonnées des catégories (Titres & Descriptions institutionnels)
const categoriesMeta = {
  crpdg: {
    title: "Conférence des Recteurs (CRPDG)",
    description: "Sessions stratégiques, délibérations et hautes décisions de la Conférence des Recteurs et Présidents d'institutions pour l'harmonisation académique régionale.",
    pattern: "url(#texture-media-blue)",
    color: "#0071bd"
  },
  ateliers: {
    title: "Ateliers de Formation",
    description: "Sessions pratiques de renforcement des compétences, ateliers technologiques et travaux collaboratifs inter-universitaires.",
    pattern: "url(#texture-media-green)",
    color: "#38a935"
  },
  seminaire: {
    title: "Séminaires Académiques",
    description: "Rencontres thématiques, partages de recherches scientifiques et panels d'experts dédiés aux enjeux éducatifs contemporains.",
    pattern: "url(#texture-media-yellow)",
    color: "#ffe900"
  },
  partenariat: {
    title: "Partenariats & Conventions",
    description: "Signatures officielles d'accords, alliances stratégiques et consolidation des réseaux de coopération internationaux.",
    pattern: "url(#texture-media-blue)",
    color: "#0071bd"
  },
  visite: {
    title: "Visites Institutionnelles",
    description: "Accueil de délégations officielles, visites guidées de nos infrastructures et découverte des écosystèmes partenaires.",
    pattern: "url(#texture-media-green)",
    color: "#38a935"
  },
  audience: {
    title: "Audiences Officielles",
    description: "Rencontres de haut niveau avec les instances ministérielles, diplomatiques et les autorités étatiques.",
    pattern: "url(#texture-media-yellow)",
    color: "#ffe900"
  }
}

// État de l'interface
const activeCategory = ref('crpdg')
const isLoading = ref(true)
const error = ref(null)
const imagesData = ref([])

// Gestion de la visionneuse (Lightbox)
const lightboxImage = ref(null)
const openLightbox = (image) => { lightboxImage.value = image }
const closeLightbox = () => { lightboxImage.value = null }

// Récupération et filtrage des données depuis l'API WordPress
const fetchImages = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    // per_page=100 permet de scanner un maximum d'images récentes
    const response = await fetch('https://reesao.org/wp-json/wp/v2/media?media_type=image&per_page=100')
    if (!response.ok) throw new Error("Erreur de liaison réseau lors de la récupération des archives.")
    
    const data = await response.json()
    const validCategories = Object.keys(categoriesMeta) 
    const parsedImages = []
    
    data.forEach(item => {
      // Nettoyage de la légende : on extrait le tag de catégorie
      const rawCaption = item.caption?.rendered || ''
      const cleanCategory = rawCaption.replace(/<[^>]*>?/gm, '').trim().toLowerCase()
      
      // Si la légende nettoyée correspond à l'une de nos catégories, on la conserve
      if (validCategories.includes(cleanCategory)) {
        const bestImageSize = 
          item.media_details?.sizes?.large?.source_url || 
          item.media_details?.sizes?.medium_large?.source_url || 
          item.source_url

        parsedImages.push({
          id: item.id,
          category: cleanCategory,
          source_url: bestImageSize,
          title: item.title?.rendered || 'Archive visuelle REESAO'
        })
      }
    })
    
    imagesData.value = parsedImages

  } catch (err) {
    error.value = err.message
    console.error('API Error (Mediatheque):', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchImages()
})

// Filtrage dynamique réactif selon l'onglet actif
const filteredImages = computed(() => {
  return imagesData.value.filter(img => img.category === activeCategory.value)
})
</script>

<template>
  <main class="w-full bg-[#0071bd]/02 font-sans selection:bg-[#ffe900] selection:text-[#0071bd] min-h-screen">
    
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="texture-media-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
        </pattern>
        <pattern id="texture-media-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.4" />
        </pattern>
        <pattern id="texture-media-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.1" />
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
          <span class="text-[#ffe900]">médiathèque</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-5xl lg:text-[64px] text-white font-black leading-[1.05] tracking-tight">
              Médiathèque <br />
              <span class="text-[#ffe900] relative inline-block mt-2">
                du Réseau.
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

    <section class="w-full py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div 
        class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="max-w-[1400px] mx-auto relative z-10">
        
        <div class="max-w-3xl mb-12 border-b border-[#0071bd]/10 pb-10">
          <p class="text-[#0071bd]/60 text-sm md:text-base font-light leading-relaxed">
            Explorez les moments forts, les sessions de travail et les jalons historiques de notre espace académique à travers nos galeries documentées.
          </p>
        </div>

        <div class="flex flex-wrap gap-3 mb-12 pb-2 overflow-x-auto scrollbar-none">
          <button
            v-for="(meta, key) in categoriesMeta"
            :key="key"
            @click="activeCategory = key"
            :class="[
              'px-6 py-3.5 text-[10px] font-mono uppercase tracking-[0.15em] font-bold transition-all duration-300 rounded-none border flex items-center gap-2 relative group',
              activeCategory === key
                ? 'bg-[#0071bd] text-white border-[#0071bd] shadow-md'
                : 'bg-white text-[#0071bd]/60 border-[#0071bd]/10 hover:border-[#0071bd]/30 hover:bg-[#0071bd]/05 hover:text-[#0071bd]'
            ]"
          >
            <span v-if="activeCategory === key" class="w-1.5 h-1.5 bg-[#ffe900] rotate-45 block transition-all"></span>
            <span v-else class="w-1.5 h-1.5 bg-[#0071bd]/20 rotate-45 block group-hover:bg-[#0071bd]/40 transition-all"></span>
            
            {{ meta.title }}
          </button>
        </div>

        <transition mode="out-in" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
          <div :key="activeCategory" class="bg-white border border-[#0071bd]/10 p-6 md:p-8 shadow-sm mb-16 relative overflow-hidden group">
            
            <div class="absolute left-0 top-0 bottom-0 w-2 transition-colors duration-300" 
                 :style="`background: repeating-linear-gradient(45deg, ${categoriesMeta[activeCategory].color}, ${categoriesMeta[activeCategory].color} 4px, transparent 4px, transparent 8px);`">
            </div>
            
            <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#0071bd]/10 m-4"></div>

            <div class="pl-4">
              <h2 class="text-xl font-bold text-[#0071bd] uppercase tracking-tight mb-3 flex items-center gap-3">
                <span class="w-2 h-2 rotate-45 block" :style="{ backgroundColor: categoriesMeta[activeCategory].color }"></span>
                {{ categoriesMeta[activeCategory].title }}
              </h2>
              <p class="text-[#0071bd]/60 text-sm font-light leading-relaxed max-w-5xl">
                {{ categoriesMeta[activeCategory].description }}
              </p>
            </div>
          </div>
        </transition>

        <div v-if="isLoading" class="flex flex-col items-center justify-center py-28 gap-4 bg-white border border-[#0071bd]/10">
          <i class="ri-loader-4-line text-5xl text-[#0071bd] animate-spin"></i>
          <p class="text-[#0071bd]/40 font-mono text-[10px] uppercase tracking-[0.2em]">Extraction des archives visuelles...</p>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 p-12 text-center max-w-2xl mx-auto my-12 relative">
          <i class="ri-error-warning-line text-5xl text-red-500 block mb-4"></i>
          <h3 class="text-lg font-bold text-red-700 mb-2">Erreur de liaison</h3>
          <p class="text-red-900/60 text-sm font-light mb-6">{{ error }}</p>
          <button 
            @click="fetchImages" 
            class="text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-red-600 px-6 py-3.5 hover:bg-red-700 transition-colors duration-200"
          >
            Tenter une nouvelle connexion
          </button>
        </div>

        <div v-else class="relative">
          <transition-group 
            name="gallery" 
            tag="div" 
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            enter-active-class="transition duration-500 ease-out" 
            enter-from-class="opacity-0 scale-95" 
            enter-to-class="opacity-100 scale-100"
          >
            <div v-if="filteredImages.length === 0" key="empty" class="col-span-full text-center py-24 bg-white border border-[#0071bd]/10">
              <i class="ri-image-line text-4xl text-[#0071bd]/20 block mb-4"></i>
              <p class="text-[#0071bd]/40 font-mono text-[10px] font-bold uppercase tracking-widest">// Aucun document catalogué pour cette section</p>
            </div>

            <div 
              v-for="image in filteredImages" 
              :key="image.id"
              @click="openLightbox(image)"
              class="group relative cursor-pointer flex h-full"
            >
              <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out group-hover:translate-x-3.5 group-hover:translate-y-3.5 z-0 w-full h-full">
                <rect width="100%" height="100%" :fill="categoriesMeta[image.category]?.pattern || 'url(#texture-media-blue)'" />
              </svg>
              
              <div class="relative bg-white border border-[#0071bd]/10 z-10 w-full flex flex-col h-full transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-[#0071bd]">
                
                <div class="aspect-[4/3] w-full overflow-hidden bg-[#0071bd] relative border-b border-[#0071bd]/10">
                  <img 
                    :src="image.source_url" 
                    :alt="image.title" 
                    class="w-full h-full object-cover transition-all duration-700 ease-out  opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-[#0071bd]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-xs">
                    <span class="text-[10px] font-mono text-[#ffe900] uppercase font-bold tracking-[0.15em] flex items-center gap-2 border border-[#ffe900]/30 px-6 py-3">
                      <i class="ri-zoom-in-line text-lg"></i> Agrandir
                    </span>
                  </div>
                </div>

                <div class="p-5 flex-grow bg-white flex flex-col justify-center">
                  <span class="text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-2 block border-b border-[#0071bd]/10 pb-2" :style="{ color: categoriesMeta[image.category]?.color || '#0071bd' }">
                    // {{ categoriesMeta[image.category]?.title }}
                  </span>
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[#0071bd] line-clamp-2 leading-relaxed group-hover:text-[#0071bd] transition-colors" v-html="image.title">
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

      </div>

      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="lightboxImage" class="fixed inset-0 z-50 bg-[#0071bd]/95 backdrop-blur-md flex flex-col justify-center items-center p-4 md:p-8" @click.self="closeLightbox">
          
          <button @click="closeLightbox" class="absolute top-6 right-6 text-white/40 hover:text-[#ffe900] transition-colors p-2 focus:outline-none group/close" aria-label="Fermer la visionneuse">
            <i class="ri-close-line text-4xl group-hover/close:rotate-90 transition-transform duration-300"></i>
          </button>

          <div class="max-w-5xl max-h-[75vh] bg-black p-2 border border-white/10 shadow-2xl relative">
            <img :src="lightboxImage.source_url" :alt="lightboxImage.title" class="w-full h-full object-contain max-h-[75vh]" />
          </div>

          <div class="mt-6 max-w-3xl text-center px-8 py-4 border-l-2" :style="{ borderColor: categoriesMeta[lightboxImage.category]?.color || '#ffe900' }">
            <span class="block font-mono text-[10px] uppercase tracking-widest mb-2" :style="{ color: categoriesMeta[lightboxImage.category]?.color || '#ffe900' }">
              // {{ categoriesMeta[lightboxImage.category]?.title }}
            </span>
            <div class="text-white text-xs md:text-sm font-bold uppercase tracking-wide leading-relaxed" v-html="lightboxImage.title"></div>
          </div>
        </div>
      </transition>

    </section>
  </main>
</template>

<style scoped>
/* Masque la barre de défilement horizontale des boutons de filtres sur mobile */
.scrollbar-none {
  -ms-overflow-style: none;  /* IE/Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-none::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Sécurisation du rendu multi-lignes pour les titres des médias */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.backdrop-blur-xs {
  backdrop-filter: blur(2px);
}

/* Animations de transition de la galerie à l'activation des filtres */
.gallery-move,
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.gallery-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(5px);
}
.gallery-leave-active {
  position: absolute;
}
</style>