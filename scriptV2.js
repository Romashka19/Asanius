const Project = function(project_id,projects,task_id,tasks){
    this.project_id = project_id;
    this.task_id = task_id;
    this.projects = projects;
    this.tasks = tasks;

    this.check = function () {
        if(localStorage.getItem('project') == null){
            localStorage.setItem('project','[]')
        }else{
            this.buildProject();
        }

    };

    this.addProject = function (projects,tasks) {
        projects = JSON.parse(localStorage.getItem('project'));
        let projectName = $('#projectName').val();
        if(projectName){
            projects.push({name: projectName, task: tasks});
            projects = JSON.stringify(projects);
            localStorage.setItem('project', projects);
            project.buildProject();
        }

    };

    this.buildProject = function () {
        projects = JSON.parse(localStorage.getItem('project'));
        let building = document.getElementById('building');
        let content = '';
        for (let i = 0; i < projects.length; i++) {
            content += '<button class="btn-project" id="' + projects[i].name + '">' + projects[i].name + '</button>';
        }
        building.innerHTML = content;
        project.createEvent();
    };

    this.createEvent = function () {
        let btn = document.getElementsByClassName('btn-project');
        for(let i=0;i<btn.length;i++){
            btn[i].addEventListener("click",function () {
                project_id = btn[i].id;
                project.buildTask(project_id);
            });
        }
    };

    this.addTask = function () {
        let taskName = $('#taskName').val();
        if(taskName){
            projects.filter(function (e) {
                return e.name == project_id;
            }).map(function (e) {
                e.task.push({name:taskName})
            });
            projects = JSON.stringify(projects);
            localStorage.setItem('project',projects);
            project.buildTask(project_id);
        }

    };

    this.buildTask = function (project_id) {
        projects = JSON.parse(localStorage.getItem('project'));
        let taskContainer = document.getElementById('taskContainer');
        let content = '';
        let getTasks;
        projects.filter(function (e) {
            return e.name == project_id;
        }).map(function (e) {
            getTasks = e.task;
        });
        console.log(getTasks);
        for (let j = 0; j < getTasks.length; j++) {
            content +=  '<div class="tasks" id="'+ getTasks[j].name +'">\n' +
                '                <h3>'+ getTasks[j].name +'</h3>\n' +
                '                <button class="btn btn-dark btn-task" data-toggle="modal" data-target="#editTask" id="'+ getTasks[j].name +'">edit</button>\n' +
                '                <button class="btn btn-dark btn-task" data-toggle="modal" data-target="#deleteTask" id="'+ getTasks[j].name +'">delete</button>\n' +
                '        </div>';

        }
        taskContainer.innerHTML = content;
        project.eventTask();
    };

    this.eventTask = function () {
        let btn = document.getElementsByClassName('btn-task');
        for(let i=0;i<btn.length;i++){
            btn[i].addEventListener("click",function () {
                task_id = btn[i].id;
                console.log(task_id)
            });
        }
    };

    this.editTask = function () {
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
        });
        projects = JSON.stringify(projects);
        localStorage.setItem('project',projects);
        project.buildTask(project_id);
    };

    this.deleteTask = function () {
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
        project.buildTask(project_id);
    };
};

const project = new Project();

project.check();
