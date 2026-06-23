<script setup>
import { ref } from 'vue'
import slide1 from '../assets/hero.jpg' // Image de fond pour le banner
import presidentImg from "../assets/PR.jpg";
import vp1Img from "../assets/VP1.jpg";
import vp2Img from "../assets/VP2.jpg";
import sgImg from "../assets/SG.jpg";
import sgaImg from "../assets/SGA.jpg";
import trImg from "../assets/TR.jpg";

// Données d'exemple pour le comité exécutif
const membres = ref([
  {
    id: 1,
    nom: 'Professeur Mamadou Babacar NDIAYE',
    fonction: 'Président du REESAO',
    image: presidentImg,
    linkedin: 'https://linkedin.com',
    biographie: `Le Professeur Issa Abdou MOUMOULA est le Président actuel du REESAO. Éminent chercheur et administrateur académique, il a consacré plus de 20 ans au développement de l'enseignement supérieur en Afrique de l'Ouest. \n\nSous sa direction, de nombreuses réformes ont été initiées pour harmoniser le système LMD au sein de l'espace ouest-africain. Il est également l'auteur de plusieurs publications scientifiques de renommée internationale sur l'innovation éducative et la gestion universitaire.`,
    colorTheme: 'blue'
  },
  {
    id: 2,
    nom: 'Professeur Bertrand SOGBOSSI BOCCO',
    fonction: 'Vice-Président',
    image: vp1Img,
    linkedin: 'https://linkedin.com',
    biographie: `Docteure en Sciences de l'Éducation, Aminata Diallo supervise les commissions spécialisées du réseau. Elle a auparavant dirigé l'Institut de Recherche en Pédagogie Avancée.\n\nElle s'assure de l'alignement des programmes académiques avec les standards internationaux, avec un focus particulier sur l'intégration des technologies de l'information et de la communication (TIC) dans l'apprentissage.`,
    colorTheme: 'green'
  },
  {
    id: 3,
    nom: 'Professeur Paul TRAORE',
    fonction: '2ᵉ Vice-Président',
    image: vp2Img,
    linkedin: null, // Test sans LinkedIn
    biographie: `Professeur titulaire en Économie, Koffi Kouassi coordonne l'ensemble des activités administratives et le suivi quotidien des dossiers du REESAO. \n\nIl est la cheville ouvrière de l'organisation matérielle des rencontres annuelles et assure la liaison constante entre les différents établissements membres et les partenaires internationaux.`,
    colorTheme: 'yellow'
  },
  {
    id: 4,
    nom: 'Professeur Cheikh SARR',
    fonction: 'Secrétaire Général (SG)',
    image: sgImg,
    linkedin: 'https://linkedin.com',
    biographie: `Experte-comptable diplômée avec une spécialisation en gestion des institutions publiques, Fatou Sow gère les ressources financières du REESAO depuis 2021.\n\nElle veille à la transparence financière, à la collecte des cotisations et à la gestion des subventions allouées aux projets de recherche inter-universitaires du réseau.`,
    colorTheme: 'blue'
  },
  {
    id: 5,
    nom: 'Professeur Aklesso Yao G. EGBENDEWE',
    fonction: 'Secrétaire Général Adjoint (SGA)',
    image: sgaImg,
    linkedin: 'https://linkedin.com',
    biographie: `Experte-comptable diplômée avec une spécialisation en gestion des institutions publiques, Fatou Sow gère les ressources financières du REESAO depuis 2021.\n\nElle veille à la transparence financière, à la collecte des cotisations et à la gestion des subventions allouées aux projets de recherche inter-universitaires du réseau.`,
    colorTheme: 'green'
  },
  {
    id: 6,
    nom: 'MC Agr Tsotso KOUEVI',
    fonction: 'Trésorière générale',
    image: trImg,
    linkedin: 'https://linkedin.com',
    biographie: `Experte-comptable diplômée avec une spécialisation en gestion des institutions publiques, Fatou Sow gère les ressources financières du REESAO depuis 2021.\n\nElle veille à la transparence financière, à la collecte des cotisations et à la gestion des subventions allouées aux projets de recherche inter-universitaires du réseau.`,
    colorTheme: 'yellow'
  }
])

