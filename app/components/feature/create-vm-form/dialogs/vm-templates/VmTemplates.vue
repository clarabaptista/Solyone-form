<!-- VmTemplate.vue -->

<template>
  <v-card>
    <v-card-item>
      <!-- <div> -->
      <v-card-title>Sélectionner un gabarit</v-card-title>
      <!-- </div> -->
      <v-col v-for="[index, template] in templates.entries()" :key="index">
        <StartFromTemplate v-bind="template"
      /></v-col>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import StartFromTemplate from "~/components/feature/create-vm-form/dialogs/start-from-template/StartFromTemplate.vue";
import type { VMTemplate } from "../../types";

function fetchTemplates(): VMTemplate[] {
  return [
    {
      os: "Windows",
      version: "Windows 10",
      cpu: "1 CPU",
      ram: "4 Go RAM",
      disk: "125 Go SSD",
    },
    {
      os: "Linux",
      version: "Debian 12",
      cpu: "1 CPU",
      ram: "4 Go RAM",
      disk: "125 Go SSD",
    },
  ];
}

const templates = fetchTemplates();
</script>
