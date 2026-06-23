<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import slide1 from '../assets/hero.jpg'

const route = useRoute()
const router = useRouter()

const article = ref(null)
const loading = ref(true)
const error = ref(null)
const currentSlide = ref(0)

// 👉 FETCH ARTICLE DEPUIS L'API WORDPRESS
const fetchArticle = async () => {
  try {
    loading.value = true
    error.value = null

    const res = await axios.get(
      `https://reesao.org/wp-json/wp/v2/posts?slug=${route.params.slug}&_embed`
    )

    const post = res.data[0]

    if (!post) {
      error.value = "Publication introuvable"
      return
    }

    const htmlContent = post.content.rendered

    // 🌟 EXTRACTION DYNAMIQUE DES IMAGES DU CORPS DE L'ARTICLE
    const imgRegex = /<img[^>]+src="([^">]+)"/g
    const extractedImages = []
    let match
    
    while ((match = imgRegex.exec(htmlContent)) !== null) {
      if (!extractedImages.includes(match[1])) {
        extractedImages.push(match[1])
      }
    }

    // 📄 EXTRACTION DYNAMIQUE DU LIEN PDF DANS L'ARTICLE
    const pdfRegex = /href="([^"]+\.pdf)"/i
    const pdfMatch = pdfRegex.exec(htmlContent)
    const extractedPdf = pdfMatch ? pdfMatch[1] : null

    article.value = {
      id: post.id,
      titre: post.title.rendered,
      chapeau: post.excerpt.rendered.replace(/<[^>]+>/g, '').trim(),
      categorie: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Actualités',
      date: new Date(post.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      tempsLecture: '4 min',
      auteur: post._embedded?.author?.[0]?.name || 'Secrétariat REESAO',
      imageMiseEnAvant: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/1200x675',
      contenuHTML: htmlContent,
      pdfUrl: extractedPdf,
      galerie: extractedImages.length > 0 ? extractedImages : [post._embedded?.['wp:featuredmedia']?.[0]?.source_url].filter(Boolean)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (err) {
    console.error(err)
    error.value = "Erreur de connexion au serveur lors de la synchronisation."
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticle()
})

// 👉 LOGIQUE DU SLIDER
const nextSlide = () => {
  if (!article.value?.galerie?.length) return
  currentSlide.value = currentSlide.value < article.value.galerie.length - 1 ? currentSlide.value + 1 : 0
}

const prevSlide = () => {
  if (!article.value?.galerie?.length) return
  currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : article.value.galerie.length - 1
}

const setSlide = (i) => {
  currentSlide.value = i
}

// 👉 LOGIQUE DE PARTAGE RÉEL
const shareArticle = (platform) => {
  const currentUrl = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value?.titre || '')
  let shareUrl = ''

  if (platform === 'linkedin') {
    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
  } else if (platform === 'twitter') {
    shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${text}`
  } else if (platform === 'facebook') {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
  }

  window.open(shareUrl, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <main class="w-full bg-[#0071bd]/02 font-sans selection:bg-[#ffe900] selection:text-[#0071bd] min-h-screen">

    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="texture-details-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.5" />
        </pattern>
        <pattern id="texture-details-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.2" />
        </pattern>
      </defs>
    </svg>

    <div v-if="loading" class="py-40 flex justify-center px-6">
      <div class="flex flex-col items-center justify-center p-16 bg-white border border-[#0071bd]/10 w-full max-w-md text-center shadow-sm relative">
        <div class="absolute inset-0 bg-[#0071bd] translate-x-2.5 translate-y-2.5 -z-10"></div>
        <i class="ri-loader-4-line text-5xl text-[#0071bd] animate-spin block mb-4"></i>
        <p class="text-[#0071bd]/50 font-mono text-[10px] uppercase tracking-[0.2em]">Extraction du document...</p>
      </div>
    </div>

    <div v-else-if="error" class="py-40 flex justify-center px-6">
      <div class="flex flex-col items-center justify-center p-16 bg-white border border-red-500/20 w-full max-w-md text-center shadow-sm relative">
        <div class="absolute inset-0 bg-red-500 translate-x-2.5 translate-y-2.5 -z-10 opacity-20"></div>
        <i class="ri-error-warning-line text-5xl text-red-500 block mb-4"></i>
        <h3 class="text-xl font-bold text-[#0071bd] mb-2">{{ error }}</h3>
        <button 
          @click="router.push('/actualites')" 
          class="mt-6 text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-[#0071bd] px-6 py-3 hover:bg-[#0071bd] transition-colors"
        >
          Retour aux publications
        </button>
      </div>
    </div>

    <div v-else>
      
      <section class="relative pt-36 pb-12 lg:pt-44 lg:pb-16 bg-[#0071bd] border-b border-[#0071bd]/20 overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img :src="slide1" alt="Fond texturé" class="w-full h-full object-cover grayscale opacity-10 contrast-125 scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0071bd] to-transparent"></div>
        </div>
        
        <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"></div>

        <div class="relative z-10 max-w-[1200px] mx-auto px-6">
          <nav class="flex items-center flex-wrap gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-4" aria-label="Breadcrumb">
            <router-link to="/" class="hover:text-[#ffe900] transition-colors">Accueil</router-link>
            <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
            <router-link to="/actualites" class="hover:text-[#ffe900] transition-colors">Actualités</router-link>
            <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
            <span class="text-[#ffe900] line-clamp-1 max-w-[200px] md:max-w-md truncate">{{ article.titre }}</span>
          </nav>
        </div>
      </section>

      <section class="py-12 lg:py-20 max-w-[1200px] mx-auto px-6">
        
        <header class="max-w-4xl mb-12">
          <span class="inline-block bg-[#ffe900] text-[#0071bd] font-mono text-[10px] font-bold px-3 py-1 tracking-widest uppercase mb-6 shadow-sm relative overflow-hidden">
            {{ article.categorie }}
            <span class="absolute inset-0 bg-black/5" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px);"></span>
          </span>
          
          <h1 class="text-3xl md:text-4xl lg:text-[46px] font-black text-[#0071bd] leading-[1.1] tracking-tight mb-8">
            {{ article.titre }}
          </h1>

          <div class="flex flex-wrap items-center gap-y-3 gap-x-6 text-[#0071bd]/50 font-mono text-[10px] uppercase tracking-wider pb-6 border-b border-[#0071bd]/10">
            <span class="flex items-center gap-1.5"><i class="ri-calendar-event-line text-[#0071bd]"></i> {{ article.date }}</span>
            <span class="flex items-center gap-1.5"><i class="ri-time-line text-[#38a935]"></i> {{ article.tempsLecture }}</span>
            <span class="flex items-center gap-1.5"><i class="ri-user-settings-line text-[#0071bd]"></i> {{ article.auteur }}</span>
          </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          <div class="lg:col-span-8 xl:col-span-9 space-y-10">
            
            <div v-if="article.categorie !== 'Communiqué'" class="relative group mb-12">
              <svg class="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 transition-transform duration-300 z-0 w-full h-full">
                <rect width="100%" height="100%" fill="url(#texture-details-green)" />
              </svg>
              <div class="relative bg-[#0071bd]/0 border border-[#0071bd]/10 z-10 w-full aspect-video overflow-hidden group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                <img 
                  :src="article.imageMiseEnAvant" 
                  :alt="article.titre" 
                  class="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 opacity-90 hover:opacity-100"
                />
              </div>
            </div>

            <p v-if="article.chapeau" class="text-lg md:text-xl font-sans text-[#0071bd]/80 font-normal leading-relaxed border-l-[3px] border-[#ffe900] pl-6 py-2 bg-white p-6 shadow-sm">
              {{ article.chapeau }}
            </p>

            <div 
              class="prose max-w-none text-[#0071bd]/70 font-light text-base md:text-lg leading-relaxed space-y-6 
                     prose-p:text-justify prose-p:leading-relaxed
                     prose-h2:text-xl prose-h2:md:text-2xl prose-h2:font-bold prose-h2:text-[#0071bd] prose-h2:pt-8 prose-h2:uppercase prose-h2:tracking-tight prose-h2:border-b prose-h2:border-[#0071bd]/10 prose-h2:pb-2
                     prose-h3:text-lg prose-h3:font-bold prose-h3:text-[#0071bd]
                     prose-blockquote:bg-[#0071bd]/02 prose-blockquote:border-l-[3px] prose-blockquote:border-[#38a935] prose-blockquote:p-6 prose-blockquote:my-8 prose-blockquote:text-[#0071bd] prose-blockquote:font-medium prose-blockquote:italic
                     prose-a:text-[#0071bd] prose-a:underline prose-a:decoration-[#0071bd]/30 prose-a:underline-offset-4 hover:prose-a:text-[#38a935] hover:prose-a:decoration-[#38a935]
                     prose-img:border prose-img:border-[#0071bd]/10 prose-img:shadow-sm"
              v-html="article.contenuHTML"
            ></div>

            <div v-if="article.categorie === 'Communiqué'" class="bg-white border border-[#0071bd]/10 p-8 shadow-sm flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-6 mt-12 relative overflow-hidden group">
              <div class="absolute right-0 top-0 w-32 h-32 bg-[#0071bd]/05 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div class="flex flex-col md:flex-row items-center gap-5">
                <div class="w-14 h-14 bg-[#38a935]/10 text-[#38a935] border border-[#38a935]/20 flex items-center justify-center text-2xl shrink-0">
                  <i class="ri-file-pdf-2-line"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-[#0071bd] mb-1">Document Officiel</h3>
                  <p class="text-sm text-[#0071bd]/50 max-w-md">Ce communiqué est disponible en téléchargement au format PDF pour consultation hors ligne.</p>
                </div>
              </div>
              
              <a 
                v-if="article.pdfUrl"
                :href="article.pdfUrl" 
                target="_blank"
                rel="noopener"
                class="inline-flex items-center shrink-0 gap-3 bg-[#0071bd] text-white font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-4 hover:bg-[#38a935] transition-colors shadow-sm relative overflow-hidden group/btn"
              >
                <i class="ri-download-cloud-2-line text-lg group-hover/btn:-translate-y-0.5 transition-transform"></i>
                <span class="relative z-10">Télécharger</span>
              </a>
              <div v-else class="text-[10px] font-mono uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-6 py-4 text-center">
                <i class="ri-alert-line mr-2"></i> PDF indisponible
              </div>
            </div>

            <section v-if="article.galerie && article.galerie.length > 0 && article.categorie !== 'Communiqué'" class="pt-16 border-t border-[#0071bd]/10" aria-label="Galerie photos de l'article">
              <h2 class="text-lg font-mono font-bold uppercase tracking-wider text-[#0071bd] mb-8 flex items-center gap-3">
                <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></span>
                Galerie multimédia
              </h2>

              <div class="relative w-full mx-auto group/slider">
                <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 z-0 w-full h-full">
                  <rect width="100%" height="100%" fill="url(#texture-details-blue)" />
                </svg>
                
                <div class="relative z-10 aspect-[16/10] bg-[#0071bd] overflow-hidden border border-[#0071bd]/10">
                  <div 
                    class="w-full h-full flex transition-transform duration-500 ease-out"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                  >
                    <div 
                      v-for="(img, idx) in article.galerie" 
                      :key="idx"
                      class="w-full h-full flex-shrink-0"
                    >
                      <img 
                        :src="img" 
                        :alt="`Diapositive ${idx + 1}`" 
                        class="w-full h-full object-cover opacity-90"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <button 
                    @click="prevSlide"
                    class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-[#0071bd]/10 text-[#0071bd] hover:bg-[#ffe900] transition-colors flex items-center justify-center opacity-0 group-hover/slider:opacity-100 shadow-sm"
                    aria-label="Précédent"
                  >
                    <i class="ri-arrow-left-s-line text-xl"></i>
                  </button>

                  <button 
                    @click="nextSlide"
                    class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-[#0071bd]/10 text-[#0071bd] hover:bg-[#ffe900] transition-colors flex items-center justify-center opacity-0 group-hover/slider:opacity-100 shadow-sm"
                    aria-label="Suivant"
                  >
                    <i class="ri-arrow-right-s-line text-xl"></i>
                  </button>

                  <div class="absolute bottom-4 right-4 z-20 bg-[#0071bd] border border-white/10 font-mono text-white text-[10px] px-3 py-1.5 tracking-widest uppercase shadow-sm">
                    {{ currentSlide + 1 }} / {{ article.galerie.length }}
                  </div>
                </div>

                <div v-if="article.galerie.length > 1" class="relative z-20 flex justify-start gap-2 mt-4 overflow-x-auto pb-2">
                  <button
                    v-for="(img, idx) in article.galerie"
                    :key="idx"
                    @click="setSlide(idx)"
                    class="w-16 h-12 md:w-20 md:h-14 flex-shrink-0 border-2 transition-all p-0.5 bg-white shrink-0"
                    :class="currentSlide === idx ? 'border-[#38a935] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'"
                  >
                    <img :src="img" class="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal" alt="" />
                  </button>
                </div>
              </div>
            </section>

          </div>

          <aside class="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 lg:h-fit lg:z-20 space-y-6">
            
            <div class="bg-white border border-[#0071bd]/10 p-6 shadow-sm relative">
              <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0071bd]/30 m-2"></div>
              
              <h3 class="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071bd] border-b border-[#0071bd]/10 pb-4 mb-5 flex items-center gap-2">
                <i class="ri-share-line text-[#0071bd]"></i> Diffuser
              </h3>
              
              <div class="flex flex-col gap-3">
                <button 
                  @click="shareArticle('linkedin')"
                  class="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071bd]/70 border border-[#0071bd]/10 bg-[#0071bd]/02 px-4 py-3 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all hover:-translate-y-0.5"
                >
                  <i class="ri-linkedin-fill text-base"></i> LinkedIn
                </button>
                <button 
                  @click="shareArticle('twitter')"
                  class="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071bd]/70 border border-[#0071bd]/10 bg-[#0071bd]/02 px-4 py-3 hover:bg-black hover:text-white hover:border-black transition-all hover:-translate-y-0.5"
                >
                  <i class="ri-twitter-x-fill text-base"></i> Twitter X
                </button>
                <button 
                  @click="shareArticle('facebook')"
                  class="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071bd]/70 border border-[#0071bd]/10 bg-[#0071bd]/02 px-4 py-3 hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-all hover:-translate-y-0.5"
                >
                  <i class="ri-facebook-fill text-base"></i> Facebook
                </button>
              </div>
            </div>

            <button 
              @click="router.push('/actualites')"
              class="w-full flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071bd] bg-[#ffe900] border border-[#ffe900] px-6 py-4 hover:bg-[#0071bd] hover:text-white hover:border-[#0071bd] transition-colors group"
            >
              <span>Toutes les publications</span>
              <i class="ri-arrow-left-line group-hover:-translate-x-1 transition-transform"></i>
            </button>
          </aside>

        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>