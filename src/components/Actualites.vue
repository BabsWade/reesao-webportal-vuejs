<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import slide1 from '../assets/hero.jpg'

const router = useRouter()

// État des articles et de la recherche
const articles = ref([])
const activeFilter = ref('Toute l\'actualité')
const searchQuery = ref('')
const isLoading = ref(true)

const categories = ['Toute l\'actualité', 'A la une', 'Communiqué', 'Événements', 'Recherche']

// Séquence d'accents géométriques pour la diversité visuelle des cartes classiques
const accents = ['green', 'blue', 'yellow']

// Styles des cartouches par accent
const badgeStyles = {
  blue: "bg-[#0071bd] text-white",
  green: "bg-[#38a935] text-white",
  yellow: "bg-[#ffe900] text-[#0071bd]"
}

// Sélecteurs de textures SVG pour les blocs de décalage
const offsetStyles = {
  blue: "url(#texture-page-blue)",
  green: "url(#texture-page-green)",
  yellow: "url(#texture-page-yellow)"
}

onMounted(() => {
  fetchArticles()
})

const fetchArticles = async () => {
  isLoading.value = true
  try {
    const res = await axios.get('https://reesao.org/wp-json/wp/v2/posts?_embed&per_page=20')

    articles.value = res.data.map((post, index) => {
      const terms = post._embedded?.['wp:term']?.[0] || []
      const categoryNames = terms.map(t => t.name)
      const mainCategory = categoryNames[0] || 'Actualité'

      return {
        id: post.id,
        titre: post.title.rendered,
        extrait: post.excerpt.rendered.replace(/<[^>]+>/g, ''), // Nettoyage HTML
        categories: categoryNames,
        categorie: mainCategory,
        accent: accents[index % accents.length],
        date: new Date(post.date).toLocaleDateString('fr-FR', {
          day: '2-digit', month: 'long', year: 'numeric'
        }),
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=450',
        slug: `/actualites/${post.slug}`
      }
    })
  } catch (error) {
    console.error('Erreur chargement articles:', error)
  } finally {
    isLoading.value = false
  }
}

