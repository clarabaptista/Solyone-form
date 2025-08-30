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
                    - Si c'est modifiable alors le champ est un bouton qui, au click ouvrira un dialog
                        - Il y aura 2 champs
                            -> Old URL
                            -> New url (modifiable (input))
                        - Il faudra appuyer sur un bouton valider pour confirmer
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

- Un bouton valider ou annuler pour soumettre le formulaire

-->

<!--  SoftwareManager.vue -->

<template>
  <!-- <v-form v-model="validForm" @submit.prevent="submit" class="form"> -->
  <v-container class="pa-4">
    <v-row class="justify-center">
      <v-col>
        <h1>Créez un environnement</h1>
        <!-- dialog -->
        <v-dialog v-model="dialog" max-width="500">
          <SearchTool
            v-show="currentDialog === 'search-tool'"
            :research-complete="researchComplete"
          />
        </v-dialog>
        <br/>
        <v-row>
          <v-col cols="6" pa="2">
            <v-autocomplete
              v-model="specs.os"
              :items="osOptions"
              item-title="name"
              item-value="name"
              label="OS"
              chips
              variant="outlined"
              density="comfortable"
            ></v-autocomplete>
          </v-col>

          <v-col cols="6">
            <v-autocomplete
              v-model="specs.version"
              :items="versionsOptions.filter((version) => version.os === specs.os)"
              item-title="name"
              item-value="name"
              label="Version"
              chips
              variant="outlined"
              density="comfortable"
            ></v-autocomplete>
          </v-col>

          <v-col cols="6">
            <v-autocomplete
              v-model="specs.cpu"
              :items="cpuOptions"
              item-title="name"
              item-value="name"
              label="CPU"
              chips
              variant="outlined"
              density="comfortable"
            ></v-autocomplete>
          </v-col>

          <v-col cols="6">
            <v-autocomplete
              v-model="specs.ram"
              :items="ramOptions"
              item-title="name"
              item-value="name"
              label="RAM"
              chips
              variant="outlined"
              density="comfortable"
            ></v-autocomplete>
          </v-col>

          <v-col cols="6">
            <v-autocomplete
              v-model="specs.disk"
              :items="diskOptions"
              item-title="name"
              item-value="name"
              label="Espace disque"
              chips
              variant="outlined"
              density="comfortable"
              ></v-autocomplete>
            </v-col>
          <v-col cols="6">
            <SoftwareUploader @logiciel-ajoute="handleAddZip" />
          </v-col>

        </v-row>
        <div class="d-flex flex-row justify-center align-center ga-2"> 
          <v-autocomplete
            v-model="selectedTools"
            :items="toolsOptions"
            item-title="name"
            item-value="name"
            label="Outils"
            chips
            multiple
            variant="outlined"
            density="comfortable"
          ></v-autocomplete>

          <v-btn
            color="#667EEA"
            variant="flat"
            v-show="selectedTools.length === 0"
            @click="openDialog('search-tool')"
            >Rechercher</v-btn
          >
          <v-btn
            variant="tonal"
            v-show="selectedTools.length !== 0"
            @click="selectedTools = []"
            >Annuler</v-btn
          >
          <v-btn
            color="#667EEA"
            variant="flat"
            v-show="selectedTools.length !== 0"
            @click="handleAddTools"
            >Ajouter</v-btn
          >
        </div>


        <v-data-table
          @click="handleAddTools"
          :headers="headers"
          :items="toolsAdded"
          item_key="name"
          hide-default-footer
        >
          <template v-slot:item.installation.formateur="{ item }">
            <v-checkbox-btn
              v-model="item.installation.formateur"
            ></v-checkbox-btn>
          </template>
          <template v-slot:item.installation.stagiaire="{ item }">
            <v-checkbox-btn
              v-model="item.installation.stagiaire"
            ></v-checkbox-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</br>
  {{ JSON.stringify(toolsAdded) }}
  <!-- </v-form> -->
</template>

<script setup lang="ts">
import SearchTool from "./dialogs/search-tool/SearchTool.vue";
import VmTemplates from "./dialogs/vm-templates/VmTemplates.vue";

