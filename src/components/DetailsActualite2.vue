<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import slide1 from '../assets/hero.jpg' // Fond du banner générique

const route = useRoute()
const router = useRouter()

// Simulation d'un article récupéré selon le slug (route.params.slug)
const article = ref({
  id: 1,
  titre: "Clôture de la 21ème session de la Conférence des Recteurs (CRPDG) à Dakar",
  chapeau: "Les travaux de la 21ème session ordinaire du Conseil Régional de l'Enseignement Supérieur se sont achevés ce vendredi à Dakar. Les leaders universitaires ont acté des décisions majeures concernant la mutualisation des ressources numériques et la reconnaissance automatique des diplômes inter-régionaux.",
  categorie: "Événements",
  date: "14 Octobre 2024",
  tempsLecture: "5 min",
  auteur: "Secrétariat Général REESAO",
  imageMiseEnAvant: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200&h=675", // Format 16:9 large
  
  // Corps de l'article découpé pour une mise en page propre
  paragraphes: [
    {
      type: 'texte',
      contenu: "Réunies pendant quatre jours au rectorat de l'Université Cheikh Anta Diop (UCAD), les délégations venues des quinze institutions membres du REESAO ont dressé un bilan exhaustif des actions menées durant l'année académique écoulée. Sous la présidence du Professeur Issa Abdou MOUMOULA, cette session s'est démarquée par une volonté accrue d'accélérer la transition numérique globale du réseau."
    },
    {
      type: 'titre',
      contenu: "L'interconnexion des plateformes documentaires : un pas décisif"
    },
    {
      type: 'texte',
      contenu: "Le point d'orgue des délibérations a concerné la validation technique de la nouvelle plateforme interconnectée de la Commission Documentation. Ce dispositif permettra, dès le prochain semestre, à plus de 150 000 étudiants et chercheurs de consulter simultanément les bases de données d'ouvrages, de thèses et de publications scientifiques de l'ensemble des universités partenaires."
    },
    {
      type: 'citation',
      auteur: "Pr. Issa Abdou MOUMOULA, Président du REESAO",
      contenu: "L'Afrique de l'Ouest académique ne peut plus progresser en silos. L'interconnexion de nos ressources documentaires et numériques constitue le socle indispensable sur lequel reposera l'excellence de nos futurs docteurs et la compétitivité internationale de nos laboratoires de recherche."
    },
    {
      type: 'texte',
      contenu: "Par ailleurs, la question de la mobilité académique a fait l'objet d'un accord-cadre révisé. Les critères d'attribution des bourses d'excellence régionales ont été harmonisés afin de favoriser une meilleure équité et de stimuler la recherche sur des thématiques prioritaires telles que le changement climatique, la sécurité alimentaire sous-régionale et les technologies de rupture."
    }
  ],

  // Galerie photo de fin d'article
  galerie: [
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800&h=500"
  ]
})

// LOGIQUE DU SLIDER DE LA GALERIE
const currentSlide = ref(0)

const nextSlide = () => {
  if (currentSlide.value < article.value.galerie.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0 // Boucle au début
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = article.value.galerie.length - 1 // Va à la fin
  }
}

const setSlide = (index) => {
  currentSlide.value = index
}

// Fonction de partage factice
const shareArticle = (platform) => {
  console.log(`Partage de l'article sur : ${platform}`)
}
</script>

