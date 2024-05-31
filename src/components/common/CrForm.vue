<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { defineProps, defineEmits, withDefaults, computed, watch } from 'vue'
import type { Ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import type { Validation, ValidationRuleCollection } from '@vuelidate/core'
import type { FormField } from '@/interfaces/form'

const props = withDefaults(
  defineProps<{
    fields: any
    state: Record<string, unknown>
    label: string
    actionLabel: string
  }>(),
  {
    fields: () => ({}),
    label: '',
    actionLabel: 'Create'
  }
)

const rules = computed(() => {
  return props.fields.reduce((acc: Record<string, ValidationRuleCollection>, curr: FormField) => {
    if (curr.name === undefined || curr.rule === undefined) {
      return acc;
    }
    acc[curr.name] = curr.rule
    return acc
  }, {})
})

let v$: Ref<Validation> = useVuelidate(rules, props.state)

const emit = defineEmits(['action'])

const onAction = async () => {
  console.log(v$)
  const isValid = await v$.value.$validate()
  if (!isValid) {
    return
  }
  emit('action')
}

watch(
  () => props.state,
  () => {
    v$ = useVuelidate(rules, props.state)
  }
)
</script>

<template>
  <form class="flex flex-column gap-3 max-w-30rem mx-auto">
    <header class="flex justify-content-between">
      <h1>
        <slot name="beforeTitle"></slot><span>{{ label }}</span>
      </h1>
    </header>
    <div v-for="field in fields" :key="field.name" class="flex flex-column gap-1">
      <label :for="field.name">{{ field.label }}</label>
      <InputText
        v-if="field.type === 'InputText'"
        :id="field.name"
        type="text"
        v-model="v$[field.name].$model"
        :disabled="field.disabled"
      />
      <Textarea
        v-if="field.type === 'Textarea'"
        :id="field.name"
        type="text"
        v-model="v$[field.name].$model"
        :disabled="field.disabled"
      />
      <Dropdown
        v-if="field.type === 'Dropdown'"
        :id="field.name"
        v-model="v$[field.name].$model"
        :options="field.options"
        :option-label="'label'"
        :option-value="'value'"
        :option-disabled="'disabled'"
      ></Dropdown>
      <div>
        <span class="error" v-for="error in v$[field.name].$errors" :key="error">{{
          error.$message
        }}</span>
      </div>
    </div>
    <div class="flex justify-content-end">
      <Button rounded @click="onAction">{{ actionLabel }}</Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.error {
  font-size: 0.8em;
  font-weight: 600;
  color: var(--red-700);
}
</style>
