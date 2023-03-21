import Task from './Task.js'

class UI {
    
    static addTask() {
        
        const mainPage = document.querySelector('.mainPage')

        const taskButton = document.createElement('div')
        taskButton.classList.add('taskButton')
        taskButton.textContent = '+ Add Task'

        const list = document.createElement('table')
            list.classList.add('list')
            const headerRow = document.createElement('tr')
            const titleHeader = document.createElement('th')
            const descriptionHeader = document.createElement('th')
            const dateHeader = document.createElement('th')
            titleHeader.textContent = 'Task'
            descriptionHeader.textContent = 'Description'
            dateHeader.textContent = 'Due'
            headerRow.appendChild(titleHeader)
            headerRow.appendChild(descriptionHeader)
            headerRow.appendChild(dateHeader)
            list.appendChild(headerRow)
            list.style.display = 'none'

        mainPage.appendChild(list)
        mainPage.appendChild(taskButton)
        
        UI.handleTaskButton(taskButton)

    }

    static handleTaskButton(taskButton) {
        
        const mainPage = document.querySelector('.mainPage')
            
        const taskCreation = document.createElement('div')
        mainPage.appendChild(taskCreation)

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
                                        <option value='Low' class='low'>Low</option>
                                        <option value='Medium' class='medium'>Medium</option>
                                        <option value='Urgent' class='high'>Urgent</option>
                                    </select>
                                    <button class='submit'>Submit</button>
                                    </div>
                                </div>`
                            
                UI.handleSubmit(taskButton)
        })

    }


    static handleSubmit(taskButton) {
        
        const mainPage = document.querySelector('.mainPage')
        const submit = document.querySelector('.submit')
        const titleInput = document.querySelector('.titleInput')
        const descriptionInput = document.querySelector('.descriptionInput')
        const dateInput = document.querySelector('.dateInput')
        const priorityInput = document.querySelector('.priorityInput')
        const taskCreation = document.querySelector('.taskCreation')
        const list = document.querySelector('.list')


        submit.addEventListener('click', () => {
            let task = new Task(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value)

            if(titleInput.value !== '' && descriptionInput.value !== '' && dateInput.value !== '' && priorityInput.value !== 'Priority') {
            
                const row = document.createElement('tr')

                row.innerHTML = `<td>${task.title}</td>
                                    <td>${task.description}</td>
                                    <td>${task.date}</td>`

                list.appendChild(row)

                if(task.priority === 'Urgent') {
                    row.style.backgroundColor = 'rgb(255, 68, 68)'
                } else if(task.priority === 'Medium') {
                    row.style.backgroundColor = 'orange'
                } else {
                    row.style.backgroundColor = 'greenyellow'
                }
                
                list.style.display = 'table'
                taskCreation.style.display = 'none'
                taskButton.style.display = 'flex'

        }
        })
    }

}




export default UI