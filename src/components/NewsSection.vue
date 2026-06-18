<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// État de l'API
const articlesData = ref([])
const isLoading = ref(true)

// Styles stricts des cartouches par catégorie
const badgeStyles = {
  blue: "bg-[#0071bd] text-white",
  green: "bg-[#38a935] text-white",
  yellow: "bg-[#ffe900] text-[#0071bd]"
}

// Couleurs des blocs de décalage asymétrique (textures SVG)
const offsetStyles = {
  blue: "url(#texture-news-blue)",
  green: "url(#texture-news-green)",
  yellow: "url(#texture-news-yellow)"
}

// Séquence d'accents pour garder l'esthétique du design
const accents = ['blue', 'green', 'yellow']

onMounted(() => {
  fetchPosts()
})

const fetchPosts = async () => {
  isLoading.value = true
  try {
    // On charge une quinzaine d'articles pour être sûr d'avoir assez de communiqués et d'articles classiques à filtrer
    const res = await axios.get('https://reesao.org/wp-json/wp/v2/posts?_embed&per_page=15')
    
    articlesData.value = res.data.map((post, index) => {
      const terms = post._embedded?.['wp:term']?.[0] || []
      const categoryNames = terms.map(t => t.name)
      const mainCategory = categoryNames[0] || 'Actualité'

      return {
        id: post.id,
        title: post.title.rendered,
        date: new Date(post.date).toLocaleDateString('fr-FR', {
          day: '2-digit', month: 'long', year: 'numeric'
        }),
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=450',
        categories: categoryNames,
        category: mainCategory,
        accent: accents[index % accents.length],
        slug: `/actualites/${post.slug}`
      }
    })
  } catch (error) {
    console.error('Erreur chargement articles:', error)
  } finally {
    isLoading.value = false
  }
}

// Filtrage strict : Exactement 3 articles (excluant les communiqués)
const displayArticles = computed(() => {
  return articlesData.value.filter(a => {
    const cats = a.categories.map(c => c.toLowerCase())
    return !(cats.includes('communiqué') || cats.includes('communique'))
  }).slice(0, 3)
})

// Filtrage strict : Exactement 2 communiqués
const displayCommuniques = computed(() => {
  return articlesData.value.filter(a => {
    const cats = a.categories.map(c => c.toLowerCase())
    return cats.includes('communiqué') || cats.includes('communique')
  }).slice(0, 2)
})

