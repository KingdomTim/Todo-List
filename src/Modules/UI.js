import _ from 'lodash'
import Task from './Task.js'
import Project from './Project.js'
import { closestIndexTo, compareAsc, daysToWeeks, format, getDay, isBefore, isPast, isThisWeek, isToday, max, parse, parseISO, setDay } from 'date-fns' 
import { de } from 'date-fns/locale'

let selected = null 

class UI {

    
    static loadPage() {

        const home = document.querySelector('.home')
        const homePage = document.createElement('div')
        const todayPage = document.createElement('div')
        const weekPage = document.createElement('div')

        home.classList.add('activeButton')
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

        const taskCreation = document.createElement('div')
        taskCreation.classList.add('taskCreation')
        taskCreation.innerHTML = `<div class='leftSide'>
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
                                    </div>`

        taskCreation.style.display = 'none'

        homePage.appendChild(taskCreation)
        
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
        UI.submit()
        UI.handleHomePage(homePage, todayPage, weekPage)
        UI.handleTodayPage(homePage, todayPage, weekPage)
        UI.handleWeekPage(homePage, todayPage, weekPage)
        UI.handleDeleteProject()
    }

    static handleHomePage(homePage, todayPage, weekPage) {
        
        const sideBar = document.querySelector('.sidebar')
        const homePageList = document.getElementById('homePageList')
        const home = document.querySelector('.home')
        const today = document.querySelector('.today')
        const week = document.querySelector('.week')
        const taskCreation = document.querySelector('.taskCreation')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('home')) {
                
                todayPage.style.display = 'none'
                weekPage.style.display = 'none'
                homePage.style.display = 'flex'

                home.classList.add('activeButton')
                today.classList.remove('activeButton')
                week.classList.remove('activeButton')

                const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')
                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))

                const tasks = document.querySelectorAll('.task')
                tasks.forEach((task) => UI.sortDates(task))
                
                if(homePageList.children.length > 1) {
                    homePageList.style.display = 'table'
                    selected = null
                } else if (homePageList.children.length < 2) {
                    homePageList.style.display = 'none'
                }

                homePage.appendChild(taskCreation)
                taskCreation.style.display = 'none'

            }
        })
    }

    static handleTodayPage(homePage, todayPage, weekPage) {

        const sideBar = document.querySelector('.sidebar')
        const todayPageList = document.getElementById('todayPageList')
        const home = document.querySelector('.home')
        const today = document.querySelector('.today')
        const week = document.querySelector('.week')
        const taskCreation = document.querySelector('.taskCreation')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('today')) {
                
                homePage.style.display = 'none'
                weekPage.style.display = 'none'
                todayPage.style.display = 'flex'

                home.classList.remove('activeButton')
                today.classList.add('activeButton')
                week.classList.remove('activeButton')
                
                const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')

                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))

                const tasks = document.querySelectorAll('.task')
                tasks.forEach((task) => UI.sortDates(task))

                todayPage.appendChild(taskCreation)
                taskCreation.style.display = 'none'

                UI.checkList(todayPageList)
            }
        })
    }

    static handleWeekPage(homePage, todayPage, weekPage) {

        const sideBar = document.querySelector('.sidebar')
        const weekPageList = document.getElementById('weekPageList')
        const home = document.querySelector('.home')
        const today = document.querySelector('.today')
        const week = document.querySelector('.week')
        const taskCreation = document.querySelector('.taskCreation')

        sideBar.addEventListener('click', (e) => {

            if(e.target.classList.contains('week')) {
                
                homePage.style.display = 'none'
                todayPage.style.display = 'none'
                weekPage.style.display = 'flex'
                
                home.classList.remove('activeButton')
                today.classList.remove('activeButton')
                week.classList.add('activeButton')
                
                const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')

                const projectPages = document.querySelectorAll('.projectPage').forEach((x) => x.style.display = 'none')
                const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))

                const tasks = document.querySelectorAll('.task')
                tasks.forEach((task) => UI.sortDates(task))

                weekPage.appendChild(taskCreation)
                taskCreation.style.display = 'none'
            
                UI.checkList(weekPageList)
            }
        })
    }


    static addTask(page) {

        const taskButton = document.createElement('div')
        taskButton.classList.add('taskButton')
        taskButton.textContent = '+ Add Task'

        page.appendChild(taskButton)
        UI.handleTaskButton(taskButton)

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

    static handleTaskButton(taskButton) {

        const taskCreation = document.querySelector('.taskCreation')
        const titleInput = document.querySelector('.titleInput')
        const descriptionInput = document.querySelector('.descriptionInput')
        const dateInput = document.querySelector('.dateInput')
        const priorityInput = document.querySelector('.priorityInput')

        taskButton.addEventListener('click',(e) => {
            
            const page = e.target.parentElement

            taskButton.style.display = 'none'
            page.appendChild(taskCreation)
            taskCreation.style.display = 'flex'

            titleInput.value = ''
            descriptionInput.value = ''
            dateInput.value = ''
            priorityInput.selectedIndex = 0

        })

    }


    static submit() {

        const titleInput = document.querySelector('.titleInput')
        const descriptionInput = document.querySelector('.descriptionInput')
        const dateInput = document.querySelector('.dateInput')
        const priorityInput = document.querySelector('.priorityInput')
        const taskCreation = document.querySelector('.taskCreation')
        const submit = document.querySelector('.submit')

        submit.addEventListener('click', (e) => {
        
        const page = e.target.parentElement.parentElement.parentElement
        const list = page.querySelector('.list')
        const selectedTask = document.getElementById(selected)
        const taskButton = page.querySelector('.taskButton')

        let task = new Task(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value)

        if(titleInput.value !== '' && descriptionInput.value !== '' && (isToday(parseISO(dateInput.value)) || isPast(parseISO(dateInput.value)) === false) && priorityInput.value !== 'Priority') {

            if(selectedTask !== null) {
                
                selectedTask.innerHTML = `<td>${task.title}</td>
                                <td>${task.description}</td>
                                <td>${task.date}</td>
                                <td width='100'><img class='check' src='./Images/checkMark.png'>
                                <img class='edit' src='./Images/edit.png'>
                                <img class='delete' src='./Images/delete.png'></td>`
                
                               UI.checkPriority(task.priority, selectedTask)

                                if(page.getAttribute('id') === null) {

                                    Task.editDate(Array.from(list.children).indexOf(selectedTask), task.date)
                                            
                                            Task.deleteTask(selectedTask.getAttribute('id'))
                                            Task.addTask(task.date, selectedTask.getAttribute('id'))

                                            list.removeChild(selectedTask)
                                            UI.sortDates(selectedTask)
                                } else {

                                    Project.editDate(page.getAttribute('id'), Array.from(list.children).indexOf(selectedTask), task.date)

                                    list.removeChild(selectedTask)

                                    Project.deleteTask(page.getAttribute('id'), selectedTask.getAttribute('id'))
                                    Project.addTask(page.getAttribute('id'), task.date, selectedTask.getAttribute('id'))

                                    UI.checkProjectDate(page, selectedTask)
                                    
                                }

                                if(page.classList.contains('todayPage')) {

                                    if(list.children.length < 2) {
                                        list.style.display = 'none'
                                        taskCreation.style.display = 'none'
                                    } else {
                                        list.style.display = 'table'
                                        taskCreation.style.display = 'none'
                                    }
                
                                } else if (page.classList.contains('weekPage')) {
                
                                    if(list.children.length < 2) {
                                        list.style.display = 'none'
                                        taskCreation.style.display = 'none'
                                    } else {
                                        list.style.display = 'table'
                                        taskCreation.style.display = 'none'
                                    }
                
                                } else {
                
                                    list.style.display = 'table'
                                    taskButton.style.display = 'flex'
                                    taskCreation.style.display = 'none'
                                    
                                }

                                selected = null


                                UI.checkList(list)

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
                    
                    UI.checkProjectDate(page, row)

                } else {

                Task.addDate(task.date)
                Task.addTask(task.date, row.getAttribute('id'))
                UI.sortDates(row)
            
                }

                UI.checkPriority(task.priority, row)
                
                list.style.display = 'table'
                taskButton.style.display = 'flex'
                taskCreation.style.display = 'none'

                UI.handleCheck(row)
                UI.handleEdit(page, row)
                selected = null
                
           }}
        })
    }

    static checkPriority(priority, row) {

        if(priority === 'Urgent') {
            row.classList.add('urgent')
            row.classList.remove('medium')
            row.classList.remove('low')
        } else if(priority === 'Medium') {
            row.classList.add('medium')
            row.classList.remove('urgent')
            row.classList.remove('low')
        } else {
            row.classList.add('low')
            row.classList.remove('urgent')
            row.classList.remove('medium')
        }

    }

    static checkProjectDate(projectPage, task) {
        
        let date = task.lastElementChild.previousElementSibling.textContent
        const projectList = document.getElementById(`${projectPage.firstElementChild.getAttribute('id')}`)

        let dateIndex = Project.getDateArrayIndex(projectPage.getAttribute('id'), date)

                if(projectList.children.length < 2) {
                
                    projectList.appendChild(task)
                    task.style.display = 'table-row'
                
                } else {
                
                    projectList.insertBefore(task, projectList.children[dateIndex+=1])
                    task.style.display = 'table-row'
                }

                    const dueToday = document.getElementById(`${projectPage.getAttribute('id')}DueToday`)

                    if(Project.tasksDueToday(projectPage.getAttribute('id')) === 0) {
                        
                        dueToday.style.visibility = 'hidden'
                    
                    } else {

                    dueToday.style.visibility = 'visible'
                    dueToday.textContent = `${Project.tasksDueToday(projectPage.getAttribute('id'))}`
                    
                }
    
        }

    static sortDates(task) {
        
        const todayPageList = document.getElementById('todayPageList')
        const weekPageList = document.getElementById('weekPageList')
        const homePageList = document.getElementById('homePageList')
        const home = document.querySelector('.home')
        const today = document.querySelector('.today')
        const week = document.querySelector('.week')
        
        let date = task.lastElementChild.previousElementSibling.textContent
        let parsedDate = parseISO(task.lastElementChild.previousElementSibling.textContent)
        let dayOfWeek = getDay(new Date())

        if(home.classList.contains('activeButton')) {
        
            if(homePageList.children.length < 2) {
            
            homePageList.appendChild(task)
            task.style.display = 'table-row'
            homePageList.style.display = 'table'
            
            } else {

            let dateIndex = Task.getDateArrayIndex(date)

            task.style.display = 'table-row'
            homePageList.insertBefore(task, Array.from(homePageList.children)[dateIndex+=1])

        }
    
        } else if(today.classList.contains('activeButton')) {

            if(todayPageList.children.length < 2) {
                
                todayPageList.appendChild(task)
                
                } else {
    
                let dateIndex = Task.getDateArrayIndex(date)
                
                todayPageList.insertBefore(task, Array.from(todayPageList.children)[dateIndex+=1])
    
            }

            UI.sortTodayTasks()

        } else if(week.classList.contains('activeButton')) {

            if(weekPageList.children.length < 2) {
                
                weekPageList.appendChild(task)
                
                } else {
    
                let dateIndex = Task.getDateArrayIndex(date)
                
                weekPageList.insertBefore(task, Array.from(weekPageList.children)[dateIndex+=1])
    
            }

            UI.sortWeekTasks()
    
        
            }
    }   
    
    static sortTodayTasks() {
        
        const todayPageList = document.getElementById('todayPageList')
        
        const tasks = document.querySelectorAll('.task').forEach((task) => {

        let parsedDate = parseISO(task.lastElementChild.previousElementSibling.textContent)
        
        if(isToday(parsedDate)) {
            
            task.style.display = 'table-row'
        
        } else {
            
            task.style.display = 'none'
        
        }


    })

}

    static sortWeekTasks() {
        
        const weekPageList = document.getElementById('weekPageList')
        
        const tasks = document.querySelectorAll('.task').forEach((task) => {

        let parsedDate = parseISO(task.lastElementChild.previousElementSibling.textContent)
        let dayOfWeek = getDay(new Date())
    
        if(isThisWeek(parsedDate, {weekStartsOn: dayOfWeek})) {
            
            task.style.display = 'table-row'
        
        } else {
            
            task.style.display = 'none'
        
        }


    })
    

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
    
    const taskButton = page.querySelector('.taskButton')
    const taskCreation = document.querySelector('.taskCreation')
    
    element.addEventListener('click', (e) => {

    if(e.target.classList.contains('edit')) {

        const titleInput = document.querySelector('.titleInput')
        const descriptionInput = document.querySelector('.descriptionInput')
        const dateInput = document.querySelector('.dateInput')
        const priorityInput = document.querySelector('.priorityInput')
        const list = e.target.parentElement.parentElement.parentElement
                
                selected = e.target.parentElement.parentElement.getAttribute('id')
                taskButton.style.display = 'none'
                taskCreation.style.display = 'flex'

                titleInput.value = element.firstElementChild.textContent
                descriptionInput.value = element.firstElementChild.nextElementSibling.textContent
                dateInput.value = element.lastElementChild.previousElementSibling.textContent
                priorityInput.selectedIndex = 0
        
        } 
    })}


