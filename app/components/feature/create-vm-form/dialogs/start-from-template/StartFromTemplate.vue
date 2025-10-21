<!-- VmTemplatesRecommendation.vue -->

<!-- Faire une card / div + bouton "Sélectionner un gabarit"
    - La formule "Essentiel"
    - Notifier qu'il y en a 2 avec le chiffre 2 à droite si possible
    - Proposer 2 gabarits :
        - (icône) Windows 10
        - (icône) Debian 12 (/!\ sans interface graphique)
    - Une fois sélectionner, on a chaque caractéristique sous forme de badges / tags
        - OS
        - CPU
        - RAM
        - SSD
-->

<!-- Une card avec 2 div -->

<template>
  <v-card @click="selectTemplate">
    <v-card-item>
      <div>
        <v-card-text>
          <v-col>
            {{ props.os }} \ {{ props.cpu }} \ {{ props.ram }} \
            {{ props.disk }}
          </v-col>
        </v-card-text>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/mainStore";
import type { VMTemplate } from "../../types";
import { useDialog } from "~/stores/dialogStore";

const props = defineProps<VMTemplate>();
const mainStore = useMainStore();
const dialogStore = useDialog();

function selectTemplate() {
  mainStore.setTemplate(props);
  dialogStore.closeDialog();
}

</script>