import type { Tool, VMTemplate } from "./types";

import { useVmTemplateStore } from "#imports";
import { useToolStore } from "#imports";

import SoftwareUploader from "~/components/SoftwareUploader.vue";

const vmTemplateStore = useVmTemplateStore();
const searchToolStore = useToolStore();

const dialog = ref(false);
const currentDialog = ref("");
const researchComplete = ref(false);

function openDialog(dialogId: string) {
  currentDialog.value = dialogId;
  dialog.value = true;
  if (dialogId === "search-tool") {
    researchComplete.value = true;
  }
}

const specs = ref<VMTemplate | Record<string, null>>({
  name: null,
  description: null,
  os: null,
  version: null,
  ram: null,
  cpu: null,
  disk: null,
});

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
const toolsOptions: Tool[] = [
  {
    name: "Microsoft Power BI",
    version: "2.121.762.0",
    downloadUrl: "https://powerbi.microsoft.com/en-us/downloads/",
    softwareRecommendation: "Excel, SQL Server, Azure",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "2 GB",
    },
  },
  {
    name: "Microsoft Excel",
    version: "Microsoft 365",
    downloadUrl: "https://office.microsoft.com/excel",
    softwareRecommendation: "Power BI, Access, Word",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4 GB",
      disk: "3 GB",
    },
  },
  {
    name: "Microsoft Word",
    version: "Microsoft 365",
    downloadUrl: "https://office.microsoft.com/word",
    softwareRecommendation: "Excel, PowerPoint, OneDrive",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4 GB",
      disk: "3 GB",
    },
  },
  {
    name: "Microsoft PowerPoint",
    version: "Microsoft 365",
    downloadUrl: "https://office.microsoft.com/powerpoint",
    softwareRecommendation: "Word, Excel, Teams",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4 GB",
      disk: "3 GB",
    },
  },
  {
    name: "Tableau Desktop",
    version: "2023.2",
    downloadUrl: "https://tableau.com/products/desktop/download",
    softwareRecommendation: "Power BI, Excel, R/Python",
    hardwareRequirements: {
      vcpu: "4-8 cores",
      ram: "8-16 GB",
      disk: "5 GB",
    },
  },
  {
    name: "LibreOffice",
    version: "7.6.0",
    downloadUrl: "https://libreoffice.org/download/download/",
    softwareRecommendation: "Microsoft Office, OnlyOffice",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "2-4 GB",
      disk: "2 GB",
    },
  },
  {
    name: "Visual Studio Code",
    version: "1.82.0",
    downloadUrl: "https://code.visualstudio.com/download",
    softwareRecommendation: "Git, Node.js, Extensions Pack",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4 GB",
      disk: "1 GB",
    },
  },
  {
    name: "Visual Studio",
    version: "2022 v17.7",
    downloadUrl: "https://visualstudio.microsoft.com/downloads/",
    softwareRecommendation: ".NET Framework, Azure, Git",
    hardwareRequirements: {
      vcpu: "4 cores",
      ram: "8-16 GB",
      disk: "10 GB",
    },
  },
  {
    name: "IntelliJ IDEA",
    version: "2023.2",
    downloadUrl: "https://jetbrains.com/idea/download/",
    softwareRecommendation: "Java JDK, Maven, Gradle",
    hardwareRequirements: {
      vcpu: "4 cores",
      ram: "8-16 GB",
      disk: "3 GB",
    },
  },
  {
    name: "Eclipse IDE",
    version: "2023-06",
    downloadUrl: "https://eclipse.org/downloads/",
    softwareRecommendation: "Java JDK, Maven, Git",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "2 GB",
    },
  },
  {
    name: "Python 3.11",
    version: "3.11.5",
    downloadUrl: "https://python.org/downloads/",
    softwareRecommendation: "PyCharm, VS Code, Jupyter",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4 GB",
      disk: "1 GB",
    },
  },
  {
    name: "Node.js",
    version: "18.17.1",
    downloadUrl: "https://nodejs.org/en/download/",
    softwareRecommendation: "VS Code, npm, Postman",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "2-4 GB",
      disk: "500 MB",
    },
  },
  {
    name: "Java JDK",
    version: "21.0.0",
    downloadUrl: "https://oracle.com/java/technologies/downloads/",
    softwareRecommendation: "IntelliJ IDEA, Eclipse, Maven",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "1 GB",
    },
  },
  {
    name: ".NET Framework",
    version: "4.8",
    downloadUrl: "https://dotnet.microsoft.com/download/dotnet-framework",
    softwareRecommendation: "Visual Studio, VS Code",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "2 GB",
    },
  },
  {
    name: "Adobe Photoshop",
    version: "2024 (25.0)",
    downloadUrl: "https://adobe.com/products/photoshop",
    softwareRecommendation: "Lightroom, Illustrator, Creative Cloud",
    hardwareRequirements: {
      vcpu: "4-8 cores",
      ram: "16-32 GB",
      disk: "10 GB",
    },
  },
  {
    name: "Adobe Illustrator",
    version: "2024 (28.0)",
    downloadUrl: "https://adobe.com/products/illustrator",
    softwareRecommendation: "Photoshop, InDesign, Creative Cloud",
    hardwareRequirements: {
      vcpu: "4-8 cores",
      ram: "8-16 GB",
      disk: "8 GB",
    },
  },
  {
    name: "GIMP",
    version: "2.10.34",
    downloadUrl: "https://gimp.org/downloads/",
    softwareRecommendation: "Inkscape, Krita, Blender",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "1 GB",
    },
  },
  {
    name: "Figma Desktop",
    version: "116.13.4",
    downloadUrl: "https://figma.com/downloads/",
    softwareRecommendation: "Sketch, Adobe XD, Framer",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "500 MB",
    },
  },
  {
    name: "Docker Desktop",
    version: "24.0.5",
    downloadUrl: "https://docker.com/products/docker-desktop/",
    softwareRecommendation: "VS Code Docker Extension, Kubernetes",
    hardwareRequirements: {
      vcpu: "4 cores",
      ram: "8 GB",
      disk: "10 GB",
    },
  },
  {
    name: "Git",
    version: "2.42.0",
    downloadUrl: "https://git-scm.com/downloads",
    softwareRecommendation: "VS Code, GitHub Desktop, GitKraken",
    hardwareRequirements: {
      vcpu: "1 core",
      ram: "1 GB",
      disk: "100 MB",
    },
  },
  {
    name: "Postman",
    version: "10.17.0",
    downloadUrl: "https://postman.com/downloads/",
    softwareRecommendation: "Insomnia, Thunder Client, Newman",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4 GB",
      disk: "500 MB",
    },
  },
  {
    name: "MySQL",
    version: "8.0.34",
    downloadUrl: "https://dev.mysql.com/downloads/mysql/",
    softwareRecommendation: "MySQL Workbench, phpMyAdmin",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "2 GB",
    },
  },
  {
    name: "PostgreSQL",
    version: "15.4",
    downloadUrl: "https://postgresql.org/download/",
    softwareRecommendation: "pgAdmin, DBeaver, VS Code",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-16 GB",
      disk: "5 GB",
    },
  },
  {
    name: "MongoDB",
    version: "7.0.0",
    downloadUrl: "https://mongodb.com/try/download/community",
    softwareRecommendation: "MongoDB Compass, Studio 3T",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "3 GB",
    },
  },
  {
    name: "Google Chrome",
    version: "117.0.5938.89",
    downloadUrl: "https://google.com/chrome/",
    softwareRecommendation: "Firefox, Edge, Developer Tools",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4-8 GB",
      disk: "1 GB",
    },
  },
  {
    name: "Mozilla Firefox",
    version: "117.0.1",
    downloadUrl: "https://mozilla.org/firefox/new/",
    softwareRecommendation: "Chrome, Edge, Thunderbird",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "2-4 GB",
      disk: "500 MB",
    },
  },
  {
    name: "VLC Media Player",
    version: "3.0.18",
    downloadUrl: "https://videolan.org/vlc/",
    softwareRecommendation: "Media Player Classic, PotPlayer",
    hardwareRequirements: {
      vcpu: "1-2 cores",
      ram: "1-2 GB",
      disk: "200 MB",
    },
  },
  {
    name: "Discord",
    version: "0.0.290",
    downloadUrl: "https://discord.com/download",
    softwareRecommendation: "Slack, Teams, Zoom",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "2-4 GB",
      disk: "500 MB",
    },
  },
  {
    name: "Microsoft Teams",
    version: "1.6.00.4472",
    downloadUrl: "https://teams.microsoft.com/downloads",
    softwareRecommendation: "Slack, Zoom, Discord",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "1 GB",
    },
  },
];

