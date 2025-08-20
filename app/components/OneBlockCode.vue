<style scoped>
/* SOLYONE */
.solyone-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
}

/* Style */
.v-card {
  border-radius: 16px !important;
}

.v-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 600 !important;
}

.v-text-field .v-field,
.v-select .v-field,
.v-textarea .v-field {
  border-radius: 8px !important;
}

.v-alert {
  border-radius: 12px !important;
}

/* Couleurs SOLYONE */
.text-solyone-primary {
  color: #667eea !important;
}

.text-solyone-secondary {
  color: #764ba2 !important;
}

.bg-solyone-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* Animation cartes */
.v-card {
  transition: all 0.3s ease !important;
}


/* Style icon logiciel */
.v-chip {
  font-weight: 500 !important;
}
</style><template>
  <v-container fluid class="pa-4">
    <v-row justify="center">
      <v-col cols="12" lg="10">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-h3 font-weight-bold mb-2" style="color: #667eea;">
            Déploiement d'Environnement
          </h1>
          <p class="text-h6 text-grey-darken-1">
            Configurez votre environnement de formation
          </p>
        </div>

        <!-- Formulaire principal -->
        <v-card elevation="4" class="mx-auto" max-width="900">
          <v-card-title class="solyone-gradient white--text">
            Configuration du Déploiement SOLYONE
          </v-card-title>

          <v-card-text class="pa-6">
          <Toto/>

  
            <v-form ref="form" v-model="formValid">

              <!-- Informations générales -->
              <div class="mb-8">
                <h3 class="text-h5 mb-4 d-flex align-center">
                  <v-icon left color="#667eea" class="mr-2">mdi-information-outline</v-icon>
                  Informations générales
                </h3>
                
                <v-text-field
                  v-model="formData.nom"
                  label="Nom du déploiement"
                  placeholder="Ex: Formation Power BI - Groupe A"
                  :rules="nameRules"
                  variant="outlined"
                  prepend-inner-icon="mdi-tag-outline"
                  required
                  class="mb-4"
                />

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.formateur"
                      label="Formateur"
                      placeholder="Nom du formateur"
                      :rules="formateurRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-outline"
                      required
                    />
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="formData.nbEtudiants"
                      label="Nombre d'étudiants"
                      type="number"
                      min="1"
                      max="30"
                      :rules="etudiantsRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-group-outline"
                      required
                    />
                  </v-col>
                </v-row>
              </div>

              <!-- Sélection logiciels -->
              <div class="mb-8">
                <h3 class="text-h5 mb-4 d-flex align-center">
                  <v-icon left color="#667eea" class="mr-2">mdi-apps</v-icon>
                  Sélection des logiciels
                </h3>
                
                <v-select
                  v-model="logicielAjouter"
                  label="Ajouter un logiciel"
                  :items="logicielsDisponibles"
                  item-title="displayName"
                  item-value="id"
                  variant="outlined"
                  prepend-inner-icon="mdi-download-outline"
                  @update:model-value="ajouterLogiciel"
                  clearable
                  class="mb-4"
                >
                  <template #item="{ props, item }">
                    <v-list-item v-bind="props">
                      <template #prepend>
                        <span style="font-size: 1.2rem;">{{ item.raw.emoji }}</span>
                      </template>
                      <template #append>
                        <v-chip
                          size="small"
                          :color="getTypeColor(item.raw.type)"
                        >
                          {{ item.raw.type }}
                        </v-chip>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>

                <!-- Logiciels sélectionnés -->
                <div v-if="formData.logicielsSelectionnes.length > 0">
                  <h4 class="text-h6 mb-3">Logiciels sélectionnés :</h4>
                  
                  <v-row>
                    <v-col 
                      v-for="id in formData.logicielsSelectionnes" 
                      :key="id"
                      cols="12" 
                      sm="6"
                    >
                      <v-card variant="outlined" class="pa-3">
                        <div class="d-flex align-center">
                          <span class="text-h6 mr-3">{{ getLogicielEmoji(id) }}</span>
                          
                          <div class="flex-grow-1">
                            <div class="font-weight-medium">{{ getLogicielNom(id) }}</div>
                          </div>
                          
                          <v-chip
                            size="small"
                            :color="getTypeColor(getLogicielType(id))"
                            class="mr-2"
                          >
                            {{ getLogicielType(id) }}
                          </v-chip>
                          
                          <v-btn
                            size="small"
                            color="error"
                            icon
                            variant="text"
                            @click="removeLogiciel(id)"
                          >
                            <v-icon>mdi-close-circle</v-icon>
                          </v-btn>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </div>

              <!-- Configuration système -->
              <div class="mb-8">
                <h3 class="text-h5 mb-4 d-flex align-center">
                  <v-icon left color="#667eea" class="mr-2">mdi-monitor</v-icon>
                  Configuration système
                </h3>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.os"
                      label="Système d'exploitation"
                      :items="osOptions"
                      :rules="osRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-microsoft-windows"
                      required
                    />
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.template"
                      label="Template de VM"
                      :items="templateOptions"
                      :rules="templateRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-server-outline"
                      required
                    />
                  </v-col>
                </v-row>

                <!-- Spécifications  -->
                <v-alert 
                  v-if="specsCalculees"
                  type="info" 
                  variant="tonal" 
                  class="mt-4"
                >
                  <template #title>
                    <v-icon left>mdi-calculator-variant</v-icon>
                    Spécifications calculées automatiquement
                  </template>
                  
                  <div class="mt-3 d-flex flex-wrap ga-2">
                    <v-chip>RAM: {{ specsCalculees.ram }}</v-chip>
                    <v-chip>CPU: {{ specsCalculees.cpu }}</v-chip>
                    <v-chip>Stockage: {{ specsCalculees.stockage }}</v-chip>
                    <v-chip>Temps: {{ specsCalculees.temps }}</v-chip>
                  </div>
                </v-alert>
              </div>

              <!-- Planification -->
              <div class="mb-8">
                <h3 class="text-h5 mb-4 d-flex align-center">
                  <v-icon left color="#667eea" class="mr-2">mdi-calendar-clock</v-icon>
                  Planification
                </h3>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.dateDebut"
                      label="Date de début"
                      type="datetime-local"
                      :rules="dateRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar-start"
                      required
                    />
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.duree"
                      label="Durée de la formation"
                      :items="dureeOptions"
                      :rules="dureeRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-clock-outline"
                      required
                    />
                  </v-col>
                </v-row>

                <v-switch
                  v-model="formData.suppressionAuto"
                  label="Suppression automatique à la fin"
                  color="#667eea"
                  inset
                />
              </div>

              <!--  Notes -->
              <div class="mb-6">
                <h3 class="text-h5 mb-4 d-flex align-center">
                  <v-icon left color="#667eea" class="mr-2">mdi-note-text-outline</v-icon>
                  Notes et commentaires
                </h3>

                <v-textarea
                  v-model="formData.notes"
                  label="Commentaires (optionnel)"
                  placeholder="Ajoutez des notes ou instructions spéciales..."
                  variant="outlined"
                  prepend-inner-icon="mdi-pencil-outline"
                  rows="3"
                />
              </div>

            </v-form>
          </v-card-text>

          <!-- Actions -->
          <v-card-actions class="pa-6">
            <v-spacer />
            
            <v-btn 
              variant="outlined" 
              @click="reinitialiser"
              prepend-icon="mdi-refresh-circle"
            >
              Réinitialiser
            </v-btn>
            
            <v-btn 
              variant="outlined" 
              color="#f093fb" 
              @click="sauvegarder"
              prepend-icon="mdi-content-save-outline"
            >
              Sauvegarder
            </v-btn>
            
            <v-btn 
              color="#667eea" 
              :disabled="!peutDeployer"
              :loading="enCoursDeployment"
              @click="deployer"
              prepend-icon="mdi-rocket-launch"
            >
              Déployer
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>

    <!-- Dialog de déploiement -->
    <v-dialog v-model="enCoursDeployment" persistent max-width="400">
      <v-card>
        <v-card-title class="text-center">
          <v-icon size="48" color="#667eea" class="mb-2">mdi-rocket-launch</v-icon>
          <br>
          Déploiement en cours...
        </v-card-title>
        
        <v-card-text class="text-center">
          <v-progress-circular 
            :model-value="progressPourcentage"
            size="64"
            color="#667eea"
            class="mb-4"
          />
          <p>{{ statusDeployment }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup lang="ts">
// Interface pour les données du formulaire
interface FormData {
  nom: string
  formateur: string
  nbEtudiants: number
  logicielsSelectionnes: string[]
  os: string
  template: string
  dateDebut: string
  duree: string
  suppressionAuto: boolean
  notes: string
}

// Données réactives
const formValid = ref(false)
const formData = ref<FormData>({
  nom: '',
  formateur: '',
  nbEtudiants: 1,
  logicielsSelectionnes: [],
  os: '',
  template: '',
  dateDebut: '',
  duree: '',
  suppressionAuto: true,
  notes: ''
})

const enCoursDeployment = ref(false)
const statusDeployment = ref('')
const progressPourcentage = ref(0)
const logicielAjouter = ref('')

// Options du formulaire
const osOptions = [
  { title: 'Windows 11 Pro', value: 'windows11' },
  { title: 'Windows 10 Pro', value: 'windows10' },
  { title: 'Ubuntu 22.04 LTS', value: 'ubuntu22' },
  { title: 'Ubuntu 20.04 LTS', value: 'ubuntu20' }
]

const templateOptions = [
  { title: 'Standard (4GB RAM, 2 vCPU)', value: 'standard' },
  { title: 'Performance (8GB RAM, 4 vCPU)', value: 'performance' },
  { title: 'Pro (16GB RAM, 8 vCPU)', value: 'pro' }
]

const dureeOptions = [
  { title: '2 heures', value: '2h' },
  { title: '4 heures', value: '4h' },
  { title: '1 jour', value: '1j' },
  { title: '2 jours', value: '2j' },
  { title: '1 semaine', value: '1s' }
]

// Liste des logiciels
const logiciels = [
  // Bureautique et BI
  { id: 'powerbi', nom: 'Microsoft Power BI', emoji: '📊', type: 'freemium' },
  { id: 'excel', nom: 'Microsoft Excel', emoji: '📈', type: 'payant' },
  { id: 'word', nom: 'Microsoft Word', emoji: '📝', type: 'payant' },
  { id: 'powerpoint', nom: 'Microsoft PowerPoint', emoji: '📽️', type: 'payant' },
  { id: 'tableau', nom: 'Tableau Desktop', emoji: '📋', type: 'payant' },
  { id: 'libreoffice', nom: 'LibreOffice', emoji: '📄', type: 'gratuit' },
  
  // Développement
  { id: 'vscode', nom: 'Visual Studio Code', emoji: '💻', type: 'gratuit' },
  { id: 'visualstudio', nom: 'Visual Studio', emoji: '🔧', type: 'payant' },
  { id: 'intellij', nom: 'IntelliJ IDEA', emoji: '🧠', type: 'payant' },
  { id: 'eclipse', nom: 'Eclipse IDE', emoji: '🌙', type: 'gratuit' },
  
  // Langages
  { id: 'python', nom: 'Python 3.11', emoji: '🐍', type: 'gratuit' },
  { id: 'nodejs', nom: 'Node.js', emoji: '🟢', type: 'gratuit' },
  { id: 'java', nom: 'Java JDK', emoji: '☕', type: 'gratuit' },
  { id: 'dotnet', nom: '.NET Framework', emoji: '🔷', type: 'gratuit' },
  
  // Design
  { id: 'photoshop', nom: 'Adobe Photoshop', emoji: '🎨', type: 'payant' },
  { id: 'illustrator', nom: 'Adobe Illustrator', emoji: '🖌️', type: 'payant' },
  { id: 'gimp', nom: 'GIMP', emoji: '🖼️', type: 'gratuit' },
  { id: 'figma', nom: 'Figma Desktop', emoji: '🎪', type: 'freemium' },
  
  // DevOps
  { id: 'docker', nom: 'Docker Desktop', emoji: '🐳', type: 'gratuit' },
  { id: 'git', nom: 'Git', emoji: '📦', type: 'gratuit' },
  { id: 'postman', nom: 'Postman', emoji: '📮', type: 'freemium' },
  
  // Bases de données
  { id: 'mysql', nom: 'MySQL', emoji: '🐬', type: 'gratuit' },
  { id: 'postgresql', nom: 'PostgreSQL', emoji: '🐘', type: 'gratuit' },
  { id: 'mongodb', nom: 'MongoDB', emoji: '🍃', type: 'gratuit' },
  
  // Utilitaires
  { id: 'chrome', nom: 'Google Chrome', emoji: '🌐', type: 'gratuit' },
  { id: 'firefox', nom: 'Mozilla Firefox', emoji: '🦊', type: 'gratuit' },
  { id: 'vlc', nom: 'VLC Media Player', emoji: '🎵', type: 'gratuit' },
  { id: 'discord', nom: 'Discord', emoji: '💬', type: 'gratuit' },
  { id: 'teams', nom: 'Microsoft Teams', emoji: '👥', type: 'freemium' }
]

// Computed properties
const logicielsDisponibles = computed(() => {
  return logiciels
    .filter(l => !formData.value.logicielsSelectionnes.includes(l.id))
    .map(l => ({
      ...l,
      displayName: `${l.emoji} ${l.nom} (${l.type})`
    }))
})

const specsCalculees = computed(() => {
  if (formData.value.logicielsSelectionnes.length === 0) return null
  
  const nbLogiciels = formData.value.logicielsSelectionnes.length
  const ramBase = 4
  const ramCalculee = ramBase + (nbLogiciels * 2)
  const cpuCalcule = Math.max(2, nbLogiciels)
  const stockageCalcule = 30 + (nbLogiciels * 5)
  const tempsCalcule = 5 + (nbLogiciels * 3)
  
  return {
    ram: `${ramCalculee}GB`,
    cpu: `${cpuCalcule} cores`,
    stockage: `${stockageCalcule}GB`,
    temps: `${tempsCalcule} min`
  }
})

const peutDeployer = computed(() => {
  return formData.value.nom && 
         formData.value.formateur && 
         formData.value.logicielsSelectionnes.length > 0 &&
         formData.value.os &&
         formData.value.template &&
         formData.value.dateDebut &&
         formData.value.duree
})

// Règles de validation
const nameRules = [
  (v: string) => !!v || 'Le nom est requis',
  (v: string) => v.length >= 3 || 'Le nom doit contenir au moins 3 caractères'
]

const formateurRules = [
  (v: string) => !!v || 'Le nom du formateur est requis'
]

const etudiantsRules = [
  (v: number) => !!v || 'Le nombre d\'étudiants est requis',
  (v: number) => v >= 1 || 'Au moins 1 étudiant',
  (v: number) => v <= 30 || 'Maximum 30 étudiants'
]

const osRules = [
  (v: string) => !!v || 'Le système d\'exploitation est requis'
]

const templateRules = [
  (v: string) => !!v || 'Le template de VM est requis'
]

const dateRules = [
  (v: string) => !!v || 'La date de début est requise'
]

const dureeRules = [
  (v: string) => !!v || 'La durée est requise'
]

// Fonctions utilitaires
const getLogicielNom = (id: string): string => {
  const logiciel = logiciels.find(l => l.id === id)
  return logiciel ? logiciel.nom : ''
}

const getLogicielEmoji = (id: string): string => {
  const logiciel = logiciels.find(l => l.id === id)
  return logiciel ? logiciel.emoji : ''
}

const getLogicielType = (id: string): string => {
  const logiciel = logiciels.find(l => l.id === id)
  return logiciel ? logiciel.type : ''
}

const getTypeColor = (type: string): string => {
  switch (type) {
    case 'gratuit': return 'success'
    case 'payant': return 'warning'
    case 'freemium': return 'info'
    default: return 'primary'
  }
}

const ajouterLogiciel = () => {
  if (logicielAjouter.value && !formData.value.logicielsSelectionnes.includes(logicielAjouter.value)) {
    formData.value.logicielsSelectionnes.push(logicielAjouter.value)
    logicielAjouter.value = ''
  }
}

const removeLogiciel = (id: string) => {
  const index = formData.value.logicielsSelectionnes.indexOf(id)
  if (index > -1) {
    formData.value.logicielsSelectionnes.splice(index, 1)
  }
}

// Actions
const reinitialiser = () => {
  formData.value = {
    nom: '',
    formateur: '',
    nbEtudiants: 1,
    logicielsSelectionnes: [],
    os: '',
    template: '',
    dateDebut: '',
    duree: '',
    suppressionAuto: true,
    notes: ''
  }
}

const sauvegarder = () => {
  console.log('Sauvegarde:', formData.value)
  // TODO: Appel API de sauvegarde
}

const deployer = async () => {
  enCoursDeployment.value = true
  progressPourcentage.value = 0
  
  // Simulation du déploiement
  const etapes = [
    { message: 'Validation de la configuration...', duree: 1000 },
    { message: 'Création des VMs sur Proxmox...', duree: 2000 },
    { message: 'Installation des logiciels...', duree: 3000 },
    { message: 'Configuration finale...', duree: 1500 },
    { message: 'Déploiement terminé !', duree: 500 }
  ]
  
  for (let i = 0; i < etapes.length; i++) {
    statusDeployment.value = etapes[i].message
    progressPourcentage.value = ((i + 1) / etapes.length) * 100
    await new Promise(resolve => setTimeout(resolve, etapes[i].duree))
  }
  
  setTimeout(() => {
    enCoursDeployment.value = false
    // TODO: Redirection ou notification de succès
  }, 1000)
}

// SEO
useHead({
  title: 'Formulaire de Déploiement - SOLYONE'
})
</script>