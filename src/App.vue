<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
    <div class="column is-one-quarter">
        <BarraLateral @ao-tema-alterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
        <Formulario @ao-salvar-tarefa="salvarTarefa"/>
        <div class="lista">
          <Tarefa
            v-for="(tarefa, index) in tarefas"
            :key="index" :tarefa="tarefa"
          />
        <Box v-if="listaEstaVazia">Sem tarefas registradas por enquanto :(</Box>
        </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import iTarefa from './interfaces/iTarefa'
import Box from './components/Box.vue';

export default defineComponent({
    name: "App",
    components: { BarraLateral, Formulario, Tarefa, Box },
    data () {
      return {
        tarefas: [] as iTarefa[],
        modoEscuroAtivo: false
      }
    },
    computed: {
      listaEstaVazia () : boolean {
        return this.tarefas.length === 0;
      }
    },
    methods: {
      salvarTarefa (tarefa: iTarefa) {
        this.tarefas.push(tarefa);
      },
      trocarTema (modoEscuroAtivo: boolean) {
        this.modoEscuroAtivo = modoEscuroAtivo;
      }
    }
});
</script>

<style>
  .lista {
    padding: 1.25rem;
  }
  main {
    --bg-primario: #fff;
    --texto-primario: #444;
  }
  main.modo-escuro {
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
  }
  .conteudo {
    background-color: var(--bg-primario);
  }
</style>