// 1. Logique générale de filtrage (Barre de recherche et onglets)
const globallyFilteredArticles = computed(() => {
  return articles.value.filter(article => {
    const matchesCategory = activeFilter.value === 'Toute l\'actualité' || article.categories.includes(activeFilter.value)
    const matchesSearch = article.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          article.extrait.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

// 2. Séparation 60% : A la une & Différent de Communiqué
const leftArticles = computed(() => {
  const strictALaUne = globallyFilteredArticles.value.filter(a => {
    const cats = a.categories.map(c => c.toLowerCase())
    const isALaUne = cats.includes('a la une') || cats.includes('à la une')
    const isCommunique = cats.includes('communiqué') || cats.includes('communique')
    
    return !isCommunique
  })
  
  if (strictALaUne.length > 0) return strictALaUne
  
  return globallyFilteredArticles.value.filter(a => {
    const cats = a.categories.map(c => c.toLowerCase())
    return !(cats.includes('communiqué') || cats.includes('communique'))
  })
})

// 3. Séparation 40% : Uniquement les Communiqués
const communiqueArticles = computed(() => {
  return globallyFilteredArticles.value.filter(a => {
    const cats = a.categories.map(c => c.toLowerCase())
    return cats.includes('communiqué') || cats.includes('communique')
  })
})

// Navigation
const goToArticle = (slug) => {
  if (slug) {
    router.push(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="w-full bg-[#0071bd]/02 font-sans selection:bg-[#ffe900] selection:text-[#0071bd] overflow-hidden">
    
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="texture-page-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.2" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.7"/>
        </pattern>
        <pattern id="texture-page-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.5" />
        </pattern>
        <pattern id="texture-page-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.1" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.3" />
        </pattern>
      </defs>
    </svg>

    <section class="relative pt-44 pb-24 lg:pt-52 lg:pb-32 bg-[#0071bd] border-b border-[#0071bd]/20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          :src="slide1" 
          alt="Espace académique REESAO" 
          class="w-full h-full object-cover grayscale opacity-15 scale-105 contrast-125"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0071bd] via-transparent to-[#0071bd]/50"></div>
      </div>
      
      <div 
        class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-8" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</router-link>
          <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
          <span class="text-[#ffe900]">Actualités & Communiqués</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-5xl lg:text-[64px] text-white font-black leading-[1.05] tracking-tight">
              Actualités & <br />
              <span class="text-[#ffe900] relative inline-block mt-2">
                Vie du Réseau.
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

    <section class="bg-white border-b border-[#0071bd]/10 sticky top-[70px] z-30 shadow-md backdrop-blur-md bg-white/95">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        
        <nav class="flex flex-wrap gap-2" aria-label="Filtres des actualités">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeFilter = cat"
            class="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border focus:outline-none"
            :class="activeFilter === cat ? 'bg-[#0071bd] text-white border-[#0071bd] shadow-sm' : 'bg-[#0071bd]/02 text-[#0071bd]/70 border-[#0071bd]/10 hover:bg-[#0071bd]/05 hover:text-[#0071bd]'"
          >
            {{ cat }}
          </button>
        </nav>

        <div class="relative w-full lg:w-96 flex items-center">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Rechercher une publication..." 
            class="w-full bg-[#0071bd]/02 border border-[#0071bd]/10 pl-11 pr-10 py-3 text-sm font-sans focus:outline-none focus:border-[#0071bd] focus:bg-white transition-colors text-[#0071bd]" 
          />
          <i class="ri-search-line absolute left-4 text-[#0071bd]/40 text-lg"></i>
          
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''" 
            class="absolute right-4 text-[#0071bd]/40 hover:text-red-500 transition-colors" 
            aria-label="Effacer la recherche"
          >
            <i class="ri-close-line text-lg"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <div v-if="isLoading" class="flex flex-col items-center justify-center p-24 bg-white border border-[#0071bd]/10 max-w-md mx-auto text-center shadow-sm">
        <i class="ri-loader-4-line text-5xl text-[#0071bd] animate-spin block mb-4"></i>
        <p class="text-[#0071bd]/50 font-mono text-[10px] uppercase tracking-[0.2em]">Indexation des archives...</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        
        <div class="lg:col-span-3 flex flex-col">
          <header class="mb-10 flex items-center justify-between border-b border-[#0071bd]/10 pb-4">
            <h2 class="text-xl md:text-2xl font-bold text-[#0071bd] uppercase tracking-tight flex items-center gap-3">
              <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
              Articles & Analyses
            </h2>
            <span class="font-mono text-[10px] font-bold text-[#0071bd]/40 uppercase tracking-widest bg-[#0071bd]/05 px-2 py-0.5">
              {{ leftArticles.length }} Publication(s)
            </span>
          </header>

          <div v-if="leftArticles.length === 0" class="bg-white border border-[#0071bd]/10 p-12 text-center relative">
            <div class="absolute inset-0 opacity-[0.01]" style="background-image: url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'20\' height=\'20\' fill=\'%23000\'/%3E%3C/svg%3E');"></div>
            <p class="text-[#0071bd]/50 font-light text-sm">Aucun article ne correspond aux critères sélectionnés.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            <article 
              v-for="article in leftArticles" 
              :key="article.id"
              class="relative group h-full flex flex-col cursor-pointer"
              @click="goToArticle(article.slug)"
              @keyup.enter="goToArticle(article.slug)"
              tabindex="0"
            >
              <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out z-0 w-full h-full">
                <rect width="100%" height="100%" :fill="offsetStyles[article.accent]" />
              </svg>
              
              <div class="relative bg-white border border-[#0071bd]/10 z-10 w-full flex flex-col h-full transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 bg-white">
                
                <div class="w-full aspect-[16/10] overflow-hidden relative bg-[#0071bd] border-b border-[#0071bd]/10 group/img">
                  <img 
                    :src="article.image" 
                    :alt="article.titre" 
                    class="w-full h-full object-cover opacity-80 transition-all duration-700 ease-out group-hover/img:scale-105 group-hover/img:opacity-100 mix-blend-luminosity hover:mix-blend-normal" 
                    loading="lazy"
                  />
                  <span :class="['absolute top-4 left-4 font-mono text-[9px] font-bold px-3 py-1 tracking-widest uppercase relative overflow-hidden shadow-sm', badgeStyles[article.accent]]">
                    {{ article.categorie }}
                    <span class="absolute inset-0 bg-white/10" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);"></span>
                  </span>
                </div>

                <div class="p-6 flex flex-col flex-grow relative">
                  <div class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#0071bd]/20 m-3 group-hover:border-[#ffe900] transition-colors duration-300"></div>

                  <div class="flex items-center gap-4 text-[#0071bd]/40 font-mono text-[10px] uppercase tracking-wider mb-3">
                    <span class="flex items-center gap-1.5">
                      <i class="ri-calendar-event-line text-[#0071bd]"></i>
                      {{ article.date }}
                    </span>
                  </div>
                  
                  <h3 class="text-lg font-bold text-[#0071bd] leading-snug line-clamp-3 mb-3 group-hover:text-[#0071bd] transition-colors duration-300">
                    {{ article.titre }}
                  </h3>

                  <p class="text-[#0071bd]/60 font-light text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {{ article.extrait }}
                  </p>

                  <div class="mt-auto border-t border-[#0071bd]/05 pt-4 flex items-center justify-between">
                    <span class="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#0071bd] group-hover:text-[#38a935] transition-colors duration-300">
                      Lire la publication
                      <i class="ri-arrow-right-line text-sm transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="lg:col-span-2 flex flex-col lg:sticky lg:top-40 h-fit">
          <header class="mb-10 flex items-center justify-between border-b border-[#0071bd]/10 pb-4">
            <h2 class="text-xl md:text-2xl font-bold text-[#0071bd] uppercase tracking-tight flex items-center gap-3">
              <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></span>
              Communiqués
            </h2>
            <span class="font-mono text-[10px] font-bold text-[#0071bd]/40 uppercase tracking-widest bg-[#0071bd]/05 px-2 py-0.5">
              {{ communiqueArticles.length }} Document(s)
            </span>
          </header>

          <div v-if="communiqueArticles.length === 0" class="bg-white border border-[#0071bd]/10 p-12 text-center">
            <p class="text-[#0071bd]/50 font-light text-sm">Aucun communiqué officiel disponible.</p>
          </div>

          <div class="flex flex-col gap-6">
            <article 
              v-for="article in communiqueArticles" 
              :key="article.id"
              class="relative group cursor-pointer"
              @click="goToArticle(article.slug)"
              @keyup.enter="goToArticle(article.slug)"
              tabindex="0"
            >
              <div class="absolute inset-0 bg-[#0071bd] translate-x-1.5 translate-y-1.5 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"></div>
              
              <div class="relative bg-white border border-[#0071bd]/10 z-10 w-full flex flex-col sm:flex-row h-full transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 overflow-hidden">
                
                <div class="w-full sm:w-28 aspect-video sm:aspect-square overflow-hidden relative bg-[#0071bd] shrink-0 border-b sm:border-b-0 sm:border-r border-[#0071bd]/10 group/thumb">
                  <img 
                    :src="article.image" 
                    :alt="article.titre" 
                    class="w-full h-full object-cover opacity-75 transition-transform duration-500 group-hover/thumb:scale-105" 
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-[#0071bd]/10 mix-blend-multiply"></div>
                </div>

                <div class="p-5 flex flex-col flex-grow bg-white relative">
                  <div class="flex items-center gap-3 text-[#0071bd]/40 font-mono text-[9px] uppercase tracking-wider mb-1.5">
                    <span class="flex items-center gap-1.5">
                      <i class="ri-article-line text-[#38a935]"></i>
                      {{ article.date }}
                    </span>
                  </div>
                  
                  <h3 class="text-sm font-bold text-[#0071bd] leading-snug line-clamp-2 mb-3 group-hover:text-[#0071bd] transition-colors duration-300">
                    {{ article.titre }}
                  </h3>

                  <div class="mt-auto pt-2.5 border-t border-[#0071bd]/10 border-dashed flex items-center justify-between">
                    <span class="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-[#0071bd]/80 group-hover:text-[#38a935] transition-colors">
                      Consulter le document
                      <i class="ri-file-text-line"></i>
                    </span>
                    <i class="ri-arrow-right-up-line text-[#0071bd]/20 group-hover:text-[#38a935] transition-colors"></i>
                  </div>
                </div>

              </div>
            </article>
          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>