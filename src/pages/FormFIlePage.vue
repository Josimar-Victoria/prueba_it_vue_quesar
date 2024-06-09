<template>
  <q-page class="">
    <div>
      <FileForm />
    </div>
  </q-page>
</template>

<script setup>
import FileForm from "components/FileForm.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const Uid = localStorage.getItem("uid");

if (Uid === undefined || Uid === null) {
  router.push("/login");
  console.log(Uid, "Porfavor to login ");
}
</script>

<script>
export default {
  components: {
    FileForm,
  },
};
</script>
