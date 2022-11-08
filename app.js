const TASK_INPUT = document.querySelector("#task");
const LIST = document.querySelector("#list");

function newElement() {
  //create a new li element
  const newTask = document.createElement("li");

  //assign the task input
  newTask.innerHTML = TASK_INPUT.value;

  //adds the task into the list
  LIST.appendChild(newTask);

  //clear textbox
  TASK_INPUT.value = "";
}
