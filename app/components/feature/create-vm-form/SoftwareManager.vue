<!--  SoftwareManager.vue -->

<template>
  <v-container class="pa-4">
    <v-row class="justify-center">
      <v-col>
        <div class="first-div">
          <h1 class="title">Créez un environnement</h1>
        </div>
        <div class="second-div">
          <!-- dialog -->
          <v-dialog v-model="dialogStore.isDialogOpen" max-width="500">
            <SearchTool v-if="dialogStore.selectedDialog === 'search-tool'" />
            <VmTemplates
              v-else-if="dialogStore.selectedDialog === 'start-from-template'"
            />
          </v-dialog>

          <v-row class="align-center">
            <v-col pa="2">
              <!-- TODO: Faire une div à la place -->
              <!-- <v-select
                v-model="mainStore.selectedGabarit.name"
                :items="templateOptions"
                item-title="name"
                item-value="name"
                label="Gabarit"
                chips
                variant="outlined"
                density="comfortable"
              ></v-select> -->
              <div class="gabarit d-flex flex-sm-row">
                <div
                  v-for="[key, value] in Object.entries(
                    mainStore.selectedGabarit
                  )"
                >
                  <v-chip
                    class="mr-1"
                    size="small"
                    v-if="
                      value != undefined &&
                      ['version', 'ram', 'cpu', 'disk'].includes(key)
                    "
                    :key="key"
                  >
                    <v-icon
                      start
                      v-show="key === 'version'"
                      :icon="
                        mainStore.selectedGabarit.os === 'Windows'
                          ? 'mdi-microsoft-windows'
                          : 'mdi-linux'
                      "
                    ></v-icon>
                    <v-icon
                      start
                      v-show="key === 'cpu'"
                      :icon="'mdi-cpu-64-bit'"
                    ></v-icon>
                    <v-icon
                      start
                      v-show="key === 'ram'"
                      :icon="'mdi-memory'"
                    ></v-icon>
                    <v-icon
                      start
                      v-show="key === 'disk'"
                      :icon="'mdi-harddisk'"
                    />
                    {{ value }}
                  </v-chip>
                </div>
                <v-icon
                  start
                  v-show="mainStore.selectedGabarit.os === 'Linux'"
                  :icon="'mdi-alert'"
                  color="orange"
                ></v-icon>
              </div>
              <!-- <v-chip class="mr-1" size="small"> {{ cpu }} </v-chip>
                <v-chip class="mr-1" size="small"> {{ ram }} </v-chip>
                <v-chip class="mr-1" size="small"> {{ disk }} </v-chip> -->
            </v-col>
            <v-btn @click="handleVMTemplate" color="#667EEA" variant="flat">
              Sélectionner un gabarit
            </v-btn>
          </v-row>
        </div>
        <div class="third-div">
          <v-row>
            <v-col cols="6" pa="2">
              <!-- <v-autocomplete
                v-model="mainStore.selectedGabarit.os"
                :items="osOptions"
                item-title="name"
                item-value="name"
                label="OS"
                chips
                :disabled="mainStore.isTemplate"
                variant="outlined"
                density="comfortable"
              ></v-autocomplete>
            </v-col>

            <v-col cols="6">
              <v-autocomplete
                v-model="mainStore.selectedGabarit.version"
                :items="
                  versionsOptions.filter(
                    (version) => version.os === mainStore.selectedGabarit.os
                  )
                "
                item-title="name"
                item-value="name"
                label="Version"
                :disabled="mainStore.isTemplate"
                chips
                variant="outlined"
                density="comfortable"
              ></v-autocomplete> -->
            </v-col>

            <!-- <v-col cols="6">
              <v-autocomplete
              v-model="mainStore.selectedGabarit.cpu"
              :items="cpuOptions"
              item-title="name"
              item-value="name"
              label="CPU"
              chips
              variant="outlined"
              density="comfortable"
              ></v-autocomplete>
            </v-col> -->

            <!-- <v-col cols="6">
              <v-autocomplete
              v-model="mainStore.selectedGabarit.ram"
              :items="ramOptions"
              item-title="name"
              item-value="name"
              label="RAM"
              chips
              variant="outlined"
              density="comfortable"
              ></v-autocomplete>
            </v-col> -->

            <!-- <v-col cols="6">
              <v-autocomplete
              v-model="mainStore.selectedGabarit.disk"
              :items="diskOptions"
              item-title="name"
              item-value="name"
              label="Espace disque"
              chips
              variant="outlined"
              density="comfortable"
              ></v-autocomplete>
            </v-col> -->
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
              placeholder="Ex: Adobe Premiere Pro"
              v-model:search="search"
            ></v-autocomplete>

            <v-btn
              color="#667EEA"
              variant="flat"
              v-show="selectedTools.length === 0"
              @click="handleAiResearch"
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
            <SoftwareUploader
              style="width: fit-content"
              @logiciel-ajoute="handleAddZip"
            />
          </div>
          <v-data-table
            @click="handleAddTools"
            :headers="headers"
            :items="mainStore.toolsAdded"
            item_key="name"
            hide-default-footer
            striped="even"
          >
            <template v-slot:item.installation.formateur="{ item }">
              <v-checkbox-btn
                v-if="item.installation"
                v-model="item.installation.formateur"
                :disabled="item.installation.stagiaire === false"
              ></v-checkbox-btn>
            </template>
            <template v-slot:item.installation.stagiaire="{ item }">
              <v-checkbox-btn
                v-if="item.installation"
                v-model="item.installation.stagiaire"
                :disabled="item.installation.formateur === false"
              ></v-checkbox-btn>
            </template>
          </v-data-table>
          <v-row>
            <v-col class="d-flex flex-row align-center ga-2">
              <v-btn variant="tonal" @click="selectedTools = []">Annuler</v-btn>
              <v-btn color="#667EEA" variant="flat">Créer une VM</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <!-- {{ JSON.stringify(mainStore.toolsAdded) }} -->
  <br />
  <br />
  <br />
  <!-- {{ JSON.stringify(mainStore.selectedGabarit) }} -->
