<template>
  <footer class="relative bg-[#0071bd] text-white pt-24 pb-12 select-none font-sans overflow-hidden" aria-label="Pied de page institutionnel">
    
    <svg width="0" height="0" class="absolute pointer-events-none">
      <defs>
        <pattern id="footer-texture-yellow" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#ffe900" />
          <path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#0071bd" opacity="0.15" />
          <path d="M0 8h16M8 0v16" fill="none" stroke="#38a935" stroke-width="1" opacity="0.3" />
        </pattern>

        <pattern id="footer-texture-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
          <path d="M0 10 L10 20 L20 10" fill="none" stroke="#ffe900" stroke-width="1.5" opacity="0.4" />
        </pattern>
      </defs>
    </svg>

    <div 
      class="absolute inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%23ffffff\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    ></div>

    <div class="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
        
        <div class="lg:col-span-6 space-y-6 pr-0 lg:pr-8">
          <div class="inline-flex items-center gap-4 group cursor-default">
            <div class="relative w-12 h-12 shrink-0">
              <svg class="absolute inset-0 translate-x-1 translate-y-1 transition-transform duration-300 ease-out z-0 w-full h-full group-hover:translate-x-0 group-hover:translate-y-0">
                <rect width="100%" height="100%" fill="url(#footer-texture-yellow)" />
              </svg>
              <div class="relative w-full h-full border border-white/20 bg-[#0071bd] flex items-center justify-center text-xl font-black tracking-widest text-white z-10 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                R.
              </div>
            </div>
            <span class="text-xl font-black tracking-[0.25em] uppercase transition-colors duration-500 group-hover:text-[#ffe900]">REESAO</span>
          </div>
          
          <p class="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
            Réseau pour l’Émulation de l’Enseignement Supérieur et de la Recherche en Afrique de l’Ouest. 
            <br /><span class="italic text-[#ffe900] font-normal opacity-90">Harmonisation des compétences et excellence transfrontalière.</span>
          </p>

          <div class="flex items-center gap-4 pt-2">
            <a 
              v-for="(social, index) in socialLinks" 
              :key="index"
              :href="social.href"
              :aria-label="social.label"
              class="relative group w-10 h-10 block shrink-0"
            >
              <svg class="absolute inset-0 translate-x-1 translate-y-1 transition-transform duration-200 z-0 w-full h-full">
                <rect width="100%" height="100%" fill="url(#footer-texture-green)" />
              </svg>
              <div class="relative z-10 w-full h-full border border-white/10 bg-[#0071bd]/30 backdrop-blur-sm flex items-center justify-center text-white/70 group-hover:text-[#0071bd] group-hover:bg-[#ffe900] group-hover:border-[#ffe900] transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <i :class="[social.icon, 'text-base font-normal']"></i>
              </div>
            </a>
          </div>
        </div>