// Utilitaires de thèmes pour les motifs et couleurs
const getThemeAttrs = (theme) => {
  const themes = {
    blue: { pattern: 'url(#texture-african-blue)', text: 'text-[#0071bd]', bg: 'bg-[#0071bd]', border: 'border-[#0071bd]' },
    green: { pattern: 'url(#texture-african-green)', text: 'text-[#38a935]', bg: 'bg-[#38a935]', border: 'border-[#38a935]' },
    yellow: { pattern: 'url(#texture-african-yellow)', text: 'text-[#ffe900]', bg: 'bg-[#ffe900]', border: 'border-[#ffe900]' }
  }
  return themes[theme] || themes.blue
}

// Gestion de l'état de la modale
const isModalOpen = ref(false)
const selectedMembre = ref(null)

const openModal = (membre) => {
  selectedMembre.value = membre
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedMembre.value = null
  }, 300) 
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <main class="w-full bg-white font-sans selection:bg-[#ffe900] selection:text-[#0071bd] min-h-screen relative overflow-hidden">
    
    <!-- Pattern Géométrique de fond global -->
    <div 
      class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <!-- Textures SVG globales -->
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

    <!-- BANNER DE PAGE (HERO) -->
     <section class="relative pt-40 pb-20 lg:pt-48 lg:pb-24 bg-[#0071bd] border-b border-[#0071bd]/20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          :src="slide1" 
          alt="Campus universitaire" 
          class="w-full h-full object-cover grayscale opacity-20 scale-105 mix-blend-overlay"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0071bd] via-[#0071bd]/60 to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
          <a href="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</a>
          <i class="ri-arrow-right-s-line text-sm"></i>
          <span class="text-[#ffe900]">Conseil executif</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 class="text-3xl md:text-5xl lg:text-[56px] text-white font-bold leading-[1.05] tracking-tight max-w-4xl">
            Conseil <br />
            <span class="text-[#ffe900] relative inline-block mt-2">
              Executif du REESAO.
              <!-- Ligne tissée sous le titre -->
              <span class="absolute -bottom-3 left-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></span>
            </span>
          </h1>
        </div>
      </div>
    </section>

    <!-- SECTION CARTES MEMBRES -->
    <section class="relative z-10 py-16 lg:py-24 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <header class="mb-16 flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 bg-[#38a935] rotate-45 block"></span>
          <h2 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]">L'Équipe Dirigeante</h2>
        </div>
        <h3 class="text-2xl md:text-3xl font-black text-[#001a2e] leading-tight uppercase">
          Le Bureau Exécutif
        </h3>
      </header>

      <!-- Grille Responsive -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
        
        <article 
          v-for="(membre, index) in membres" 
          :key="membre.id"
          class="relative group h-full flex flex-col"
        >
          <!-- Ombre portée texturée asymétrique -->
          <svg class="absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-500 ease-out z-0 w-full h-full group-hover:translate-x-4 group-hover:translate-y-4">
            <rect width="100%" height="100%" :fill="getThemeAttrs(membre.colorTheme).pattern" />
          </svg>
          
          <div class="relative bg-white border border-[#001a2e]/10 z-10 w-full flex flex-col flex-grow transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
            
            <!-- Photo -->
            <div class="w-full aspect-square overflow-hidden relative border-b border-[#001a2e]/10">
              <img 
                :src="membre.image" 
                :alt="`Photo de ${membre.nom}`" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-[#001a2e]/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            <!-- Contenu Carte -->
            <div class="p-6 flex flex-col flex-grow bg-white">
              <div class="flex-grow">
                <span 
                  class="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 block"
                  :class="getThemeAttrs(membre.colorTheme).text"
                >
                  {{ membre.fonction }}
                </span>
                <h3 class="text-lg font-black text-[#001a2e] leading-tight mb-4">
                  {{ membre.nom }}
                </h3>
              </div>

              <!-- Actions (LinkedIn & Bouton) -->
              <div class="mt-6 flex items-center justify-between border-t border-[#001a2e]/10 pt-5">
                <a 
                  v-if="membre.linkedin" 
                  :href="membre.linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-[#001a2e]/30 hover:text-[#0071bd] transition-colors duration-300"
                  aria-label="Profil LinkedIn"
                >
                  <i class="ri-linkedin-box-fill text-2xl"></i>
                </a>
                <span v-else class="text-[#001a2e]/10"><i class="ri-linkedin-box-fill text-2xl"></i></span>

                <!-- Bouton harmonisé CTA -->
                <button 
                  @click="openModal(membre)"
                  class="relative group/btn inline-block focus:outline-none"
                >
                  <div class="absolute inset-0 translate-x-1 translate-y-1 transition-transform duration-300 group-hover/btn:translate-x-1.5 group-hover/btn:translate-y-1.5" :class="getThemeAttrs(membre.colorTheme).bg"></div>
                  <div class="relative bg-white border text-[#001a2e] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors group-hover/btn:bg-[#001a2e] group-hover/btn:text-white" :class="getThemeAttrs(membre.colorTheme).border">
                    Bio <i class="ri-arrow-right-line"></i>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </article>

      </div>
    </section>

    <!-- FENÊTRE MODALE (BIOGRAPHIE) -->
    <transition name="fade">
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
        aria-modal="true" 
        role="dialog"
      >
        <!-- Backdrop Blur -->
        <div 
          class="absolute inset-0 bg-[#001a2e]/80 backdrop-blur-sm transition-opacity" 
          @click="closeModal"
        ></div>

        <!-- Contenu Modale -->
        <div class="relative w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row transform transition-all">
          
          <!-- Ombre portée texturée de la modale -->
          <svg class="hidden md:block absolute inset-0 translate-x-4 translate-y-4 z-0 w-full h-full pointer-events-none">
            <rect width="100%" height="100%" :fill="selectedMembre ? getThemeAttrs(selectedMembre.colorTheme).pattern : ''" />
          </svg>

          <div class="relative z-10 bg-white border border-[#001a2e]/10 flex flex-col md:flex-row w-full h-full overflow-hidden shadow-2xl">
            <!-- Bouton Fermer -->
            <button 
              @click="closeModal"
              class="absolute top-4 right-4 z-20 w-10 h-10 bg-white border border-[#001a2e]/10 flex items-center justify-center text-[#001a2e]/50 hover:text-white hover:bg-red-500 transition-colors focus:outline-none"
              aria-label="Fermer la modale"
            >
              <i class="ri-close-line text-2xl"></i>
            </button>

            <!-- Modale - Partie Image -->
            <div class="w-full md:w-2/5 h-64 md:h-auto md:min-h-[500px] relative border-b md:border-b-0 md:border-r border-[#001a2e]/10">
              <img 
                :src="selectedMembre?.image" 
                :alt="selectedMembre?.nom" 
                class="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
              />
              <div class="absolute inset-0 bg-[#001a2e]/10"></div>
            </div>

            <!-- Modale - Partie Texte -->
            <div class="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[90vh] flex flex-col bg-white">
              <div class="mb-8">
                <div class="flex items-center gap-2 mb-4">
                  <span class="w-2 h-2 rotate-45 block" :class="getThemeAttrs(selectedMembre?.colorTheme).bg"></span>
                  <span class="text-[10px] font-bold uppercase tracking-[0.15em]" :class="getThemeAttrs(selectedMembre?.colorTheme).text">
                    {{ selectedMembre?.fonction }}
                  </span>
                </div>
                <h2 class="text-3xl md:text-4xl font-black text-[#001a2e] leading-tight mb-4">
                  {{ selectedMembre?.nom }}
                </h2>
                <div class="w-12 h-1" :class="getThemeAttrs(selectedMembre?.colorTheme).bg"></div>
              </div>

              <!-- Biographie complète -->
              <div class="prose prose-sm md:prose-base prose-p:font-light prose-p:leading-relaxed text-[#001a2e]/70 flex-grow">
                <p class="whitespace-pre-line text-sm md:text-base">
                  {{ selectedMembre?.biographie }}
                </p>
              </div>

              <div v-if="selectedMembre?.linkedin" class="mt-8 pt-6 border-t border-[#001a2e]/10">
                <a 
                  :href="selectedMembre.linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0071bd] hover:text-[#001a2e] transition-colors"
                >
                  <i class="ri-linkedin-box-fill text-xl"></i>
                  Profil LinkedIn
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </transition>

  </main>
</template>

<style scoped>
/* Lissage des polices */
main {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Animations d'apparition de la modale */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .transform,
.fade-leave-active .transform {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-from .transform,
.fade-leave-to .transform {
  transform: scale(0.95) translateY(15px);
}
</style>