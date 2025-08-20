<template>
  <v-card variant="tonal" @click="selectTool">
    <v-card-item>
      <div class="d-flex flex-column ga-4">
        <v-card-title>{{ name }}</v-card-title>
        <v-card-text>
          <ul>
            <li><strong>Version : </strong>{{ version }}</li>
            <li>
              <strong>URL de téléchargement : </strong>
              <a :href="props.downloadUrl">{{ downloadUrl }}</a>
            </li>
            <li>
              <strong>Recommandation logiciel : </strong
              >{{ props.softwareRecommendation }}
            </li>
            <li>
              <strong>Recommandation matérielle : </strong>
              <ul style="margin-left: 20px">
                <li><strong>vCPU : </strong>{{ hardwareRequirements.vcpu }}</li>
                <li><strong>RAM : </strong>{{ hardwareRequirements.ram }}</li>
                <li>
                  <strong>Espace disque : </strong
                  >{{ hardwareRequirements.disk }}
                </li>
              </ul>
            </li>
          </ul>
        </v-card-text>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { Tool } from "../../types";

const props = defineProps<Tool>();

const emit = defineEmits(["select"]);

function selectTool() {
  emit("select", { ...props });
}
</script>
