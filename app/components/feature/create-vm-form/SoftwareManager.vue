<!--

Formulaire
1er screen
// Les deux options sont des boutons sous forme de card //
1. Créer une vm a partir d'un gabarit
2. Créer une vm a partir de rien

Quand on clique sur 1 ->
Ça ouvre un dialog qui te propose différents gabarits (sous forme de card les unes a coté des autres)
Au dessus de cette liste on a une barre de recherche (non fonctinnelle pour l'instant) dans laquelle on pourra faire 
des recherches sur le gabarit qu'on veut (petit, linux, etc...)

Quand on clique sur un gabarit ça préremplit l'écran 2


2ème screen (Si on a appuyé sur 2 ou qu'on a fini l'étape 1)

-> On a plusieurs sections

1. Gabarit
    - OS + Version
    - vCPU
    - RAM
    - Espace disque
2. Logiciels
    - Une liste déroulante (autocomplete en multiple)
        - Si on trouve le logiciel qu'on cherche on peut cliquer dessus tout simplement, si on cherche quelque chose et qu'il y a aucune data trouvée,
          un choix "Chercher l'outil" sera proposé en bleu (dans le select)
            - Quand on clique sur Chercher l'outil -> Ça ouvre un dialog avec différentes propositions de logiciels sous forme de card (en colonne)
                -> En bas du dialog il y aura deux boutons
                    -> Ajouter 
                    -> Annuler
                -> On pourra choisir le logiciel en cliquant sur sa card (au click la bordure changera de couleur pour montrer qu'on a cliqué)
                    - Nom du logiciel
                    - Version du logiciel
                    - URL de téléchargement
                    - Recommandation logiciel
                    - Recommandation matériel :
                        - vCPU
                        - RAM
                        - Espace disque

        - Un bouton a droite de celle-ci avec marqué "Ajouter"
            - Quand on clique sur Ajouter le champ se re met a 0 et les items choisis se mettent dans la table (SUITE)
        - Un autre boutton a droite d'ajouter avec marqué "Annuler"
            - Quand on clique sur Annuler le champ se re met a 0
    
    
    - En dessous de la liste déroulante
        - Un tableau a plusieurs colonnes
            -> Nom du logiciel
            -> Version du logiciel
            -> URL de téléchargement (cliquable et modifiable)
                -> attention : toujours activé côté administrateur pour la modification. (POSER QUESTION COMMENT ON REPÈRE UN ADMIN)
                - Modifiable
                    - Si c'est modifiable alors le champ est un boutton qui, au click ouvrira un dialog
                        - Il y aura 2 champs
                            -> Old URL
                            -> New url (modifiable (input))
                        - Il faudra appuyer sur un boutton valider pour confirmer
                            -> Il y aura une vérification a l'aide de l'ia sur le nouveau lien (CALL API)
                                -> Si le nouveau lien est le même que l'ancien et qu'un lien dans le catalogue alors on ne fait pas la vérification (dur)
            -> Recommandation logiciel
                -> Au click du logiciel ça propose de l'ajouter au formulaire avec une modal
                    -> "Voulez vous ajouter X ?"
            -> vCPU Recommandé
            -> RAM Recommandé
            -> Espace disque Recommandé
            -> ID de l'outil / Null si l'outil vient de l'ia
            -> Où installer (select)
               -> Par défaut : Machine Formateur & Stagiaire
               -> Machine Formateur
               -> Machine Stagiaire

- Un boutton valider ou annuler pour soumettre le formulaire

-->

<template>
  <!-- <v-form v-model="validForm" @submit.prevent="submit" class="form"> -->
  <v-container fluid class="pa-4">
    <v-row class="justify-center">
      <!-- <v-row justify="center"> -->
      <v-col>
        <!-- card -->
        <v-card class="ma-2">
          <v-col>
            <v-card-title class="d-flex align-center justify-center"
              >The question will be asked here.</v-card-title
            >
            <v-card-actions class="d-flex align-center justify-space-evenly">
              <!-- first button + dialog -->
              <v-btn color="primary" @click="openDialog('start-from-template')">
                Démarrer depuis un template
              </v-btn>
            </v-card-actions>
          </v-col>

          <!-- dialog -->

          <v-dialog v-model="dialog" max-width="500">
            <VmTemplates
              v-show="currentDialog === 'start-from-template'"
              @select="fillForm"
            />
            <SearchTool
              v-show="currentDialog === 'search-tool'"
              @select="addTool"
            />
          </v-dialog>
        </v-card>

        <v-autocomplete
          v-model="specs.os"
          :items="osOptions"
          item-title="name"
          item-value="name"
          label="OS"
          chips
        ></v-autocomplete>
        <v-autocomplete
          v-model="specs.version"
          :items="versionsOptions.filter((version) => version.os === specs.os)"
          item-title="name"
          item-value="name"
          label="Version"
          chips
        ></v-autocomplete>
        <v-autocomplete
          v-model="specs.cpu"
          :items="cpuOptions"
          item-title="name"
          item-value="name"
          label="CPU"
          chips
        ></v-autocomplete>
        <v-autocomplete
          v-model="specs.ram"
          :items="ramOptions"
          item-title="name"
          item-value="name"
          label="RAM"
          chips
        ></v-autocomplete>
        <v-autocomplete
          v-model="specs.disk"
          :items="diskOptions"
          item-title="name"
          item-value="name"
          label="Disk Space"
          chips
        ></v-autocomplete>
        <div class="d-flex flex-row justify-center align-center ga-2">
          <v-autocomplete
            v-model="selectedTools"
            :items="toolsOptions"
            item-title="name"
            item-value="name"
            label="Tools"
            chips
            multiple
          ></v-autocomplete>
          <v-btn
            color="primary"
            v-show="selectedTools.length === 0"
            @click="openDialog('search-tool')"
            >Rechercher</v-btn
          >
          <v-btn
            color="green"
            v-show="selectedTools.length !== 0"
            @click="handleAddTools"
            >Ajouter</v-btn
          >
          <v-btn v-show="!selectedTools.values" @click="selectedTools = []"
            >Annuler</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
  {{ JSON.stringify(toolsAdded) }}
  <!-- </v-form> -->
</template>

<script setup lang="ts">
import SearchTool from "./dialogs/search-tool/SearchTool.vue";
import VmTemplates from "./dialogs/vm-templates/VmTemplates.vue";
import type { Tool, VMTemplate } from "./types";

const dialog = ref(false);
const currentDialog = ref("");

// ref specs
const specs = ref<VMTemplate | Record<string, null>>({
  name: null,
  description: null,
  os: null,
  version: null,
  ram: null,
  cpu: null,
  disk: null,
});

const selectedTools = ref<string[]>([]);
const toolsAdded = ref<string[]>([]);

function openDialog(dialogId: string) {
  currentDialog.value = dialogId;
  dialog.value = true;
}

function fillForm(template: VMTemplate) {
  dialog.value = false;
  specs.value.name = template.name;
  specs.value.description = template.description;
  specs.value.os = template.os;
  specs.value.version = template.version;
  specs.value.ram = template.ram;
  specs.value.cpu = template.cpu;
  specs.value.disk = template.disk;
}

function handleAddTools() {
  toolsAdded.value.push(...selectedTools.value);
  selectedTools.value = [];
}

function addTool(tool: Tool) {
  dialog.value = false;
  toolsAdded.value.push(tool.name);
}

const osOptions = ["Linux", "Windows"];

const versionsOptions = [
  { name: "Windows Server 2022", os: "Windows" },
  { name: "Windows 11 Pro", os: "Windows" },
  { name: "Ubuntu Server 22.04 LTS", os: "Linux" },
  { name: "Debian 12", os: "Linux" },
  { name: "CentOS Stream 9", os: "Linux" },
  { name: "Rocky Linux 9", os: "Linux" },
];

const ramOptions = ["2 GB", "4 GB"];

const cpuOptions = ["2 vCPU", "1 vCPU"];

const diskOptions = ["20 GB SSD", "40 GB SSD", "15 GB SSD"];

const toolsOptions = [
  "Microsoft Power BI",
  "Microsoft Excel",
  "Microsoft Word",
  "Microsoft PowerPoint",
  "Tableau Desktop",
  "LibreOffice",
  "Visual Studio Code",
  "Visual Studio",
  "IntelliJ IDEA",
  "Eclipse IDE",
  "Python 3.11",
  "Node.js",
  "Java JDK",
  ".NET Framework",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "GIMP",
  "Figma Desktop",
  "Docker Desktop",
  "Git",
  "Postman",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Google Chrome",
  "Mozilla Firefox",
  "VLC Media Player",
  "Discord",
  "Microsoft Teams",
];
</script>