<!--         <div class="lg:col-span-3 space-y-6 lg:pl-6">
          <div class="space-y-2">
            <h3 class="text-[10px] uppercase tracking-[0.2em] text-white/50 font-black flex items-center gap-2.5">
              <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span>
              Orientation
            </h3>
            <div class="w-8 h-[1px] bg-white/10"></div>
          </div>
          <nav class="flex flex-col space-y-3.5">
            <a 
              v-for="(link, index) in quickLinks" 
              :key="index"
              :href="link.href"
              class="group text-xs sm:text-sm text-white/70 hover:text-[#ffe900] transition-colors duration-300 flex items-center font-light relative"
            >
              <span class="w-0 h-1 bg-[#ffe900] rotate-45 mr-0 opacity-0 group-hover:w-1.5 group-hover:h-1.5 group-hover:mr-2.5 group-hover:opacity-100 transition-all duration-300 ease-out shrink-0"></span>
              {{ link.name }}
            </a>
          </nav>
        </div> -->

        <div class="lg:col-span-6 space-y-6">
          <div class="space-y-2">
            <h3 class="text-[10px] uppercase tracking-[0.2em] text-white/50 font-black flex items-center gap-2.5">
              <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span>
              Secrétariat Général
            </h3>
            <div class="w-8 h-[1px] bg-white/10"></div>
          </div>
          <ul class="space-y-5 text-xs sm:text-sm text-white/70 font-light">
            <li class="flex items-start gap-3.5 group cursor-default">
              <i class="ri-map-pin-line text-[#ffe900] opacity-70 group-hover:opacity-100 transition-opacity mt-0.5 text-base shrink-0"></i>
              <span class="leading-relaxed group-hover:text-white transition-colors duration-300">Siège - Université de Lomé, Togo</span>
            </li>
            <li class="flex items-center gap-3.5 group">
              <i class="ri-mail-line text-[#ffe900] opacity-70 group-hover:opacity-100 transition-opacity text-base shrink-0"></i>
              <a href="mailto:contact@reesao.org" class="hover:text-[#ffe900] transition-colors duration-300 border-b border-transparent hover:border-[#ffe900]/30 pb-0.5">contact@reesao.org</a>
            </li>
            <li class="flex items-center gap-3.5 group cursor-default">
              <i class="ri-phone-line text-[#ffe900] opacity-70 group-hover:opacity-100 transition-opacity text-base shrink-0"></i>
              <span class="group-hover:text-white transition-colors duration-300 font-medium tracking-wide">+221 77 253 04 75</span>
            </li>
          </ul>
        </div>

       <!--  <div class="lg:col-span-2 space-y-6">
          <div class="space-y-2">
            <h3 class="text-[10px] uppercase tracking-[0.2em] text-white/50 font-black flex items-center gap-2.5">
              <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span>
              Veille Académique
            </h3>
            <div class="w-8 h-[1px] bg-white/10"></div>
          </div>
          <p class="text-xs text-white/60 leading-relaxed font-light">
            Alertes d’appels à projets et communiqués officiels du réseau.
          </p>

          <div class="pt-1">
            <Transition name="fade-slide" mode="out-in">
              <div v-if="isSubscribed" class="flex items-center gap-3 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white py-3 border-b border-[#38a935]">
                <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block animate-ping"></span>
                <span>Indexation validée</span>
              </div>

              <form v-else @submit.prevent="handleSubscribe" class="relative group">
                <input 
                  v-model="emailNewsletter"
                  type="email" 
                  required
                  placeholder="Adresse électronique" 
                  class="w-full bg-[#0071bd]/20 border-b border-white/20 py-3 px-3 text-xs sm:text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#ffe900] focus:bg-[#0071bd]/45 font-light pr-10 rounded-none"
                />
                <div class="absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-focus-within:w-full" style="background: repeating-linear-gradient(45deg, #ffe900, #ffe900 2px, transparent 2px, transparent 4px);"></div>
                
                <button 
                  type="submit"
                  :disabled="isLoading"
                  class="absolute right-0 top-0 bottom-0 px-3 text-white/40 hover:text-[#ffe900] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
                  aria-label="S'inscrire"
                >
                  <i v-if="isLoading" class="ri-loader-4-line animate-spin text-base"></i>
                  <i v-else class="ri-arrow-right-up-line text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                </button>
              </form>
            </Transition>
          </div>
        </div> -->
      </div>

      <div class="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6 font-mono text-[9px] font-bold text-white/40 uppercase tracking-[0.25em]">
        <div class="flex items-center gap-3">
          <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block animate-pulse"></span>
          © 2026 REESAO • Tous droits réservés.
        </div>
        
        <div class="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          <a href="#" class="hover:text-[#ffe900] transition-colors duration-300 border-b border-transparent hover:border-[#ffe900]/20 pb-0.5">Mentions Légales</a>
          <a href="#" class="hover:text-[#ffe900] transition-colors duration-300 border-b border-transparent hover:border-[#ffe900]/20 pb-0.5">Données Publiques</a>
          <span class="opacity-30 hidden sm:inline-block tracking-widest">PROT.REG-WEST-AFR // v3.4.1</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const emailNewsletter = ref('')
const isSubscribed = ref(false)
const isLoading = ref(false)

const handleSubscribe = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isSubscribed.value = true
    emailNewsletter.value = ''
    
    setTimeout(() => {
      isSubscribed.value = false
    }, 4000)
  }, 1200)
}

const quickLinks = [
  { name: 'Gouvernance & CRPDG', href: '#' },
  { name: 'Universités Membres', href: '#' },
  { name: 'Programmes de Mobilité', href: '#' },
  { name: 'Appels à projets & Recherche', href: '#' },
  { name: 'Ressources & Publications', href: '#' },
]

const socialLinks = [
  { icon: 'ri-linkedin-fill', href: 'https://www.linkedin.com/company/reesao/%20', label: 'LinkedIn' },
  { icon: 'ri-twitter-x-fill', href: 'https://x.com/REESAO_org', label: 'X (Twitter)' },
  { icon: 'ri-facebook-fill', href: 'https://www.facebook.com/reesao.org', label: 'Facebook' },
  { icon: 'ri-youtube-fill', href: 'https://www.youtube.com/@REESAO_org', label: 'YouTube' },
]
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>