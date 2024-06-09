<template>
  <button
    class="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 border bg-blue-500 flex flex-col items-center"
    @click="handleButtonClick"
  >
    <q-icon :name="icon" class="w-10" />
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    // Propiedad para la ruta de navegación
    route: String,
  },
  methods: {
    handleButtonClick() {
      // Verifica si hay una ruta definida
      if (this.route) {
        // Realiza la navegación a la ruta especificada
        this.$router.push(this.route);
      } else {
        // Realiza otra acción si no hay ruta definida
        console.log(
          `Botón "${this.text}" clicado pero no tiene una ruta definida.`
        );
      }
    },
  },
};
</script>
