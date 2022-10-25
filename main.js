// let arr = [{objtitle: 'buy milk', objdescription: 'jabajabajaba', objdate: '2022-10-29', iscomplete: false},
// {objtitle: 'buy groceries', objdescription: 'bakabakabaka', objdate: '2022-10-26', iscomplete: false},
// {objtitle: 'complete assignment', objdescription: 'hahahaha', objdate: '2022-10-01', iscomplete: false},
// {objtitle: 'pay bills', objdescription: 'yayayay', objdate: '2022-05-10', iscomplete: false},
// {objtitle: 'pay rent    ', objdescription: 'dsdsd', objdate: '2022-07-18', iscomplete: false}];

// let str = localStorage.getItem("Array")
// let arr = JSON.parse(str)


let arr = []
let add = document.querySelector('#exampleModal > div > div > div.modal-footer > button.btn.btn-primary')
let editbtn = document.querySelector('#exampleModal20 > div > div > div.modal-footer > button.btn.btn-primary')
// editbtn.setAttribute("data-bs-dismiss","modal")+

function setlocalstorage(){
    localStorage.setItem("Array" ,JSON.stringify(arr))
}

function getlocalstorage(){
        arr = JSON.parse(localStorage.getItem("Array"))
        createTasks();
}

// creating a new div when clicking the add task button
document.querySelector('#exampleModal > div > div > div.modal-footer > button.btn.btn-primary').onclick = function(){
    if(document.querySelector('#validationTextarea').value.length == 0){
        alert("Kindly Enter Task Name!!!!")
    }

    else{

        
        acceptData();
        setlocalstorage();
        getlocalstorage();
        createTasks(); 
        add.setAttribute("data-bs-dismiss","modal")
        

    }   
}

// pushing the todo into an array of objects
let acceptData = () => {

    let title = document.querySelector('#validationTextarea').value;
    let description = document.querySelector('#exampleFormControlTextarea1').value;
    let date = document.querySelector('#theDate').value;
    
    //var checkedValue  = document.querySelector('.form-check-input:checked').value;

    let obj1 = {
        objtitle : title,
        objdescription : description,
        objdate : date,
        iscomplete : false
    }

    arr.push(obj1)
    // local storage pushing
   
    console.log(arr);
}

// displaying the array of objects
let createTasks = () => {

    document.querySelector('#duplicater').innerHTML = ""
    for(i=0;i<arr.length;i++ ){
        if(arr[i].iscomplete == false){
        document.querySelector('#duplicater').innerHTML += ` 
           
        <div  class="d-flex justify-content-between align-items-center taskcontent mt-3 ">
            <div class="form-check d-flex ms-4">
                <div>
                <input class="form-check-input rounded-circle " onclick='acceptcheckbox(${i});createcomplete();createTasks()' type="checkbox" value="" id="flexCheckDefault${i}">
                </div>
                <div class="ms-3">
                <label class="form-check-label" for="flexCheckDefault">
                    <h1 class="addedtaskheading ">${arr[i].objtitle}<h1>
                    <p class="date">${arr[i].objdate} <p>
                </label>
                </div>
            </div>


                <button class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2${i}" ><i class="bi bi-pencil-fill"></i></button>
                <button class="delete me-4"><i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModaldel${i}" ></i></button>
                
            
        </div>


        
        <!-- edit modal -->
       
        <div>
            <div class="modal fade" id="exampleModal2${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                                <!-- pop up add task form -->

                        <form>
                            <div class="mb-3">
                                <label for="validationTextarea2" class="form-label">Title*</label> 
                                    <textarea class="form-control"  id="validationTextareaedit${i}"required>${arr[i].objtitle}</textarea>
                                    <div class="invalid-feedback">
                                     Please enter a message in the textarea.

                                
                                     </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                <textarea class="form-control" id="exampleFormControlTextareaedit${i}" rows="3" placeholder="Add your task description.">${arr[i].objdescription} </textarea>
                            </div>
                            <label for="exampleFormControlTextarea1" class="form-label">Due date</label>

                            <input type="date"  class="form-control mt-2 mb-3" value="${arr[i].objdate}" id="theDateedit${i}">                  
                        </form>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit"  class="btn btn-primary" data-bs-dismiss="modal" onclick='editItem(${i})'>Save</button>
                    </div>
                </div>
                </div>
            </div>
        </div>


        <!-- delete modal -->

        <div class="modal fade" id="exampleModaldel${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog"> 
            <div class="modal-content">
              <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
              <div class="modal-header border-0 pt-4 d-flex justify-content-center">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                
              </div>
              <div class="modal-body d-flex justify-content-center">
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div class="modal-footer border-0 pb-5 d-flex justify-content-center gap-3">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick='deleteItem(${i})'>delete</button>
              </div>
            </div>
          </div> 
        </div>
        `;
    // createcomplete();
    
    }
    }

    clear();
    
}

// clearing the form after adding the todo
function clear(){
    document.querySelector('#validationTextarea').value = "";
    document.querySelector('#exampleFormControlTextarea1').value = "";
    document.querySelector('#theDate').value = "";
}

// deleting from array
function deleteItem(i){
    arr.splice(i,1)
    createTasks()
    createcomplete()
    console.log(arr)
    console.log("delete operation done")
    setlocalstorage()
}

// editing in array of objects
function editItem(i){
    
    // var newValue = prompt("Please insert your new value")
    // newtitle = document.querySelector('#validationTextareaedit0').value;
    // newdescription = document.querySelector('#exampleFormControlTextarea20').value ;
    // newdate = document.querySelector('#theDate20').value ;
    arr[i].objtitle = document.querySelector(`#validationTextareaedit${i}`).value;
    arr[i].objdescription = document.querySelector(`#exampleFormControlTextareaedit${i}`).value ;
    arr[i].objdate = document.querySelector(`#theDateedit${i}`).value ;
    console.log('edit done')
    console.log(arr)
    createTasks()
    createcomplete()
    setlocalstorage()
}

