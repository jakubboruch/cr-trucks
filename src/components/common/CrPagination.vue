<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults, watch } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { usePagination } from '@/composables/usePagination'

const props = withDefaults(
    defineProps<{
      totalItems: number;
      page: number;
    }>(),
    {
      totalItems: 0,
      page: 1,
    }
);

const emit = defineEmits([
  'update:items-per-page',
  'update:page'
]);

const { setTotalItems, numberOfPages, setIPPToLS, itemsPerPage, countOfItemsPerPage } = usePagination();
setTotalItems(props.totalItems);

const isFirst = computed(() => props.page <= 1);
const isLast =  computed(() => props.page >= numberOfPages.value);

const onItemsPerPageChange = (newValue: number) => {
  itemsPerPage.value = newValue
  setIPPToLS(newValue);
  emit('update:items-per-page', newValue);
  emit('update:page', 1);
}

const onCurrentPageValueInputChange = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  const nextPage = Number(target.value);
  if ((nextPage < 1) || (nextPage > numberOfPages.value)) {
    return;
  }
  jumpToPage(nextPage);
}
const jumpToPage = (newPage: number) => {
  emit('update:page', newPage);
}
watch(
    () => props.totalItems,
    () => {
      setTotalItems(props.totalItems)
    });

</script>
<template>
  <div class="flex justify-content-between">
    <span class="flex gap-2 align-items-center">
      <Dropdown :model-value="itemsPerPage" @update:model-value="onItemsPerPageChange" :options="countOfItemsPerPage"></Dropdown>
    </span>
    <span>
      <InputText
        :model-value="String(page)"
        class="jump-to-page"
        @keyup.enter="onCurrentPageValueInputChange"
        @blur="onCurrentPageValueInputChange"
    /> / {{ numberOfPages }}
    </span>
    <div class="flex align-items-center gap-3">
      <div class="flex gap-1">
        <Button icon="pi pi-angle-left" text rounded aria-label="Go Back" :disabled="isFirst" @click="jumpToPage(page - 1)" />
        <Button icon="pi pi-angle-right" text rounded aria-label="Go Next" :disabled="isLast" @click="jumpToPage(page + 1)" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .jump-to-page {
    width: 50px;
    text-align: center;
  }
</style>