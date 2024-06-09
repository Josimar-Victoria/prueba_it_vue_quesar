<template>
  <div>
    <div
      class="relative overflow-hidden bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-900 rounded-lg shadow-md"
    >
      <img
        v-if="typeFile === 'image'"
        :src="image"
        :alt="fileName"
        class="w-full h-48 object-cover"
      />
      <div
        v-else
        class="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-zinc-700"
      >
        <p class="text-lg font-semibold text-red-400">File</p>
      </div>
      <div class="p-8 flex flex-col items-center">
        <!-- Texto Fijado -->
        <p v-if="fixed" class="text-green-500 font-bold">Fijado</p>
        <h3 class="text-lg font-semibold text-red-400 mb-8">
          {{ fileName }}
        </h3>
      </div>
      <hr className="bg-red-400" />
      <div
        class="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-800 p-2 flex justify-between"
      >
        <button
          @click="openModal()"
          class="text-white rounded-full p-1 hover:bg-blue-900 bg-blue-500"
        >
          <img src="/public/List.svg" alt="open modal" title="Open Modal" />
        </button>

        <button
          @click="handleDelete(docUid, fixed)"
          class="text-white rounded-full hover:bg-blue-900 bg-blue-500"
        >
          <img
            src="/public/Bin bounce.svg"
            alt="eliminar"
            title="Eliminar Archive"
          />
        </button>
        <!-- Botón de Editar -->
        <router-link
          :to="`/form/${docUid}`"
          class="text-white rounded-full p-1 hover:bg-blue-900 bg-blue-500"
        >
          <img
            src="/public/Plus.svg"
            alt="Editar archive"
            title="Editar Archive"
          />
        </router-link>

        <button
          @click="toggleFixed(docUid, fixed)"
          :class="
            fixed
              ? 'text-white rounded-full  hover:bg-green-500 bg-green-400'
              : 'text-white rounded-full hover:bg-blue-900 bg-blue-500'
          "
        >
          <img
            src="/public/Pin.svg"
            alt="fixed archive"
            title="Fijar Archive"
          />
        </button>
      </div>
      <AlertModal
        v-if="showAlert"
        message="No se puede eliminar porque este archivo está fijado"
        @close="showAlert = false"
      />

      <!-- Modal de Detalles del Archivo -->
      <ModalDetails
        v-if="modalOpen"
        :typeFile="typeFile"
        :image="image"
        :fileName="fileName"
        :firstName="firstName"
        :lastName="lastName"
        :fixed="fixed"
        :identificationNumber="identificationNumber"
        :generatedNumber="generatedNumber"
        :pageCount="pageCount"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFileStore } from "../stores/files";
import AlertModal from "../components/AlertModal.vue";
import ModalDetails from "./ModalDetails.vue";

const fileStore = useFileStore();
const showAlert = ref(false); // Para controlar la visualización de la alerta
const modalOpen = ref(false);

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const deleteFile = async (id) => {
  try {
    await fileStore.deleteFile(id);
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
  }
};

const toggleFixed = async (id, currentFixedState) => {
  try {
    await fileStore.toggleFixed(id, currentFixedState);
    /*     console.log(id, currentFixedState); */
  } catch (error) {
    console.error("Error al cambiar estado de fijación:", error);
  }
};

const handleDelete = (id, fixed) => {
  if (fixed) {
    showAlert.value = true; // Mostrar la alerta si el archivo está fijado
  } else {
    deleteFile(id); // Eliminar el archivo si no está fijado
  }
};
</script>

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
    pageCount: Number,
    identificationNumber: String,
    generatedNumber: String,
  },
};
</script>

<style scoped>
/* Estilos específicos si es necesario */
</style>