<template>
  <main class="w-full bg-slate-50 font-sans selection:bg-[#ffe900] selection:text-[#0071bd]">
    
    <!-- BANNER MINI (HERO SHORT) -->
    <section class="relative pt-36 pb-12 bg-[#0071bd] border-b border-white/10 overflow-hidden">
      <!-- Image de fond -->
      <div class="absolute inset-0 z-0">
        <img :src="slide1" alt="Fond" class="w-full h-full object-cover grayscale opacity-10" />
      </div>

      <div class="relative z-10 max-w-[1200px] mx-auto px-6">
        <!-- Fil d'Ariane -->
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/50 mb-4" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-[#ffe900] transition-colors">Accueil</router-link>
          <i class="ri-arrow-right-s-line text-sm"></i>
          <router-link to="/actualites" class="hover:text-[#ffe900] transition-colors">Actualités</router-link>
          <i class="ri-arrow-right-s-line text-sm"></i>
          <span class="text-[#ffe900] line-clamp-1 max-w-xs md:max-w-md">{{ article.titre }}</span>
        </nav>
      </div>
    </section>

    <!-- CORPS DE LA PAGE ARTICLE -->
    <section class="py-12 lg:py-20 max-w-[1200px] mx-auto px-6">
      
      <!-- EN-TÊTE DE L'ARTICLE -->
      <header class="max-w-4xl mb-12">
        <span class="inline-block bg-[#ffe900] text-[#0071bd] font-mono text-[10px] font-bold px-3 py-1 tracking-widest uppercase mb-6 shadow-sm">
          {{ article.categorie }}
        </span>
        
        <h1 class="text-2xl md:text-4xl lg:text-[44px] font-bold text-[#0071bd] leading-tight tracking-tight mb-6">
          {{ article.titre }}
        </h1>

        <!-- Métadonnées de l'article -->
        <div class="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-400 font-mono text-[11px] uppercase tracking-wider pb-6 border-b border-slate-200">
          <span class="flex items-center gap-1.5"><i class="ri-calendar-event-line text-[#0071bd]"></i> {{ article.date }}</span>
          <span class="flex items-center gap-1.5"><i class="ri-time-line text-[#38a935]"></i> {{ article.tempsLecture }} de lecture</span>
          <span class="flex items-center gap-1.5"><i class="ri-user-follow-line text-[#0071bd]"></i> Par {{ article.auteur }}</span>
        </div>
      </header>

      <!-- LAYOUT PRINCIPAL (CONTENU / BARRE DE PARTAGE LATÉRALE) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- COLONNE CONTENU TEXTE (9/12) -->
        <div class="lg:col-span-9 space-y-8">
          
          <!-- IMAGE MISE EN AVANT (SIGNATURE ASYMÉTRIQUE) -->
          <div class="relative group mb-12">
            <!-- Fond décalé vert -->
            <div class="absolute inset-0 bg-[#38a935] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
            <!-- Image principale -->
            <div class="relative bg-slate-100 border border-slate-200 z-10 w-full aspect-video overflow-hidden">
              <img 
                :src="article.imageMiseEnAvant" 
                :alt="article.titre" 
                class="w-full h-full object-cover shadow-md"
              />
            </div>
          </div>

          <!-- CHAPEAU (INTRODUCTION EN GRAS) -->
          <p class="text-lg md:text-xl font-sans text-slate-700 font-normal leading-relaxed border-l-4 border-[#ffe900] pl-6 py-1 bg-white p-6 shadow-sm">
            {{ article.chapeau }}
          </p>

          <!-- BLOCS DE CONTENU DYNAMIQUES -->
          <div class="prose max-w-none text-slate-600 font-light text-base md:text-lg leading-relaxed space-y-6">
            <template v-for="(bloc, idx) in article.paragraphes" :key="idx">
              
              <!-- Paragraphe standard -->
              <p v-if="bloc.type === 'texte'" class="text-justify">
                {{ bloc.contenu }}
              </p>

              <!-- Sous-titre H2 de section -->
              <h2 v-else-if="bloc.type === 'titre'" class="text-xl md:text-2xl font-bold text-[#0071bd] pt-4 uppercase tracking-tight flex items-center gap-3">
                <span class="w-2 h-4 bg-[#38a935] inline-block"></span>
                {{ bloc.contenu }}
              </h2>

              <!-- Citation institutionnelle mise en valeur -->
              <blockquote v-else-if="bloc.type === 'citation'" class="bg-[#0071bd]/5 border-l-4 border-[#38a935] p-6 md:p-8 my-6 relative overflow-hidden">
                <i class="ri-double-quotes-l absolute -right-4 -bottom-6 text-8xl opacity-5 text-[#0071bd]"></i>
                <p class="font-sans italic text-[#0071bd] text-base md:text-lg font-medium leading-relaxed mb-4">
                  « {{ bloc.contenu }} »
                </p>
                <cite class="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 not-italic block">
                  — {{ bloc.auteur }}
                </cite>
              </blockquote>

            </template>
          </div>

          <!-- SLIDER DE LA GALERIE PHOTO (FIN D'ARTICLE) -->
          <section class="pt-12 border-t border-slate-200" aria-label="Galerie photo de l'événement">
            <h2 class="text-lg font-mono font-bold uppercase tracking-wider text-[#38a935] mb-8 flex items-center gap-2">
              <span>//</span> Galerie d'images
            </h2>

            <!-- STRUCTURE DU SLIDER ASYMÉTRIQUE -->
            <div class="relative max-w-4xl mx-auto group/slider">
              <!-- Fond asymétrique décoratif -->
              <div class="absolute inset-0 bg-[#0071bd] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3"></div>
              
              <!-- Fenêtre de visualisation principale -->
              <div class="relative z-10 aspect-[16/10] bg-slate-900 overflow-hidden border border-slate-300">
                
                <!-- Track / Conteneur coulissant -->
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
                      :alt="`Image ${idx + 1} de la galerie`" 
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <!-- Bouton Précédent (Flèche) -->
                <button 
                  @click="prevSlide"
                  class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/90 text-[#0071bd] hover:bg-[#ffe900] hover:text-[#0071bd] transition-all flex items-center justify-center opacity-0 group-hover/slider:opacity-100 shadow-lg"
                  aria-label="Image précédente"
                >
                  <i class="ri-arrow-left-s-line text-2xl"></i>
                </button>

                <!-- Bouton Suivant (Flèche) -->
                <button 
                  @click="nextSlide"
                  class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/90 text-[#0071bd] hover:bg-[#ffe900] hover:text-[#0071bd] transition-all flex items-center justify-center opacity-0 group-hover/slider:opacity-100 shadow-lg"
                  aria-label="Image suivante"
                >
                  <i class="ri-arrow-right-s-line text-2xl"></i>
                </button>

                <!-- Légende / Compteur flottant -->
                <div class="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-xs font-mono text-white text-[11px] px-3 py-1 tracking-widest">
                  {{ currentSlide + 1 }} / {{ article.galerie.length }}
                </div>
              </div>

              <!-- Indicateurs sous forme de vignettes / miniature cliquables -->
              <div class="relative z-20 flex justify-center gap-2 mt-6 overflow-x-auto py-1">
                <button
                  v-for="(img, idx) in article.galerie"
                  :key="idx"
                  @click="setSlide(idx)"
                  class="w-16 h-12 md:w-20 md:h-14 flex-shrink-0 border-2 transition-all p-0.5 bg-white"
                  :class="currentSlide === idx ? 'border-[#38a935] scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'"
                  :aria-label="`Aller à l'image ${idx + 1}`"
                >
                  <img :src="img" class="w-full h-full object-cover" alt="" />
                </button>
              </div>

            </div>
          </section>

        </div>

        <!-- COLONNE BARRE DE PARTAGE ET ACTIONS LATÉRALE (3/12 - STICKY) -->
        <aside class="lg:col-span-3 lg:sticky lg:top-28 space-y-6">
          <div class="bg-white border border-slate-200 p-6 shadow-sm">
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-[#0071bd] border-b border-slate-100 pb-3 mb-4">
              Partager l'article
            </h3>
            
            <div class="flex flex-col gap-2">
              <button 
                @click="shareArticle('linkedin')"
                class="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-white border border-slate-200 px-4 py-2.5 hover:bg-[#0077b5] hover:border-[#0077b5] transition-all"
              >
                <i class="ri-linkedin-fill text-lg"></i>
                LinkedIn
              </button>
              <button 
                @click="shareArticle('twitter')"
                class="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-white border border-slate-200 px-4 py-2.5 hover:bg-black hover:border-black transition-all"
              >
                <i class="ri-twitter-x-fill text-lg"></i>
                Twitter X
              </button>
              <button 
                @click="shareArticle('facebook')"
                class="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-white border border-slate-200 px-4 py-2.5 hover:bg-[#1877f2] hover:border-[#1877f2] transition-all"
              >
                <i class="ri-facebook-fill text-lg"></i>
                Facebook
              </button>
            </div>
          </div>

          <!-- BOUTON RETOUR TECHNIQUE -->
          <button 
            @click="router.push('/actualites')"
            class="w-full flex items-center justify-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#0071bd] bg-slate-100 border border-slate-200 py-3.5 hover:bg-[#ffe900] hover:border-[#ffe900] transition-all"
          >
            <i class="ri-arrow-left-line"></i>
            Toutes les actualités
          </button>
        </aside>

      </div>

    </section>
  </main>
</template>

<style scoped>
/* Masquer la barre de défilement horizontale des miniatures sur mobile */
.overflow-x-auto {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.overflow-x-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.backdrop-blur-xs {
  backdrop-filter: blur(2px);
}
</style>