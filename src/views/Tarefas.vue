<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="listaEstaVazia">Sem tarefas registradas por enquanto :(</Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import iTarefa from '../interfaces/iTarefa'
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-tarefa';

export default defineComponent({
  name: "Tarefas",
  components: {
    Formulario,
    Tarefa,
    Box
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa(tarefa: iTarefa) {
      this.store.commit(ADICIONA_TAREFA, tarefa);
    }
  },
  setup () {
    const store = useStore()
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>
