import _ from 'lodash'
import Task from './Task.js'
import Project from './Project.js'

let selected = null 

class UI {

    
    static loadPage() {

        const homePage = document.createElement('div')
        const todayPage = document.createElement('div')
        const weekPage = document.createElement('div')

        homePage.classList.add('homePage')
        todayPage.classList.add('todayPage')
        weekPage.classList.add('weekPage')

        todayPage.textContent = 'Congratulations! There are no daily tasks to complete at this time!'
        weekPage.textContent = 'Congratulations! There are no weekly tasks to complete at this time!'
        
        const mainPage = document.querySelector('.mainPage')

        mainPage.appendChild(homePage)
        mainPage.appendChild(todayPage)
        mainPage.appendChild(weekPage)

        todayPage.style.display = 'none'
        weekPage.style.display = 'none'

        const sideBottom = document.querySelector('.sideBottom')
        const projectList = document.createElement('ul')
        projectList.classList.add('projectList')

        UI.addProjectDisplay(projectList)
        sideBottom.appendChild(projectList)
        

        UI.addList(homePage, 'homePage')
        UI.addList(todayPage, 'todayPage')
        UI.addList(weekPage, 'weekPage')
        UI.addTask(homePage)
        UI.handleHomePage(homePage, todayPage, weekPage)
        UI.handleTodayPage(homePage, todayPage, weekPage)
        UI.handleWeekPage(homePage, todayPage, weekPage)
    }

