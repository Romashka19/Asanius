let project_id;
let task_id;
let projects = [];
let tasks = [];
checkDB();
function checkDB() {
   for(let i=0;i<localStorage.length;i++){
       console.log(localStorage.key(i));
       if(localStorage.key(i) == undefined){
           localStorage.setItem('project','')
       }else{
           buildProject();
       }
   }
}
function createProject() {
    let projectName = $('#projectName').val();
    projects.push({name: projectName, task: tasks});
    projects = JSON.stringify(projects);
    localStorage.setItem('project', projects);
    buildProject();
}

function buildProject(){
    projects = JSON.parse(localStorage.getItem('project'));
    let projectContainer = document.getElementById('projectContainer');
    let content = '';
        for (let i = 0; i < projects.length; i++) {
            content += '<p><button class="btn btn-dark btn-project" id="' + projects[i].name + '">' + projects[i].name + '</button></p>';
        }
    projectContainer.innerHTML = content;
        createEvent();
}

function createEvent() {
    let btn = document.getElementsByClassName('btn-project');
    for(let i=0;i<btn.length;i++){
        btn[i].addEventListener("click",function () {
            project_id = btn[i].id;
            buildTasks();
        });
    }
}

function createTask() {
    let taskName = $('#taskName').val();
    projects.filter(function (e) {
        return e.name == project_id;
    }).map(function (e) {
        e.task.push({name:taskName})
    });
    projects = JSON.stringify(projects);
    localStorage.setItem('project',projects);
    buildTasks();
}

function buildTasks(){
    projects = JSON.parse(localStorage.getItem('project'));
    let taskContainer = document.getElementById('taskContainer');
    let content = '';
    let getTasks;
        projects.filter(function (e) {
            return e.name == project_id;
        }).map(function (e) {
            getTasks = e.task;
        });
        for (let j = 0; j < getTasks.length; j++) {
            content +=  '<div class="tasks" id="'+ getTasks[j].name +'">\n' +
                '                <h3>'+ getTasks[j].name +'</h3>\n' +
                '                <button class="btn-task" data-toggle="modal" data-target="#editTask" id="'+ getTasks[j].name +'">edit</button>\n' +
                '                <button class="btn-task" data-toggle="modal" data-target="#deleteTask" id="'+ getTasks[j].name +'">delete</button>\n' +
                '        </div>';

        }
        taskContainer.innerHTML = content;
    eventTask();
}

function eventTask() {
    let btn = document.getElementsByClassName('btn-task');
    for(let i=0;i<btn.length;i++){
        btn[i].addEventListener("click",function () {
            task_id = btn[i].id;
            console.log(task_id)
        });
    }

}

function editTask() {
    let newTaskName = $('#newTaskName').val();
    let getTasks;
    projects.filter(function (e) {
        return e.name == project_id;
    }).map(function (e) {
        getTasks = e.task;
    });
    getTasks.filter(function (e) {
        return  e.name == task_id;
    }).map(function (e) {
        return  e.name = newTaskName;
    })
    projects = JSON.stringify(projects);
    localStorage.setItem('project',projects);
    buildTasks();
}

function deleteTask() {
    let delTask;
    projects.filter(function (e) {
        return e.name == project_id;
    }).map(function (e) {
        delTask = e.task;
    });
    for(let i=0;i<delTask.length;i++){
        console.log(delTask[i])
        if(delTask[i].name == task_id){
            delTask.splice(i,1);
        }
    }
    projects = JSON.stringify(projects);
    localStorage.setItem('project',projects);
    buildTasks();
}
