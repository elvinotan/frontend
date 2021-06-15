<template>
  <ECard :label="title" :disabled="disabled" :show="show">
    <slot />

    <span class="w-auto p-2 flex justify-end space-x-5 content-start">
      <EButton
        :id="id + 'Clear'"
        label="Clear"
        :disabled="disabled"
        color="gray"
        :show="true"
        @click="$emit('Clear')"
      />
      <EButton
        :id="id + 'Search'"
        label="Search"
        :disabled="disabled"
        color="green"
        :show="true"
        @click="$emit('Search')"
      />
    </span>
  </ECard>
</template>
<script>
export default {
  name: 'Filter',
  props: {
    id: { type: String, required: true, default: null },
    title: { type: String, required: false, default: 'Please Provide title..' },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
  },
}
</script>