// sorting by name
function sortbyname(){
    arr.sort(function(a,b) {
        if(a.objtitle.toLowerCase() < b.objtitle.toLowerCase()) return -1;
        if(a.objtitle.toLowerCase() > b.objtitle.toLowerCase()) return 1;
        return 0;
        

    });
    document.querySelector('#duplicater').innerHTML = ""
    createTasks();
    createcomplete();
    setlocalstorage()
    
}   

// sorting by date
function sortbydate(){
    arr.sort(function(a,b) {
        let datea = new Date(a.objdate);
        let dateb = new Date(b.objdate);
        if(datea < dateb) return -1;
        if(datea > dateb) return 1;
        return 0;
        

    });
    document.querySelector('#duplicater').innerHTML = ""
    createTasks();
    createcomplete();
    setlocalstorage()

}

// pushing the vlaue of checkbox into the array of objects
function acceptcheckbox(i){
    
    cb = document.querySelector(`#flexCheckDefault${i}`); 

    arr[i].iscomplete = cb.checked 

    console.log(arr);
    console.log("checkbox checked")
    setlocalstorage()
}


// completed tasks

let createcomplete = () => {

    document.querySelector('body > div > div.completeddiv').innerHTML = ""
    for(i=0;i<arr.length;i++ ){
        if(arr[i].iscomplete == true){
            document.querySelector('body > div > div.completeddiv').innerHTML += ` 
           
        <div  class="d-flex justify-content-between align-items-center taskcontent mt-3 ">
            <div class="form-check d-flex ms-4">
                <div>
                <input class="form-check-input rounded-circle " onclick='acceptcheckbox(${i});createcomplete();createTasks()' type="checkbox" value="" id="flexCheckDefault${i}" checked>
                </div>
                <div class="ms-3">
                <label class="form-check-label" for="flexCheckDefault">
                    <h1 class="addedtaskheading ">${arr[i].objtitle}<h1>
                    <p class="date">${arr[i].objdate} <p>
                </label>
                </div>
            </div>

                <button class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2${i}" ><i class="bi bi-pencil-fill"></i></button>
                <button class="delete me-4"><i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModaldel${i}" ></i></button>
                 
                
            
        </div>  
        
        
        <!-- edit modal -->
       
        <div>
            <div class="modal fade" id="exampleModal2${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                                <!-- pop up add task form -->

                        <form>
                            <div class="mb-3">
                                <label for="validationTextarea2" class="form-label">Title*</label> 
                                    <textarea class="form-control"  id="validationTextareaedit${i}"required>${arr[i].objtitle}</textarea>
                                    <div class="invalid-feedback">
                                     Please enter a message in the textarea.

                                
                                     </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                <textarea class="form-control" id="exampleFormControlTextareaedit${i}" rows="3" placeholder="Add your task description.">${arr[i].objdescription} </textarea>
                            </div>
                            <label for="exampleFormControlTextarea1" class="form-label">Due date</label>

                            <input type="date"  class="form-control mt-2 mb-3" id="theDateedit${i}">${arr[i].objdate}</input>
                        </form>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit"  class="btn btn-primary" data-bs-dismiss="modal" onclick='editItem(${i})'>Save</button>
                    </div>
                </div>
                </div>
            </div>
        </div>


        <!-- delete modal -->

        <div class="modal fade" id="exampleModaldel${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog"> 
            <div class="modal-content">
              <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
              <div class="modal-header border-0 pt-4 d-flex justify-content-center">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                
              </div>
              <div class="modal-body d-flex justify-content-center">
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div class="modal-footer border-0 pb-5 d-flex justify-content-center gap-3">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick='deleteItem(${i})'>delete</button>
              </div>
            </div>
          </div> 
        </div>
        `;
        }
    
    }}



//   if(arr.length == 0){
//     document.querySelector('.activetasks').style.display = "none";
// }
// if(arr.length > 0){
//     document.querySelector('.activetasks').style.display = "block";
// }

// function displaycheck(){
  
// else{
//     document.querySelector('.activetasks').style.display = "block";
// }

// } 

function displaynone(){
    document.querySelector('.completeddiv').style.display = "none";
    document.querySelector('.completedtasks').style.display = "none";
    document.querySelector('#duplicater').style.display = "block";
    document.querySelector('.activetasks').style.display = "block";
}

function completeddisnone(){
    document.querySelector('#duplicater').style.display = "none";
    document.querySelector('.activetasks').style.display = "none";
    document.querySelector('.completeddiv').style.display = "block";
    document.querySelector('.completedtasks').style.display = "block";
}

function displayblock(){
    document.querySelector('.completeddiv').style.display = "block";
    document.querySelector('.completedtasks').style.display = "block";
    document.querySelector('#duplicater').style.display = "block";
    document.querySelector('.activetasks').style.display = "block";
}

// clear all completed tasks    
function clearcompleted(){
    for(i=0;i<arr.length;i++ ){
        if(arr[i].iscomplete == true){
            arr.splice(i,1)
            i--
            console.log(arr)
        }
    }

    createTasks()
    createcomplete()
    console.log('completed cleared')
}


// find searched item

// function findTodo(arr, objtitle){
//     const index = arr. findIndex(function(todo, index){
//     return todo.objtitle.toLowerCase() === objtitle.toLowerCase()
//     })
//     return arr[index]
// }

// let printMe = findTodo(arr , 'buy groceries')
// console.log(printMe);