const selectedTools = ref<string[]>([]);
const toolsAdded = ref<any[]>([]);

function addTool(tool: Tool) {
  toolsAdded.value.push({
    ...tool,
    installation: {
      formateur: true,
      stagiaire: true,
    },
  });
}

function handleAddTools() {
  for (const toolValue of selectedTools.value) {
    const tools = toolsOptions.filter((tool) => tool.name === toolValue);
    for (const tool of tools) {
      if (toolsAdded.value.filter((t) => t.name === tool.name).length === 0) {
        addTool(tool);
      }
    }
  }
  selectedTools.value = [];
}

function handleAddZip(logiciel: any) {
  const toolToAdd: Tool = {
    name: logiciel.nom,
    softwareRecommendation: "",
    version: logiciel.version,
    hardwareRequirements: logiciel.hardwareRequirements
  };
  addTool(toolToAdd);
}

// TODO: Etudier pourquoi || {} ne fonctionne pas mais () => oui
watch(
  () => searchToolStore.selectedTool,
  (tool) => {
    if (tool) {
      addTool(tool);
      searchToolStore.selectedTool = null;
      dialog.value = false;
    }
  }
);

// titres du tableau
const headers = [
  { title: "Nom du logiciel", value: "name" },
  { title: "Version du logiciel", value: "version" },
  { title: "Lien de téléchargement", value: "downloadUrl" },
  { title: "Recommandation logiciel", value: "softwareRecommendation" },
  { title: "vCPU recommandé", value: "hardwareRequirements.vcpu" },
  { title: "RAM recommandé", value: "hardwareRequirements.ram" },
  { title: "Espace disque recommandé", value: "hardwareRequirements.disk" },
  { title: "Installation formateur", value: "installation.formateur" },
  { title: "Installation stagiaire", value: "installation.stagiaire" },
];

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// VM Template

