<template>
  <v-card variant="tonal" class="ma-2" @click="selectTemplate">
    <v-card-item>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle>{{ description }}</v-card-subtitle>
    </v-card-item>
    <v-card-item>
      <v-card-text>
        <ul>
          <li>OS: {{ os }}</li>
          <li>Version: {{ version }}</li>
          <li>Ram: {{ ram }}</li>
          <li>CPU: {{ cpu }}</li>
          <li>Disque: {{ disk }}</li>
        </ul>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { VMTemplate } from "../../types";

const props = defineProps<VMTemplate>();

const emit = defineEmits(["select"]);

function selectTemplate() {
  emit("select", { ...props });
}
</script>
