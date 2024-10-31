import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icon from './assets/icon.png';

function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])

    function adicionaItem(form) {
        form.preventDefault()/**PARA NÃO REATUALIZAR A PÁGINA*/;
        if (!novoItem) {/**QUANDO O ITEM ESTÁ VAZIO, NÃO ACONTECE NADA*/
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false }])/*Copiando o que tem na lista e atualizando com o novo item*/;
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo() {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }/**GRAVANDO AS INFORMAÇÕES*/}
                    placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas"/**className para dizer que a classe usada é do css*/>
                <div style={{ textAlign: 'center' }}>
                    {/**Valição. VERIFICANDO O TAMANHO*/
                        lista.length < 1
                            ?
                            <img className="icone-central" src={Icon} />
                            :
                            lista.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.isCompleted ? "item completo" : "item"}
                                >
                                    <span onClick={() => { clicou(index) }}>{item.text}</span>
                                    <button onClick={() => { deleta(index) }} className="del">Deletar</button>
                                </div>
                            ))

                    }
                    {
                        lista.length > 0 &&
                        <button onClick={() => { deletaTudo() }} className="deleteAll">Deletar Todas</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default TodoList;