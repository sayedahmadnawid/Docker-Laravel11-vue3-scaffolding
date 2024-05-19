<template>
  <div>
    <!-- Static sidebar for desktop -->
    <LeftSideBar />
    <div class="lg:pl-72">
      <!-- Searchbar -->
      <SearchBar />
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <!-- Your content -->
          <router-view :key="$route.path"></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import LeftSideBar from "@/components/layout/LeftsideBar.vue";
import SearchBar from "@/components/layout/SearchBar.vue";
</script>
