<template>
  <header class="fixed w-full top-0 z-50 transition-all duration-500 font-sans">
    
    <svg width="0" height="0" class="absolute pointer-events-none">
      <defs>
        <pattern id="header-texture-blue" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#0071bd" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.2" />
          <rect x="8" y="8" width="4" height="4" fill="#ffe900" opacity="0.6"/>
        </pattern>

        <pattern id="header-texture-green" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#38a935" />
          <path d="M0 5 L10 15 L20 5" fill="none" stroke="#0071bd" stroke-width="2" opacity="0.3" />
        </pattern>
      </defs>
    </svg>

    <div class="absolute top-0 left-0 w-full h-[4px] flex z-50">
      <div class="h-full flex-1 bg-[#0071bd]"></div>
      <div class="h-full flex-1 bg-[#38a935]"></div>
      <div class="h-full flex-1 bg-[#ffe900]"></div>
    </div>

    <div 
      class="hidden lg:block bg-[#0071bd] text-white transition-all duration-500 origin-top mt-[4px] relative overflow-hidden border-b border-white/10"
      :class="isScrolled ? 'h-0 opacity-0 py-0' : 'h-[40px] opacity-100 py-2'"
    >
      <div class="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-overlay">
        <svg class="w-full h-full"><rect width="100%" height="100%" fill="url(#header-texture-blue)" /></svg>
      </div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 h-full flex justify-between items-center text-[11px] font-bold tracking-[0.15em] uppercase">
        <div class="flex items-center gap-8">
          <a href="mailto:contact@reesao.org" class="group flex items-center gap-2 hover:text-[#ffe900] transition-colors duration-300">
            <i class="ri-mail-line text-base text-[#ffe900]"></i> 
            contact@reesao.org
          </a>
          <a href="tel:+221772530475" class="group flex items-center gap-2 hover:text-[#ffe900] transition-colors duration-300">
            <i class="ri-phone-line text-base text-[#ffe900]"></i> 
            +221 77 253 04 75
          </a>
        </div>

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-4 border-r border-white/20 pr-6">
            <a href="https://www.linkedin.com/company/reesao/%20" aria-label="LinkedIn" class="hover:text-[#ffe900] transition-colors duration-300 text-sm"><i class="ri-linkedin-fill"></i></a>
            <a href="https://x.com/REESAO_org" aria-label="Twitter" class="hover:text-[#ffe900] transition-colors duration-300 text-sm"><i class="ri-twitter-x-line"></i></a>
            <a href="https://www.facebook.com/reesao.org" aria-label="Facebook" class="hover:text-[#ffe900] transition-colors duration-300 text-sm"><i class="ri-facebook-fill"></i></a>
            <a href="https://www.youtube.com/@REESAO_org" aria-label="Youtube" class="hover:text-[#ffe900] transition-colors duration-300 text-sm"><i class="ri-youtube-fill"></i></a>
          </div>
          
          <div class="flex items-center gap-3">
            <button @click="setLang('FR')" class="transition-colors duration-300" :class="currentLang === 'FR' ? 'text-[#ffe900]' : 'text-white/50 hover:text-white'">FR</button>
            <span class="text-white/20 font-light">|</span>
            <button @click="setLang('EN')" class="transition-colors duration-300" :class="currentLang === 'EN' ? 'text-[#ffe900]' : 'text-white/50 hover:text-white'">EN</button>
          </div>
        </div>
      </div>
    </div>

    <div 
      class="relative transition-all duration-300"
      :class="[
        isScrolled ? 'bg-[#0071bd] shadow-2xl border-b border-white/10' : 'bg-white border-b border-[#0071bd]/10'
      ]"
    >
      <div 
        class="absolute inset-0 z-0 pointer-events-none opacity-[0.025] mix-blend-multiply transition-opacity duration-300"
        :class="isScrolled ? 'opacity-0' : 'opacity-[0.025]'"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30zM15 30l15 15 15-15-15-15z\' fill=\'%230071bd\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
      ></div>

      <div 
        class="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 overflow-hidden" 
        :class="isScrolled ? 'opacity-20 mix-blend-overlay' : 'opacity-0'"
      >
        <svg class="w-full h-full"><rect width="100%" height="100%" fill="url(#header-texture-blue)" /></svg>
      </div>

      <div class="relative z-10 max-w-[1400px] mx-auto flex justify-between items-center px-6 lg:px-8 h-[80px] lg:h-[90px]">
        
        <router-link to="/" class="relative flex items-center focus:outline-none group" aria-label="Accueil REESAO">
          <div class="absolute inset-0 bg-[#ffe900] translate-x-1 translate-y-1 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
          <div class="relative bg-white p-2 h-16 lg:h-[70px] flex items-center border border-[#0071bd]/10 z-10">
            <img :src="logo" alt="Logo REESAO" class="h-full w-auto object-contain" />
          </div>
        </router-link>

        <nav 
          class="hidden lg:flex items-center h-full gap-6 xl:gap-8 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
          :class="isScrolled ? 'text-white' : 'text-[#0071bd]'"
        >
          <div v-for="(item, index) in menuItems" :key="index" class="relative h-full flex items-center group">
            
            <router-link 
              v-if="!item.subItems"
              :to="item.to" 
              class="relative flex items-center gap-1 py-2 hover:text-[#ffe900] transition-colors duration-300"
              :class="!isScrolled ? 'hover:text-[#0071bd]' : ''"
              active-class="text-[#ffe900]"
            >
              {{ item.label }}
              <span 
                class="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                :style="`background: repeating-linear-gradient(45deg, ${isScrolled ? '#ffe900' : '#0071bd'}, ${isScrolled ? '#ffe900' : '#0071bd'} 2px, transparent 2px, transparent 4px);`"
              ></span>
            </router-link>

            <button 
              v-else
              class="relative flex items-center gap-1 py-2 transition-colors duration-300"
              :class="isScrolled ? 'group-hover:text-[#ffe900]' : 'group-hover:text-[#0071bd]'"
            >
              {{ item.label }}
              <i class="ri-arrow-down-s-line text-base opacity-70 group-hover:opacity-100 transition-transform duration-300 group-hover:-rotate-180"></i>
              <span 
                class="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                :style="`background: repeating-linear-gradient(45deg, ${isScrolled ? '#ffe900' : '#0071bd'}, ${isScrolled ? '#ffe900' : '#0071bd'} 2px, transparent 2px, transparent 4px);`"
              ></span>
            </button>

            <div 
              v-if="item.subItems" 
              class="absolute top-full left-0 min-w-[300px] bg-white border border-[#0071bd]/10 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 shadow-xl flex flex-col z-[100]"
            >
              <div class="w-full h-[3px]" style="background: repeating-linear-gradient(45deg, #0071bd, #0071bd 2px, #38a935 2px, #38a935 4px, #ffe900 4px, #ffe900 6px);"></div>
              
              <router-link 
                v-for="(sub, subIdx) in item.subItems" 
                :key="subIdx" 
                :to="sub.to" 
                class="px-6 py-4 border-b border-[#0071bd]/5 text-[11px] text-[#0071bd] hover:text-[#0071bd] hover:bg-[#0071bd]/5 transition-all duration-200 flex items-center gap-3 group/sub"
                active-class="bg-[#0071bd]/5 text-[#0071bd] font-black"
              >
                <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 shrink-0 block transition-transform duration-200 group-hover/sub:rotate-90 group-hover/sub:bg-[#0071bd]"></span>
                <span class="leading-snug tracking-wider uppercase text-[10px]">{{ sub.label }}</span>
              </router-link>
            </div>
          </div>
        </nav>

       <!--  <div class="hidden lg:flex items-center gap-6">
          <button 
            aria-label="Recherche" 
            class="transition-colors text-lg" 
            :class="isScrolled ? 'text-white/80 hover:text-[#ffe900]' : 'text-[#0071bd] hover:text-[#0071bd]'"
          >
            <i class="ri-search-line"></i>
          </button>

          <button class="relative group">
            <svg class="absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform duration-300 ease-out z-0 w-full h-full group-hover:translate-x-0 group-hover:translate-y-0">
              <rect width="100%" height="100%" fill="url(#header-texture-blue)" />
            </svg>
            
            <div class="relative z-10 bg-[#38a935] text-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] border border-black/10 flex items-center gap-2">
              Espace Membres
              <i class="ri-arrow-right-line text-base text-[#ffe900]"></i>
            </div>
          </button>
        </div> -->

        <button 
          @click="toggleMobileMenu" 
          class="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] focus:outline-none z-[60]"
          :class="isScrolled || isMobileMenuOpen ? 'text-white' : 'text-[#0071bd]'"
        >
          <span class="block w-6 h-[2px] bg-current transition-all duration-300" :class="isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''"></span>
          <span class="block w-6 h-[2px] bg-current transition-all duration-300" :class="isMobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'"></span>
          <span class="block w-6 h-[2px] bg-current transition-all duration-300" :class="isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''"></span>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-500 ease-in-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-[#0071bd] z-[55] lg:hidden flex flex-col pt-[110px] px-6 pb-8 overflow-y-auto">
        
        <div class="fixed inset-0 z-0 opacity-10 pointer-events-none">
          <svg class="w-full h-full"><rect width="100%" height="100%" fill="url(#header-texture-blue)" /></svg>
        </div>

        <nav class="relative z-10 flex flex-col text-white w-full">
          <div v-for="(item, index) in menuItems" :key="'mob-'+index" class="flex flex-col border-b border-white/5">
            
            <button 
              v-if="item.subItems" 
              @click="toggleSubMenu(index)" 
              class="py-5 flex justify-between items-center w-full text-left uppercase text-[12px] font-bold tracking-[0.15em] hover:text-[#ffe900] transition-colors"
            >
              <div class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span>
                {{ item.label }}
              </div>
              <i class="ri-add-line text-lg text-white/40 transition-transform duration-300" :class="openMobileSubMenu === index ? 'rotate-45 text-[#ffe900]' : ''"></i>
            </button>

            <router-link 
              v-else 
              :to="item.to" 
              @click="closeMobileMenu"
              class="py-5 flex items-center gap-3 uppercase text-[12px] font-bold tracking-[0.15em] hover:text-[#ffe900] transition-colors" 
              active-class="text-[#ffe900]"
            >
              <span class="w-1.5 h-1.5 bg-[#38a935] rotate-45 block"></span>
              {{ item.label }}
            </router-link>

            <div 
              v-if="item.subItems" 
              class="overflow-hidden transition-all duration-300" 
              :style="{ maxHeight: openMobileSubMenu === index ? '500px' : '0px' }"
            >
              <div class="flex flex-col pb-4 pl-6">
                <router-link 
                  v-for="(sub, subIdx) in item.subItems" 
                  :key="'mob-sub-'+subIdx" 
                  :to="sub.to" 
                  @click="closeMobileMenu"
                  class="py-3 text-[11px] font-medium tracking-wider uppercase text-white/60 hover:text-[#ffe900] flex items-center gap-3 border-l border-white/10 pl-4 transition-colors"
                  active-class="text-[#ffe900] font-bold"
                >
                  <span class="w-2 h-[1px] bg-[#38a935]"></span>
                  {{ sub.label }}
                </router-link>
              </div>
            </div>
          </div>
        </nav>
        
        <div class="relative z-10 mt-10 group">
          <svg class="absolute inset-0 translate-x-1.5 translate-y-1.5 w-full h-full">
            <rect width="100%" height="100%" fill="url(#header-texture-green)" />
          </svg>
          <button class="relative w-full bg-[#0071bd] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] text-center border border-white/10 flex justify-center items-center gap-2">
            Espace Membres
            <i class="ri-arrow-right-line text-[#ffe900]"></i>
          </button>
        </div>

        <div class="relative z-10 mt-auto pt-10 flex flex-col gap-4 border-t border-white/5 text-white/40">
          <div class="flex items-center gap-5 text-xl">
            <a href="https://www.linkedin.com/company/reesao/%20" class="hover:text-[#ffe900] transition-colors"><i class="ri-linkedin-fill"></i></a>
            <a href="https://x.com/REESAO_org" class="hover:text-[#ffe900] transition-colors"><i class="ri-twitter-x-line"></i></a>
            <a href="https://www.facebook.com/reesao.org" class="hover:text-[#ffe900] transition-colors"><i class="ri-facebook-fill"></i></a>
            <a href="https://www.youtube.com/@REESAO_org" class="hover:text-[#ffe900] transition-colors"><i class="ri-youtube-fill"></i></a>
          </div>
          <a href="mailto:contact@reesao.org" class="text-xs hover:text-[#ffe900] transition-colors font-light tracking-wider">
            contact@reesao.org
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logo from '../assets/Logotypereesao.jpg'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const currentLang = ref('FR')
const openMobileSubMenu = ref(null)

const menuItems = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Présentation',
    subItems: [
      { label: 'Mot des fondateurs du REESAO', to: '/presentation/mot-des-fondateurs' },
      { label: 'Statuts', to: '/presentation/statuts' },
      { label: 'Règlement intérieur', to: '/presentation/reglement' },
      { label: 'Le Conseil Exécutif', to: '/presentation/conseil' },
    ]
  },
  { label: 'Rapports', to: '/rapports'},
  { label: 'Actualités', to: '/actualites' },
  { label: 'Formations', to: '/formation'},
  { label: 'Mediathèque', to: '/mediatheque' },
  { label: 'Contact', to: '/contact' },
]

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = 'auto'
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : 'auto'
  if (!isMobileMenuOpen.value) openMobileSubMenu.value = null
}

const toggleSubMenu = (index) => {
  openMobileSubMenu.value = openMobileSubMenu.value === index ? null : index
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

const setLang = (lang) => {
  currentLang.value = lang
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style>
html {
  scroll-behavior: smooth;
  scroll-padding-top: 120px;
}
</style>