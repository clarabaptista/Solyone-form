import { defineStore } from "pinia";
import type { Tool } from "~/components/feature/create-vm-form/types";

export const useToolStore = defineStore("searchTool", {
  state: () => ({
    selectedTool: null as Tool | null,
  }),
  actions: {
    getSelectTool(tool: Tool) {
      this.selectedTool = tool;
    },
    clearTool() {
      this.selectedTool = null;
    },
  },
});