    static handleHomePage(homePage, todayPage, weekPage) {
        
        const sideBar = document.querySelector('.sidebar')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('home')) {
                
                todayPage.style.display = 'none'
                weekPage.style.display = 'none'
                homePage.style.display = 'flex'
                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projects = document.querySelectorAll('.project').forEach((x) => x.style.backgroundColor = 'transparent')

                
            }
        })
    }

    static handleTodayPage(homePage, todayPage, weekPage) {

        const sideBar = document.querySelector('.sidebar')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('today')) {
                
                homePage.style.display = 'none'
                weekPage.style.display = 'none'
                todayPage.style.display = 'flex'
                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projects = document.querySelectorAll('.project').forEach((x) => x.style.backgroundColor = 'transparent')

            }
        })
    }

    static handleWeekPage(homePage, todayPage, weekPage) {

        const sideBar = document.querySelector('.sidebar')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('week')) {
                
                homePage.style.display = 'none'
                todayPage.style.display = 'none'
                weekPage.style.display = 'flex'
                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projects = document.querySelectorAll('.project').forEach((x) => x.style.backgroundColor = 'transparent')


            }
        })
    }


    static addTask(page) {

        const taskButton = document.createElement('div')
        taskButton.classList.add('taskButton')
        taskButton.textContent = '+ Add Task'

        page.appendChild(taskButton)
        UI.handleTaskButton(page, taskButton)

    }

    static addList(page, pageName) {

        const list = document.createElement('table')
            list.classList.add('list')
            list.setAttribute('id', `${pageName}list`)
            const headerRow = document.createElement('tr')
            const titleHeader = document.createElement('th')
            const descriptionHeader = document.createElement('th')
            const dateHeader = document.createElement('th')
            const buttonHeader = document.createElement('th')
            titleHeader.textContent = 'Task'
            descriptionHeader.textContent = 'Description'
            dateHeader.textContent = 'Due'
            buttonHeader.textContent = 'Check/Edit/Delete'
            headerRow.appendChild(titleHeader)
            headerRow.appendChild(descriptionHeader)
            headerRow.appendChild(dateHeader)
            headerRow.appendChild(buttonHeader)
            list.appendChild(headerRow)
            list.style.display = 'none'

        page.appendChild(list)

        UI.handleDelete(list)
    }

    static handleTaskButton(page, taskButton) {
            
        const taskCreation = document.createElement('div')
        page.appendChild(taskCreation)
        

        taskButton.addEventListener('click',() => {
            taskButton.style.display = 'none'
            taskCreation.innerHTML = `<div class='taskCreation'>
                                    <div class='leftSide'>
                                    <input class='titleInput' placeholder='Title'>
                                    <textarea class='descriptionInput' rows= '4' cols='50' placeholder='Description' style="resize:none"></textArea>
                                    </div>
                                    <div class='rightSide'>
                                    <input type='date' class='dateInput'>
                                    <select class='priorityInput'>
                                        <option selected disabled>Priority</option>
                                        <option value='Low'>Low</option>
                                        <option value='Medium'>Medium</option>
                                        <option value='Urgent'>Urgent</option>
                                    </select>
                                    <button class='submit'>Submit</button>
                                    </div>
                                </div>`
                            
                UI.submit(page)
                console.log(page.firstElementChild.getAttribute('id'))
        })

    }


    static submit(page) {

        const titleInput = page.querySelector('.titleInput')
        const descriptionInput = page.querySelector('.descriptionInput')
        const dateInput = page.querySelector('.dateInput')
        const priorityInput = page.querySelector('.priorityInput')
        const taskButton = page.querySelector('.taskButton')
        const taskCreation = page.querySelector('.taskCreation')
        const submit = page.querySelector('.submit')

        submit.addEventListener('click', (e) => {
        
        const list = document.getElementById(e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.getAttribute('id'))
        const selectedTask = document.getElementById(selected)

        let task = new Task(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value)

        if(titleInput.value !== '' && descriptionInput.value !== '' && dateInput.value !== '' && priorityInput.value !== 'Priority') {

            if(selectedTask !== null) {
                
                selectedTask.innerHTML = `<td>${task.title}</td>
                                <td>${task.description}</td>
                                <td>${task.date}</td>
                                <td width='100'><img class='check' src='./Images/checkMark.png'>
                                <img class='edit' src='./Images/edit.png'>
                                <img class='delete' src='./Images/delete.png'></td>`
                
                                if(task.priority === 'Urgent') {
                                    selectedTask.classList.add('urgent')
                                    selectedTask.classList.remove('medium')
                                    selectedTask.classList.remove('low')
                                } else if(task.priority === 'Medium') {
                                    selectedTask.classList.add('medium')
                                    selectedTask.classList.remove('urgent')
                                    selectedTask.classList.remove('low')
                                } else {
                                    selectedTask.classList.add('low')
                                    selectedTask.classList.remove('urgent')
                                    selectedTask.classList.remove('medium')
                                }
                                
                
                                list.style.display = 'table'
                                taskButton.style.display = 'flex'
                                taskCreation.style.display = 'none'
                                selected = null
            } else {

            const row = document.createElement('tr')

            row.innerHTML = `   <td>${task.title}</td>
                                <td>${task.description}</td>
                                <td>${task.date}</td>
                                <td width='100'><img class='check' src='./Images/checkMark.png'>
                                <img class='edit' src='./Images/edit.png'>
                                <img class='delete' src='./Images/delete.png'></td>`

            list.appendChild(row)
            row.setAttribute('id', crypto.randomUUID())



            if(task.priority === 'Urgent') {
                row.classList.add('urgent')
                row.classList.remove('medium')
                row.classList.remove('low')
            } else if(task.priority === 'Medium') {
                row.classList.add('medium')
                row.classList.remove('urgent')
                row.classList.remove('low')
            } else {
                row.classList.add('low')
                row.classList.remove('urgent')
                row.classList.remove('medium')
            }
            

            list.style.display = 'table'
            taskButton.style.display = 'flex'

            UI.handleCheck(row)
            UI.handleEdit(page, row)
            taskCreation.style.display = 'none'
            selected = null

            }}
        })
    }

//     static handleSubmit() {
        
//         const submit = document.querySelector('.submit')

//         submit.addEventListener('click', UI.submit)

// }

static handleCheck(row) {


    row.addEventListener('click', (e) => {

        if(e.target.classList.contains('check')) {

            if(row.classList.contains('urgent') || e.target.classList.contains('urgent')) {
            row.classList.toggle('urgent')
            row.classList.toggle('complete')
            e.target.classList.toggle('urgent')
        } else if(row.classList.contains('medium') || e.target.classList.contains('medium')) {
            row.classList.toggle('medium')
            row.classList.toggle('complete')
            e.target.classList.toggle('medium')
        } else if(row.classList.contains('low') || e.target.classList.contains('low')) {
            row.classList.toggle('low')
            row.classList.toggle('complete')
            e.target.classList.toggle('low')
        }
    }})
}


