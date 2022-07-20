<template>
  <Box>
    <div class="columns">
        <div class="column is-4">{{tarefa.descricao || 'Tarefa sem descrição'}}</div>
        <div class="column is-3">{{tarefa.projeto?.nome || 'N/D'}}</div>
        <div class="column">
            <CronometroTracker :tempoEmSegundos="tarefa.duracaoEmSegundos" />
        </div>
    </div>
  </Box>
</template>

<script lang="ts">
import iTarefa from '@/interfaces/iTarefa'
import { defineComponent, PropType } from 'vue'
import CronometroTracker from './Cronometro.vue'
import Box from './Box.vue'
export default defineComponent({
    name: 'Tarefa',
    components: { CronometroTracker, Box },
    props: {
        tarefa: {
            type: Object as PropType<iTarefa>,
            required: true
        }
    }
})
</script>