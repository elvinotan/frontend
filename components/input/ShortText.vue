<template>
  <div>
    {{ label }}
    <input :id="id" :ref="id" type="text" :maxlength="maxlength" />
  </div>
</template>
<script>
export default {
  name: 'ShortText',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: false, default: '' },
    maxlength: { type: Number, required: false, default: 10 },
  },
}
</script>
