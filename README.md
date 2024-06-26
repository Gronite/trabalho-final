# SPA & Web Service usando C# e .NET (BD In-Memory)

## Busca

* Sobre o Projeto
* Funcionalidades
* Imagens da Aplicação funcionando

## Projeto
 
O projeto é uma SPA feita usando React com persistência de dados em um Web Service In-Memory do .NET feito com C#.

O projeto é uma aplicação de lista de tarefas e possui 4 entidades, todas com CRUD:

> Categoria
> Usuário
> Tarefa
> Comentário

O projeto também foi compilado com Docker, abaixo você pode ler as funcionalidades da aplicação.

## Funcionalidades

### Categoria

As categorias na aplicação servem como marcação para indicar o "tipo" de uma determinada tarefa, os usuários podem querer separar suas tarefas em, como o nome já diz, categorias, isso permite ao usuário uma melhor organização em suas anotações, os usuários podem adicionar, editar e excluir suas categorias.

### Usuário

O usuário é a entidade que determina quem criou determinada tarefa e quem adicionou certo comentário (eu abstraí de uma certa maneira essa entidade na aplicação, pois, não queria aumentar a complexidade trazendo logins para a SPA, até por que o primeiro trabalho dessa SPA foi feito com base apenas em uma SPA com react, com objetivo de melhorar as habilidades front-end, e o trabalho final é uma extensão disso, então preferi não modificar essa parte) A entidade usuário se comporta de maneira semelhante à de categoria no código, mas enquanto a de categoria referencia o tipo de tarefa, um usuário referencia a persona que adiciona a tarefa/comentário. Um usuário pode ser adicionado, editado e excluído.

### Tarefa

Como entidade mais importante todas as outras entidades se relacionam com as tarefas. Para a criação de uma tarefa, você precisa de uma descrição pra sua tarefa, uma categoria e seu usuário (já adicionados anteriormente), com uma tarefa existente você também pode adicionar comentários nessa determinada tarefa, falaremos disso no tópico da próxima e última entidade, você também pode editar o conteúdo da sua tarefa, como também pode excluir a sua tarefa.

### Comentários

Os comentários no código são as entidades da entidade tarefa, um comentário pode ser adicionado a uma tarefa existente ao utilizar um nome de usuário existente, você também pode editar e excluir o seu comentário, cada comentário adicionado em uma tarefa, é exclusivo da tarefa em que foi adicionado.

> OBS: Ao excluir categorias e usuários, os campos onde os respectivos nomes de categoria/usuário estavam, são trocados para indicar que a exclusão da categoria/usuário que estava ali foi efetuada e não existe mais.

## Imagens de funcionamento da aplicação

### Tela inicial

* **Tela inicial da aplicação**
![Tela inicial](https://i.imgur.com/6D96sDl.png)

### Docker

* **Criação das imagens e containers Docker**
![img e container frontend](https://i.imgur.com/OZad7iy.png)

![img e container backend](https://i.imgur.com/CKmhvKj.png)

* **Docker Desktop**
![Containers rodando no Docker Desktop](https://i.imgur.com/r0e2gWY.png)

### Adições

* **Adicionando Categoria**
![Adicionando categoria](https://i.imgur.com/joIep2R.png)

* **Categoria adicionada**
![Categoria adicionada](https://i.imgur.com/pyXFkU1.png)

* **Adicionando Usuário**
![Adicionando Usuário](https://i.imgur.com/NpRI3QC.png)

* **Usuário adicionado**
![Usuário adicionado](https://i.imgur.com/W0tEm9f.png)

* **Adicionando Tarefa**
![Adicionando tarefa](https://i.imgur.com/TEMKy7E.png)

* **Tarefa Adicionada**
![Tarefa adicionada](https://i.imgur.com/qYHTtHd.png)

* **Adicionando Comentário**
![Adicionando comentário](https://i.imgur.com/PTnPiJQ.png)

* **Comentário Adicionado**
![Comentário Adicionado](https://i.imgur.com/oCwstaS.png)

* **Adicionando uma segunda leva de entidades**
![Mais entidades](https://i.imgur.com/O1iKOxN.png)

* **Visualizando o comportamento da API após as adições**
![API](https://i.imgur.com/JyYt71P.png)

### Edições

* **Editando Categoria**
![Editando categoria](https://i.imgur.com/HLsDlhZ.png)

* **Categoria editada**
![Categoria editada](https://i.imgur.com/4CnfTm6.png)

* **Editando Usuário**
![Editando Usuário](https://i.imgur.com/yy5OcwK.png)

* **Usuário Editado**
![Usuário Editado](https://i.imgur.com/2cOLppz.png)

* **Editando Tarefa**
![Editando Tarefa](https://i.imgur.com/JzM1vv4.png)

* **Tarefa Editada**
![Tarefa Editada](https://i.imgur.com/AwYIyi0.png)

* **Editando Comentário**
![Editando comentário](https://i.imgur.com/r1ptPIm.png)

* **Comentário Editado**
![Comentário editado](https://i.imgur.com/SeM6HlL.png)

### Exclusões

* **Excluindo Categoria**
![Excluindo categoria](https://i.imgur.com/GrcMrAO.png)

* **Categoria Excluída**
![Categoria excluida](https://i.imgur.com/R0jdIIP.png)

* **Excluindo Usuário**
![Excluindo Usuário](https://i.imgur.com/UMz5t0S.png)

* **Usuário Excluído**
![Usuário excluido](https://i.imgur.com/NzkSBKc.png)

* **Excluindo Comentário**
![Excluindo comentário](https://i.imgur.com/AdSdJgj.png)

* **Comentário Excluído**
![Comentário excluído](https://i.imgur.com/63SOWp7.png)

* **Excluindo tarefa**
![Excluindo tarefa](https://i.imgur.com/SVzxvEj.png)

* **Tarefa excluída**
![Tarefa excluída](https://i.imgur.com/z4Pn7e5.png)

* **API após mudanças**
![API após mudanças](https://i.imgur.com/WotxHu8.png)

* **Após excluir tudo**
![Tudo excluido](https://i.imgur.com/Mwf7RDg.png)

* **API vazia**
![API vazia](https://i.imgur.com/CmYLvSx.png)
