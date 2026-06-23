<script setup>
import slide1 from '../assets/hero.jpg' 

// Image d'illustration pour le banner institutionnel
const heroBg = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
</script>

<template>
  <main class="w-full bg-white font-sans selection:bg-[#ffe900] selection:text-[#0071bd]">
    
    <!-- Définition des textures SVG (Recopiées du design de référence pour usage dans cette page) -->
    <svg class="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Motif Bleu : Losanges concentriques -->
        <pattern id="texture-african-blue-light" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.15" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.6"/>
        </pattern>

        <!-- Motif Vert : Chevrons / Zig-zag -->
        <pattern id="texture-african-green-light" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.2" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.4" />
        </pattern>

        <!-- Motif Jaune : Damier / Tissage -->
        <pattern id="texture-african-yellow-light" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.05" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.2" />
        </pattern>
      </defs>
    </svg>

    <!-- BANNER DE PAGE (HERO) - Harmonisé -->
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
          <span class="text-[#ffe900]">mots des fondateurs</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-5xl lg:text-[64px] text-white font-black leading-[1.05] tracking-tight">
             Mots des fondateurs <br />
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

    <!-- CONTENU PRINCIPAL -->
    <section class="relative py-16 lg:py-24 bg-white">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <!-- COLONNE GAUCHE : AUTEUR (Sticky) - Harmonisé -->
          <aside class="lg:col-span-4 lg:sticky lg:top-32">
            <!-- Boîte de présentation de l'auteur (Style Carte News avec ombre texturée) -->
            <div class="relative group">
              <!-- NOUVEAU : Ombre décalée texturée (Bleue) -->
              <svg class="absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4 z-0 w-full h-full">
                <rect width="100%" height="100%" fill="url(#texture-african-blue-light)" />
              </svg>
              
              <div class="relative bg-white border border-[#0071bd]/10 p-8 lg:p-10 z-10 transition-colors duration-300 group-hover:border-[#0071bd]/30">
                <!-- Ornement coin -->
                <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0071bd]/20 m-3 group-hover:border-[#38a935]/50 transition-colors"></div>

                <div class="w-12 h-12 bg-[#0071bd]/5 border border-[#0071bd]/10 flex items-center justify-center text-[#ffe900] mb-8 relative overflow-hidden">
                   <!-- Micro-texture sur guillemet -->
                  <span class="absolute inset-0 bg-white/10" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);"></span>
                  <i class="ri-double-quotes-l text-2xl relative z-10"></i>
                </div>
                
                <h3 class="text-xl lg:text-2xl font-bold text-[#0071bd] mb-3 leading-tight tracking-tight">
                  Maryse Adjo QUASHIE
                </h3>
                
                <!-- Séparateur tissé -->
                <div class="w-12 h-[3px] mb-5" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></div>
                
                <p class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#38a935] leading-relaxed relative pl-4">
                   <!-- Bordure latérale tissée -->
                  <span class="absolute left-0 top-0 bottom-0 w-[2px]" style="background: repeating-linear-gradient(0deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
                  Première Secrétaire Générale <br/> du REESAO
                </p>
              </div>
            </div>

            <!-- Lignes de décoration verticales - Harmonisé (couleurs muted design) -->
            <div class="hidden lg:flex flex-col gap-5 mt-16 pl-5 relative">
               <span class="absolute left-0 top-0 bottom-0 w-[1px] bg-[#0071bd]/10 opacity-50"></span>
              <span class="text-[10px] font-mono text-[#0071bd]/40 uppercase tracking-[0.2em]">Document Historique</span>
              <span class="text-[10px] font-mono text-[#0071bd]/40 uppercase tracking-[0.2em]">Vision Stratégique</span>
              <span class="text-[10px] font-mono text-[#0071bd]/40 uppercase tracking-[0.2em]">Fondation LMD</span>
            </div>
          </aside>

          <!-- COLONNE DROITE : CORPS DU TEXTE -->
          <article class="lg:col-span-8 text-[#0071bd]/80">
            
            <header class="mb-16">
              <!-- Label de titre style hachuré -->
              <div class="flex items-center gap-3 mb-4">
                <span class="w-1.5 h-4 block" style="background: repeating-linear-gradient(45deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
                <h2 class="text-2xl md:text-3xl font-bold text-[#0071bd] leading-tight tracking-tight uppercase">
                  Vision des pères fondateurs du REESAO
                </h2>
              </div>
            </header>

            <!-- SECTION 01 : L'INITIATIVE -->
            <div class="mb-20 relative">
              <div class="flex items-center gap-4 mb-8">
                <!-- Index stylisé comme Communiqués -->
                <span class="font-mono text-sm tracking-widest text-[#0071bd]/30 flex items-center gap-2">
                   <span class="w-1 h-1 bg-[#ffe900] rotate-45 transform"></span>
                  [01]
                </span>
                <h3 class="text-xl font-bold text-[#0071bd] uppercase tracking-wide">
                  L’Initiative
                </h3>
              </div>
              
              <div class="prose prose-lg max-w-none text-[#0071bd]/70 font-light leading-relaxed relative pl-8">
                <!-- Bordure tissée verticale latérale -->
                <div class="absolute -left-0 top-0 bottom-0 w-[1px] opacity-10" style="background: repeating-linear-gradient(0deg, #0071bd, #0071bd 4px, transparent 4px, transparent 8px);"></div>

                <p class="mb-6">
                  Avant tout, il faut mettre l’accent sur un préalable très important : le REESAO est une initiative qui provient non des ministères, et donc des politiques mais des universitaires eux-mêmes. C’est pourquoi à chaque rencontre qui se tenait dans un des pays de la sous-région, la proposition de passer au LMD a dû être présentée aux responsables politiques nationaux.
                </p>
                <p class="mb-6">
                  C’est aussi une initiative qui est partie des universités relativement moyennes ou petites avant d’être rejointe par les plus grandes comme l’Université Cheikh Anta Diop de Dakar (Sénégal) ou Houphouët-Boigny de Cocody (Côte d’Ivoire).
                </p>
                <p>
                  Par conséquent, le type d’université proposée par le REESAO correspond à un modèle non imposé par les autorités politiques africaines ou d’ailleurs mais par le contexte d’alors. En effet, les universités ouest-africaines étaient en difficulté avec des taux d’échecs très élevés dans le premier cycle de formation et ce dès la première année d’inscription des apprenants et un chômage important des diplômés. Or les années 2000, consacrant la société du savoir, étaient marquées par un contexte mondial de compétitivité fondée sur la formation universitaire. Ainsi, les discussions qui vont aboutir au REESAO ont commencé dès juillet 2005 alors que le processus de Bologne n’était pas encore arrivé à terme en Europe. Les universitaires ouest-africains qui ont fondé le REESAO ont donc voulu proposer un modèle valable pour l’Afrique sans pour autant ignorer les dispositifs ayant fait leur preuve ailleurs.
                </p>
              </div>
            </div>

            <!-- SECTION 02 : LE MODELE PROPOSE -->
            <div class="mb-20">
              <div class="flex items-center gap-4 mb-8">
                <!-- Index stylisé -->
                <span class="font-mono text-sm tracking-widest text-[#0071bd]/30 flex items-center gap-2">
                   <span class="w-1 h-1 bg-[#38a935] rotate-45 transform"></span>
                  [02]
                </span>
                <h3 class="text-xl font-bold text-[#0071bd] uppercase tracking-wide">
                  Le Modèle Proposé
                </h3>
              </div>

              <div class="prose prose-lg max-w-none text-[#0071bd]/70 font-light leading-relaxed mb-10 relative pl-8">
                 <!-- Bordure tissée verticale latérale -->
                <div class="absolute -left-0 top-0 bottom-0 w-[1px] opacity-10" style="background: repeating-linear-gradient(0deg, #0071bd, #0071bd 4px, transparent 4px, transparent 8px);"></div>
                <p>
                  Les fondateurs du REESAO voulaient proposer une institution dont les Africains puissent dire, c’est <strong>"NOTRE UNIVERSITE"</strong>. Il était en effet temps de mettre sur pied un systeme qui permette de tourner le dos à l’extraversion de l’enseignement supérieur francophone, à renoncer enfin aux extensions de la Sorbonne en terre d’Afrique. A cause de cela, le REESAO devait constituer un espace présentant les caractéristiques suivantes.
                </p>
              </div>

              <!-- Sous-sections structurées - Harmonisé (Puces losanges, hachures) -->
              <div class="grid gap-10 pl-0 lg:pl-10 relative">
                 <!-- Bordure latérale tissée plus marquée pour la sous-liste -->
                <div class="absolute left-0 top-0 bottom-0 w-[2px]" style="background: repeating-linear-gradient(0deg, #0071bd/10, #0071bd/10 4px, transparent 4px, transparent 8px);"></div>
                
                <div>
                  <h4 class="text-lg font-bold text-[#0071bd] mb-5 flex items-center gap-3 tracking-tight">
                    <span class="w-2 h-2 bg-[#ffe900] rotate-45 flex-shrink-0"></span>
                    Un espace de formation tenant compte des réalités locales
                  </h4>
                  <ul class="space-y-5 text-[#0071bd]/70 font-light leading-relaxed">
                    <li class="relative pl-6">
                      <!-- Puce losange vide -->
                      <span class="absolute left-0 top-2 w-2 h-2 border border-[#38a935] rotate-45"></span>
                      Un espace adapté aux caractéristiques sociohistoriques locales : par exemple, le REESAO s’est battu pour instaurer des domaines tels que les Sciences Agronomiques ou les Sciences de l’Education et de la Formation. De la même manière, dans le réseau, la professionnalisation se définit comme un esprit qui anime tous les parcours et non comme l’implantation de quelques établissements dits professionnels ;
                    </li>
                    <li class="relative pl-6">
                      <span class="absolute left-0 top-2 w-2 h-2 border border-[#38a935] rotate-45"></span>
                      Un espace permettant la mobilité des jeunes pendant leur temps de formation mais aussi après. C’est ainsi que renonçant aux espaces restreints des Etats coloniaux, il a été recommandé des parcours adossés aux cultures ouest-africaines (Mandingue, Akan, Aja-Tado, Mossi etc.).
                    </li>
                  </ul>
                </div>

                <div class="relative pl-6">
                  <span class="absolute left-0 top-1 w-2 h-2 bg-[#38a935]/20 rotate-45"></span>
                  <h4 class="text-lg font-bold text-[#0071bd] mb-3tracking-tight">
                    Un espace offrant une formation au plus grand nombre
                  </h4>
                  <p class="text-[#0071bd]/70 font-light leading-relaxed">
                    L’université proposée par le REESAO était destinée à permettre au plus grand nombre de réussir grâce à la diversification des parcours où chaque jeune pourrait se retrouver. Cela devait permettre de rentabiliser l’enseignement supérieur contrairement à la sélection consécutive à l’élitisme hérité de l’université française. Cette orientation devait impulser une dynamique de renouvellement du secondaire qui par la multiplication de ses filières notamment professionnalisantes devait contribuer à la régulation de la massification.
                  </p>
                </div>

                <div class="relative pl-6">
                   <span class="absolute left-0 top-1 w-2 h-2 bg-[#38a935]/20 rotate-45"></span>
                  <h4 class="text-lg font-bold text-[#0071bd] mb-3 tracking-tight">
                    Un espace proposant une formation de qualité
                  </h4>
                  <p class="text-[#0071bd]/70 font-light leading-relaxed mb-4">
                    Le REESAO, tout en étant d’accord avec la nécessité de développer l’éducation de base, socle commun pour tous les citoyens, s’est opposé aux diktats des institutions de Bretton Woods qui recommandaient la réallocation des ressources de l’enseignement supérieur au profit de l’enseignement primaire.
                  </p>
                  <p class="text-[#0071bd]/70 font-light leading-relaxed pl-6 relative">
                     <!-- Bordure tissée latérale citation -->
                    <span class="absolute left-0 top-0 bottom-0 w-[1px]" style="background: repeating-linear-gradient(0deg, #38a935, #38a935 2px, transparent 2px, transparent 4px);"></span>
                    Les ressources de l’enseignement supérieur devaient lui permettre de se moderniser et surtout de rationaliser son processus de formation notamment grâce aux nouvelles technologies, et à l’enseignement à distance en particulier.
                  </p>
                </div>

                <div class="relative pl-6">
                   <span class="absolute left-0 top-1 w-2 h-2 bg-[#38a935]/20 rotate-45"></span>
                  <h4 class="text-lg font-bold text-[#0071bd] mb-3 tracking-tight">
                    Des dispositifs au service de ces objectifs
                  </h4>
                  <p class="text-[#0071bd]/70 font-light leading-relaxed mb-4">
                    C’est au service de ces grandes orientations que certains dispositifs du modèle ont été choisis. C’est ainsi que la semestrialisation devait donner une certaine souplesse aux parcours des apprenants tout en leur évitant les pertes de temps dans leur cursus. La capitalisation allait dans le même sens mais aussi tous les dispositifs visant la mise à niveau, la remédiation et les passerelles.
                  </p>
                  <p class="text-[#0071bd]/70 font-light leading-relaxed mb-4">
                    C’est dans ce cadre que se situe l’importance axiale des services de scolarité et des affaires académiques. Ces services sont considérés non pas seulement comme des structures d’enregistrement des apprenants mais comme des instances de gestion des dispositifs entièrement consacrés à la réalisation des nouveaux objectifs. A ce titre, ces services deviennent des instances capables de créativité.
                  </p>
                  <p class="text-[#0071bd]/70 font-light leading-relaxed font-medium text-[#0071bd]">
                    En définitive, le modèle du REESAO correspond à une université dans laquelle les Africains se reconnaissent et à laquelle les jeunes adhèrent. D’où l’importance de l’explicitation de ce modèle mais surtout de la possibilité donnée aux jeunes de se donner eux-mêmes un projet (UE optionnelles et libres, services aux étudiants, etc.).
                  </p>
                </div>

              </div>
            </div>

            <!-- SECTION 03 : LES EXIGENCES DU MODELE - Harmonisé (Style Cartes News) -->
            <div class="mb-20">
              <div class="flex items-center gap-4 mb-8">
                <!-- Index stylisé -->
                <span class="font-mono text-sm tracking-widest text-[#0071bd]/30 flex items-center gap-2">
                   <span class="w-1 h-1 bg-[#38a935] rotate-45 transform"></span>
                  [03]
                </span>
                <h3 class="text-xl font-bold text-[#0071bd] uppercase tracking-wide">
                  Les Exigences du Modèle
                </h3>
              </div>

              <div class="grid md:grid-cols-2 gap-8 lg:gap-10">
                <!-- Carte Exigence 1 -->
                <div class="group relative">
                   <!-- NOUVEAU : Ombre décalée texturée (Verte) -->
                  <svg class="absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4 z-0 w-full h-full">
                    <rect width="100%" height="100%" fill="url(#texture-african-green-light)" />
                  </svg>
                  
                  <div class="relative bg-white border border-[#0071bd]/10 p-8 lg:p-10 z-10 h-full transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                    <!-- Ornement coin -->
                    <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0071bd]/20 m-3 group-hover:border-[#38a935]/50 transition-colors"></div>
                    
                    <h4 class="text-lg font-bold text-[#0071bd] mb-5 uppercase tracking-wide leading-tight group-hover:text-[#38a935] transition-colors">
                      Une culture de l’évaluation
                    </h4>
                    <p class="text-sm text-[#0071bd]/70 font-light leading-relaxed">
                      L’efficience et l’efficacité visées demandent une évaluation constante du processus de formation en vue de redresser au fur et à mesure les erreurs. Il s’agit d’évaluation des apprenitssages mais aussi d’évaluation des enseignements et des enseignants. Pour ce qui est de l’évaluation des apprentissages, la créativité est à l’ordre du jour ; par exemple par une réhabilitation de l’oral (dans des cultures où l’oralité compte beaucoup).
                    </p>
                  </div>
                </div>

                <!-- Carte Exigence 2 -->
                <div class="group relative">
                   <!-- NOUVEAU : Ombre décalée texturée (Jaune) -->
                  <svg class="absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4 z-0 w-full h-full">
                    <rect width="100%" height="100%" fill="url(#texture-african-yellow-light)" />
                  </svg>
                  
                  <div class="relative bg-white border border-[#0071bd]/10 p-8 lg:p-10 z-10 h-full transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                     <!-- Ornement coin -->
                    <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0071bd]/20 m-3 group-hover:border-[#38a935]/50 transition-colors"></div>

                    <h4 class="text-lg font-bold text-[#0071bd] mb-5 uppercase tracking-wide leading-tight group-hover:text-[#38a935] transition-colors">
                      La transparence
                    </h4>
                    <p class="text-sm text-[#0071bd]/70 font-light leading-relaxed">
                      Pour la compétitivité des formations offertes dans le modèle universitaire du REESAO, la lisibilité des parcours devient une nécessité. C’est ce qu’assurent par exemple la précision exigée dans la dénomination des UE, mais surtout la mise au point du supplément au diplôme.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 04 : CONCLUSION -->
            <div class="mb-16">
              <div class="flex items-center gap-4 mb-8">
                <!-- Index stylisé -->
                <span class="font-mono text-sm tracking-widest text-[#0071bd]/30 flex items-center gap-2">
                   <span class="w-1 h-1 bg-[#38a935] rotate-45 transform"></span>
                  [04]
                </span>
                <h3 class="text-xl font-bold text-[#0071bd] uppercase tracking-wide">
                  Conclusion
                </h3>
              </div>

              <p class="text-[#0071bd]/70 font-light leading-relaxed text-lg mb-12 pl-8 relative">
                 <!-- Bordure tissée verticale latérale -->
                <div class="absolute -left-0 top-0 bottom-0 w-[1px] opacity-10" style="background: repeating-linear-gradient(0deg, #0071bd, #0071bd 4px, transparent 4px, transparent 8px);"></div>
                En 2050, l’Afrique pourrait compter plus de 800 millions de jeunes (soit environ un tiers, 35 % de la population mondiale de jeunes). C’est une force à condition toutefois que ces jeunes soient bien formés. C’est aux responsables des universités de faire face à cela et donc aux responsables des universités du REESAO.
              </p>

              <!-- Bloc de citation finale asymétrique - Harmonisé (Style CTA Button) -->
              <div class="relative group mt-12 max-w-2xl mx-auto">
                <!-- Ombre décalée tissée (Bleue) -->
                <div class="absolute inset-0 bg-[#0071bd] translate-x-2 translate-y-2 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1"></div>
                
                <!-- Corps "Bouton" -->
                <div class="relative bg-[#38a935] border border-[#38a935]/50 p-8 lg:p-10 text-center transition-colors duration-300 group-hover:bg-[#ffe900]">
                  <p class="text-xl lg:text-3xl font-bold text-white group-hover:text-[#0071bd] uppercase tracking-wider leading-snug transition-colors">
                    Que vive le REESAO <br/>
                    <span class="text-sm lg:text-base text-white/80 group-hover:text-[#0071bd]/80 mt-3 block tracking-[0.2em] font-mono font-bold transition-colors">
                      Pour l’excellence de la formation des jeunes africains !
                    </span>
                  </p>
                   <!-- Micro-texture sur fond bouton -->
                  <span class="absolute inset-0 bg-white/5" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px);"></span>
                </div>
              </div>
            </div>

          </article>
        </div>
      </div>
    </section>
  </main>
</template>