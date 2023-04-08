import Task from './Task.js'

class UI {
    
    static addTask() {
        
        const mainPage = document.querySelector('.mainPage')

        const taskButton = document.createElement('div')
        taskButton.classList.add('taskButton')
        taskButton.textContent = '+ Add Task'

        UI.addList()
        mainPage.appendChild(taskButton)
        UI.handleTaskButton(taskButton)

    }

    static addList() {

        const mainPage = document.querySelector('.mainPage')

        const list = document.createElement('table')
            list.classList.add('list')
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

        mainPage.appendChild(list)
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
                                        <option value='Low'>Low</option>
                                        <option value='Medium'>Medium</option>
                                        <option value='Urgent'>Urgent</option>
                                    </select>
                                    <button class='submit'>Submit</button>
                                    </div>
                                </div>`
                            
                UI.handleSubmit()
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

    static handleEdit(row, taskCreation) {  

        row.addEventListener('click', (e) => {
            if(e.target.classList.contains('edit')) {
                row.style.display = 'none'
                taskCreation.style.display = 'flex'

        }})

    }

    // static createTask(row, list, title, description, date) {

    //     row.innerHTML = `<div class='taskCreation'>
    //     <div class='leftSide'>
    //     <textarea class='titleInput' rows= '1' cols= '50' style='resize:none'>${title}</textArea>
    //     <textarea class='descriptionInput' rows= '4' cols='50' placeholder='Description' style="resize:none">${description}</textArea>
    //     </div>
    //     <div class='rightSide'>
    //     <input type='text' class='dateInput' placeholder='${date}' onfocus="(this.type='date')" onblur="(this.type='text')">
    //     <select class='priorityInput'>
    //         <option selected disabled>Priority</option>
    //         <option value='Low'>Low</option>
    //         <option value='Medium'>Medium</option>
    //         <option value='Urgent'>Urgent</option>
    //     </select>
    //     <button class='submit'>Submit</button>
    //     </div>
    // </div>`

    // UI.handleSubmitt(row, list)

    // }

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

    static handleSubmit() {
        
        const mainPage = document.querySelector('.mainPage')
        const submit = document.querySelector('.submit')
        const titleInput = document.querySelector('.titleInput')
        const descriptionInput = document.querySelector('.descriptionInput')
        const dateInput = document.querySelector('.dateInput')
        const priorityInput = document.querySelector('.priorityInput')
        const taskButton = document.querySelector('.taskButton')
        const taskCreation = document.querySelector('.taskCreation')
        const list = document.querySelector('.list')


        submit.addEventListener('click', () => {
            let task = new Task(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value)

            if(titleInput.value !== '' && descriptionInput.value !== '' && dateInput.value !== '' && priorityInput.value !== 'Priority') {

                const row = document.createElement('tr')

                row.innerHTML = `   <td>${task.title}</td>
                                    <td>${task.description}</td>
                                    <td>${task.date}</td>
                                    <td width='100'><img class='check' src='./Images/checkMark.png'>
                                    <img class='edit' src='./Images/edit.png'>
                                    <img class='delete' src='./Images/delete.png'></td>`

                list.appendChild(row)


                if(task.priority === 'Urgent') {
                    row.classList.add('urgent')
                } else if(task.priority === 'Medium') {
                    row.classList.add('medium')
                } else {
                    row.classList.add('low')
                }
                
                list.style.display = 'table'
                taskCreation.style.display = 'none'
                taskButton.style.display = 'flex'

                UI.handleCheck(row)
                UI.handleEdit(row, taskCreation)
                UI.handleDelete(list)

        }
        })
    }

}




export default UI