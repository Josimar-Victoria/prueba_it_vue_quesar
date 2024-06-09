<template>
  <div
    class="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md"
  >
    <h2
      class="text-2xl font-semibold text-zinc-800 mb-6 flex items-center justify-center"
    >
      {{ isEditMode ? "Editar Archivo" : "Crear Nuevo Archivo" }}
    </h2>
    <form @submit.prevent="submitForm">
      <!-- Resto de los campos del formulario -->
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900"
          >Número de documento de identificación</label
        >
        <input
          type="text"
          v-model="identificationNumber"
          class="form-input"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900"
          >Nombre de pila</label
        >
        <input type="text" v-model="firstName" class="form-input" required />
      </div>
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900">Apellido</label>
        <input type="text" v-model="lastName" class="form-input" required />
      </div>
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900"
          >Nombre del archivo</label
        >
        <input type="text" v-model="fileName" class="form-input" required />
      </div>
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900"
          >Cantidad de páginas</label
        >
        <input type="number" v-model="pageCount" class="form-input" required />
      </div>
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900"
          >Número generado automáticamente</label
        >
        <input
          type="text"
          :value="generatedNumber"
          readonly
          class="form-input"
        />
      </div>
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900"
          >Subir Archivo</label
        >
        <input
          type="file"
          @change="handleFileUpload"
          class="form-input"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-zinc-700 dark:text-zinc-900"
          >Fijar archivo</label
        >
        <input type="checkbox" v-model="isFixed" class="form-checkbox" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="submit-button">
          {{ isEditMode ? "Actualizar" : "Crear" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFileStore } from "../stores/files";

const route = useRoute();
const router = useRouter();
const fileStore = useFileStore();

const isEditMode = ref(false);
const fileId = ref(null);
const identificationNumber = ref("");
const firstName = ref("");
const lastName = ref("");
const fileName = ref("");
const pageCount = ref("");
const generatedNumber = ref(Math.random().toString(36).substr(2, 10));
const isFixed = ref(false);
const fileUrl = ref(null);

const handleFileUpload = (event) => {
  fileUrl.value = event.target.files[0];
};

const fetchFileData = async () => {
  if (route.params.id) {
    isEditMode.value = true;
    fileId.value = route.params.id;
    const fileData = await fileStore.getFileById(fileId.value);
    if (fileData) {
      identificationNumber.value = fileData.identificationNumber;
      firstName.value = fileData.firstName;
      lastName.value = fileData.lastName;
      fileName.value = fileData.fileName;
      pageCount.value = fileData.pageCount;
      generatedNumber.value = fileData.generatedNumber;
      isFixed.value = fileData.fixed;
    }
  }
};

const submitForm = async () => {
  const fileData = {
    identificationNumber: identificationNumber.value,
    firstName: firstName.value,
    lastName: lastName.value,
    fileName: fileName.value,
    pageCount: parseInt(pageCount.value),
    generatedNumber: generatedNumber.value,
    fixed: isFixed.value,
  };

  try {
    if (isEditMode.value) {
      await fileStore.sendFile(fileData, fileUrl.value, false, fileId.value);
    } else {
      await fileStore.sendFile(fileData, fileUrl.value, true, "");
    }
    router.push("/");
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
  }
};

onMounted(fetchFileData);
</script>

<style scoped>
.form-input {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db; /* zinc-300 */
  border-radius: 0.375rem;
  outline: none;
  ring: 2px;
  ring-color: #2563eb; /* blue-500 */
  background-color: #f3f4f6; /* zinc-100 */
  color: #1a202c; /* zinc-800 */
}

.form-checkbox {
  margin-top: 0.25rem;
}

.submit-button {
  padding: 0.5rem 1rem;
  background-color: #2563eb; /* blue-500 */
  color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  outline: none;
}

.submit-button:hover {
  background-color: #3b82f6; /* blue-600 */
}
</style>
