<template>
  <div
    class="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900"
  >
    <div
      class="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
    >
      <h2 class="text-2xl font-bold mb-6 text-zinc-900">Register</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-zinc-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Email"
            class="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-700 dark:text-zinc-300"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-zinc-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
            class="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-700 dark:text-zinc-300"
          />
        </div>
        <div class="mb-2" v-if="authStore.error">
          <span class="text-red-500">{{ authStore.error }}</span>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
          <router-link to="/login">login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  await authStore.register(email.value, password.value);
  if (!authStore.error) {
    router.push("/");
  } else {
    console.error(authStore.error);
  }
};
</script>

<style>
.mt-1 {
  margin-top: 0.25rem;
}
.block {
  display: block;
}
.w-full {
  width: 100%;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.border {
  border-width: 1px;
}
.border-zinc-300 {
  border-color: #d1d5db;
}
.dark\:border-zinc-600 {
  border-color: #4b5563;
}
.rounded-md {
  border-radius: 0.375rem;
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.focus\:outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:ring-indigo-500 {
  --tw-ring-color: #6366f1;
}
.focus\:border-indigo-500 {
  border-color: #6366f1;
}
.dark\:bg-zinc-700 {
  background-color: #374151;
}
.dark\:text-zinc-300 {
  color: #d1d5db;
}
.bg-indigo-500 {
  background-color: #6366f1;
}
.text-white {
  color: #ffffff;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.hover\:bg-indigo-600:hover {
  background-color: #4f46e5;
}
.focus\:outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:ring-2 {
  box-shadow: 0 0 0 2px var(--tw-ring-color);
}
.focus\:ring-offset-2 {
  box-shadow: 0 0 0 calc(2px + 1px) var(--tw-ring-offset-color, #ffffff);
}
.focus\:ring-indigo-500 {
  --tw-ring-color: #6366f1;
}
</style>
