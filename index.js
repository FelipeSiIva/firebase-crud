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

window.addEventListener("DOMContentLoaded", async (e) => {
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
    <h3 class="h5">${task.nome}</h3>
    <p>${task.sobrenome}</p>
    <p>${task.CPF}</p>
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
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["nome"].value = task.nome;
          taskForm["sobrenome"].value = task.sobrenome;
          taskForm["CPF"].value = task.CPF;

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

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = taskForm["nome"];
  const sobrenome = taskForm["sobrenome"];
  const CPF = taskForm["CPF"];

  try {
    if (!editStatus) {
      await saveTask(nome.value, sobrenome.value, CPF.value);
    } else {
      await updateTask(id, {
        nome: nome.value, 
        sobrenome: sobrenome.value,
        CPF: CPF.value,
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