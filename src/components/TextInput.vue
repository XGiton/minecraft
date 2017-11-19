<template>
  <div>
    <p v-if="status === 'read' && value" :ondblclick="onClick">{{ value }}</p>
    <Input
      v-else
      v-model="value"
      :size="size"
      :placeholder="placeholder">
    </Input>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      default: 'edit'
    },
    value: {
      default: ''
    },
    size: {
      default: 'default'
    },
    placeholder: {
      default: ''
    }
  }
}
</script>
