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
    biographie: `Recteur de l’Université Iba Der Thiam de Thiès (UIDT)\nEnseignant-chercheur, Professeur titulaire des universités\n\nMonsieur Mamadou Babacar NDIAYE est Titulaire d’un doctorat Unique à l’Ecole Centrale de Lyon en France et est spécialiste de la Physique des matériaux et énergétique.\n\nEn février 2010, Il est recruté à l’Université Iba Der THIAM en qualité d’assistant. Depuis lors il a gravi les échelons et accumule plus de dix (10) ans d’expérience dans la gestion pédagogique et administrative d’établissement d’enseignement supérieur.\n\nTour à tour il fut chef de département, Directeur des études et Directeur de l’Institut Universitaire de Technologie, poste qu’il occupe jusqu’à sa nomination comme Recteur en avril 2023. Il est Membre actif des organes de gouvernance de l’Université depuis une dizaine d’années aussi (conseil académique et conseil d’administration).\n\nProfesseur NDIAYE est un acteur clé dans la réforme de la gouvernance universitaire de l’Enseignement supérieur au Sénégal avec une participation effective dans l’élaboration des principaux textes législatifs et réglementaires. Il membre actif de toutes les commissions chargées de réfléchir sur la vie de l’Université, entre autres : plan stratégique, suivi et évaluation CDP à l’Institut Universitaire de Technologie (IUT), suivi des chantiers de l’UIDT, auto-évaluation institutionnelle, membre de la commission nationale électorale des représentants du Sénégal aux CTS du CAMES-Ministère de l’Enseignement Supérieur, de la Recherche et de l’Innovation (MESRI), de la commission nationale de supervision du processus et orientation des bacheliers du Sénégal (MESRI).\n\nLe Recteur de l’UIDT est membre de plusieurs Sociétés savantes : de société française de métallurgie et de Matériaux (SF2M), membre de société de Physique du Sénégal (SPS). Il est auteur de plusieurs dizaines de publications.`,
    colorTheme: 'blue'
  },
  {
    id: 2,
    nom: 'Professeur Bertrand SOGBOSSI BOCCO',
    fonction: 'Vice-Président',
    image: vp1Img,
    linkedin: 'https://linkedin.com',
    biographie: `A venir`,
    colorTheme: 'green'
  },
  {
    id: 3,
    nom: 'Professeur Paul TRAORE',
    fonction: '2ᵉ Vice-Président',
    image: vp2Img,
    linkedin: null, // Test sans LinkedIn
    biographie: `A venir`,
    colorTheme: 'yellow'
  },
  {
    id: 4,
    nom: 'Professeur Cheikh SARR',
    fonction: 'Secrétaire Général (SG)',
    image: sgImg,
    linkedin: 'https://linkedin.com',
    biographie: `Professeur SARR a effectué l’essentiel de son parcours universitaire en France au sein de l’Université Paris 12 de Créteil et à l’Institut National de Sciences Appliquées (INSA) de Lyon où il a obtenu respectivement un diplôme d’ingénieur Informatique spécialité Réseaux et Télécommunications (2003), un DEA (2004) et un Doctorat en Informatique (2007).\n\nA la suite de ce parcours universitaire, Prof. SARR est recruté en qualité d’Assistant en Informatique dès l’année 2007 à l’UIDT, Maître Assistant en 2008, Maître de Conférences 2012. C’est en Octobre 2016 qu’il est consacré Professeur Titulaire des Universités à l’UIDT. En Octobre 2020, il devient Professeur Titulaire de Classe exceptionnelle des Universités !\n\nAvec plus de vingt (20) années d’expérience dans l’enseignement en Informatique, il a enseigné en qualité de Professeur associé en France, au Sénégal, au Tchad, au Togo et au Burkina Faso. Conjointement à cette expérience académique il a occupé les fonctions administratives de Responsable Scientifique du Master Informatique, Responsable de la filière Informatique, Chef du Département Informatique, Vice-Directeur, Directeur de l’UFR Sciences et Technologies (SET) et Directeur de la Cellule Assurance Qualité de l’UIDT.\n\nC’est fort de cette riche expérience administrative que Pr Cheikh SARR a été élu en Juillet 2023, Vice-Recteur en charge des Études de l’Innovation Pédagogique et de la Vie Universitaire de l’UIDT.\n\nProf. SARR a effectué un post-doc de recherche à l’ENS de Lyon dans le cadre de ses recherches sur les systèmes de communications sans fil ad hoc. Il a eu à encadrer plusieurs thèses de doctorat unique et près d’une cinquantaine de mémoires de Master.\n\nDésigné Expert évaluateur de l’Autorité Nationale d’Assurance Qualité de l’Enseignement Supérieur (ANAQ-Sup) depuis 2014, il est également expert en assurance qualité pour le compte du CAMES et de l’Union Africaine. Au niveau central, il a occupé le poste de Directeur de la Cellule Assurance Qualité (2021-2023) et est membre du Conseil Scientifique et Pédagogique de l’École Doctorale 2DS, du Conseil Académique et du Conseil d’Administration de l’UIDT.\n\nEn termes de distinction, Professeur SARR est lauréat en 2020 du prix International de recherche le Next Einstein Forum qui consacre les jeunes chercheurs africains en devenir, pour ses travaux de recherche sur les voitures intelligentes ainsi que d’une bourse d’excellence de recherche de l’AUF.\n\nMalgré ses responsabilités administratives, Prof. Cheikh SARR reste actif dans la recherche, dans ses domaines de prédilection, à savoir : l’intelligence artificielle (apprentissage automatique), l’internet des objets, l’Internet des Objets, la Cyber sécurité. Ses travaux de recherche font l’objet de plus d’une cinquantaine de publications dans des revues internationales.`,
    colorTheme: 'blue'
  },
  {
    id: 5,
    nom: 'Professeur Aklesso Yao G. EGBENDEWE',
    fonction: 'Secrétaire Général Adjoint (SGA)',
    image: sgaImg,
    linkedin: 'https://linkedin.com',
    biographie: `Il a obtenu un Doctorat (PhD) en Economie de l’Agriculture à l’Université du Texas A&M aux Etats-Unis (2009).\n\nIl est depuis 2019, Professeur Titulaire et Agrégé en Sciences Economiques à la Faculté des Sciences Economiques et de Gestion (FASEG) à Université de Lomé. Il est un économiste de formation avec un Master en Macroéconomie Internationale obtenu à l’Université de Cocody à Abidjan, Côte d’Ivoire (2003) et un Master en Microéconomie & Econométrie à l’Université du Texas A&M (2007). Avant d’arriver à l’Université de Lomé, il a enseigné à l’Université de l’Etat de Michigan au nord des Etats-Unis (2010-2012) et travaillé en tant que chercheur senior à la Fondation Eni Enrico Mattei (FEEM) et au Centre Euro-Méditerranéen pour le Changement Climatique (CMCC), à Milan, au nord de l’Italie (2012-2013).\n\nSur le plan administratif, Il a servi comme Directeur-adjoint du programme WASCAL à l’Université de Lomé au Togo (2013-2015) et est actuellement responsable de l’Equipe de Recherche en Economie Agricole et Appliquée (ERE2A). Ses Publications ont paru dans plusieurs revues de renommée internationale dont Ecological Economics, Agricultural Economics, African Development Review, Applied Economic Perspectives & Policy, Climatic Change, Energy Policy, Energy Economics, Journal of Quantitative Economics, Finance Research Letters, Economie Rurale, …`
  },
  {
    id: 6,
    nom: 'MC Agr Tsotso KOUEVI',
    fonction: 'Trésorière générale',
    image: trImg,
    linkedin: 'https://linkedin.com',
    biographie: `A venir`,
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
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
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
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-8" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</router-link>
          <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
          <span class="text-[#ffe900]">conseil executif</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-5xl lg:text-[64px] text-white font-black leading-[1.05] tracking-tight">
              Le Conseil<br />
              <span class="text-[#ffe900] relative inline-block mt-2">
                Executif
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

    <!-- SECTION CARTES MEMBRES -->
    <section class="relative z-10 py-16 lg:py-24 max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <header class="mb-16 flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 bg-[#38a935] rotate-45 block"></span>
          <h2 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd]">L'Équipe Dirigeante</h2>
        </div>
        <h3 class="text-2xl md:text-3xl font-black text-[#0071bd] leading-tight uppercase">
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
          
          <div class="relative bg-white border border-[#0071bd]/10 z-10 w-full flex flex-col flex-grow transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
            
            <!-- Photo -->
            <div class="w-full aspect-square overflow-hidden relative border-b border-[#0071bd]/10">
              <img 
                :src="membre.image" 
                :alt="`Photo de ${membre.nom}`" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-[#0071bd]/10 group-hover:bg-transparent transition-colors duration-500"></div>
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
                <h3 class="text-lg font-black text-[#0071bd] leading-tight mb-4">
                  {{ membre.nom }}
                </h3>
              </div>

              <!-- Actions (LinkedIn & Bouton) -->
              <div class="mt-6 flex items-center justify-between border-t border-[#0071bd]/10 pt-5">
                <a 
                  v-if="membre.linkedin" 
                  :href="membre.linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-[#0071bd]/30 hover:text-[#0071bd] transition-colors duration-300"
                  aria-label="Profil LinkedIn"
                >
                  <i class="ri-linkedin-box-fill text-2xl"></i>
                </a>
                <span v-else class="text-[#0071bd]/10"><i class="ri-linkedin-box-fill text-2xl"></i></span>

                <!-- Bouton harmonisé CTA -->
                <button 
                  @click="openModal(membre)"
                  class="relative group/btn inline-block focus:outline-none"
                >
                  <div class="absolute inset-0 translate-x-1 translate-y-1 transition-transform duration-300 group-hover/btn:translate-x-1.5 group-hover/btn:translate-y-1.5" :class="getThemeAttrs(membre.colorTheme).bg"></div>
                  <div class="relative bg-white border text-[#0071bd] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors group-hover/btn:bg-[#0071bd] group-hover/btn:text-white" :class="getThemeAttrs(membre.colorTheme).border">
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
          class="absolute inset-0 bg-[#0071bd]/80 backdrop-blur-sm transition-opacity" 
          @click="closeModal"
        ></div>

        <!-- Contenu Modale -->
        <div class="relative w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row transform transition-all">
          
          <!-- Ombre portée texturée de la modale -->
          <svg class="hidden md:block absolute inset-0 translate-x-4 translate-y-4 z-0 w-full h-full pointer-events-none">
            <rect width="100%" height="100%" :fill="selectedMembre ? getThemeAttrs(selectedMembre.colorTheme).pattern : ''" />
          </svg>

          <div class="relative z-10 bg-white border border-[#0071bd]/10 flex flex-col md:flex-row w-full h-full overflow-hidden shadow-2xl">
            <!-- Bouton Fermer -->
            <button 
              @click="closeModal"
              class="absolute top-4 right-4 z-20 w-10 h-10 bg-white border border-[#0071bd]/10 flex items-center justify-center text-[#0071bd]/50 hover:text-white hover:bg-red-500 transition-colors focus:outline-none"
              aria-label="Fermer la modale"
            >
              <i class="ri-close-line text-2xl"></i>
            </button>

            <!-- Modale - Partie Image -->
            <div class="w-full md:w-2/5 h-64 md:h-auto md:min-h-[500px] relative border-b md:border-b-0 md:border-r border-[#0071bd]/10">
              <img 
                :src="selectedMembre?.image" 
                :alt="selectedMembre?.nom" 
                class="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
              />
              <div class="absolute inset-0 bg-[#0071bd]/10"></div>
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
                <h2 class="text-3xl md:text-4xl font-black text-[#0071bd] leading-tight mb-4">
                  {{ selectedMembre?.nom }}
                </h2>
                <div class="w-12 h-1" :class="getThemeAttrs(selectedMembre?.colorTheme).bg"></div>
              </div>

              <!-- Biographie complète -->
              <div class="prose prose-sm md:prose-base prose-p:font-light prose-p:leading-relaxed text-[#0071bd]/70 flex-grow">
                <p class="whitespace-pre-line text-sm md:text-base">
                  {{ selectedMembre?.biographie }}
                </p>
              </div>

              <div v-if="selectedMembre?.linkedin" class="mt-8 pt-6 border-t border-[#0071bd]/10">
                <a 
                  :href="selectedMembre.linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0071bd] hover:text-[#0071bd] transition-colors"
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