<template>
  <div class="software-upload-component">
    <!-- Bouton principal pour ouvrir le dialog -->
    <v-btn 
      :disabled="!administrateurAutorise"
      color="#667eea"
      variant="outlined"
      size="large"
      prepend-icon="mdi-cloud-upload-outline"
      @click="ouvrirDialog"
      class="mb-4"
    >
      Téléverser un logiciel
    </v-btn>

    <!-- Message si pas autorisé -->
    <v-alert
      v-if="!administrateurAutorise"
      type="warning"
      variant="tonal"
      class="mb-4"
    >
      <template #title>
        <v-icon left>mdi-lock-outline</v-icon>
        Fonctionnalité désactivée
      </template>
      Le téléversement de logiciels doit être activé par l'administrateur pour
      des raisons de sécurité.
    </v-alert>

    <!-- Dialog de téléversement -->
    <v-dialog v-model="dialogVisible" max-width="600" persistent>
      <v-card elevation="8">
        <v-card-title class="solyone-gradient white--text pa-4">
          <v-icon left class="mr-2">mdi-cloud-upload-outline</v-icon>
          Téléverser un logiciel
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form ref="uploadForm" v-model="formulaireValide">
            <!-- Sélection OS cible -->
            <v-select
              v-model="logicielData.osTarget"
              label="Système d'exploitation cible"
              :items="[
                { title: 'Windows', value: 'windows' },
                { title: 'Debian/Ubuntu', value: 'debian' },
              ]"
              variant="outlined"
              required
              class="mb-3"
            />

            <!-- Nom logiciel -->
            <v-text-field
              v-model="logicielData.nom"
              label="Nom du logiciel"
              variant="outlined"
              required
              class="mb-3"
            />

            <!-- Version logiciel -->
            <v-text-field
              v-model="logicielData.version"
              label="Version du logiciel"
              variant="outlined"
              required
              class="mb-3"
            />

            <!-- Fichier ZIP -->
            <v-file-input
              v-model="logicielData.fichier"
              label="Sélectionner un fichier ZIP contenant le logiciel"
              accept=".zip"
              variant="outlined"
              required
              show-size
              @change="analyserZIP"
              class="mb-3"
            />
          </v-form>

          <!-- Alerte warning -->
          <v-alert type="warning" variant="tonal" class="mt-4">
            <template #title>
              <v-icon left>mdi-alert-outline</v-icon>
              Responsabilité
            </template>

            <p>
              Vous êtes responsable de l'ajout de ce logiciel. Assurez-vous
              qu'il est légitime et sûr.
            </p>
          </v-alert>
        </v-card-text>

        <!-- Actions du dialog -->
        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn variant="tonal" @click="annuler"> Annuler </v-btn>

          <v-btn
            color="#667eea"
            :disabled="!peutAjouter"
            :loading="enCoursAjout"
            @click="ajouter"
            variant="flat"
          >
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
// Importation JSZip
import JSZip from "jszip";

// Props
interface Props {
  administrateurAutorise?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  administrateurAutorise: true,
});

// Emits
interface Emits {
  (e: "logiciel-ajoute", logiciel: any): void;
}

const emit = defineEmits<Emits>();

// État réactif
const dialogVisible = ref(false);
const formulaireValide = ref(false);
const enCoursAjout = ref(false);
const uploadForm = ref();

const logicielData = ref({
  nom: "",
  version: "",
  fichier: null,
  osTarget: "windows", // OS par défaut
  hardwareRequirements: {
    vcpu: "2 cores",
    ram: "4 GB",
    disk: "3 GB"
}});

// Computed
const peutAjouter = computed(() => {
  return (
    logicielData.value.nom &&
    logicielData.value.version &&
    logicielData.value.fichier &&
    logicielData.value.osTarget
  );
});

// Méthodes
const ouvrirDialog = () => {
  if (props.administrateurAutorise) {
    dialogVisible.value = true;
  }
};

const annuler = () => {
  dialogVisible.value = false;
  reinitialiserFormulaire();
};

const reinitialiserFormulaire = () => {
  logicielData.value = {
    nom: "",
    version: "",
    fichier: null,
    osTarget: "windows",
  };

  if (uploadForm.value) {
    uploadForm.value.reset();
  }
};

// Analyse du ZIP selon les consignes
const analyserZIP = async (files: File[]) => {
  if (!files || files.length === 0) return;

  const file = files[0];

  // Vérifier si ZIP
  if (!file.name.endsWith(".zip") && file.type !== "application/zip") {
    alert("Le fichier doit être un ZIP");
    logicielData.value.fichier = null;
    return;
  }

  try {
    // Analyse du ZIP avec JSZip
    const zip = new JSZip();
    const contenuZip = await zip.loadAsync(file);

    // Récupérer l'OS sélectionné
    const osSelectionne = logicielData.value.osTarget;

    // Extensions compatibles selon l'OS
    const extensionsCompatibles = {
      windows: [".exe", ".msi"],
      debian: [".deb", ".tar.gz", ".tar.xz", ".sh", ".appimage"],
    };

    // Scanner les fichiers du ZIP
    const fichiersCompatibles = [];

    for (const [relativePath, zipEntry] of Object.entries(contenuZip.files)) {
      if (!zipEntry.dir) {
        const extension = relativePath
          .toLowerCase()
          .substring(relativePath.lastIndexOf("."));
        const compatible =
          extensionsCompatibles[osSelectionne]?.includes(extension);

        if (compatible) {
          fichiersCompatibles.push(relativePath);
        }
      }
    }

    // Vérification de compatibilité
    const estCompatible = fichiersCompatibles.length > 0;

    if (estCompatible) {
      console.log(`ZIP compatible avec ${osSelectionne}`);
      console.log("Fichiers installables trouvés:", fichiersCompatibles);
    } else {
      console.log(`ZIP incompatible avec ${osSelectionne}`);
      alert(
        `Aucun fichier installable trouvé pour ${osSelectionne}. Formats requis: ${extensionsCompatibles[
          osSelectionne
        ]?.join(", ")}`
      );
      logicielData.value.fichier = null;
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse du ZIP:", error);
    alert("Erreur lors de l'analyse du fichier ZIP");
    logicielData.value.fichier = null;
  }
};

const ajouter = async () => {
  if (!peutAjouter.value) return;

  enCoursAjout.value = true;

  try {
    // Simulation de l'ajout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Émettre l'événement avec les données du logiciel
    emit("logiciel-ajoute", { ...logicielData.value });

    // Fermer le dialog
    annuler();
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
  } finally {
    enCoursAjout.value = false;
  }
};
</script>

<style scoped>
.software-upload-component {
  width: 100%;
}

/* Styles SOLYONE */
.solyone-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
}

.v-card {
  border-radius: 16px !important;
}

.v-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 600 !important;
}

.v-text-field .v-field,
.v-file-input .v-field,
.v-select .v-field {
  border-radius: 8px !important;
}

.v-alert {
  border-radius: 12px !important;
}
</style>
