import React, { useState, useEffect } from 'react';
import Comentarios from './Comentarios';
import axios from 'axios';

const Tarefa = ({ categorias, usuarios }) => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoUsuario, setNovoUsuario] = useState('');
  const [comentariosVisiveis, setComentariosVisiveis] = useState([]);
  const [tarefasVisiveis, setTarefasVisiveis] = useState(false);
  const [comentariosTarefa, setComentariosTarefa] = useState([]);
  const [edicaoAtiva, setEdicaoAtiva] = useState({
    ativa: false,
    index: null,
    valor: '',
  });

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const response = await axios.get('http://localhost:5144/api/Tarefas');
        const tarefasData = response.data.reverse();
        setTarefas(tarefasData);
        setComentariosVisiveis(new Array(tarefasData.length).fill(false));

        const comentarios = tarefasData.map(
          (tarefa) => tarefa.comentarios || [],
        );
        setComentariosTarefa(comentarios);
      } catch (error) {
        console.error(
          'Erro ao carregar tarefas:',
          error.response?.data || error.message,
        );
      }
    };
    carregarTarefas();
  }, []);

  const adicionarTarefa = async () => {
    if (
      novaTarefa.trim() !== '' &&
      categorias.some(
        (categoria) => categoria.nome === novaCategoria && !categoria.excluido,
      ) &&
      usuarios.some(
        (usuario) => usuario.nome === novoUsuario && !usuario.excluido,
      )
    ) {
      try {
        const categoriaSelecionada = categorias.find(
          (categoria) => categoria.nome === novaCategoria,
        );
        const usuarioSelecionado = usuarios.find(
          (usuario) => usuario.nome === novoUsuario,
        );

        if (!categoriaSelecionada || !usuarioSelecionado) {
          alert('Categoria ou usuário não encontrado!');
          return;
        }

        const response = await axios.post('http://localhost:5144/api/Tarefas', {
          descricao: novaTarefa,
          categoriaId: categoriaSelecionada.id,
          usuarioId: usuarioSelecionado.id,
          comentarios: [],
        });
        setTarefas([response.data, ...tarefas]);
        setNovaTarefa('');
        setNovaCategoria('');
        setNovoUsuario('');
        setComentariosVisiveis([false, ...comentariosVisiveis]);
        setComentariosTarefa([[], ...comentariosTarefa]);
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    } else {
      alert(
        'Categoria ou usuário inexistente ou marcado como excluído [Verifique a caixa-alta]',
      );
    }
  };

  const editarTarefa = (index) => {
    setEdicaoAtiva({ ativa: true, index, valor: tarefas[index].descricao });
  };

  const salvarEdicaoTarefa = async () => {
    const tarefaAntiga = tarefas[edicaoAtiva.index];
    const descricaoNova = edicaoAtiva.valor;

    try {
      await axios.put(`http://localhost:5144/api/Tarefas/${tarefaAntiga.id}`, {
        ...tarefaAntiga,
        descricao: descricaoNova,
      });

      const novasTarefas = [...tarefas];
      novasTarefas[edicaoAtiva.index] = {
        ...tarefaAntiga,
        descricao: descricaoNova,
      };
      setTarefas(novasTarefas);

      cancelarEdicaoTarefa();
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  const cancelarEdicaoTarefa = () => {
    setEdicaoAtiva({ ativa: false, index: null, valor: '' });
  };

  const excluirTarefa = async (index) => {
    const tarefaId = tarefas[index].id;

    try {
      await axios.delete(`http://localhost:5144/api/Tarefas/${tarefaId}`);
      const novasTarefas = tarefas.filter((_, i) => i !== index);
      setTarefas(novasTarefas);
      const novosComentariosTarefa = comentariosTarefa.filter(
        (_, i) => i !== index,
      );
      setComentariosTarefa(novosComentariosTarefa);
      const novosComentariosVisiveis = comentariosVisiveis.filter(
        (_, i) => i !== index,
      );
      setComentariosVisiveis(novosComentariosVisiveis);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <div className="adiciona">
      <h1 className="titulos">📋 Adicionar Tarefa</h1>
      <div className="div-tarefa">
        <div className="input-das-tarefas">
          <textarea
            className="text-area"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Descrição da Tarefa"
          />
          <input
            className="tarefa-input"
            type="text"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            placeholder="Categoria Existente"
          />
          <input
            className="tarefa-input"
            type="text"
            value={novoUsuario}
            onChange={(e) => setNovoUsuario(e.target.value)}
            placeholder="Usuario Existente"
          />
        </div>
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      </div>

      <button onClick={() => setTarefasVisiveis(!tarefasVisiveis)}>
        {tarefasVisiveis
          ? 'Ocultar Tarefas Adicionadas'
          : 'Mostrar Tarefas Adicionadas'}
      </button>

      {tarefasVisiveis && (
        <div id="mostrarTarefas">
          {tarefas.map((tarefa, index) => (
            <div key={tarefa.id} className="itemlista">
              {edicaoAtiva.ativa && edicaoAtiva.index === index ? (
                <div className="editando-tarefa">
                  <textarea
                    className="text-area"
                    value={edicaoAtiva.valor}
                    onChange={(e) =>
                      setEdicaoAtiva({ ...edicaoAtiva, valor: e.target.value })
                    }
                  />
                  <div className="button-editando-tarefa">
                    <button onClick={salvarEdicaoTarefa}>Salvar Edição</button>
                    <button onClick={cancelarEdicaoTarefa}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>{tarefa.descricao}</h3>
                  <p>
                    <strong>Categoria:</strong>{' '}
                    {tarefa.categoriaId
                      ? categorias.find(
                          (categoria) => categoria.id === tarefa.categoriaId,
                        )?.nome || 'FOI EXCLUÍDA'
                      : ''}
                  </p>
                  <p>
                    <strong>Usuário:</strong>{' '}
                    {tarefa.usuarioId
                      ? usuarios.find(
                          (usuario) => usuario.id === tarefa.usuarioId,
                        )?.nome || 'FOI EXCLUÍDO'
                      : ''}
                  </p>
                  <div className="botao">
                    <button onClick={() => editarTarefa(index)}>Editar</button>
                    <button onClick={() => excluirTarefa(index)}>
                      Excluir
                    </button>
                    <button
                      onClick={() =>
                        setComentariosVisiveis((prevState) =>
                          prevState.map((visivel, i) =>
                            i === index ? !visivel : visivel,
                          ),
                        )
                      }
                    >
                      {comentariosVisiveis[index]
                        ? 'Ocultar Comentários'
                        : 'Mostrar Comentários'}
                    </button>
                  </div>
                  {comentariosVisiveis[index] && (
                    <Comentarios
                      comentarios={comentariosTarefa[index] || []}
                      tarefaIndex={index}
                      tarefas={tarefas}
                      usuarios={usuarios}
                      setComentariosVisiveis={(visivel) =>
                        setComentariosVisiveis((prevState) =>
                          prevState.map((v, i) => (i === index ? visivel : v)),
                        )
                      }
                      setComentarios={(novosComentarios) => {
                        const novosComentariosTarefa = [...comentariosTarefa];
                        novosComentariosTarefa[index] = novosComentarios;
                        setComentariosTarefa(novosComentariosTarefa);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tarefa;
