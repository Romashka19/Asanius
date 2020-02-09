let project_id;
let projects = [];
let tasks = [];
buildProject();

function createProject() {
    let projectName = $('#projectName').val();
    projects.push({name:projectName,task:tasks});
    projects = JSON.stringify(projects);
    console.log(projects);
    localStorage.setItem('project',projects);
    location.reload(true);
}

function buildProject(){
    projects = JSON.parse(localStorage.getItem('project'));
    for(let i=0; i<projects.length;i++){
        let projectContainer = document.getElementById('projectContainer');
        let projectLink = document.createElement('button');
        projectLink.className = 'btn btn-primary btn-project';
        projectLink.id = projects[i].name;
        projectLink.innerHTML = projects[i].name;
        let br = document.createElement('br');

        projectContainer.appendChild(projectLink);
        projectContainer.appendChild(br);
    }
    createEvent();
}

function createEvent() {
    let btn = document.getElementsByClassName('btn-project');
    for(let i=0;i<btn.length;i++){
        btn[i].onclick = function(event){
            project_id = btn[i].id;
            buildTasks();
            //console.log(project_id)
        };
    }
}

function createTask() {
    let taskName = $('#taskName').val();
    tasks.push({name:taskName});
    for (let i=0;i<projects.length;i++){
        if(project_id == projects[i].name) {
            console.log(projects[i]);
            projects[i].task = tasks;
        }
    }
    projects = JSON.stringify(projects);
    localStorage.setItem('project',projects);
    buildTasks();
}

function buildTasks(){
    projects = JSON.parse(localStorage.getItem('project'));
    for(let i=0; i<projects.length;i++){
        if(project_id == projects[i].name) {
            let getTasks = projects[i].task;
            for (let j = 0; j < getTasks.length; j++) {
                let taskContainer = document.getElementById('taskContainer');
                let taskBlock = document.createElement('div');
                taskBlock.className = 'tasks';
                taskBlock.id = getTasks[j].name;
                let br = document.createElement('br');
                let h3 = document.createElement('h3');
                h3.innerHTML = getTasks[j].name;

                taskContainer.appendChild(taskBlock);
                taskContainer.appendChild(h3);
                taskContainer.appendChild(br);
            }
        }
    }
}


