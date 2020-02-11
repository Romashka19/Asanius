let prTask = [];
let projects = [];
let tasks = [];
let project_id;
buildProject();
buildTasks();

function buildProject(){
    projects = JSON.parse(localStorage.getItem('project'));
    for(let i=0;i<projects.length;i++){
        let projectContainer = document.getElementById('projectContainer');
        let projectLink = document.createElement('button');
        projectLink.className = 'btn btn-primary btn-project';
        projectLink.id = projects[i].prName;
        projectLink.innerHTML = projects[i].prName;
        let br = document.createElement('br');

        projectContainer.appendChild(projectLink);
        projectContainer.appendChild(br);

        //console.log(projects[i].prName);
    }
    createEvent();
}

function createProject() {
    let projectName = $('#projectName').val();
    projects.push({prName:projectName,task:tasks});
    localStorage.setItem('project',JSON.stringify(projects));
}

function buildTasks(){
    prTask = JSON.parse(localStorage.getItem('project'));
    for (let i = 0; i < prTask.length; i++) {
        let taskName = prTask[i].task;
        if(project_id == prTask[i].name) {
            for (let j = 0; j < taskName.length; j++) {
                let taskContainer = document.getElementById('taskContainer');
                let taskBlock = document.createElement('div');
                taskBlock.className = 'tasks';
                taskBlock.id = taskName[j].name;
                let br = document.createElement('br');
                let h3 = document.createElement('h3');
                h3.innerHTML = taskName[j].name;

                taskContainer.appendChild(taskBlock);
                taskContainer.appendChild(h3);
                taskContainer.appendChild(br);
            }
        }
    }
}

function createTask() {
    let taskName = $('#taskName').val();
    tasks.push({name:taskName});
    projects.push({prName:project_id,task:tasks});
    //localStorage.setItem('project',JSON.stringify(projects));
    buildTasks();
    // location.reload(true);
}

function createEvent(event){
    let btn = document.getElementsByClassName("btn-project");
    for(let i = 0;i<btn.length;i++){
        project_id = btn[i].id;
        project_id.onclick = buildTasks;
        console.log(project_id);
    }
}
