<!--  VmTemplate.vue -->

<template>
  <v-card>
    <v-card-item>
      <v-card-title>Gabarits de VM</v-card-title>
      <v-col v-for="template in vmTemplates" :key="template.name">
        <CardTemplate v-bind="template" />
      </v-col>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { VMTemplate } from "../../types";
import CardTemplate from "./CardTemplate.vue";

// const emit = defineEmits(["select"]);

// const vmTemplates: VMTemplate[] = [
//   {
//     name: "Ubuntu Server 22.04 LTS",
//     description:
//       "Serveur Linux stable et populaire, idéal pour le développement et la production.",
//     os: "Linux",
//     version: "Ubuntu Server 22.04 LTS",
//     ram: "2 GB",
//     cpu: "2 vCPU",
//     disk: "20 GB SSD",
//   },
//   {
//     name: "Windows Server 2022",
//     description:
//       "Système d'exploitation serveur Microsoft, adapté aux applications d'entreprise.",
//     os: "Windows",
//     version: "Windows Server 2022",
//     ram: "4 GB",
//     cpu: "2 vCPU",
//     disk: "40 GB SSD",
//   },
//   {
//     name: "Debian 12",
//     description:
//       "Distribution Linux reconnue pour sa stabilité et sa sécurité.",
//     os: "Linux",
//     version: "Debian 12",
//     ram: "2 GB",
//     cpu: "1 vCPU",
//     disk: "15 GB SSD",
//   },
//   {
//     name: "CentOS Stream 9",
//     description:
//       "Distribution Linux orientée serveur, idéale pour les environnements de production.",
//     os: "Linux",
//     version: "CentOS Stream 9",
//     ram: "2 GB",
//     cpu: "2 vCPU",
//     disk: "20 GB SSD",
//   },
//   {
//     name: "Rocky Linux 9",
//     description: "Alternative communautaire à CentOS, adaptée aux serveurs.",
//     os: "Linux",
//     version: "9",
//     ram: "2 GB",
//     cpu: "2 vCPU",
//     disk: "20 GB SSD",
//   },
//   {
//     name: "Windows 11 Pro",
//     description: "Système d'exploitation Windows pour postes de travail.",
//     os: "Windows",
//     version: "11 Pro",
//     ram: "4 GB",
//     cpu: "2 vCPU",
//     disk: "40 GB SSD",
//   },
// ];

// function handleSelect(template: VMTemplate) {
//   emit("select", template);
// } 
</script>
