import _ from 'lodash'
import Task from './Task.js'
import Project from './Project.js'
import { closestIndexTo, compareAsc, daysToWeeks, format, getDay, isBefore, isPast, isThisWeek, isToday, max, parse, parseISO, setDay } from 'date-fns' 

let selected = null 

class UI {

    
    static loadPage() {

        const homePage = document.createElement('div')
        const todayPage = document.createElement('div')
        const weekPage = document.createElement('div')

        homePage.classList.add('homePage')
        todayPage.classList.add('todayPage')
        weekPage.classList.add('weekPage')

        const todayPageHeader = document.createElement('h1')
        const weekPageHeader = document.createElement('h1')
        todayPage.appendChild(todayPageHeader)
        weekPage.appendChild(weekPageHeader)
        todayPageHeader.textContent = 'Today'
        todayPageHeader.style.alignSelf = 'center'
        weekPageHeader.textContent = 'Week'
        weekPageHeader.style.alignSelf = 'center'
        
        const mainPage = document.querySelector('.mainPage')

        mainPage.appendChild(homePage)
        mainPage.appendChild(todayPage)
        mainPage.appendChild(weekPage)

        todayPage.style.display = 'none'
        weekPage.style.display = 'none'

        const sideBottom = document.querySelector('.sideBottom')
        const projectList = document.createElement('div')
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
        const homePageList = document.getElementById('homePageList')
        const home = document.querySelector('.home')
        const today = document.querySelector('.today')
        const week = document.querySelector('.week')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('home')) {
                
                
                todayPage.style.display = 'none'
                weekPage.style.display = 'none'
                home.classList.add('activeButton')
                today.classList.remove('activeButton')
                week.classList.remove('activeButton')
                const taskCreations = document.querySelectorAll('.taskCreation').forEach((taskCreation) => taskCreation.style.display = 'none')
                const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')
                homePage.style.display = 'flex'
                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))

                const tasks = document.querySelectorAll('.task')
                tasks.forEach((task) => homePageList.appendChild(task))
                
            }
        })
    }

    static handleTodayPage(homePage, todayPage, weekPage) {

        const sideBar = document.querySelector('.sidebar')
        const home = document.querySelector('.home')
        const today = document.querySelector('.today')
        const week = document.querySelector('.week')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('today')) {
                
                homePage.style.display = 'none'
                weekPage.style.display = 'none'
                home.classList.remove('activeButton')
                today.classList.add('activeButton')
                week.classList.remove('activeButton')
                const taskCreations = document.querySelectorAll('.taskCreation').forEach((taskCreation) => taskCreation.style.display = 'none')
                const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')
                todayPage.style.display = 'flex'
                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))

                const tasks = document.querySelectorAll('.task')
                tasks.forEach((task) => UI.checkDate(task))
            }
        })
    }

    static handleWeekPage(homePage, todayPage, weekPage) {

        const sideBar = document.querySelector('.sidebar')
        const home = document.querySelector('.home')
        const today = document.querySelector('.today')
        const week = document.querySelector('.week')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('week')) {
                
                homePage.style.display = 'none'
                todayPage.style.display = 'none'
                home.classList.remove('activeButton')
                today.classList.remove('activeButton')
                week.classList.add('activeButton')
                const taskCreations = document.querySelectorAll('.taskCreation').forEach((taskCreation) => taskCreation.style.display = 'none')
                const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')
                weekPage.style.display = 'flex'
                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))

                const tasks = document.querySelectorAll('.task')
                tasks.forEach((task) => UI.checkDate(task))
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
            list.setAttribute('id', `${pageName}List`)
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

        if(titleInput.value !== '' && descriptionInput.value !== '' && (isToday(parseISO(dateInput.value)) || isPast(parseISO(dateInput.value)) === false) && priorityInput.value !== 'Priority') {

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

                                if(page.getAttribute('id') === null) {

                                    Task.editDate(Array.from(list.children).indexOf(selectedTask), task.date)
                                    let dateIndex = Task.getDateArrayIndex(task.date)


                                    list.removeChild(selectedTask)
                                    list.insertBefore(selectedTask, Array.from(list.children)[dateIndex+=1])

                                    Task.deleteTask(selectedTask.getAttribute('id'))
                                    Task.addTask(task.date, selectedTask.getAttribute('id'))

                                } else {

                                    Project.editDate(page.getAttribute('id'), Array.from(list.children).indexOf(selectedTask), task.date)
                                    let dateIndex = Project.getDateArrayIndex(page.getAttribute('id'), task.date)


                                    list.removeChild(selectedTask)
                                    list.insertBefore(selectedTask, Array.from(list.children)[dateIndex+=1])

                                    Project.deleteTask(page.getAttribute('id'), selectedTask.getAttribute('id'))
                                    Project.addTask(page.getAttribute('id'), task.date, selectedTask.getAttribute('id'))


                                        const dueToday = document.querySelector('.dueToday')

                                        if(Project.tasksDueToday(page.getAttribute('id')) === 0) {
                            
                                        dueToday.style.display = 'none'
                        
                                        } else {

                                        dueToday.style.display = 'flex'
                                        dueToday.textContent = `${Project.tasksDueToday(page.getAttribute('id'))}`
                        
                                        }
                                }

                                list.style.display = 'table'  
                                taskButton.style.display = 'flex'
                                taskCreation.style.display = 'none'
                                selected = null
            } else {

            const row = document.createElement('tr')
            row.classList.add('task')

            row.innerHTML = `   <td>${task.title}</td>
                                <td>${task.description}</td>
                                <td>${task.date}</td>
                                <td width='100'><img class='check' src='./Images/checkMark.png'>
                                <img class='edit' src='./Images/edit.png'>
                                <img class='delete' src='./Images/delete.png'></td>`
            
            row.setAttribute('id', crypto.randomUUID())


            if(page.classList.contains('projectPage')) {
                
                row.classList.add(`${page.getAttribute('id')}Task`)
                row.classList.remove('task')

                Project.addDate(page.getAttribute('id'), task.date)
                Project.addTask(page.getAttribute('id'), task.date, row.getAttribute('id'))

                let dateIndex = Project.getDateArrayIndex(page.getAttribute('id'), task.date)

                if(list.children.length < 2) {
                   
                    list.appendChild(row)
                
                } else {
                
                    list.insertBefore(row, list.children[dateIndex+=1])
                
                }

                    const dueToday = document.querySelector('.dueToday')

                    if(Project.tasksDueToday(page.getAttribute('id')) === 0) {
                        
                        dueToday.style.display = 'none'
                    
                    } else {

                    dueToday.style.display = 'flex'
                    dueToday.textContent = `${Project.tasksDueToday(page.getAttribute('id'))}`
                    
                }
            
            } else {

            Task.addDate(task.date)
            Task.addTask(task.date, row.getAttribute('id'))
            
            let dateIndex = Task.getDateArrayIndex(task.date)

            if(list.children.length < 2) {
                
                list.appendChild(row)
            
            } else {
            
                list.insertBefore(row, list.children[dateIndex+=1])
            }
        
        }

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

    static checkDate(task) {
        
        const todayPageList = document.getElementById('todayPageList')
        const weekPageList = document.getElementById('weekPageList')
        
        let date = parseISO(task.lastElementChild.previousElementSibling.textContent)
        let dayOfWeek = getDay(new Date())
        
        if(isToday(date)) {

            todayPageList.appendChild(task)
            todayPageList.style.display = 'table'
        
        } else if(isThisWeek(date, {weekStartsOn: dayOfWeek})) {

            weekPageList.appendChild(task)
            weekPageList.style.display = 'table'
        
        }

    }

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
        
            if(!e.target.parentElement.parentElement.classList.contains('task')) {
                
                Project.deleteDate(e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id'), e.target.parentElement.previousElementSibling.textContent)
                Project.deleteTask(e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id'), e.target.parentElement.previousElementSibling.textContent)
                e.target.parentElement.parentElement.remove()

            } else {

            e.target.parentElement.parentElement.remove()
            Task.deleteDate(e.target.parentElement.previousElementSibling.textContent)
            Task.deleteTask(e.target.parentElement.previousElementSibling.textContent)
            
            }
    }
    
    
    if(list.childNodes.length < 2) {
        list.style.display = 'none'
    }

})

}

