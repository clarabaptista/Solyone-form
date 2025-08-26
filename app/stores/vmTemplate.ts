import { defineStore } from "pinia";
import type { VMTemplate } from "~/components/feature/create-vm-form/types";

export const useVmTemplateStore = defineStore("vmTemplate", {
  state: () => ({
    selectedVmTemplate: null as VMTemplate | null,
  }),
  actions: {
    selectVmTemplate(template: VMTemplate) {
      this.selectedVmTemplate = template;
    },
    clearVmTemplate() {
      this.selectedVmTemplate = null;
    },
  },
});
