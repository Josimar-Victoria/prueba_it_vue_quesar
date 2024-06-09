<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <ItemCard
      v-for="file in files"
      :key="file.id"
      :image="file.urlFile"
      :typeFile="file.typeFile"
      :alt="file.firstName"
      :firstName="file.firstName"
      :lastName="file.lastName"
      :fileName="file.fileName"
      :docUid="file.id"
      :fixed="file.fixed"
      :identificationNumber="file.identificationNumber"
      :generatedNumber="file.generatedNumber"
      :pageCount="file.pageCount"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useFileStore } from "../stores/files";
import ItemCard from "./ItemCard.vue";

const fileStore = useFileStore();

// Llamar al método fetchFiles() para cargar los datos al montar el componente
onMounted(() => {
  fileStore.fetchFiles();
});

// Computed para que 'files' sea reactivo
const files = computed(() => fileStore.files);
</script>
