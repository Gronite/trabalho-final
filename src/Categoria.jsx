import React, { useState } from 'react';
import axios from 'axios';

const Categoria = ({
  categorias,
  setCategorias,
  setCategoriasVisiveis,
  categoriasVisiveis,
  tarefas,
  setTarefas,
}) => {
  const [novaCategoria, setNovaCategoria] = useState('');
  const [editando, setEditando] = useState({
    ativa: false,
    index: null,
    valor: '',
  });

  const adicionarCategoria = async () => {
    if (
      novaCategoria.trim() !== '' &&
      novaCategoria.trim().length <= 40 &&
      !categorias.map((cat) => cat.nome).includes(novaCategoria)
    ) {
        const response = await axios.post(
          'http://localhost:5144/api/Categorias',
          { nome: novaCategoria.trim() },
        );
        setCategorias([response.data, ...categorias]);
        setNovaCategoria('');
    } else {
      alert(
        'Você só pode adicionar uma categoria com no máximo 40 caracteres e não pode existir uma igual',
      );
    }
  };

  const excluirCategoria = async (index) => {
    const categoriaExcluida = categorias[index];
      await axios.delete(
        `http://localhost:5144/api/Categorias/${categoriaExcluida.id}`,
      );
      const novasCategorias = categorias.filter((categoria, i) => i !== index);
      setCategorias(novasCategorias);

      const novaListaTarefas = tarefas.map((tarefa) =>
        tarefa.categoriaId === categoriaExcluida.id
          ? { ...tarefa, categoria: 'FOI EXCLUÍDA' }
          : tarefa,
      );
      setTarefas(novaListaTarefas);
  };

  const iniciarEdicao = (index, categoria) => {
    setEditando({ ativa: true, index, valor: categoria.nome });
  };

  const salvarEdicao = async () => {
    const categoriaAntiga = categorias[editando.index];
    const categoriaNova = editando.valor;
      await axios.put(
        `http://localhost:5144/api/Categorias/${categoriaAntiga.id}`,
        { ...categoriaAntiga, nome: categoriaNova },
      );
      const novasCategorias = [...categorias];
      novasCategorias[editando.index] = {
        ...categoriaAntiga,
        nome: categoriaNova,
      };
      setCategorias(novasCategorias);

      const novaListaTarefas = tarefas.map((tarefa) =>
        tarefa.categoriaId === categoriaAntiga.id
          ? { ...tarefa, categoria: categoriaNova }
          : tarefa,
      );
      setTarefas(novaListaTarefas);

      setEditando({ ativa: false, index: null, valor: '' });
  };

  const cancelarEdicao = () => {
    setEditando({ ativa: false, index: null, valor: '' });
  };

  return (
    <div className="categoria">
      <button onClick={() => setCategoriasVisiveis(!categoriasVisiveis)}>
        {categoriasVisiveis
          ? 'Ocultar Categorias Adicionadas'
          : 'Mostrar/Adicionar Categorias'}
      </button>
      {categoriasVisiveis && (
        <div className="lista-categorias">
          <div className="lista">
            <h2 className="titulos">Lista de Categorias</h2>
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Digite a nova categoria :D"
            />
            <button className="botao" onClick={adicionarCategoria}>
              Adicionar Categoria
            </button>
            <ul>
              {categorias
                .filter((categoria) => !categoria.excluido)
                .map((categoria, index) => (
                  <li key={index} className="itemlista">
                    {editando.ativa && editando.index === index ? (
                      <div className="botao2">
                        <input
                          type="text"
                          value={editando.valor}
                          onChange={(e) =>
                            setEditando({ ...editando, valor: e.target.value })
                          }
                        />
                        <div className="botoes">
                          <button onClick={salvarEdicao}>Salvar Edição</button>
                          <button onClick={cancelarEdicao}>Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <div className="botao2">
                        {categoria.nome}
                        <div className="botoes">
                          <button
                            onClick={() => iniciarEdicao(index, categoria)}
                          >
                            Editar
                          </button>
                          <button onClick={() => excluirCategoria(index)}>
                            Excluir
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categoria;
