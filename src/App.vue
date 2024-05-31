<script setup lang="ts">
import ProgressBar from 'primevue/progressbar'
import { useLoadingStore } from '@/stores/loading.store'
const loadingStore = useLoadingStore()
</script>

<template>
  <ProgressBar
    v-show="loadingStore.isLoading"
    class="cr-progressbar"
    mode="indeterminate"
  ></ProgressBar>
  <RouterView />
</template>

<style scoped lang="scss">
.cr-progressbar {
  position: absolute;
  width: 100%;
  height: 3px;
  top: 0;
  left: 0;
}
</style>
