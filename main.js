/*
setlocalstorage() =to set items into the local storage
getlocalstorage() = to get items from the local storage
acceptData() = to take inputs from the form and push that items into array of objects
createTasks() = to create divs using the data from the array
clear() = to clear the inputs of the form after saving
deletetask() = to take the id from the div which is same as the index and assign it to a variable
deleteItem()=  to delete the objects from the array using splice 
counting()= to display the count of the tasks in the navbar
edittask()= to display the items in the form to edit it
editItem() = to edit the items in the array and save it
sortbyname() = to sort using the task title in alphabetical order
sortbydate() = to sort using Date
acceptcheckbox() = to take input data from the checkbox which is true or false and push that data into the array
createcomplete()= to display the completed tasks by checking if the value of input box os true or false
displaynone()= to display only active tasks
completeddisnone() = to display only completed tasks
displayblock() = to display all tasks
clearcompleted() = to clear all the completed tasks
searchtodo() = to search the todo lists
searchedActive() = to display the searched active tasks in the div
searchedCompleted() = to display the searched completed tasks in the div
dueDate() = to diplay red in date if the due date is over

 */
// declaring the variable to store the id of the modal
let modalid;
let indexofedit;
let searchindex;
let arr = [];
let searcharray = []
let result
let ind
let allCount = document.getElementById("countall");
let activeCount = document.getElementById("activecount");
let completedCount = document.getElementById("countcompleted");

getlocalstorage();

let add = document.querySelector(
  "#exampleModal > div > div > div.modal-footer > button.btn.btn-primary"
);
let editbtn = document.querySelector(
  "#exampleModal20 > div > div > div.modal-footer > button.btn.btn-primary"
);

// function to save data to local storage
function setlocalstorage() {
  localStorage.setItem("todoarray", JSON.stringify(arr));
}
// function to retrieve data from local storage
function getlocalstorage() {
  arr = JSON.parse(localStorage.getItem("todoarray")) || [];
}

// creating a new div when clicking the add task button
document.querySelector(
  "#exampleModal > div > div > div.modal-footer > button.btn.btn-primary"
).onclick = function () {
  if (document.querySelector("#validationTextarea").value.length == 0) {
    alert("Kindly Enter Task Name!!!!");
  } else {
    acceptData();
    createTasks();
    add.setAttribute("data-bs-dismiss", "modal");
  }
};

// pushing the todo into an array of objects
let acceptData = () => {
  let title = document.querySelector("#validationTextarea").value;
  let description = document.querySelector(
    "#exampleFormControlTextarea1"
  ).value;
  let date = document.querySelector("#theDate").value;

  let obj1 = {
    objtitle: title,
    objdescription: description,
    objdate: date,
    iscomplete: false,
  };

  arr.push(obj1);
  // local storage pushing
  setlocalstorage();
  counting();

  console.log(arr);
};

// displaying the active todos
let createTasks = () => {
  document.querySelector("#duplicater").innerHTML = "";
  for (i = 0; i < arr.length; i++) {
    if (arr[i].iscomplete == false) {
      document.querySelector("#duplicater").innerHTML += ` 
           
        <div  class="d-flex justify-content-between align-items-center taskcontent mt-3 ">
            <div class="form-check d-flex ms-4">
                <div>
                <input class="form-check-input rounded-circle " onclick='acceptcheckbox(${i});createcomplete();createTasks()' type="checkbox" value="" id="flexCheckDefault${i}">
                </div>
                <div class="ms-3 ">
                    <label class="form-check-label" for="flexCheckDefault">
                        <div class="d-flex align-items-center gap-2">
                            <h1 class="addedtaskheading ">${arr[i].objtitle}<h1>
                            <div class ="orangeround "></div>
                        </div>
                        <p class="date bi bi-calender" id="date${i}"><i class="bi bi-calendar3"></i> &nbsp ${arr[i].objdate} <p>
                    </label>
                    
                </div>
            </div>

            <div class="d-flex align-items-center gap-4">
                <button class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" id="${i}" onclick="edittask(this.id)"><i class="bi bi-pencil-fill" ></i></button>
                <button class="delete me-4"  data-bs-toggle="modal" data-bs-target="#exampleModaldel" id="${i}" onclick="deletetask(this.id)"><i class="bi bi-trash" ></i></button>
            </div>    
        </div>
        `;

      // createcomplete();
      dueDate(i)
    }
  }
  counting();
  
  clear();
};

// function to assign the modal id which is the index to the already declared variable
function deletetask(x) {
  modalid = x;
}

// clearing the form after adding the todo
function clear() {
  document.querySelector("#validationTextarea").value = "";
  document.querySelector("#exampleFormControlTextarea1").value = "";
  document.querySelector("#theDate").value = "";
}

