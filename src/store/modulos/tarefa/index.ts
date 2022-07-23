import iTarefa from "@/interfaces/iTarefa";
import {Module} from "vuex";
import {Estado} from "@/store";
import {ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA} from "@/store/tipo-tarefa";
import {DEFINIR_TAREFAS} from "@/store/tipo-mutacoes";
import {ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS} from "@/store/tipo-acoes";
import http from "@/http";

export interface EstadoTarefa {
    tarefas: iTarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: iTarefa) {
            tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: iTarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [EXCLUIR_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(t => t.id != id)
        },

        [DEFINIR_TAREFAS](state, tarefas: iTarefa[]) {
            state.tarefas = tarefas
        },
    },
    actions: {
        [OBTER_TAREFAS]({commit}, filtro: string) {
            let url = 'tarefas';

            if (filtro) {
                url += '?descricao=' + filtro
            }

            http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({commit}, tarefa: iTarefa) {
            return http.post('tarefas', tarefa)
                .then((resposta) => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({commit}, tarefa: iTarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        }
    }
}