static handleAddProjectDisplay(addProject, addProjectContainer) {

    addProject.addEventListener('click', () => {

        addProjectContainer.style.display = 'flex'
        addProject.style.display = 'none'
    })

}

static addProjectDisplay() {

    const addProject = document.querySelector('.addProject')
    const sideBottom = document.querySelector('.sideBottom')

    const addProjectContainer = document.createElement('div')
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
        addProjectContainer.appendChild(projectInput)
        addProjectContainer.appendChild(buttons)
        sideBottom.appendChild(addProjectContainer)
        addProjectContainer.classList.add('addProjectContainer')
        addProjectContainer.style.display = 'none'

        UI.handleAddProjectDisplay(addProject, addProjectContainer)
        UI.handleSubmitProject(projectSubmit) 
        UI.handleCancel(cancel, addProjectContainer, addProject)

}

static handleSubmitProject(projectSubmit) {

    projectSubmit.addEventListener('click', UI.submitProject)

}

static submitProject() {
    
    const mainPage = document.querySelector('.mainPage')
    const projectInput = document.querySelector('.projectInput')
    const addProjectContainer = document.querySelector('.addProjectContainer')
    const addProject = document.querySelector('.addProject')
    const projectList = document.querySelector('.projectList')
    const projectContainer = document.getElementById(`${projectInput.value}`)

if(projectInput.value !== '' && projectContainer === null) {

    let currentProject = new Project(projectInput.value)

    const projectContainer = document.createElement('div')
    const project = document.createElement('div')
    const dueToday = document.createElement('div')
    const projectPage = document.createElement('div')  

    projectContainer.classList.add('projectContainer')
    projectContainer.setAttribute('id', `${currentProject.name}`)

    project.classList.add('project')

    dueToday.classList.add('dueToday')

    projectPage.classList.add('projectPage')
    projectPage.setAttribute('id', `${currentProject.name}Page`)

    projectContainer.appendChild(project)
    projectContainer.appendChild(dueToday)
    projectList.appendChild(projectContainer)
    mainPage.appendChild(projectPage)

    project.textContent = currentProject.name

    projectInput.value = ''
    
    addProjectContainer.style.display = 'none'
    projectPage.style.display = 'none'
    dueToday.style.display = 'none'
    addProject.style.display = 'flex'

    UI.addList(projectPage, currentProject.name)
    UI.addTask(projectPage)
    UI.handleProjectPage()

    Project.addProject(projectContainer.getAttribute('id'))

}}

