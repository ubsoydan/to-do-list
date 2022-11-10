//NOT DRY, NOT PRODUCTIVE BUT WORKS. WILL BE REFACTORED SOON

const TASK_INPUT = document.querySelector("#task");
const LIST = document.querySelector("#list");

let tasksFromLocalStorage = { ...localStorage };

//SET A COUNTER TO MAKE SURE EACH ID IS UNIQUE
//SETS A NEW COUNTER IF NO COUNTER WAS SET BEFORE
let counterLocalStorage = function () {
  return !localStorage.getItem("taskIDcounter")
    ? localStorage.setItem("taskIDcounter", "0")
    : console.log("taskIDcounter is assigned already");
};

//CHECKS COUNTER EVERY TIME PAGE IS LOADED
counterLocalStorage(); //DON'T MOVE THIS

//GET THE LATEST NUMBER FROM TASK ID COUNTER ON LOCAL STORAGE
let taskIdNum = localStorage.getItem("taskIDcounter");

function newElement() {
  //CHECK FIRST WHETHER INPUT IS VALID
  if (TASK_INPUT.value === "" || !TASK_INPUT.value.trim()) {
    $("#errorToast").toast("show");
  } else {
    //IF VALID, CREATE A LI ELEMENT
    const newTask = document.createElement("li");

    //ASSIGN TEXT-VALUE TO LI ELEMENT
    newTask.textContent = `${TASK_INPUT.value}`;

    //ASSIGN AN ID FOR EACH TASK
    newTask.setAttribute("id", `taskID_${taskIdNum}`);

    //CREATING "REMOVE THE TASK BUTTON"
    const removeButton = document.createElement("button");
    removeButton.textContent = "Sil";
    removeButton.classList.add(
      "btn",
      "btn-secondary",
      "btn-sm",
      "float-right",
      "px-4"
    );

    //REMOVE TASK
    removeButton.addEventListener("click", function () {
      this.parentNode.remove(); //REMOVES LIST ELEMENT
      localStorage.removeItem(`${this.parentNode.id}`);
    });

    //INSERT THE REMOVE BUTTON
    newTask.appendChild(removeButton);

    //TOGGLE "CHECKED"
    newTask.addEventListener("click", function () {
      this.classList.toggle("linethru");
    });

    //INSERT THE TASK
    LIST.appendChild(newTask);
    $("#successToast").toast("show");
    //INSERTS THE TASK INTO LOCAL STORAGE
    localStorage.setItem(
      `taskID_${taskIdNum}`,
      `${newTask.textContent.slice(0, -3)}` //SLICE IS FOR REMOVING "SİL" TEXT IN THE STRING
    );

    //clear textbox
    TASK_INPUT.value = "";
    //RESERVE ANOTHER UNIQUE TASK ID ON LOCAL STORAGE
    localStorage.setItem("taskIDcounter", `${taskIdNum++}`);
  }
}

function reloadElement() {
  //I CAN'T REACH SECOND LEVEL ARRAY WITH using an i AND a number at the same time like "VARIABLE[i][1] so i changed my approach to get keys and values seperately"
  let localTaskKeys = new Array();
  localTaskKeys = Object.keys(tasksFromLocalStorage);
  let localTaskValues = new Array();
  localTaskValues = Object.values(tasksFromLocalStorage);
  for (let i = localTaskKeys.length - 1; i > 0; i--) {
    //I was getting an "undefined" task so made it invisible by decreasing array length by 1
    let localID = localTaskKeys[i];
    let localTask = localTaskValues[i];
    console.log(localTaskValues);
    //CREATE A NEW LI ELEMENT
    const newTask = document.createElement("li");

    //ASSIGN TEXT-VALUE TO LI ELEMENT
    newTask.textContent = localTask;

    //ASSIGN AN ID FOR EACH TASK
    newTask.setAttribute("id", `${localID}`);

    //CREATING "REMOVE THE TASK BUTTON"
    const removeButton = document.createElement("button");
    removeButton.textContent = "Sil";
    removeButton.classList.add(
      "btn",
      "btn-secondary",
      "btn-sm",
      "float-right",
      "px-4"
    );

    //REMOVE TASK
    removeButton.addEventListener("click", function () {
      this.parentNode.remove(); //REMOVES LIST ELEMENT
      localStorage.removeItem(`${this.parentNode.id}`);
    });

    //INSERT THE REMOVE BUTTON
    newTask.appendChild(removeButton);

    //TOGGLE "CHECKED"
    newTask.addEventListener("click", function () {
      this.classList.toggle("linethru");
    });

    //INSERT THE TASK
    LIST.appendChild(newTask);
  }
}

reloadElement();
