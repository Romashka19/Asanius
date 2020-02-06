let key;
let projects = [];
let task = [];
buildProject();
check();
function check() {
    for(let i=0; i<localStorage.length; i++) {
        key = localStorage.key(i);
    }
}

function buildProject(){
    for(let i=0; i<localStorage.length;i++){
        let prName = localStorage.getItem(key);
        let projectContainer = document.getElementById('projectContainer');
        let projectLink = document.createElement('button');
        projectLink.className = 'btn btn-primary';
        projectLink.id = prName;
        projectLink.innerHTML = prName;
        let br = document.createElement('br');

        projectContainer.appendChild(projectLink);
        projectContainer.appendChild(br);
    }
}

function createProject() {
    let projectName = $('#projectName').val();
    projects = [{name:projectName}];
    localStorage.setItem(key,projects);
    location.reload(true);
}

function buildTasks(){

    for (let i = 0; i < localStorage.length; i++) {
            let taskName = JSON.parse(localStorage.value(i));
            let taskContainer = document.getElementById('taskContainer');
            let taskBlock = document.createElement('div');
            taskBlock.className = 'tasks';
            //taskBlock.id =tryrt ;
            let br = document.createElement('br');
            let h3 = document.createElement('h3');
            h3.innerHTML = taskName;

            taskContainer.appendChild(taskBlock);
            taskContainer.appendChild(h3);
            taskContainer.appendChild(br);
    }
}

function createTask() {

    let taskName = $('#taskName').val();
    task = [{name:taskName}];
    buildTasks();
}

