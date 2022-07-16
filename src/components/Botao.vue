<template>
  <button
    class="button"
    @click="clicked"
    :disabled="isDisabled"
  >
        <span class="icon">
            <i :class="icon"></i>
        </span>
        <span>{{name}}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Botao',
    emits: ['clicked'],
    props: {
        name: {
            type: String,
            default: ''
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: 'fa-stop'
        }
    },
    methods: {
        clicked () : void {
            this.$emit('clicked')
        }
    }
})
</script>

<style>

</style>