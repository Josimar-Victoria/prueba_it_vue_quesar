<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg relative z-10 max-w-sm mx-auto"
    >
      <div class="flex items-center justify-between mb-4">
        <p class="text-lg font-semibold text-red-500">{{ message }}</p>
      </div>
      <div class="flex justify-end">
        <button
          @click="closeAlert"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closeAlert() {
      this.visible = false;
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para el modal */
</style>