// deleting from array
function deleteItem() {
  arr.splice(modalid, 1);
  createTasks();
  createcomplete();
  console.log(arr);
  console.log("delete operation done");
  setlocalstorage();
  counting();
}

// to display the irems from the array to the edit form
function edittask(index) {
  indexofedit = index;
  document.querySelector(`#validationTextareaedit`).value =  arr[index].objtitle;
  document.querySelector(`#exampleFormControlTextareaedit`).value =  arr[index].objdescription
  document.querySelector(`#theDateedit`).value = arr[index].objdate
}

// editing in array of objects
function editItem(){
  if(!document.getElementById("validationTextareaedit").value) {
        alert("title cannot be blank")
      }
      else {  
      arr[indexofedit].objtitle = document.getElementById("validationTextareaedit").value;
      arr[indexofedit].objdescription = document.getElementById("exampleFormControlTextareaedit").value;
      arr[indexofedit].objdate = document.getElementById("theDateedit").value;
      console.log("edit done"); 
      console.log(arr);
      createTasks();
      createcomplete();
      setlocalstorage();
}}


// sorting by name
function sortbyname() {
  arr.sort(function (a, b) {
    if (a.objtitle.toLowerCase() < b.objtitle.toLowerCase()) return -1;
    if (a.objtitle.toLowerCase() > b.objtitle.toLowerCase()) return 1;
    return 0;
  });
  document.querySelector("#duplicater").innerHTML = "";
  createTasks();
  createcomplete();
  setlocalstorage();
}

// sorting by date
function sortbydate() {
  arr.sort(function (a, b) {
    let datea = new Date(a.objdate);
    let dateb = new Date(b.objdate);
    if (datea < dateb) return -1;
    if (datea > dateb) return 1;
    return 0;
  });
  document.querySelector("#duplicater").innerHTML = "";
  createTasks();
  createcomplete();
  setlocalstorage();
}

// pushing the vlaue of checkbox into the array of objects
function acceptcheckbox(i) {
  cb = document.querySelector(`#flexCheckDefault${i}`);

  arr[i].iscomplete = cb.checked;

  console.log(arr);
  console.log("checkbox checked");
  setlocalstorage();
}

// displaying the completed tasks

let createcomplete = () => {
  document.querySelector("body > div > div.completeddiv").innerHTML = "";
  for (i = 0; i < arr.length; i++) {
    if (arr[i].iscomplete == true) {
      document.querySelector("body > div > div.completeddiv").innerHTML += ` 
           
        <div  class="d-flex justify-content-between align-items-center taskcontent mt-3 ">
            <div class="form-check d-flex ms-4">
                <div>
                <input class="form-check-input rounded-circle " onclick='acceptcheckbox(${i});createcomplete();createTasks()' type="checkbox" value="" id="flexCheckDefault${i}" checked>
                </div>
                <div class="ms-3">
                <label class="form-check-label" for="flexCheckDefault">
                <div class="d-flex gap-2"><h1 class="addedtaskheading ">${arr[i].objtitle}</h1><div class ="greenround mt-2"></div></div>
                    <p class="date"><i class="bi bi-calendar3"></i> &nbsp ${arr[i].objdate} </p>
                </label>
                </div>
            </div>

            <div class="d-flex align-items-center gap-4">
                <button class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" id="${i}" onclick="edittask(this.id)"><i class="bi bi-pencil-fill" ></i></button>
                <button class="delete me-4"  data-bs-toggle="modal" data-bs-target="#exampleModaldel" id="${i}" onclick="deletetask(this.id)"><i class="bi bi-trash" ></i></button>
            </div>  
            
        </div>  
        
        `;
    }
  }
  counting();
};

// to display the active tasks when clicking the active button
function displaynone() {
  document.querySelector(".completeddiv").style.display = "none";
  document.querySelector(".completedtasks").style.display = "none";
  document.querySelector("#duplicater").style.display = "block";
  document.querySelector(".activetasks").style.display = "block";
}
// to display the completed tasks when clicking the completed button
function completeddisnone() {
  document.querySelector("#duplicater").style.display = "none";
  document.querySelector(".activetasks").style.display = "none";
  document.querySelector(".completeddiv").style.display = "block";
  document.querySelector(".completedtasks").style.display = "block";
}
// to display all divs when clicking the all button
function displayblock() {
  document.querySelector(".completeddiv").style.display = "block";
  document.querySelector(".completedtasks").style.display = "block";
  document.querySelector("#duplicater").style.display = "block";
  document.querySelector(".activetasks").style.display = "block";
}

