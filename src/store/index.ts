import { iNotificacao } from "@/interfaces/iNotificacao";
import iProjeto from "@/interfaces/iProjeto";
import iTarefa from "@/interfaces/iTarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA } from "./tipo-tarefa";

interface Estado {
    projetos: iProjeto[],
    tarefas: iTarefa[],
    notificacoes: iNotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as iProjeto
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: iProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
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
        [NOTIFICAR](state, novaNotificacao: iNotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id)
            }, 3000)
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}