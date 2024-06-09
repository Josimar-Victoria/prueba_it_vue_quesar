<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="modal-container bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg relative z-50 max-w-sm mx-auto overflow-y-auto"
    >
      <div class="modal-header flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Detalles del Archivo
        </h3>
        <button
          @click="closeModal()"
          class="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >N° De Identificacion:</label
          >
          <p class="text-lg font-semibold text-gray-900">
            {{ identificationNumber }}
          </p>
        </div>

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Nombre del Archivo:</label
          >
          <p class="text-lg font-semibold text-gray-900">
            {{ fileName }}
          </p>
        </div>
        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Nombre:</label
          >
          <p class="text-lg font-semibold text-gray-900">
            {{ firstName }} {{ lastName }}
          </p>
        </div>
        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >N° generado automáticamente:</label
          >
          <p class="text-lg font-semibold text-gray-900">
            {{ generatedNumber }}
          </p>
        </div>

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Tipo:</label
          >
          <img
            v-if="typeFile === 'image'"
            :src="image"
            :alt="fileName"
            class="w-full h-auto object-cover"
          />
          <div
            v-else
            class="w-full h-15 flex items-center justify-center bg-gray-100 dark:bg-zinc-700"
          >
            <p class="text-lg font-semibold text-red-400">File</p>
          </div>
        </div>
        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >N° De Page:</label
          >
          <p class="text-lg font-semibold text-gray-900">
            {{ pageCount }}
          </p>
        </div>
        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Estado de Fijación:</label
          >
          <p
            class="text-lg font-semibold"
            :class="fixed ? 'text-green-500' : 'text-red-500'"
          >
            {{ fixed ? "Fijado" : "No fijado" }}
          </p>
        </div>
        <!-- Puedes agregar más detalles aquí según tus necesidades -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    typeFile: String,
    image: String,
    alt: String,
    fileName: String,
    firstName: String,
    lastName: String,
    id: String,
    docUid: String,
    fixed: Boolean,
    identificationNumber: String,
    generatedNumber: String,
    pageCount: Number,
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closeModal() {
      this.visible = false;
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para el modal */
</style>