</template>

<script setup lang="ts">
import SearchTool from "./dialogs/search-tool/SearchTool.vue";

import type { Tool, VMTemplate } from "./types";


import SoftwareUploader from "~/components/SoftwareUploader.vue";
import VmTemplates from "~/components/feature/create-vm-form/dialogs/vm-templates/VmTemplates.vue";

import { useToolStore } from "@/stores/searchTool";
import { useMainStore } from "~/stores/mainStore";
import { useDialog } from "~/stores/dialogStore";

const searchToolStore = useToolStore();
const mainStore = useMainStore();
const dialogStore = useDialog();

// function openDialog(dialogId: string) {
//   currentDialog.value = dialogId;
//   dialog.value = true;
//   if (dialogId === "search-tool") {
//     researchComplete.value = true;
//   }
//   if (dialogId === "start-from-template") {
//     templateSelected.value = true;
//   }
// }

const osOptions = ["Linux", "Windows"];
const versionsOptions = [
  { name: "Windows 10", os: "Windows" },
  { name: "Debian 12", os: "Linux" },
];
// const ramOptions = ["2 GB", "4 GB"];
// const cpuOptions = ["2 vCPU", "1 vCPU"];
// const diskOptions = ["20 GB SSD", "40 GB SSD", "15 GB SSD"];
const toolsOptions: Tool[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
    id: "10",
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
    id: "11",
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
    id: "12",
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
    id: "13",
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
    id: "14",
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
    id: "15",
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
    id: "16",
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
    id: "17",
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
    id: "18",
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
    id: "19",
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
    id: "20",
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
    id: "21",
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
    id: "22",
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
    id: "23",
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
    id: "24",
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
    id: "25",
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
    id: "26",
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
    id: "27",
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
    id: "28",
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
    id: "29",
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
const search = ref("");

// TODO: S'aider d'un hook ?
function handleAiResearch() {
  console.log(search.value);
  searchToolStore.setResearchedTool(search.value);
  // openDialog("search-tool");
  dialogStore.setDialogId("search-tool");
  dialogStore.openDialog();
}

function addTool(tool: Tool) {
  mainStore.addTool({
    ...tool,
    installation: {
      formateur: true,
      stagiaire: true,
    },
  });
}

// TODO: Optimiser ici (boucle dans boucle)
function handleAddTools() {
  for (const toolValue of selectedTools.value) {
    const tools = toolsOptions.filter((tool) => tool.name === toolValue);
    for (const tool of tools) {
      if (
        mainStore.toolsAdded.filter((t) => t.name === tool.name).length === 0
      ) {
        addTool(tool);
      }
    }
  }
  selectedTools.value = [];
}

function handleAddZip(logiciel: any) {
  const toolToAdd: Tool = {
    id: "custom",
    name: logiciel.nom,
    softwareRecommendation: "",
    version: logiciel.version,
    hardwareRequirements: logiciel.hardwareRequirements,
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
    }
  }
);

// titres du tableau
const headers = [
  { title: "Nom du logiciel", value: "name" },
  { title: "Version du logiciel", value: "version" },
  { title: "Lien de téléchargement", value: "downloadUrl" },
  { title: "Recommandation logiciel", value: "softwareRecommendation" },
  { title: "CPU recommandé", value: "hardwareRequirements.vcpu" },
  { title: "RAM recommandé", value: "hardwareRequirements.ram" },
  { title: "Espace disque recommandé", value: "hardwareRequirements.disk" },
  { title: "Installation formateur", value: "installation.formateur" },
  { title: "Installation stagiaire", value: "installation.stagiaire" },
];

// watch(
//   () => mainStore.selectedGabarit.os,
//   () => {
//     if (!mainStore.isTemplate) {
//       mainStore.selectedGabarit.version = undefined;
//     }
//   }
// );

function handleVMTemplate() {
  // openDialog("start-from-template");
  dialogStore.setDialogId("start-from-template");
  dialogStore.openDialog();
}
</script>

<style>
.v-container {
  width: 100%;
}

.title {
  color: #667eea;
}

.v-card {
  border-radius: 8px !important;
}

.v-btn {
  border-radius: 8px;
  text-transform: none;
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

.v-data-table th {
  /* TODO: vérifier l'activation du bold */
  font-weight: 600 !important;
}

/* .d-flex.flex-row.justify-center.align-center.ga-2 {
  margin-top: 16px;
} */

.first-div,
.second-div,
.third-div {
  border: solid lightgray;
  padding: 1em;
  margin: 10px;
  border-radius: 6px;
}

.gabarit {
  border: 1px solid #ababab;
  padding: 0.5em;
  border-radius: 8px;
  padding-left: 14px;
  height: 36px;
  align-items: center;
  width: 100%;
}
</style>
