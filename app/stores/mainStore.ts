import { defineStore } from "pinia";
import type {
  Tool,
  VMTemplate,
} from "~/components/feature/create-vm-form/types";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    selectedGabarit: {
      name: undefined,
      description: undefined,
      os: undefined,
      version: undefined,
      ram: undefined,
      cpu: undefined,
      disk: undefined,
    } as VMTemplate,
    isTemplate: false,
    toolsAdded: [] as Tool[],
  }),
  actions: {
    setSelectGabarit(gabarit: VMTemplate) {
      this.selectedGabarit = { ...gabarit }; // à cause d'un problème de référence
    },
    setTemplate(gabarit: VMTemplate) {
      this.isTemplate = true;
      this.setSelectGabarit(gabarit);
    },
    addTool(tool: Tool) {
      this.toolsAdded.push(tool);
    },
    removeTool(id: string) {
      const index = this.toolsAdded.findIndex((tool) => tool.id === id);
      delete this.toolsAdded[index];
    },
  },
});
