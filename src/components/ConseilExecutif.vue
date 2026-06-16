<script setup>
import { ref } from 'vue'
import slide1 from '../assets/hero.jpg' // Image de fond pour le banner
import presidentImg from "../assets/president.jpg";

// Données d'exemple pour le comité exécutif
const membres = ref([
  {
    id: 1,
    nom: 'Pr Issa Abdou MOUMOULA',
    fonction: 'Président du REESAO',
    image: presidentImg,
    linkedin: 'https://linkedin.com',
    biographie: `Le Professeur Issa Abdou MOUMOULA est le Président actuel du REESAO. Éminent chercheur et administrateur académique, il a consacré plus de 20 ans au développement de l'enseignement supérieur en Afrique de l'Ouest. \n\nSous sa direction, de nombreuses réformes ont été initiées pour harmoniser le système LMD au sein de l'espace ouest-africain. Il est également l'auteur de plusieurs publications scientifiques de renommée internationale sur l'innovation éducative et la gestion universitaire.`
  },
  {
    id: 2,
    nom: 'Dr. Aminata DIALLO',
    fonction: 'Vice-Présidente',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600',
    linkedin: 'https://linkedin.com',
    biographie: `Docteure en Sciences de l'Éducation, Aminata Diallo supervise les commissions spécialisées du réseau. Elle a auparavant dirigé l'Institut de Recherche en Pédagogie Avancée.\n\nElle s'assure de l'alignement des programmes académiques avec les standards internationaux, avec un focus particulier sur l'intégration des technologies de l'information et de la communication (TIC) dans l'apprentissage.`
  },
  {
    id: 3,
    nom: 'Prof. Koffi KOUASSI',
    fonction: 'Secrétaire Général',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=600',
    linkedin: null, // Test sans LinkedIn
    biographie: `Professeur titulaire en Économie, Koffi Kouassi coordonne l'ensemble des activités administratives et le suivi quotidien des dossiers du REESAO. \n\nIl est la cheville ouvrière de l'organisation matérielle des rencontres annuelles et assure la liaison constante entre les différents établissements membres et les partenaires internationaux.`
  },
  {
    id: 4,
    nom: 'Mme. Fatou SOW',
    fonction: 'Trésorière Générale',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=600',
    linkedin: 'https://linkedin.com',
    biographie: `Experte-comptable diplômée avec une spécialisation en gestion des institutions publiques, Fatou Sow gère les ressources financières du REESAO depuis 2021.\n\nElle veille à la transparence financière, à la collecte des cotisations et à la gestion des subventions allouées aux projets de recherche inter-universitaires du réseau.`
  }
])

// Gestion de l'état de la modale
const isModalOpen = ref(false)
const selectedMembre = ref(null)