// clear all completed tasks
function clearcompleted() {
  for (i = 0; i < arr.length; i++) {
    if (arr[i].iscomplete == true) {
      arr.splice(i, 1);
      i--;
      console.log(arr);
    }
  }

  createTasks();
  createcomplete();
  setlocalstorage();
  counting();
  console.log("completed cleared");
}

//counting
function counting() {
  allCount.innerHTML = "0";
  activeCount.innerHTML = "0";
  completedCount.innerHTML = "0";
  for (i = 0; i < arr.length; i++) {
    allCount.innerHTML++;
    if (arr[i].iscomplete == false) {
      activeCount.innerHTML++;
    }
    if (arr[i].iscomplete == true) {
      completedCount.innerHTML++;
    }
  }
}

counting();
createTasks();
createcomplete();
displayblock();



function searchtodo(){
  let searchInput = document.querySelector("body > div > div.d-flex.justify-content-between.align-items-center > div.row.d-flex.justify-content-start.mt-4.align-items-center > div > input").value
  console.log(searchInput)

   let result = arr.filter(function(x,index) {
   let ind = (x.objtitle.toLowerCase().includes(searchInput))
   if(ind){
       searcharray.push(index)
   }
  })

  document.querySelector('#duplicater').innerHTML = ""
  document.querySelector('body > div > div.completeddiv').innerHTML = ""
  for(i=0;i<searcharray.length;i++){
    searchedActive()
   searchedCompleted()
    
  }
  searcharray = []

}
//searched active 
function searchedActive(){

   if(arr[searcharray[i]].iscomplete == false){
    
       document.querySelector('#duplicater').innerHTML += `


        <div  class="d-flex justify-content-between align-items-center taskcontent mt-3 ">
            <div class="form-check d-flex ms-4">
                <div>
                <input class="form-check-input rounded-circle " onclick='acceptcheckbox(${searcharray[i]});searchtodo()' type="checkbox" value=""  id="flexCheckDefault${searcharray[i]}">
                </div>
                <div class="ms-3 ">
                    <label class="form-check-label" for="flexCheckDefault">
                        <div class="d-flex align-items-center gap-2">
                            <h1 class="addedtaskheading ">${arr[searcharray[i]].objtitle}<h1>
                            <div class ="orangeround "></div>
                        </div>
                        <p class="date bi bi-calender"><i class="bi bi-calendar3"></i> &nbsp${arr[searcharray[i]].objdate} <p>
                    </label>
                    
                </div>
            </div>

            <div class="d-flex align-items-center gap-4">
                <button class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" id="${i}" onclick="edittask(${searcharray[i]})"><i class="bi bi-pencil-fill" ></i></button>
                <button class="delete me-4"  data-bs-toggle="modal" data-bs-target="#exampleModaldel" id="${i}" onclick="deletetask(${searcharray[i]})"><i class="bi bi-trash" ></i></button>
            </div>    
        </div>
       `
       }


} searcharray = []
console.log('search active')


function searchedCompleted(){

  if(arr[searcharray[i]].iscomplete == true){
      document.querySelector('body > div > div.completeddiv').innerHTML += `
      <div  class="d-flex justify-content-between align-items-center taskcontent mt-3 ">
      <div class="form-check d-flex ms-4">
          <div>
          <input class="form-check-input rounded-circle " onclick='acceptcheckbox(${searcharray[i]});searchtodo()'type="checkbox" value=""  id="flexCheckDefault${searcharray[i]}" checked>
          </div>
          <div class="ms-3 ">
              <label class="form-check-label" for="flexCheckDefault">
                  <div class="d-flex align-items-center gap-2">
                      <h1 class="addedtaskheading ">${arr[searcharray[i]].objtitle}<h1>
                      <div class ="greenround "></div>
                  </div>
                  <p class="date bi bi-calender"><i class="bi bi-calendar3"></i> &nbsp${arr[searcharray[i]].objdate} <p>
              </label>
              
          </div>
      </div>

      <div class="d-flex align-items-center gap-4">
          <button class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" id=""#date0"" onclick="edittask(${searcharray[i]})"><i class="bi bi-pencil-fill" ></i></button>
          <button class="delete me-4"  data-bs-toggle="modal" data-bs-target="#exampleModaldel" id="${i}" onclick="deletetask(${searcharray[i]})"><i class="bi bi-trash" ></i></button>
      </div>    
  </div>
      `
      }


}


function dueDate(index) {
  
  let currentDate = new Date();
  let todoDAte = new Date(arr[index].objdate);
  if(currentDate > todoDAte)
  { 
    document.querySelector(`#date${index}`).style.color = " #C03503";
    document.querySelector(`#date${index}`).style.backgroundColor = "rgba(192, 53, 3, 0.06)";
    console.log('date updated')

  }
  
}