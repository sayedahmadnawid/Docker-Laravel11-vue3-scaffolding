<template>
  <div>
    <!-- Static sidebar for desktop -->
    <LeftSideBar />
    <div class="lg:pl-72">
      <!-- Searchbar -->
      <SearchBar />
      <main class="pt-1">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot name="header"></slot>
          <!-- Your content -->
          <router-view :key="$route.path"></router-view>
          <Notification/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import LeftSideBar from "@/components/layout/LeftsideBar.vue";
import SearchBar from "@/components/layout/SearchBar.vue";
import Notification from "@/components/molecule/notification.vue";
</script>