watch(
  () => vmTemplateStore.selectedVmTemplate,
  (template) => {
    if (template) {
      specs.value.name = template.name;
      specs.value.description = template.description;
      specs.value.os = template.os;
      specs.value.version = template.version;
      specs.value.ram = template.ram;
      specs.value.cpu = template.cpu;
      specs.value.disk = template.disk;
    }
  }
);

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
</script>

<style>
.v-container {
  width: 100%;
}


#card-title {
  background: #7886FF;
  color: white;
  font-weight: bold;
  text-align: center;
  height: 80px;
}

.v-card {
  border-radius: 8px !important;
}

.v-btn {
  border-radius: 8px;
  text-transform: uppercase;
  font-weight: 600 !important;
  letter-spacing: 0.5px;
}

.v-btn:hover {
  filter: brightness(1.05);
}

.v-text-field .v-field,
.v-autocomplete .v-field,
.v-file-input .v-field,
.v-select .v-field {
  border-radius: 8px !important;
  
  margin-bottom: 0px;
  margin-top: 0px;
}

.v-autocomplete,
.v-text-field {
  margin-bottom: none;
}

.v-data-table {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.v-data-table-header {
  font-weight: 600;
}

.v-alert {
  border-radius: 12px !important;
  font-size: 14px;
  padding: 10px 14px;
}

.d-flex.flex-row.justify-center.align-center.ga-2 {
  margin-top: 16px;
}
</style>
