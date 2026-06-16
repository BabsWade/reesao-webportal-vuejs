<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const handleSubmit = () => {
  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    isSuccess.value = true
    
    setTimeout(() => {
      isSuccess.value = false
      form.value = { name: '', email: '', message: '' }
    }, 4000)
  }, 1200)
}
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-12 border-y border-[#0071bd]/10 select-none bg-white font-sans" aria-label="Portail d'adhésion">
    
    <!-- COLONNE A : BLOC INSTITUTIONNEL (Bleu Nuit Profond) -->
    <div class="lg:col-span-5 bg-[#38a935] p-12 lg:p-20 flex flex-col justify-between text-white relative overflow-hidden">
      
      <!-- Grille technique intégrée au fond sombre -->
      <div class="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-join-left" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-join-left)" />
        </svg>
      </div>

      <div class="space-y-12 relative z-10">
        <div class="flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
          <span class="w-1.5 h-1.5 bg-[#38a935]"></span>
          <span>Secrétariat Général // Liaison Administrative</span>
        </div>

        <h3 class="text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight text-white">
          Une architecture collaborative au service de <br />
          <span class="text-[#ffe900]">l’enseignement supérieur</span> ouest-africain.
        </h3>
      </div>

      <div class="pt-16 border-t border-white/10 flex items-center justify-between font-mono text-[9px] font-bold text-white/40 uppercase tracking-[0.25em] relative z-10">
        <span>Hub Régional REESAO</span>
        <span>[UTC +0]</span>
      </div>
      
    </div>

    <!-- COLONNE B : BLOC FORMULAIRE (Blanc Épuré) -->
    <div class="lg:col-span-7 bg-white p-12 lg:p-20 flex flex-col justify-center lg:border-l border-[#0071bd]/10 relative">
      
      <div class="max-w-xl w-full mx-auto">
        
        <!-- En-tête formulaire -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-[#0071bd] tracking-tight mb-4">
            Requête institutionnelle
          </h2>
          <p class="text-base font-light text-[#0071bd]/60 leading-relaxed max-w-md border-l-2 border-[#ffe900] pl-4">
            Veuillez renseigner les informations ci-dessous pour acheminer votre demande auprès du bureau de la présidence.
          </p>
        </div>

        <!-- Animation de changement d'état -->
        <Transition name="form-fade" mode="out-in">
          
          <!-- ÉTAT SUCCÈS -->
          <div v-if="isSuccess" class="py-12 flex flex-col items-start space-y-6">
            <div class="w-14 h-14 bg-[#38a935] flex items-center justify-center text-white">
              <i class="ri-check-line text-2xl font-bold"></i>
            </div>
            <div class="space-y-2">
              <h4 class="text-xl font-bold text-[#0071bd]">Transmission validée</h4>
              <p class="font-mono text-[10px] font-bold text-[#0071bd]/50 uppercase tracking-[0.2em] leading-relaxed">
                Document indexé avec succès. <br />Un accusé de réception officiel sera transmis par voie électronique.
              </p>
            </div>
          </div>

          <!-- FORMULAIRE ACTIF -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-10">
            
            <!-- Champ : Nom -->
            <div class="relative group flex flex-col space-y-2">
              <label class="text-[9px] font-mono font-bold text-[#0071bd]/40 uppercase tracking-[0.2em] group-focus-within:text-[#38a935] transition-colors duration-300">
                Nom complet ou Institution
              </label>
              <input 
                v-model="form.name"
                type="text" 
                required
                class="w-full bg-transparent border-b border-[#0071bd]/10 py-3 text-base text-[#0071bd] transition-all duration-300 rounded-none outline-none focus:border-[#0071bd]"
              />
            </div>

            <!-- Champ : Email -->
            <div class="relative group flex flex-col space-y-2">
              <label class="text-[9px] font-mono font-bold text-[#0071bd]/40 uppercase tracking-[0.2em] group-focus-within:text-[#38a935] transition-colors duration-300">
                Adresse électronique officielle
              </label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full bg-transparent border-b border-[#0071bd]/10 py-3 text-base text-[#0071bd] transition-all duration-300 rounded-none outline-none focus:border-[#0071bd]"
              />
            </div>

            <!-- Champ : Message -->
            <div class="relative group flex flex-col space-y-2">
              <label class="text-[9px] font-mono font-bold text-[#0071bd]/40 uppercase tracking-[0.2em] group-focus-within:text-[#38a935] transition-colors duration-300">
                Objet & descriptif de la requête
              </label>
              <textarea 
                v-model="form.message"
                rows="3"
                required
                class="w-full bg-transparent border-b border-[#0071bd]/10 py-3 text-base text-[#0071bd] transition-all duration-300 rounded-none outline-none resize-none focus:border-[#0071bd]"
              ></textarea>
            </div>

            <!-- Bouton de soumission Asymétrique -->
            <div class="pt-6 relative group/btn">
              <!-- Fond décalé jaune -->
              <div class="absolute bottom-[-4px] left-1 w-full sm:w-auto h-full bg-[#38a935] translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:translate-y-1"></div>
              
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="relative w-full sm:w-auto bg-[#38a935] text-white px-10 py-4 text-[10px] font-mono font-bold uppercase tracking-[0.25em] transition-all duration-300 ease-out border border-[#0071bd] disabled:bg-[#0071bd]/20 disabled:text-[#0071bd]/40 disabled:border-transparent z-10"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                  Traitement en cours...
                </span>
                <span v-else class="flex items-center justify-center gap-3">
                  Soumettre la requête
                  <i class="ri-arrow-right-up-line text-xs transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
                </span>
              </button>
            </div>

          </form>
        </Transition>

      </div>
    </div>

  </section>
</template>

<style scoped>
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.form-fade-enter-from,
.form-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>