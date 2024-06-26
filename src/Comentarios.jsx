import React, { useState } from 'react';
import axios from 'axios';

const Comentarios = ({
  comentarios,
  tarefaIndex,
  usuarios,
  tarefas,
  setComentariosVisiveis,
  setComentarios,
}) => {
  const [novoComentario, setNovoComentario] = useState('');
  const [usuarioComentario, setUsuarioComentario] = useState('');
  const [edicaoComentario, setEdicaoComentario] = useState({
    index: null,
    texto: '',
  });

  const handleAdicionarComentario = async () => {
    if (
      novoComentario.trim() !== '' &&
      usuarios.some((usuario) => usuario.nome === usuarioComentario)
    ) {
      const usuarioId = usuarios.find(
        (usuario) => usuario.nome === usuarioComentario,
      ).id;

      try {
        const tarefaId = tarefas[tarefaIndex].id;
        const response = await axios.post(
          'http://localhost:5144/api/Comentarios',
          {
            texto: novoComentario.trim(),
            tarefaId: tarefaId,
            usuarioId: usuarioId,
          },
        );

        setComentarios([response.data, ...comentarios]);

        setComentariosVisiveis(true);
        setNovoComentario('');
        setUsuarioComentario('');
      } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
      }
    } else {
      alert('Usuário não encontrado ou comentário vazio.');
    }
  };

  const iniciarEdicaoComentario = (index, texto) => {
    setEdicaoComentario({ index, texto });
  };

  const salvarEdicaoComentario = async (comentarioId) => {
    try {
      const comentarioEditado = {
        ...comentarios[edicaoComentario.index],
        texto: edicaoComentario.texto,
      };

      await axios.put(
        `http://localhost:5144/api/Comentarios/${comentarioId}`,
        comentarioEditado,
      );

      const novosComentarios = comentarios.map((comentario, index) =>
        index === edicaoComentario.index ? comentarioEditado : comentario,
      );
      setComentarios(novosComentarios);
      setEdicaoComentario({ index: null, texto: '' });
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
    }
  };

  const excluirNovoComentario = async (index, comentarioId) => {
    try {
      await axios.delete(
        `http://localhost:5144/api/Comentarios/${comentarioId}`,
      );
      const novosComentarios = [...comentarios];
      novosComentarios.splice(index, 1);

      setComentarios(novosComentarios);

      setComentariosVisiveis(true);
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  };

  return (
    <div className="comentarios">
      <h2 className="titulos">Comentários</h2>
      <div className="div-comentarios">
        <div className="input-comentarios">
          <input
            className="input-comentarios"
            type="text"
            value={usuarioComentario}
            onChange={(e) => setUsuarioComentario(e.target.value)}
            placeholder="Nome do Usuário"
          />
          <textarea
            className="text-area"
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Adicionar Comentário"
          />
        </div>
        <button onClick={handleAdicionarComentario}>
          Adicionar Comentário
        </button>
      </div>
      <ul>
        {comentarios.map((comentario, index) => (
          <li key={comentario.id} className="itemlista">
            <strong>
              {usuarios.find((user) => user.id === comentario.usuarioId)
                ?.nome || 'FOI EXCLUIDO'}
              :
            </strong>
            <div className="botao2">
              {edicaoComentario.index === index ? (
                <textarea
                  className="text-area"
                  value={edicaoComentario.texto}
                  onChange={(e) =>
                    setEdicaoComentario({
                      ...edicaoComentario,
                      texto: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{comentario.texto}</div>
              )}
              <div className="botoes">
                {edicaoComentario.index === index ? (
                  <>
                    <button
                      onClick={() => salvarEdicaoComentario(comentario.id)}
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() =>
                        setEdicaoComentario({ index: null, texto: '' })
                      }
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        iniciarEdicaoComentario(index, comentario.texto)
                      }
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        excluirNovoComentario(index, comentario.id)
                      }
                    >
                      Excluir
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comentarios;
