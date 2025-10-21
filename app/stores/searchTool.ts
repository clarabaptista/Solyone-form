import { defineStore } from "pinia";
import type { Tool } from "~/components/feature/create-vm-form/types";

export const useToolStore = defineStore("searchTool", {
  state: () => ({
    selectedTool: null as Tool | null,
    researchedTool: null as string | null,
  }),
  actions: {
    setSelectTool(tool: Tool) {
      this.selectedTool = tool;
    },
    clearTool() {
      this.selectedTool = null;
    },
    setResearchedTool(tool: string) {
      this.researchedTool = tool;
    }
  },
});