// Navigation Router pour les clics sur les cartes
const goToArticle = (slug) => {
  if (slug) {
    router.push(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="relative bg-white py-24 md:py-32 font-sans border-t border-[#0071bd]/10 overflow-hidden" aria-label="Actualités et Communiqués">
    
    <!-- Fond géométrique unifié (Losanges) en filigrane -->
    <div 
      class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.5\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <!-- Définition des textures SVG pour les ombres portées -->
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Motif Bleu -->
        <pattern id="texture-news-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.8"/>
        </pattern>

        <!-- Motif Vert -->
        <pattern id="texture-news-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.4" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.6" />
        </pattern>

        <!-- Motif Jaune -->
        <pattern id="texture-news-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.1" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <header class="mb-16 lg:mb-24">
        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-7">
            <!-- Label Harmonisé -->
            <div class="flex items-center gap-4 mb-6">
              <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
              <span class="w-12 h-[2px]" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
              <span class="text-[#38a935] text-[11px] font-bold uppercase tracking-[0.2em]">
                Actualités & Informations
              </span>
            </div>

            <h2 class="text-4xl md:text-5xl lg:text-[56px] text-[#0071bd] font-black leading-[1.05] tracking-tight">
              Information, coopération <br />
              <span class="text-[#0071bd] relative inline-block mt-2">
                et décisions du réseau.
                <!-- Soulignement tissé -->
                <span class="absolute -bottom-2 right-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 4px, transparent 4px, transparent 8px);"></span>
              </span>
            </h2>
          </div>

          <div class="lg:col-span-5 pb-2">
            <!-- Bordure latérale tissée -->
            <p class="text-[#0071bd]/60 text-base lg:text-lg font-light leading-relaxed max-w-xl relative pl-6">
              <span class="absolute left-0 top-1 bottom-1 w-[4px]" style="background: repeating-linear-gradient(0deg, #ffe900, #ffe900 6px, transparent 6px, transparent 10px);"></span>
              Suivez les activités officielles, les accords stratégiques et les communications du REESAO à l’échelle régionale et internationale.
            </p>
          </div>
        </div>
      </header>

      <div v-if="isLoading" class="flex flex-col items-center justify-center p-16 max-w-xl mx-auto my-12 text-center bg-white border border-[#0071bd]/10">
        <i class="ri-loader-4-line text-5xl text-[#0071bd] animate-spin block mb-4"></i>
        <p class="text-[#0071bd]/50 font-mono text-[10px] uppercase tracking-[0.2em]">Récupération des actualités...</p>
      </div>

      <div v-else>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
          <article 
            v-for="article in displayArticles" 
            :key="article.id"
            class="group relative cursor-pointer flex flex-col h-full"
            @click="goToArticle(article.slug)"
            @keyup.enter="goToArticle(article.slug)"
            tabindex="0"
          >
            <!-- Ombre décalée texturée -->
            <svg 
              class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out z-0 w-full h-full"
            >
              <rect width="100%" height="100%" :fill="offsetStyles[article.accent]" />
            </svg>
            
            <!-- Carte principale -->
            <div class="relative bg-white border border-[#0071bd]/10 flex flex-col h-full z-10 transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
              
              <div class="aspect-[4/3] overflow-hidden bg-[#0071bd]/25 relative border-b border-[#0071bd]/10 group/img">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="w-full h-full object-cover opacity-100 transition-all duration-700 ease-out group-hover/img:scale-105 "
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-[#0071bd]/20 transition-colors duration-500 group-hover/img:bg-transparent mix-blend-multiply"></div>
              </div>

              <div class="p-6 lg:p-8 flex flex-col flex-grow relative bg-white">
                <!-- Ornement coin -->
                <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#0071bd]/20 m-3 group-hover:border-[#ffe900] transition-colors duration-300"></div>

                <div class="flex flex-wrap items-center gap-4 mb-5">
                  <span :class="['text-[9px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 relative overflow-hidden', badgeStyles[article.accent]]">
                    {{ article.category }}
                    <!-- Micro-texture sur badge -->
                    <span class="absolute inset-0 bg-white/10" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);"></span>
                  </span>
                  <span class="text-[10px] font-mono font-bold text-[#0071bd]/40 tracking-[0.1em] uppercase flex items-center gap-1.5">
                    <i class="ri-calendar-event-line"></i>
                    {{ article.date }}
                  </span>
                </div>

                <h3 class="text-lg lg:text-xl font-bold text-[#0071bd] leading-snug group-hover:text-[#0071bd] transition-colors duration-300 mt-auto line-clamp-3">
                  {{ article.title }}
                </h3>
                
                <!-- Ligne de séparation subtile -->
                <div class="w-12 h-[2px] mt-6 bg-[#0071bd]/10 group-hover:bg-[#ffe900] transition-colors duration-300"></div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Section Communiqués Harmonisée -->
      <div v-if="!isLoading" class="border-t border-[#0071bd]/10 pt-16 mt-20">
        <div class="grid lg:grid-cols-12 gap-8">
          
          <div class="lg:col-span-4 flex items-start pt-6">
            <h3 class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0071bd] flex items-center gap-3">
              <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
              Communiqués Officiels
            </h3>
          </div>

          <div class="lg:col-span-8 flex flex-col relative">
            <!-- Bordure tissée verticale latérale -->
            <div class="absolute -left-4 top-0 bottom-0 w-[1px] opacity-20" style="background: repeating-linear-gradient(0deg, #0071bd, #0071bd 4px, transparent 4px, transparent 8px);"></div>

            <a 
              v-for="(c, i) in displayCommuniques" 
              :key="c.id"
              @click.prevent="goToArticle(c.slug)"
              @keyup.enter="goToArticle(c.slug)"
              tabindex="0"
              class="group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-[#0071bd]/10 transition-colors duration-300 ease-out hover:bg-[#0071bd]/5 px-4 -mx-4"
            >
              <div class="flex items-center gap-6">
                <!-- Index stylisé -->
                <span class="font-mono text-sm font-bold tracking-widest text-[#0071bd]/20 group-hover:text-[#38a935] transition-colors flex items-center gap-2">
                   <span class="w-1.5 h-1.5 bg-[#ffe900] rotate-45 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  [{{ String(i + 1).padStart(2, '0') }}]
                </span>
                
                <div class="flex flex-col gap-1.5">
                  <span class="text-base sm:text-lg text-[#0071bd] font-bold group-hover:text-[#0071bd] transition-colors line-clamp-2">
                    {{ c.title }}
                  </span>
                  <span class="text-[10px] font-mono font-bold text-[#0071bd]/40 tracking-[0.1em] uppercase">Publié le {{ c.date }}</span>
                </div>
              </div>
              
              <!-- Bouton Consulter Harmonisé (Style 3D décalé) -->
              <div class="sm:ml-auto flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative mt-4 sm:mt-0">
                <div class="absolute inset-0 bg-[#38a935] translate-x-1.5 translate-y-1.5"></div>
                <div class="relative border border-[#0071bd]/10 px-4 py-2 bg-white flex items-center">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0071bd] mr-3">Consulter</span>
                  <i class="ri-arrow-right-line text-[#0071bd] text-lg"></i>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- CTA Toutes les actualités -->
      <div v-if="!isLoading" class="mt-20 flex justify-center border-t border-[#0071bd]/10 pt-16">
        <router-link 
          to="/actualites" 
          class="relative group"
        >
          <!-- Ombre décalée (Effet 3D isométrique) -->
          <div class="absolute inset-0 bg-[#38a935] translate-x-2 translate-y-2 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1"></div>
          
          <!-- Corps bouton -->
          <div class="relative bg-[#0071bd] text-white px-8 py-4 text-[11px] font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-3 border border-[#0071bd] transition-colors group-hover:bg-[#ffe900] group-hover:text-[#0071bd] group-hover:border-[#ffe900]">
            <span class="w-1.5 h-1.5 bg-[#ffe900] group-hover:bg-[#0071bd] rotate-45 mr-1 transition-colors"></span>
            Toutes les actualités
            <i class="ri-arrow-right-line text-lg transform group-hover:translate-x-1 transition-transform duration-300 ml-2"></i>
          </div>
        </router-link>
      </div>

      <!-- Footer Section Harmonisé -->
      <footer class="mt-24 pt-8 border-t border-[#0071bd]/10">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0071bd]/40 relative px-6">
          
          <!-- Séparateur tissé latéral footer -->
          <div class="absolute left-0 top-0 bottom-0 w-[3px]" style="background: repeating-linear-gradient(0deg, rgba(0,113,189,0.1), rgba(0,113,189,0.1) 2px, transparent 2px, transparent 4px);"></div>

          <div class="flex items-center gap-3">
            <span class="w-2 h-2 bg-[#0071bd] rotate-45 block opacity-40"></span> 
            <span>Bureau de Presse & Information</span>
          </div>
          
          <div class="text-center sm:text-right flex items-center gap-3">
            <span class="w-4 h-[1px] bg-[#0071bd]/20"></span>
            Dernière mise à jour : Année académique 2026
          </div>
        </div>
      </footer>

    </div>
  </section>
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