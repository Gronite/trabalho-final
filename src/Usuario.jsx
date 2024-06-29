import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Usuario = ({
  usuarios,
  setUsuarios,
  setUsuariosVisiveis,
  usuariosVisiveis,
  tarefas,
  setTarefas,
}) => {
  const [novoUsuario, setNovoUsuario] = useState('');
  const [editando, setEditando] = useState({
    ativa: false,
    index: null,
    valor: '',
  });

  const carregarUsuarios = useCallback(async () => {
      const response = await axios.get('http://localhost:5144/api/Usuarios');
      setUsuarios(response.data);
  }, [setUsuarios]);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const adicionarUsuario = async () => {
    if (
      novoUsuario.trim() !== '' &&
      novoUsuario.trim().length <= 15 &&
      !usuarios.map((u) => u.nome).includes(novoUsuario)
    ) {
        const response = await axios.post(
          'http://localhost:5144/api/Usuarios',
          {
            nome: novoUsuario,
          },
        );
        setUsuarios([response.data, ...usuarios]);
        setNovoUsuario('');
    } else {
      alert(
        'Você só pode adicionar um usuário com no máximo 15 caracteres e não pode existir um igual',
      );
    }
  };

  const excluirUsuario = async (index) => {
    const usuarioExcluido = usuarios[index];
      await axios.delete(
        `http://localhost:5144/api/Usuarios/${usuarioExcluido.id}`,
      );
      setUsuarios(usuarios.filter((_, i) => i !== index));

      const novaListaTarefas = tarefas.map((tarefa) => {
        const novaTarefa =
          tarefa.usuarioId === usuarioExcluido.id
            ? { ...tarefa, usuario: 'FOI EXCLUÍDO' }
            : tarefa;

        const novosComentarios = tarefa.comentarios.map((comentario) =>
          comentario.usuarioId === usuarioExcluido.id
            ? { ...comentario, usuario: 'FOI EXCLUÍDO' }
            : comentario,
        );

        return { ...novaTarefa, comentarios: novosComentarios };
      });

      setTarefas(novaListaTarefas);
  };

  const iniciarEdicao = (index, usuario) => {
    setEditando({ ativa: true, index, valor: usuario });
  };

  const salvarEdicao = async () => {
    const usuarioAntigo = usuarios[editando.index];
    const usuarioNovo = editando.valor;

      await axios.put(
        `http://localhost:5144/api/Usuarios/${usuarioAntigo.id}`,
        { ...usuarioAntigo, nome: usuarioNovo },
      );
      const novosUsuarios = [...usuarios];
      novosUsuarios[editando.index] = { ...usuarioAntigo, nome: usuarioNovo };
      setUsuarios(novosUsuarios);

      const novaListaTarefas = tarefas.map((tarefa) => {
        const novaTarefa =
          tarefa.usuarioId === usuarioAntigo.id
            ? { ...tarefa, usuario: usuarioNovo }
            : tarefa;

        const novosComentarios = tarefa.comentarios.map((comentario) =>
          comentario.usuarioId === usuarioAntigo.id
            ? { ...comentario, usuario: usuarioNovo }
            : comentario,
        );

        return { ...novaTarefa, comentarios: novosComentarios };
      });

      setTarefas(novaListaTarefas);

    setEditando({ ativa: false, index: null, valor: '' });
  };

  const cancelarEdicao = () => {
    setEditando({ ativa: false, index: null, valor: '' });
  };

  return (
    <div className="usuario">
      <button onClick={() => setUsuariosVisiveis(!usuariosVisiveis)}>
        {usuariosVisiveis
          ? 'Ocultar Usuários Adicionados'
          : 'Mostrar/Adicionar Usuários'}
      </button>
      {usuariosVisiveis && (
        <div className="adiciona">
          <div className="lista">
            <h2 className="titulos">Lista de Usuários</h2>
            <input
              type="text"
              value={novoUsuario}
              onChange={(e) => setNovoUsuario(e.target.value)}
              placeholder="Digite o novo usuário :D"
            />
            <button className="botao" onClick={adicionarUsuario}>
              Adicionar Usuário
            </button>
            <ul>
              {usuarios
                .filter((usuario) => !usuario.excluido)
                .map((usuario, index) => (
                  <li key={usuario.id} className="itemlista">
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
                        {usuario.nome}
                        <div className="botoes">
                          <button
                            onClick={() => iniciarEdicao(index, usuario.nome)}
                          >
                            Editar
                          </button>
                          <button onClick={() => excluirUsuario(index)}>
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

export default Usuario;
