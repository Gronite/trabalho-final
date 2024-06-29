import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categoria from './Categoria';
import Usuario from './Usuario';
import Tarefa from './Tarefa';
import Comentarios from './Comentarios';
import './style.css';

function App() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasVisiveis, setCategoriasVisiveis] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosVisiveis, setUsuariosVisiveis] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [comentariosVisiveis, setComentariosVisiveis] = useState([]);

  const carregarDadosIniciais = async () => {
      const responseCategorias = await axios.get(
        'http://localhost:5144/api/Categorias',
      );
      setCategorias(responseCategorias.data);

      const responseTarefas = await axios.get(
        'http://localhost:5144/api/Tarefas',
      );
      setTarefas(responseTarefas.data);
      setComentariosVisiveis(
        new Array(responseTarefas.data.length).fill(false),
      );

      const responseUsuarios = await axios.get(
        'http://localhost:5144/api/Usuarios',
      );
      setUsuarios(responseUsuarios.data);
  };

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  return (
    <div className="container">
      <div>
        <Categoria
          categorias={categorias}
          setCategorias={setCategorias}
          setCategoriasVisiveis={setCategoriasVisiveis}
          categoriasVisiveis={categoriasVisiveis}
          tarefas={tarefas}
          setTarefas={setTarefas}
        />
      </div>
      <div>
        <Tarefa
          categorias={categorias}
          usuarios={usuarios}
          tarefas={tarefas}
          setTarefas={setTarefas}
          setComentariosVisiveis={setComentariosVisiveis}
          comentariosVisiveis={comentariosVisiveis}
        />
      </div>
      <div>
        <Usuario
          usuarios={usuarios}
          setUsuarios={setUsuarios}
          setUsuariosVisiveis={setUsuariosVisiveis}
          usuariosVisiveis={usuariosVisiveis}
          tarefas={tarefas}
          setTarefas={setTarefas}
        />
        {comentariosVisiveis.map(
          (visivel, index) =>
            visivel && (
              <Comentarios
                key={index}
                tarefaIndex={index}
                usuarios={usuarios}
                comentariosVisiveis={comentariosVisiveis}
                setComentariosVisiveis={setComentariosVisiveis}
                tarefas={tarefas}
              />
            ),
        )}
      </div>
    </div>
  );
}

export default App;
