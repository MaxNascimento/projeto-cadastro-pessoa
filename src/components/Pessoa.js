import axios from "axios";
import { useEffect, useState } from "react";

function Pessoa() {

  const [_id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data, setData] = useState("");
  const [pessoas, setPessoas] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  //Carregar Dados
  async function Load() {
    var cp = document.getElementById('cpf')
    var save = document.getElementById('save')
    var edit = document.getElementById('edit')

    cp.disabled = false;
    save.disabled = false;
    edit.disabled = true;

    const result = await axios.get("http://localhost:3333/pessoa");
    setPessoas(result.data);
    console.log(result.data);
  }
  
  //Salvar
  async function save(event) {
    event.preventDefault();
     
    try {
      await axios.post("http://localhost:3333/pessoa", {
        nome: nome,
        cpf: cpf,
        data: data,
      }).then(function (response){
        alertV(response.data.message);
      });
      Clear();
      Load();
    } catch (error) {
      alertF(error.response.data.error);
    }
  }

  //Editar
  async function EditPessoa(pessoas) {
    var cp = document.getElementById('cpf')
    var save = document.getElementById('save')
    var edit = document.getElementById('edit')

    cp.disabled = true;
    save.disabled = true;
    edit.disabled = false;

    setNome(pessoas.nome);
    setCpf(pessoas.cpf);
    setData(pessoas.data);
    setId(pessoas._id);
  }
  
  //Deletar
  async function DeletePessoa(_id) {
    try {
      await axios.delete("http://localhost:3333/pessoa/" + _id).then(function (response){
        alertV(response.data.message);
      });
      
      Clear();
      Load();
    } catch (error) {
      alertF(error.response.data.error);
    }
  }

  //Alterar
  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:3333/pessoa/" +
          pessoas.find((u) => u._id === _id)._id || _id,
        {
          _id: _id,
          nome: nome,
          data: data,
        }
      ).then(function (response){
        alertV(response.data.message);
      });
     

      Clear();
      Load();
    } catch (error) {
      alertF(error.response.data.error);
    }
  }

  //Limpar
  function Clear() {
    setNome("");
    setCpf("");
    setData("");
    setId("");
  }
  
  //Data dd/mm/yyyy
  function dataFormatada(data){
    let date = data
    let timestamp = new Date(date).getTime();
    let dia = new Date(timestamp).getDate();
    let mes = new Date(timestamp).getMonth()+1;
    let ano = new Date(timestamp).getFullYear();
    dia = (dia<31?dia+1:dia)

    let dt = ((dia<10?'0':'')+(dia)+'/'+(mes<10?'0':'')+(mes)+'/'+(ano))
    return dt;
  }

  //Mascara CPF 000.000.000-00
  function Mascara(){
    let masc = document.getElementById('cpf')

    masc.addEventListener('keypress', () => {
      let mascLength = masc.value.length
      if (mascLength === 3 || mascLength === 7 ){
        masc.value += '.'
      }
      if (mascLength === 11 ){
        masc.value += '-'
      }    
    });
  }

  //Alerta Sucesso
  function alertV(msg) {
    let alert = document.getElementById('alertV');
    let erro = document.getElementById('alertF');
    alert.innerHTML = msg;
    alert.hidden = false;
    erro.hidden = true;
  }

  //Alerta Erro
  function alertF(msg) {
    let alert = document.getElementById('alertF');
    let erro = document.getElementById('alertV');
    alert.innerHTML = msg;
    alert.hidden = false;
    erro.hidden = true;
  }

 
    return (
      <div>
      <h1 class="tit" >CADASTRO DE PESSOA</h1>
      
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="_id"
              hidden
              value={_id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Nome</label>
            <input
              type="text"
              class="form-control"
              id="nome"
              value={nome}
              onChange={(event) => {
                setNome(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>CPF</label>
            <input
              type="text"
              class="form-control"
              id="cpf"
              maxLength={"14"}
              value={cpf}
              
              onChange={(event) => {
                setCpf(event.target.value);
                Mascara();
              }}
            />
          </div>
 
          <div class="form-group">
            <label>Data de Nascimento</label>
            <input
              type="date"
              class="form-control"
              id="data"
              value={data}
              onChange={(event) => {
                setData(event.target.value);
              }}
            />
          </div>
 
          <div>
            <button class="btn btn-outline-success m-1 mt-3" id="save" onClick={save}>
              Salvar
            </button>
            <button class="btn btn-outline-warning m-1 mt-3" id="edit" onClick={update}>
              Alterar
            </button>
            <button class="btn btn-outline-primary m-1 mt-3" onClick={Clear}>
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div class="alert alert-success mt-4"  id="alertV" hidden role="alert"></div>

      <div class="alert alert-danger mt-4" id="alertF" hidden role="alert"></div>
      
      <div class="table-responsive-md">
      <table class="table table-hover table-dark mt-4"  align="center" >
        <thead>
          <tr>
            <th scope="col">ID</th> 
            <th scope="col">Nome</th>
            <th scope="col">CPF</th>
            <th scope="col">Data</th>
 
            <th scope="col">Opção</th>
          </tr>
        </thead>
         {pessoas.map(function fn(pessoa) {
          return (
            <tbody>
              <tr>
                <th scope="row">{pessoas.indexOf(pessoa)+1}</th> 
                <td>{pessoa.nome}</td>
                <td>{pessoa.cpf}</td>
                <td>{dataFormatada(pessoa.data)}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-warning"
                    onClick={() => EditPessoa(pessoa)}
                  >Alterar
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={() => DeletePessoa(pessoa._id)}
                  >Deletar
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })} 
      </table>
      </div>
    </div>
    );
  }
  
  export default Pessoa;
  