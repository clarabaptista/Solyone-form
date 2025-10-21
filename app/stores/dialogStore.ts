import { defineStore } from "pinia";

export const useDialog = defineStore("dialog", {
  state: () => ({
    selectedDialog: null as string | null,
    isDialogOpen: false,
  }),
  actions: {
    setDialogId(dialogId: string) {
      this.selectedDialog = dialogId;
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
});