static handleDelete(list) {

    const taskCreation = document.querySelector('.taskCreation')

    list.addEventListener('click', (e) => {

        if(e.target.classList.contains('delete')) {

            let page = e.target.parentElement.parentElement.parentElement.parentElement
            let date = e.target.parentElement.previousElementSibling.textContent
            let row = e.target.parentElement.parentElement

            const taskButton = page.querySelector('.taskButton')
        
            if(!row.classList.contains('task')) {

                Project.deleteDate(page.getAttribute('id'), date)
                Project.deleteTask(page.getAttribute('id'), date)
                
                const dueToday = document.getElementById(`${page.getAttribute('id')}DueToday`)

                if(Project.tasksDueToday(page.getAttribute('id')) === 0) {
                    
                    dueToday.style.visibility = 'hidden'
                
                } else {

                dueToday.style.visibility = 'visible'
                dueToday.textContent = `${Project.tasksDueToday(page.getAttribute('id'))}`
                
            }    
                
                row.remove()
                taskCreation.style.display = 'none'
                taskButton.style.display = 'flex'
                UI.checkList(list)

            } else {

                Task.deleteDate(date)
                Task.deleteTask(date)
                row.remove()
                taskCreation.style.display = 'none'
                UI.checkList(list)

                if(page.classList.contains('homePage')) {
                    taskButton.style.display = 'flex'
                }

            }
    }



})

}