static handleEdit(page, element) { 
    
    const list = page.querySelector('.list')
    const taskButton = page.querySelector('.taskButton')
    
    element.addEventListener('click', (e) => {

        const taskCreation = page.querySelector('.taskCreation')
        const titleInput = page.querySelector('.titleInput')
        titleInput.setAttribute('value', `${element.getElementsByTagName('td')[0].textContent}`)

    if(e.target.classList.contains('edit')) {
        selected = e.target.parentElement.parentElement.getAttribute('id')
        list.style.display = 'none'        
        taskButton.style.display = 'none'
        taskCreation.style.display = 'flex'
    }})}


static handleDelete(list) {

    list.addEventListener('click', (e) => {

        if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove()
    }
    
    
    if(list.childNodes.length < 2) {
        list.style.display = 'none'
    }

})

}

static handleAddProjectDisplay(addProject, projectContainer) {

    addProject.addEventListener('click', () => {

        projectContainer.style.display = 'flex'
        addProject.style.display = 'none'
    })
}

static addProjectDisplay() {

    const addProject = document.querySelector('.addProject')
    const sideBottom = document.querySelector('.sideBottom')

    const projectContainer = document.createElement('div')
    const projectInput = document.createElement('input')
    projectInput.maxLength = 12
        const buttons = document.createElement('div')
        const projectSubmit = document.createElement('button')
        projectSubmit.textContent = 'Submit'
        const cancel = document.createElement('button')
        cancel.textContent = 'Cancel'
        projectInput.classList.add('projectInput')
        buttons.classList.add('buttons')
        projectSubmit.classList.add('projectSubmit')
        cancel.classList.add('cancel')
        buttons.appendChild(projectSubmit)
        buttons.appendChild(cancel)
        projectContainer.appendChild(projectInput)
        projectContainer.appendChild(buttons)
        sideBottom.appendChild(projectContainer)
        projectContainer.classList.add('projectContainer')
        projectContainer.style.display = 'none'

        UI.handleAddProjectDisplay(addProject, projectContainer)
        UI.handleSubmitProject(projectSubmit) 
        UI.handleCancel(cancel, projectContainer, addProject)

}

static handleSubmitProject(projectSubmit) {

    projectSubmit.addEventListener('click', UI.submitProject)

}

static submitProject() {
    
    const mainPage = document.querySelector('.mainPage')
    const projectInput = document.querySelector('.projectInput')
    const projectContainer = document.querySelector('.projectContainer')
    const addProject = document.querySelector('.addProject')
    const projectList = document.querySelector('.projectList')

    let currentProject = new Project(projectInput.value)

    const project = document.createElement('li')
    const projectPage = document.createElement('div')   
    project.classList.add('project')
    project.setAttribute('id', `${currentProject.name}`)
    projectPage.classList.add('projectPage')
    projectPage.setAttribute('id', `${currentProject.name}Page`)
    projectList.appendChild(project)
    mainPage.appendChild(projectPage)
    project.textContent = currentProject.name
    projectInput.value = ''
    projectContainer.style.display = 'none'
    projectPage.style.display = 'none'
    addProject.style.display = 'flex'

    UI.addList(projectPage, currentProject.name)
    UI.addTask(projectPage)
    UI.handleProjectPage()

}

static handleProjectPage() {

    const sideBar = document.querySelector('.sidebar')
    const homePage = document.querySelector('.homePage')
    const todayPage = document.querySelector('.todayPage')
    const weekPage = document.querySelector('.weekPage')

    sideBar.addEventListener('click', (e) => {

        if(e.target.classList.contains('project')) {
            
            const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
            const projectPage = document.getElementById(`${e.target.textContent}Page`)
            const projects = document.querySelectorAll('.project')
            const project = document.getElementById(`${e.target.textContent}`)

            homePage.style.display = 'none'
            todayPage.style.display = 'none'
            weekPage.style.display = 'none'
            projects.forEach((x) => x.style.backgroundColor = 'transparent')
            project.style.backgroundColor = 'grey'
            project.style.borderRadius = '10px'
            projectPage.style.display = 'flex'
            
}})
    
}

static handleCancel(cancel, projectContainer, addProject) {
    
    cancel.addEventListener('click', () => {

    projectContainer.style.display = 'none'
    addProject.style.display = 'flex'

})}


}


export default UI