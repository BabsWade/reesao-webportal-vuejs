<script setup>
import { ref, onMounted } from 'vue'
import slide1 from '../assets/hero.jpg' 
// Image pour la miniature de la couverture du PDF
import pdfCover from '../assets/hero.jpg' 

// États réactifs pour l'API
const documentReglement = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Convertir le poids du fichier
const formatFileSize = (bytes) => {
  if (!bytes) return "N/A"
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${mb.toFixed(1)} Mo`
  const kb = bytes / 1024
  return `${kb.toFixed(0)} Ko`
}

// Récupération du document unique "Reglement"
const fetchReglementDocument = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await fetch('https://reesao.org/wp-json/wp/v2/media?per_page=100')
    if (!response.ok) throw new Error('Impossible de se connecter au serveur de documents.')
    
    const data = await response.json()
    
    // Types MIME autorisés (PDF & Word)
    const allowedMimeTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    // Filtrage strict basé sur la légende exacte
    const donneesFiltrées = data.filter(item => {
      const matchesCaption = item.caption?.rendered === '<p>Reglement</p>\n'
      const matchesMime = allowedMimeTypes.includes(item.mime_type)
      return matchesCaption && matchesMime
    })
    
    if (donneesFiltrées.length > 0) {
      const item = donneesFiltrées[0]
      const wpThumb = item.media_details?.sizes?.medium?.source_url || item.media_details?.sizes?.full?.source_url
      
      documentReglement.value = {
        id: item.id,
        titre: item.title?.rendered || "Règlement intérieur",
        taille: formatFileSize(item.media_details?.filesize),
        format: item.mime_type === 'application/pdf' ? 'PDF' : 'DOCX',
        image: wpThumb || pdfCover,
        url: item.source_url,
        date: new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      }
    } else {
      throw new Error('Le document officiel du Règlement intérieur est introuvable ou en cours de mise à jour.')
    }
  } catch (err) {
    error.value = err.message
    console.error('API Error (Reglement):', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchReglementDocument()
})
</script>

<template>
  <main class="relative w-full bg-white font-sans selection:bg-[#ffe900] selection:text-[#0071bd] ">
    
    <!-- DÉFINITION DES TEXTURES SVG (Héritées de Stats.vue) -->
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

    <!-- FOND GÉOMÉTRIQUE UNIFIÉ (Filigrane) -->
    <div 
      class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <!-- En-tête de page Hero -->
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
          <span class="text-[#ffe900]">Règlement Intérieur</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 class="text-3xl md:text-5xl lg:text-[56px] text-white font-bold leading-[1.05] tracking-tight max-w-4xl">
            Règlement <br />
            <span class="text-[#ffe900] relative inline-block mt-2">
              Intérieur du REESAO.
              <!-- Ligne tissée sous le titre -->
              <span class="absolute -bottom-3 left-0 w-1/3 h-[4px]" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></span>
            </span>
          </h1>
        </div>
      </div>
    </section>

    <!-- Section principale de Contenu -->
    <section class="relative py-16 lg:py-24 z-10">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <!-- Colonne Latérale : Téléchargement du Document -->
          <aside class="lg:col-span-4 lg:sticky lg:top-32">
            
            <div v-if="isLoading" class="bg-white border border-[#0071bd]/10 p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
              <i class="ri-loader-4-line text-4xl text-[#0071bd] animate-spin mb-3"></i>
              <p class="text-[10px] font-bold uppercase text-[#0071bd] tracking-[0.2em]">Récupération en cours...</p>
            </div>

            <div v-else-if="error" class="bg-white border border-red-200 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
              <i class="ri-error-warning-line text-4xl text-red-500 mb-3"></i>
              <p class="text-sm text-[#0071bd] font-bold mb-4">{{ error }}</p>
              <button @click="fetchReglementDocument" class="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#0071bd] text-[#ffe900] px-4 py-2 hover:bg-[#0071bd] hover:text-white transition-colors duration-300">
                Réessayer
              </button>
            </div>

            <!-- Bloc Document Disponible Harmonisé -->
            <div v-else-if="documentReglement" class="relative group cursor-default">
              <!-- Ombre portée texturée -->
              <svg class="absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-300 ease-out z-0 w-full h-full">
                <rect width="100%" height="100%" fill="url(#texture-african-blue)" />
              </svg>
              
              <div class="relative bg-white border border-[#0071bd]/10 p-8 lg:p-10 z-10 flex flex-col items-center text-center transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-[#0071bd]">
                
                <div class="w-full aspect-[1/1.4] bg-slate-50 border border-[#0071bd]/10 mb-8 relative overflow-hidden group/pdf cursor-pointer shadow-sm">
                  <img :src="documentReglement.image" alt="Couverture du Règlement" class="w-full h-full object-cover group-hover/pdf:scale-105 group-hover/pdf:opacity-90 transition-all duration-500" />
                  
                  <span class="absolute top-4 left-4 bg-[#ffe900] text-[#0071bd] text-[10px] font-bold px-3 py-1 tracking-[0.2em] uppercase shadow-md flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-[#0071bd] rotate-45 block"></span>
                    {{ documentReglement.format }}
                  </span>

                  <a :href="documentReglement.url" download target="_blank" class="absolute inset-0 bg-[#0071bd]/80 flex flex-col items-center justify-center opacity-0 group-hover/pdf:opacity-100 transition-opacity duration-300">
                    <i class="ri-download-cloud-2-line text-5xl text-[#ffe900] mb-2"></i>
                    <span class="text-white text-[10px] font-bold uppercase tracking-widest">Ouvrir le fichier</span>
                  </a>
                </div>
                
                <h3 class="text-xl font-black text-[#0071bd] mb-3 leading-tight" v-html="documentReglement.titre"></h3>
                
                <!-- Ligne de séparation tissée -->
                <div class="w-12 h-[2px] mb-4 mx-auto" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></div>
                
                <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0071bd] leading-relaxed mb-8">
                  Version originale <br/> Mise en ligne : {{ documentReglement.date }}
                </p>

                <a :href="documentReglement.url" download target="_blank" class="w-full flex items-center justify-center gap-3 bg-[#0071bd] text-[#ffe900] font-bold uppercase tracking-[0.1em] text-xs py-4 px-6 hover:bg-[#0071bd] hover:text-white transition-colors duration-300 group/btn">
                  <i class="ri-file-download-line text-lg group-hover/btn:-translate-y-1 transition-transform"></i>
                  Télécharger ({{ documentReglement.taille }})
                </a>
              </div>
            </div>
          </aside>

          <!-- Colonne Principale : Consultation des Textes -->
          <article class="lg:col-span-8 text-slate-700">
            
            <!-- En-tête de section avec bloc Titre latéral style Stats.vue -->
            <header class="mb-14 flex items-start gap-4 border-b border-[#0071bd]/10 pb-6">
              <div class="hidden sm:flex flex-col items-center gap-1.5 mt-2">
                <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
                <span class="w-1.5 h-16 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
              </div>
              <div class="flex flex-col gap-2">
                <h2 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd] flex items-center gap-3">
                  Réseau REESAO
                  <span class="w-6 h-[1px] bg-[#0071bd]/30"></span>
                </h2>
                <h2 class="text-3xl md:text-4xl font-black text-[#0071bd] uppercase tracking-tighter">
                  Textes Fondamentaux
                </h2>
              </div>
            </header>

            <!-- CHAPITRE I -->
            <div class="mb-16 relative">
              <div class="flex items-center gap-4 mb-8">
                <div class="flex flex-col items-center gap-1.5 mt-1 hidden sm:flex">
                  <span class="w-2 h-2 bg-[#38a935] rotate-45 block"></span>
                  <span class="w-1 h-8 block" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#38a935]">Chapitre I</span>
                  <h3 class="text-xl font-bold text-[#0071bd] uppercase tracking-wide">Objet</h3>
                </div>
              </div>
              
              <div class="grid gap-8 pl-0 sm:pl-8 border-l border-[#0071bd]/10">
                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 1
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed pl-5">
                    Le présent règlement intérieur a pour objet de préciser les termes du statut du Réseau pour l’Excellence de l’Enseignement Supérieur en Afrique de l'Ouest (REESAO) ainsi que les règles d’organisation et de fonctionnement de ladite Association.
                  </p>
                </div>
                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 2
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed pl-5">Le siège du REESAO est à Lomé (TOGO).</p>
                </div>
                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 3
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed pl-5">Le REESAO est une association à durée indéterminée.</p>
                </div>
                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 4
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed mb-3 pl-5">
                    Le REESAO est composé des établissements d’Enseignement supérieur de l’Afrique de l'Ouest ayant signé le présent règlement ou y ayant adhéré.
                  </p>
                  <p class="text-slate-600 font-light leading-relaxed pl-5">
                    La procédure d’adhésion est annexée au présent règlement intérieur.
                  </p>
                </div>
              </div>
            </div>

            <!-- CHAPITRE II -->
            <div class="mb-16 relative">
              <div class="flex items-center gap-4 mb-8">
                <div class="flex flex-col items-center gap-1.5 mt-1 hidden sm:flex">
                  <span class="w-2 h-2 bg-[#38a935] rotate-45 block"></span>
                  <span class="w-1 h-8 block" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#38a935]">Chapitre II</span>
                  <h3 class="text-xl font-bold text-[#0071bd] uppercase tracking-wide">Organisation et Fonctionnement</h3>
                </div>
              </div>
              
              <div class="grid gap-8 pl-0 sm:pl-8 border-l border-[#0071bd]/10">
                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 5
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed mb-4 pl-5">Les organes du REESAO sont les suivants :</p>
                  <ul class="space-y-3 text-slate-600 font-light leading-relaxed pl-5">
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#0071bd]/30 before:rotate-45">L’Assemblée Générale dénommée « Conférence des Recteurs, Présidents et Directeurs Généraux (CRPDG) »</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#0071bd]/30 before:rotate-45">Le Conseil Exécutif</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#0071bd]/30 before:rotate-45">Les Commissions spécialisées</li>
                  </ul>
                </div>

                <div class="mt-4 mb-2 border-b border-[#0071bd]/10 pb-4">
                  <h4 class="text-[11px] font-bold text-[#38a935] uppercase tracking-[0.1em] flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span> Section I : L’Assemblée Générale (CRPDG)
                  </h4>
                </div>

                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 6
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed pl-5">
                    La CRPDG est composée des Recteurs, Présidents et Directeurs Généraux, et de tous les membres du REESAO. Elle se tient une fois par an en session ordinaire et ne délibère valablement que lorsque la majorité absolue de ses membres sont présents.
                  </p>
                </div>

                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 9 & 10
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed pl-5">
                    La Conférence désigne le Président et les Vice-Présidents du REESAO pour un mandat de trois (03) ans renouvelable une seule fois. Le Président est désigné par consensus ou élu au scrutin uninominal.
                  </p>
                </div>

                <div class="mt-4 mb-2 border-b border-[#0071bd]/10 pb-4">
                  <h4 class="text-[11px] font-bold text-[#38a935] uppercase tracking-[0.1em] flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span> Section II : Le Conseil Exécutif
                  </h4>
                </div>

                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 18 & 24
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed mb-4 pl-5">Le REESAO est dirigé par un Conseil Exécutif chargé de :</p>
                  <ul class="grid sm:grid-cols-2 gap-3 text-slate-600 font-light leading-relaxed pl-5">
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#0071bd]/30 before:rotate-45">Programmer les activités</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#0071bd]/30 before:rotate-45">Suivre les dossiers</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#0071bd]/30 before:rotate-45">Entretenir la coopération</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#0071bd]/30 before:rotate-45">Conserver les archives</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- CHAPITRE III -->
            <div class="mb-16 relative">
              <div class="flex items-center gap-4 mb-8">
                <div class="flex flex-col items-center gap-1.5 mt-1 hidden sm:flex">
                  <span class="w-2 h-2 bg-[#38a935] rotate-45 block"></span>
                  <span class="w-1 h-8 block" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#38a935]">Chapitre III</span>
                  <h3 class="text-xl font-bold text-[#0071bd] uppercase tracking-wide">Ressources</h3>
                </div>
              </div>

              <div class="grid gap-8 pl-0 sm:pl-8 border-l border-[#0071bd]/10">
                <div>
                  <h4 class="text-base font-bold text-[#0071bd] mb-3 flex items-start gap-3">
                    <span class="w-2 h-2 mt-1.5 shrink-0 bg-[#ffe900] rotate-45 block"></span>
                    Article 27
                  </h4>
                  <p class="text-slate-600 font-light leading-relaxed pl-5">Les ressources financières sont constituées par les frais d'adhésion, cotisations annuelles, subventions et dons acceptés par le Conseil Exécutif.</p>
                </div>
              </div>
            </div>

            <!-- Encadré Final Harmonisé avec Textures -->
            <div class="mt-20">
              <div class="relative group cursor-default">
                <!-- Ombre portée jaune texturée -->
                <svg class="absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-300 ease-out z-0 w-full h-full">
                  <rect width="100%" height="100%" fill="url(#texture-african-yellow)" />
                </svg>
                
                <div class="relative bg-white border border-[#0071bd]/10 p-8 lg:p-10 z-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-[#ffe900]">
                  
                  <div class="text-center md:text-left">
                    <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071bd] mb-2 flex justify-center md:justify-start items-center gap-2">
                      <span class="w-1.5 h-1.5 bg-[#0071bd] rotate-45 block"></span>
                      Demande d'informations
                    </p>
                    <h4 class="text-xl font-black text-[#0071bd] uppercase tracking-tight">
                      Secrétariat Général
                    </h4>
                    <p class="text-slate-500 text-sm font-light mt-2 max-w-md">
                      Pour toute question relative à l'application ou l'interprétation des présents textes fondamentaux.
                    </p>
                  </div>
                  
                  <a href="mailto:contact@reesao.org" class="shrink-0 whitespace-nowrap inline-flex items-center gap-3 bg-[#0071bd] text-[#ffe900] font-bold uppercase text-[11px] tracking-[0.1em] px-8 py-4 hover:bg-[#0071bd] hover:text-white transition-colors duration-300">
                    Nous contacter <i class="ri-mail-send-line text-lg"></i>
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