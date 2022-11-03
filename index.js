import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
} from "./firebase.js";

const taskForm = document.getElementById("dados");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async(e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });

    onGetTasks((querySnapshot) => {
        tasksContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const task = doc.data();

            tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">Cadastro</h3>
    <p>Nome: ${task.nome}</p>
    <p>Sobrenome: ${task.sobrenome}</p> 
    <p>Idade: ${task.idade}</p>
    <p>CPF: ${task.CPF}</p>
    <p>Profissão: ${task.profissao}</p>
    <p>Email: ${task.email}</p>
    <p>UF: ${task.teste}</p>
    
    
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
        });

        const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async({ target: { dataset } }) => {
                try {
                    await deleteTask(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async(e) => {
                try {
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();
                    taskForm["nome"].value = task.nome;
                    taskForm["sobrenome"].value = task.sobrenome;
                    taskForm["idade"].value = task.idade;
                    taskForm["CPF"].value = task.CPF;
                    taskForm["profissao"].value = task.profissao;
                    taskForm["email"].value = task.email;
                    taskForm["teste"].value = task.teste;

                    editStatus = true;
                    id = doc.id;
                    taskForm["btn-task-form"].innerText = "Update";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });
});

taskForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const nome = taskForm["nome"];
    const sobrenome = taskForm["sobrenome"];
    const idade = taskForm["idade"];
    const CPF = taskForm["CPF"];
    const profissao = taskForm["profissao"];
    const email = taskForm["email"];
    const teste = taskForm["teste"];



    try {
        if (!editStatus) {
            await saveTask(nome.value, sobrenome.value, idade.value, CPF.value, profissao.value, email.value, teste.value);
        } else {
            await updateTask(id, {
                nome: nome.value,
                sobrenome: sobrenome.value,
                idade: idade.value,
                CPF: CPF.value,
                profissao: profissao.value,
                email: email.value,
                teste: teste.value,
            });

            editStatus = false;
            id = "";
            taskForm["btn-task-form"].innerText = "Cadastrar";
        }

        taskForm.reset();
        nome.focus();
    } catch (error) {
        console.log(error);
    }
});