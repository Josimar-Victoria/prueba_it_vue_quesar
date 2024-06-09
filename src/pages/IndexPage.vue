<template>
  <q-page padding>
    <div class="p-4">
      <!-- Toolbar -->
      <NavbarToolbar />

      <!-- Items Grid -->
      <ItemsGrid />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import NavbarToolbar from "../components/NavbarToolbar.vue";
import ItemsGrid from "../components/ItemsGrid.vue";

const router = useRouter();

const Uid = localStorage.getItem("uid");

if (Uid === undefined || Uid === null) {
  router.push("/login");
  console.log(Uid, "Porfavor to login ");
}

defineOptions({
  name: "IndexPage",
});
</script>

<script setup></script>
