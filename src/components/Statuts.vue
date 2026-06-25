<script setup>
import { ref, onMounted } from 'vue'
import slide1 from '../assets/hero.jpg' 
// Image par défaut pour la miniature si WordPress n'en fournit pas
import pdfCover from '../assets/hero.jpg' 

// États réactifs pour l'API
const documentStatuts = ref(null)
const isLoading = ref(true)
const error = ref(null)
const activeCardIndex = ref(null)

// Convertir le poids du fichier
const formatFileSize = (bytes) => {
  if (!bytes) return "N/A"
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${mb.toFixed(1)} Mo`
  const kb = bytes / 1024
  return `${kb.toFixed(0)} Ko`
}

// Récupération du document unique "Statuts"
const fetchStatutsDocument = async () => {
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
    
    // Filtrage sur la légende exacte <p>Statuts</p>\n
    const filteredData = data.filter(item => {
      const matchesCaption = item.caption?.rendered === '<p>Statuts</p>\n'
      const matchesMime = allowedMimeTypes.includes(item.mime_type)
      return matchesCaption && matchesMime
    })
    
    // Si le document existe, on prend le premier résultat trouvé
    if (filteredData.length > 0) {
      const item = filteredData[0]
      const wpThumb = item.media_details?.sizes?.medium?.source_url || item.media_details?.sizes?.full?.source_url
      
      documentStatuts.value = {
        id: item.id,
        titre: item.title?.rendered || "Statuts Officiels",
        taille: formatFileSize(item.media_details?.filesize),
        format: item.mime_type === 'application/pdf' ? 'PDF' : 'DOCX',
        image: wpThumb || pdfCover,
        url: item.source_url,
        date: new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      }
    } else {
      throw new Error('Le document officiel des statuts est introuvable ou en cours de mise à jour.')
    }
  } catch (err) {
    error.value = err.message
    console.error('API Error (Statuts):', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStatutsDocument()
})
</script>

<template>
  <main class="w-full bg-white font-sans selection:bg-[#ffe900] selection:text-[#0071bd] ">
    
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
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-8" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-[#ffe900] transition-colors duration-300">Accueil</router-link>
          <i class="ri-arrow-right-s-line text-sm opacity-50"></i>
          <span class="text-[#ffe900]">Statuts</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-5xl lg:text-[64px] text-white font-black leading-[1.05] tracking-tight">
              Statuts <br />
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

    <section class="relative py-16 lg:py-24">
      <div 
        class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <aside class="lg:col-span-4 lg:sticky lg:top-32">
            
            <div v-if="isLoading" class="bg-white border border-[#0071bd]/10 p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
              <i class="ri-loader-4-line text-4xl text-[#0071bd] animate-spin mb-3"></i>
              <p class="text-xs font-mono uppercase text-[#0071bd]/50 tracking-wider">Récupération du document officiel...</p>
            </div>

            <div v-else-if="error" class="bg-white border border-red-200 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
              <i class="ri-error-warning-line text-4xl text-red-500 mb-3"></i>
              <p class="text-sm text-red-800 font-medium mb-4">{{ error }}</p>
              <button @click="fetchStatutsDocument" class="text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
                Réessayer
              </button>
            </div>

            <div v-else-if="documentStatuts" class="relative group">
              <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out z-0 w-full h-full">
                <rect width="100%" height="100%" fill="url(#texture-african-green)" />
              </svg>
              
              <div class="relative bg-[#0071bd] border border-white/10 p-8 lg:p-10 z-10 flex flex-col items-center text-center transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                
                <div class="w-full aspect-[1/1.4] bg-white/5 border border-white/20 mb-8 relative overflow-hidden group/pdf cursor-pointer shadow-lg">
                  <img :src="documentStatuts.image" alt="Couverture des Statuts" class="w-full h-full object-cover opacity-80 group-hover/pdf:scale-105 group-hover/pdf:opacity-100 transition-all duration-500" />
                  
                  <span class="absolute top-4 left-4 bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 tracking-wider shadow">
                    {{ documentStatuts.format }}
                  </span>

                  <a :href="documentStatuts.url" download target="_blank" class="absolute inset-0 bg-[#0071bd]/70 flex items-center justify-center opacity-0 group-hover/pdf:opacity-100 transition-opacity duration-300">
                    <i class="ri-download-cloud-2-line text-5xl text-[#ffe900]"></i>
                  </a>
                </div>
                
                <h3 class="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight" v-html="documentStatuts.titre"></h3>
                
                <div class="w-12 h-[2px] mb-4 mx-auto" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></div>
                
                <p class="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#38a935] leading-relaxed mb-8">
                  Version {{ documentStatuts.format }} Originale <br/> Mise en ligne : {{ documentStatuts.date }}
                </p>

                <a :href="documentStatuts.url" download target="_blank" class="w-full flex items-center justify-center gap-3 bg-[#ffe900] text-[#0071bd] font-bold uppercase tracking-wide py-4 px-6 hover:bg-white transition-colors duration-300 group/btn border border-transparent hover:border-[#0071bd]">
                  <i class="ri-file-download-line text-xl group-hover/btn:-translate-y-1 transition-transform"></i>
                  Télécharger ({{ documentStatuts.taille }})
                </a>
              </div>
            </div>

            <div class="hidden lg:flex flex-col gap-4 mt-12 pl-4 border-l-2 border-[#0071bd]/10">
              <span class="text-[10px] font-mono text-[#0071bd]/40 uppercase tracking-widest flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#0071bd]/40 rotate-45 block"></span> Document Juridique
              </span>
              <span class="text-[10px] font-mono text-[#0071bd]/40 uppercase tracking-widest flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#38a935]/40 rotate-45 block"></span> Textes Fondamentaux
              </span>
              <span class="text-[10px] font-mono text-[#0071bd]/40 uppercase tracking-widest flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#ffe900] rotate-45 block"></span> Organisation & Fonctionnement
              </span>
            </div>
          </aside>

          <article class="lg:col-span-8 text-[#0071bd]">
            
            <header class="mb-14 flex items-start gap-4">
              <div class="flex flex-col items-center gap-1.5 mt-2">
                <span class="w-2.5 h-2.5 bg-[#ffe900] rotate-45 block"></span>
                <span class="w-1.5 h-12 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
              </div>
              <div>
                <h2 class="text-3xl md:text-4xl font-black text-[#0071bd] leading-tight tracking-tight uppercase">
                  Textes Fondamentaux
                </h2>
                <p class="text-lg text-[#0071bd]/60 font-light mt-2">Réseau pour l’Excellence de l’Enseignement Supérieur en Afrique de l’Ouest (REESAO)</p>
              </div>
            </header>

            <div class="mb-16 relative">
              <div class="flex items-center gap-4 mb-8">
                <span class="text-[10px] font-mono font-bold text-[#38a935] tracking-[0.2em] border border-[#38a935]/30 px-2 py-1 bg-[#38a935]/5">
                  TITRE I
                </span>
                <h3 class="text-lg font-bold text-[#0071bd] uppercase tracking-wider">
                  De la création et des objectifs
                </h3>
              </div>
              
              <div class="grid gap-8 pl-0 lg:pl-6 border-l-2 border-[#0071bd]/10">
                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 1er
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed">
                    La dénomination de l’Association est : « RESEAU POUR L’EXCELLENCE DE L’ENSEIGNEMENT SUPERIEUR EN AFRIQUE DE L’OUEST » (REESAO).
                  </p>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 2
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">Le REESAO a notamment pour buts de :</p>
                  <ul class="space-y-3 text-[#0071bd]/80 font-light leading-relaxed">
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">créer un espace ouest africain de l’enseignement supérieur ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">promouvoir une politique de coopération universitaire axée prioritairement sur la modernisation de l’offre de formation ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">assurer l’harmonisation, la comparabilité et la lisibilité des formations et des qualifications ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">faciliter la mobility des étudiants et des personnels ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">favoriser la mutualisation des ressources et l’insertion professionnelle ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">développer la recherche et l’innovation.</li>
                  </ul>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 3
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed">
                    Son siège est à Lomé, TOGO. L’Assemblée Générale ci-après dénommée la Conférence des Recteurs, Président et Directeurs Généraux (CRPDG), a le choix de l’immeuble où le siège est établi. Le siège peut être transféré en tout autre lieu par simple décision.
                  </p>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 4
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed">La durée du REESAO est illimitée.</p>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 5
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">
                    Le REESAO est fondé sur le principe de la concertation permanente en vue de favoriser le développement des synergies et des complémentarités entre ses membres.
                  </p>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">
                    Le REESAO est un cadre de définition des voies et moyens indispensables à la mise en place d’un enseignement supérieur de qualité fondé sur le système « Licence – Master – Doctorat » (LMD) en partenariat avec les institutions nationales et internationales intervenant dans la promotion de l’enseignement supérieur.
                  </p>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">Le REESAO s’engage à :</p>
                  <ul class="space-y-3 text-[#0071bd]/80 font-light leading-relaxed">
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#38a935] before:rotate-45">harmoniser le contenu des programmes de formation et la nomenclature des diplômes de façon à favoriser la mobilité des étudiants et l’institution de diplômes transuniversitaires ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#38a935] before:rotate-45">favoriser la mise en ligne des programmes de différents parcours avec des indications sur les unités d’enseignement ainsi que les crédits associés ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#38a935] before:rotate-45">encourager la mise en ligne des programmes de différents parcours en vue de favoriser la formation à distance et de mettre en place les outils indispensables au partage des contenus par le biais des visioconférences ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#38a935] before:rotate-45">favoriser entre ses membres toute autre forme de coopération, pédagogique, scientifique, culturelle, etc.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="mb-16 relative">
              <div class="flex items-center gap-4 mb-8">
                <span class="text-[10px] font-mono font-bold text-[#38a935] tracking-[0.2em] border border-[#38a935]/30 px-2 py-1 bg-[#38a935]/5">
                  TITRE II
                </span>
                <h3 class="text-lg font-bold text-[#0071bd] uppercase tracking-wider">
                  De l'organisation et du fonctionnement
                </h3>
              </div>
              
              <div class="grid gap-8 pl-0 lg:pl-6 border-l-2 border-[#0071bd]/10">
                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 6
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">Le REESAO est composé de :</p>
                  <ul class="space-y-3 text-[#0071bd]/80 font-light leading-relaxed">
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45"><strong>membres fondateurs.</strong> Sont considérés comme tels, les universités nationales parties à la création du REESAO ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45"><strong>membres ordinaires.</strong> Sont considérés comme tels, les établissements publics d’enseignement supérieur qui adhèrent au REESAO après sa création ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45"><strong>membres associés.</strong> Sont considérés comme tels, les établissements d’enseignement supérieur à qui la CRPDG confère ce statut.</li>
                  </ul>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 7
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">Pour être membre du REESAO, il faut être un établissement d’enseignement supérieur de la sous-région ouest-africaine.</p>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed">Les adhésions sont formulées par écrit, signées par l’organe dirigeant de l’institution demanderesse et acceptées par la CRPDG, laquelle, en cas de refus, n’a pas à faire connaître les raisons.</p>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 8
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">La qualité de membre se perd :</p>
                  <ol class="space-y-3 text-[#0071bd]/80 font-light leading-relaxed list-decimal pl-5">
                    <li>par démission ;</li>
                    <li>par radiation prononcée pour non paiement de la cotisation pendant 3 années successives ou pour motifs graves constatés par la Conférence des Recteurs, Présidents et Directeurs Généraux ; l’organe dirigeant de l’institution radiée ayant été préalablement entendu.</li>
                  </ol>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 9
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">Les organes du REESAO sont :</p>
                  <ul class="space-y-3 text-[#0071bd]/80 font-light leading-relaxed">
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">l’Assembly Générale ou Conférence des Recteurs, Présidents et Directeurs Généraux (CRPDG) ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">le Conseil Exécutif ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">les Commissions spécialisées.</li>
                  </ul>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Articles 10 à 17 (Organes & Administration)
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">
                    La Conférence des Recteurs, Présidents et Directeurs Généraux est l’organe suprême du REESAO. Elle détermine la politique générale, adopte le budget et modifie les textes fondamentaux. Le Conseil Exécutif (Président, Vice-Présidents, SG, Trésorier) en est l'organe d'administration, se réunissant au moins une fois par semestre. Les commissions spécialisées couvrent les domaines : LMD, TIC, Documentation, Scolarité, Recherche et Innovation.
                  </p>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 18
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-6">Le rôle des membres du Conseil Exécutif est défini comme suit :</p>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div class="relative group cursor-default" @mouseenter="activeCardIndex = 0" @mouseleave="activeCardIndex = null">
                      <svg class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full">
                        <rect width="100%" height="100%" fill="url(#texture-african-blue)" />
                      </svg>
                      <div class="relative flex flex-col gap-3 p-6 bg-white border border-[#0071bd]/10 transition-transform duration-300 ease-out z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-[#0071bd]">
                        <h5 class="text-xs font-bold text-[#0071bd] uppercase tracking-[0.15em] flex items-center gap-2">
                          <span class="w-1.5 h-1.5 bg-[#0071bd] rotate-45 block transition-transform" :class="activeCardIndex === 0 ? 'scale-125' : ''"></span>
                          Le Président
                        </h5>
                        <div class="w-8 h-[2px] opacity-30" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></div>
                        <p class="text-xs text-[#0071bd]/70 font-light leading-relaxed">
                          Supervise la gestion du Secrétariat général. Il est l’ordonnateur des dépenses, convoque la CRPDG et représente le REESAO dans tous les actes de la vie civile.
                        </p>
                      </div>
                    </div>

                    <div class="relative group cursor-default" @mouseenter="activeCardIndex = 1" @mouseleave="activeCardIndex = null">
                      <svg class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full">
                        <rect width="100%" height="100%" fill="url(#texture-african-green)" />
                      </svg>
                      <div class="relative flex flex-col gap-3 p-6 bg-white border border-[#0071bd]/10 transition-transform duration-300 ease-out z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-[#38a935]">
                        <h5 class="text-xs font-bold text-[#38a935] uppercase tracking-[0.15em] flex items-center gap-2">
                          <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block transition-transform" :class="activeCardIndex === 1 ? 'scale-125' : ''"></span>
                          Le Secrétaire Général
                        </h5>
                        <div class="w-8 h-[2px] opacity-30" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></div>
                        <p class="text-xs text-[#0071bd]/70 font-light leading-relaxed">
                          Prépare les activités et coordonne leur exécution. Assure la gestion administrative, rédige les PV, prépare le budget annuel et pilote le système LMD.
                        </p>
                      </div>
                    </div>

                    <div class="relative group cursor-default" @mouseenter="activeCardIndex = 2" @mouseleave="activeCardIndex = null">
                      <svg class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full">
                        <rect width="100%" height="100%" fill="url(#texture-african-yellow)" />
                      </svg>
                      <div class="relative flex flex-col gap-3 p-6 bg-white border border-[#0071bd]/10 transition-transform duration-300 ease-out z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-[#ffe900]">
                        <h5 class="text-xs font-bold text-[#0071bd] uppercase tracking-[0.15em] flex items-center gap-2">
                          <span class="w-1.5 h-1.5 bg-[#ffe900] rotate-45 block transition-transform" :class="activeCardIndex === 2 ? 'scale-125' : ''"></span>
                          Le Trésorier
                        </h5>
                        <div class="w-8 h-[2px] opacity-30" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></div>
                        <p class="text-xs text-[#0071bd]/70 font-light leading-relaxed">
                          Chargé de la gestion du patrimoine. Effectue tout paiement, tient une comptabilité régulière et rend compte à l’assemblée annuelle.
                        </p>
                      </div>
                    </div>

                    <div class="relative group cursor-default" @mouseenter="activeCardIndex = 3" @mouseleave="activeCardIndex = null">
                      <svg class="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 ease-out z-0 w-full h-full">
                        <rect width="100%" height="100%" fill="url(#texture-african-blue)" />
                      </svg>
                      <div class="relative flex flex-col gap-3 p-6 bg-white border border-[#0071bd]/10 transition-transform duration-300 ease-out z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-[#0071bd]">
                        <h5 class="text-xs font-bold text-[#0071bd] uppercase tracking-[0.15em] flex items-center gap-2">
                          <span class="w-1.5 h-1.5 bg-[#0071bd] rotate-45 block transition-transform" :class="activeCardIndex === 3 ? 'scale-125' : ''"></span>
                          Le Community Manager
                        </h5>
                        <div class="w-8 h-[2px] opacity-30" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, transparent 2px, transparent 4px);"></div>
                        <p class="text-xs text-[#0071bd]/70 font-light leading-relaxed">
                          Établit la stratégie de visibilité du Réseau, produit des contenus engageants pour la communauté et maintient à jour le portail web institutionnel.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Articles 19 & 20 (Assemblée Générale)
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">
                    La CRPDG se réunit au moins une fois par an. Elle entend les rapports, approuve les comptes et vote le budget. Toutes les délibérations de la Conférence annuelle sont prises par consensus (à défaut, à main levée à la majorité absolue). La CRPDG statue sur toute modification des statuts ou sur la dissolution à la majorité des deux tiers.
                  </p>
                </div>
              </div>
            </div>

            <div class="mb-16 relative">
              <div class="flex items-center gap-4 mb-8">
                <span class="text-[10px] font-mono font-bold text-[#38a935] tracking-[0.2em] border border-[#38a935]/30 px-2 py-1 bg-[#38a935]/5">
                  TITRE III
                </span>
                <h3 class="text-lg font-bold text-[#0071bd] uppercase tracking-wider">
                  Des Finances
                </h3>
              </div>

              <div class="grid gap-8 pl-0 lg:pl-6 border-l-2 border-[#0071bd]/10">
                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Article 21
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">Les ressources du REESAO se composent notamment :</p>
                  <ul class="space-y-3 text-[#0071bd]/80 font-light leading-relaxed">
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">des cotisations de ses membres ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">des subventions qui pourraient lui être accordées ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">des sommes perçues en contrepartie des prestations fournies ;</li>
                    <li class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#0071bd] before:rotate-45">des dons et legs.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Articles 22 & 23
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed">
                    Les dépenses sont ordonnancées par le Président. En cas de dissolution, prononcée par la CRPDG, l'actif net est attribué à des associations ayant un objet similaire.
                  </p>
                </div>
              </div>
            </div>

            <div class="mb-16 relative">
              <div class="flex items-center gap-4 mb-8">
                <span class="text-[10px] font-mono font-bold text-[#38a935] tracking-[0.2em] border border-[#38a935]/30 px-2 py-1 bg-[#38a935]/5">
                  TITRE IV
                </span>
                <h3 class="text-lg font-bold text-[#0071bd] uppercase tracking-wider">
                  Des Dispositions Transitoires
                </h3>
              </div>

              <div class="grid gap-8 pl-0 lg:pl-6 border-l-2 border-[#0071bd]/10">
                <div>
                  <h4 class="text-sm font-bold text-[#0071bd] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 block opacity-80"></span> Articles 24 à 26
                  </h4>
                  <p class="text-[#0071bd]/80 font-light leading-relaxed mb-4">
                    Le Conseil Exécutif peut arrêter un règlement intérieur soumis à l'approbation de la CRPDG. Les présents statuts annulent toutes dispositions antérieures contraires et entrent en vigueur dès leur signature.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-20 relative group">
              <svg class="absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 ease-out z-0 w-full h-full">
                <rect width="100%" height="100%" fill="url(#texture-african-blue)" />
              </svg>
              
              <div class="relative bg-white border border-[#0071bd]/20 p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 z-10 transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                <div class="text-center md:text-left">
                  <p class="text-[#0071bd] font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center justify-center md:justify-start gap-2">
                    <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span>
                    Fait en deux exemplaires originaux
                  </p>
                  <p class="text-[#0071bd] font-bold text-sm leading-relaxed">
                    Dakar, République du Sénégal <br/>
                    <span class="text-[#0071bd]/50 font-light text-xs">Le 28 Septembre 2024</span>
                  </p>
                </div>

                <div class="text-center md:text-right border-t md:border-t-0 md:border-l border-[#0071bd]/10 pt-6 md:pt-0 md:pl-8">
                  <p class="text-[10px] font-bold text-[#0071bd] uppercase tracking-wider mb-1">
                    Pour la Conférence, le Président
                  </p>
                  <p class="text-lg lg:text-xl font-black text-[#0071bd] tracking-tight">
                    Pr Issa Abdou MOUMOULA
                  </p>
                </div>
              </div>
            </div>

          </article>
        </div>
      </div>
    </section>
  </main>
</template>