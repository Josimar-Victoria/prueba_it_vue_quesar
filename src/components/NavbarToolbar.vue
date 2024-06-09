<template>
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center space-x-2">
      <ToolbarButton icon="code" text="New Archive" route="/form" />
      <!--       <ToolbarButton icon="https://placehold.co/20x20" text="Cut" />
      <ToolbarButton icon="https://placehold.co/20x20" text="Copy" />
      <ToolbarButton icon="https://placehold.co/20x20" text="Paste" />
      <ToolbarButton icon="https://placehold.co/20x20" text="Delete" />
      <ToolbarButton icon="https://placehold.co/20x20" text="Info" /> -->
    </div>
    <!--    <div class="flex items-center space-x-2">
      <ToolbarButton icon="https://placehold.co/20x20" text="View" />
      <ToolbarButton icon="https://placehold.co/20x20" text="Sort" />
      <ToolbarButton icon="https://placehold.co/20x20" text="Options" />
    </div> -->
  </div>
</template>

<script>
import ToolbarButton from "./ToolbarButton.vue";

export default {
  components: {
    ToolbarButton,
  },
};
</script>