const openModal = (membre) => {
  selectedMembre.value = membre
  isModalOpen.value = true
  // Empêcher le scroll du body quand la modale est ouverte
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedMembre.value = null
  }, 300) // Délai pour l'animation de fermeture
  // Réactiver le scroll du body
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <main class="w-full bg-slate-50 font-sans selection:bg-[#ffe900] selection:text-[#0071bd]">
    
    <!-- BANNER DE PAGE (HERO) -->
    <section class="relative pt-40 pb-20 lg:pt-48 lg:pb-24 bg-[#0071bd] border-b border-white/10 overflow-hidden">
      <!-- Image de fond avec overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          :src="slide1" 
          alt="Campus universitaire" 
          class="w-full h-full object-cover grayscale opacity-20 scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0071bd]/0 via-[#0071bd]/10 to-[#0071bd]/0"></div>
      </div>

      <!-- Trame géométrique technique -->
      <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <!-- Contenu du Banner -->
      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <!-- Fil d'Ariane -->
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
          <a href="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</a>
          <i class="ri-arrow-right-s-line text-sm"></i>
          <span class="text-[#ffe900]">Comité Exécutif</span>
        </nav>

        <!-- Titre de la page -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 class="text-3xl md:text-5xl lg:text-[56px] text-white font-bold leading-[1.05] tracking-tight max-w-4xl">
            Membres du <br />
            <span class="text-[#ffe900] relative inline-block mt-2">
              Comité Exécutif.
              <span class="absolute -bottom-2 left-0 w-1/3 h-[3px] bg-[#ffe900]"></span>
            </span>
          </h1>
        </div>
      </div>
    </section>

    <!-- SECTION CARTES MEMBRES -->
    <section class="py-16 lg:py-24 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <header class="mb-14">
        <h2 class="text-2xl md:text-3xl font-bold text-[#38a935] leading-tight tracking-tight uppercase">
          L'Équipe Dirigeante
        </h2>
        <div class="w-12 h-1 bg-[#ffe900] mt-4"></div>
      </header>

      <!-- Grille Responsive -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
        
        <!-- Carte Membre -->
        <article 
          v-for="membre in membres" 
          :key="membre.id"
          class="relative group h-full flex"
        >
          <!-- Décalage asymétrique au hover -->
          <div class="absolute inset-0 bg-[#38a935] translate-x-3 translate-y-3 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4"></div>
          
          <div class="relative bg-white border border-slate-200 z-10 w-full flex flex-col transition-colors duration-300 group-hover:border-[#0071bd]/30">
            
            <!-- Photo (Aspect Ratio 1:1 pour homogénéité) -->
            <div class="w-full aspect-square overflow-hidden relative bg-slate-100">
              <img 
                :src="membre.image" 
                :alt="`Photo de ${membre.nom}`" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-[#0071bd]/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            <!-- Contenu Carte -->
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex-grow">
                <span class="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#38a935] mb-2 block">
                  {{ membre.fonction }}
                </span>
                <h3 class="text-xl font-bold text-[#0071bd] leading-tight mb-4">
                  {{ membre.nom }}
                </h3>
              </div>

              <!-- Actions (LinkedIn & Bouton) -->
              <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <a 
                  v-if="membre.linkedin" 
                  :href="membre.linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-slate-400 hover:text-[#0071bd] transition-colors duration-300"
                  aria-label="Profil LinkedIn"
                >
                  <i class="ri-linkedin-box-fill text-3xl"></i>
                </a>
                <span v-else class="text-slate-200"><i class="ri-linkedin-box-fill text-3xl"></i></span>

                <button 
                  @click="openModal(membre)"
                  class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0071bd] bg-[#ffe900] px-4 py-2 hover:bg-[#0071bd] hover:text-[#ffe900] transition-colors duration-300"
                >
                  Voir la biographie
                  <i class="ri-arrow-right-line text-sm"></i>
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
          class="absolute inset-0 bg-[#0071bd]/80 backdrop-blur-sm transition-opacity" 
          @click="closeModal"
        ></div>

        <!-- Contenu Modale -->
        <div class="relative bg-white max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl overflow-hidden transform transition-all">
          
          <!-- Bouton Fermer -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 md:bg-slate-100 backdrop-blur flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-slate-200 transition-colors rounded-none"
            aria-label="Fermer la modale"
          >
            <i class="ri-close-line text-2xl"></i>
          </button>

          <!-- Modale - Partie Image -->
          <div class="w-full md:w-2/5 aspect-square md:aspect-auto md:min-h-[500px] relative">
            <img 
              :src="selectedMembre?.image" 
              :alt="selectedMembre?.nom" 
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-[#0071bd]/10"></div>
          </div>

          <!-- Modale - Partie Texte -->
          <div class="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[50vh] md:max-h-[90vh] flex flex-col">
            <div class="mb-8">
              <span class="inline-block px-3 py-1 bg-[#38a935]/10 text-[#38a935] text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-4 border border-[#38a935]/20">
                {{ selectedMembre?.fonction }}
              </span>
              <h2 class="text-3xl md:text-4xl font-bold text-[#0071bd] mb-2 leading-tight">
                {{ selectedMembre?.nom }}
              </h2>
              <div class="w-12 h-1 bg-[#ffe900] mt-4"></div>
            </div>

            <!-- Biographie complète -->
            <div class="prose prose-slate prose-p:font-light prose-p:leading-relaxed text-slate-600 flex-grow">
              <!-- Utilisation de pre-line pour respecter les sauts de lignes des données -->
              <p class="whitespace-pre-line text-base/8">
                {{ selectedMembre?.biographie }}
              </p>
            </div>

            <div v-if="selectedMembre?.linkedin" class="mt-8 pt-6 border-t border-slate-100">
              <a 
                :href="selectedMembre.linkedin" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-bold text-[#0071bd] hover:text-[#38a935] transition-colors"
              >
                <i class="ri-linkedin-box-fill text-2xl"></i>
                Se connecter sur LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </transition>

  </main>
</template>

<style scoped>
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
  transition: transform 0.3s ease-out;
}

.fade-enter-from .transform,
.fade-leave-to .transform {
  transform: scale(0.98) translateY(10px);
}
</style>