static checkList(list) {
   
     let array = Array.from(list.children).filter((x) => x.style.display === 'table-row')
            
    if(array.length > 0) {
        
        list.style.display = 'table'

    } else {
        
        list.style.display = 'none'
    }


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
    projectInput.maxLength = 10
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
    const deleteProject = document.createElement('div')
    const projectPage = document.createElement('div')  

    projectContainer.classList.add('projectContainer')
    projectContainer.setAttribute('id', `${currentProject.name}`)

    project.classList.add('project')

    dueToday.classList.add('dueToday')
    dueToday.setAttribute('id', `${currentProject.name}PageDueToday`)

    projectPage.classList.add('projectPage')
    projectPage.setAttribute('id', `${currentProject.name}Page`)

    deleteProject.classList.add('deleteProject')
    deleteProject.textContent = 'X'

    projectContainer.appendChild(deleteProject)
    projectContainer.appendChild(project)
    projectContainer.appendChild(dueToday)

    projectList.appendChild(projectContainer)
    mainPage.appendChild(projectPage)

    project.textContent = currentProject.name

    projectInput.value = ''
    
    addProjectContainer.style.display = 'none'
    projectPage.style.display = 'none'
    dueToday.style.visibility = 'hidden'
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
    const taskCreation = document.querySelector('.taskCreation')

    sideBar.addEventListener('click', (e) => {

        if(e.target.classList.contains('projectContainer') || e.target.classList.contains('project') || e.target.classList.contains('dueToday')) {
            
            const projectPages = document.querySelectorAll('.projectPage').forEach((projectPage) => projectPage.style.display = 'none')
            
            const projectContainers = document.querySelectorAll('.projectContainer').forEach((projectContainer) => projectContainer.classList.remove('activeButton'))

            if(e.target.classList.contains('projectContainer')) {
            
                const projectContainer = document.getElementById(`${e.target.lastElementChild.previousElementSibling.textContent}`)
                projectContainer.classList.add('activeButton')

                const projectPage = document.getElementById(`${e.target.firstElementChild.nextElementSibling.textContent}Page`)
                projectPage.style.display = 'flex'

                const projectList = document.getElementById(`${e.target.firstElementChild.nextElementSibling.textContent}List`)
                const projectTasks = document.querySelectorAll(`.${e.target.firstElementChild.nextElementSibling.textContent}PageTask`).forEach((projectTask) => projectList.appendChild(projectTask))
                
                if(projectList.children.length > 1) {
                    projectList.style.display = 'table'
                    selected = null
                } else if (projectList.children.length < 2) {
                    projectList.style.display = 'none'
                }

                projectPage.appendChild(taskCreation)

            } else if(e.target.classList.contains('dueToday')) {

                const projectContainer = document.getElementById(`${e.target.previousElementSibling.textContent}`)
                projectContainer.classList.add('activeButton')

                const projectPage = document.getElementById(`${e.target.previousElementSibling.textContent}Page`)
                projectPage.style.display = 'flex'

                const projectList = document.getElementById(`${e.target.previousElementSibling.textContent}List`)
                const projectTasks = document.querySelectorAll(`.${e.target.previousElementSibling.textContent}PageTask`).forEach((projectTask) => projectList.appendChild(projectTask))

                if(projectList.children.length > 1) {
                    projectList.style.display = 'table'
                    selected = null
                } else if (projectList.children.length < 2) {
                    projectList.style.display = 'none'
                }

                projectPage.appendChild(taskCreation)

            } else {
                
                const projectContainer = document.getElementById(`${e.target.textContent}`)
                projectContainer.classList.add('activeButton')

                const projectPage = document.getElementById(`${e.target.textContent}Page`)
                projectPage.style.display = 'flex'

                const projectList = document.getElementById(`${e.target.textContent}List`)
                const projectTasks = document.querySelectorAll(`.${e.target.textContent}PageTask`).forEach((projectTask) => projectList.appendChild(projectTask))

                if(projectList.children.length > 1) {
                    projectList.style.display = 'table'
                    selected = null
                } else if (projectList.children.length < 2) {
                    projectList.style.display = 'none'
                }

                projectPage.appendChild(taskCreation)

            }

            homePage.style.display = 'none'
            todayPage.style.display = 'none'
            weekPage.style.display = 'none'

            home.classList.remove('activeButton')
            today.classList.remove('activeButton')
            week.classList.remove('activeButton')

            const taskCreations = document.querySelectorAll('.taskCreation').forEach((taskCreation) => taskCreation.style.display = 'none')
            const taskButtons = document.querySelectorAll('.taskButton').forEach((taskButton) => taskButton.style.display = 'flex')
            
    } 
})
    
}

static handleDeleteProject() {

    const sideBar = document.querySelector('.sidebar')

    sideBar.addEventListener('click', (e) => {

        if(e.target.classList.contains('deleteProject')) {

            const home = document.querySelector('.home')
            const homePage = document.querySelector('.homePage')
            const project = e.target.parentElement 
            const projectPage = document.getElementById(`${e.target.nextElementSibling.textContent}Page`)

            if(project.classList.contains('activeButton')) {
                home.classList.add('activeButton')
                homePage.style.display = 'flex'
            }

            Project.deleteProject(projectPage.getAttribute('id'))
            project.remove()
            projectPage.remove()

        }
    })
}

static handleCancel(cancel, addprojectContainer, addProject) {
    
    cancel.addEventListener('click', () => {

    addprojectContainer.style.display = 'none'
    addProject.style.display = 'flex'

})}


}


export default UI