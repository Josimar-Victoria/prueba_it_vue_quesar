<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-btn
          class="bg-blue-500 text-white ml-12 mt-4"
          flat
          label="Cerrar perfil"
          @click="logout()"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth"; // Asegúrate de importar tu store de autenticación

const router = useRouter();
const authStore = useAuthStore();

defineOptions({
  name: "MainLayout",
});

const navigateTo = (path) => {
  router.push(path);
};

const logout = () => {
  authStore.logout(); // Llama al método logout de tu store de autenticación
  router.push("/login"); // Redirige al usuario a la página de inicio de sesión
};

const linksList = [
  {
    title: "Home",
    caption: "Lista de Archivos",
    icon: "school",
    link: "http://localhost:9000/#/",
  },
  {
    title: "create archive",
    caption: "Formulario Para Arear Archivos",
    icon: "code",
    link: "http://localhost:9000/#/form",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
