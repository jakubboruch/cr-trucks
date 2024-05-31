import { ValidationRuleCollection } from '@vuelidate/core'

interface FormField {
  name?: string,
  label?: string,
  rule?: ValidationRuleCollection,
  type?: string,
  disabled?: boolean
}
export { FormField }