static handleProjectPage() {

    const sideBar = document.querySelector('.sidebar')
    const homePage = document.querySelector('.homePage')
    const todayPage = document.querySelector('.todayPage')
    const weekPage = document.querySelector('.weekPage')
    const home = document.querySelector('.home')
    const today = document.querySelector('.today')
    const week = document.querySelector('.week')

    sideBar.addEventListener('click', (e) => {

        if(e.target.parentElement.classList.contains('projectContainer') || e.target.classList.contains('projectContainer')) {
            
            const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
            const projectPage = document.getElementById(`${e.target.textContent}Page`)
            const projectContainer = document.getElementById(`${e.target.textContent}`)

            homePage.style.display = 'none'
            todayPage.style.display = 'none'
            weekPage.style.display = 'none'
            home.classList.remove('activeButton')
            today.classList.remove('activeButton')
            week.classList.remove('activeButton')

            const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))
            projectContainer.classList.add('activeButton')
            const taskCreations = document.querySelectorAll('.taskCreation').forEach((taskCreation) => taskCreation.style.display = 'none')
            const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')
            projectPage.style.display = 'flex'

            const projectList = document.getElementById(`${e.target.textContent}List`)
            const projectTasks = document.querySelectorAll(`.${e.target.textContent}PageTask`)
            projectTasks.forEach((projectTask) => projectList.appendChild(projectTask))
            
}})
    
}

static handleCancel(cancel, addprojectContainer, addProject) {
    
    cancel.addEventListener('click', () => {

    addprojectContainer.style.display = 'none'
    addProject.style.display = 'flex'

})}


}


export default UI