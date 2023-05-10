import {parseISO, closestIndexTo,max,isAfter, format} from 'date-fns'

let parsedDateArray = []
let dateArray = []
let taskArray = []
let list = {

    'parsedDateArray':parsedDateArray,
    'dateArray':dateArray,
    'taskArray':taskArray

}

class Task {
    constructor(title,description,date,priority) {
        this.title = title
        this.description = description
        this.date = date
        this.priority = priority
    }

    static getDateArrayIndex(date) {
       
        return dateArray.indexOf(date)
    
    }

    static addDate(date) {

        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, parsedDateArray)
        let closestElement = parsedDateArray[closestDateIndex]
        let latestDate = max(parsedDateArray)

        if(parsedDateArray.length === 0 || isAfter(parsedDate, latestDate)) {
            
            parsedDateArray.push(parsedDate)
            dateArray.push(date)
            
            console.log(list)

        
        } else {
            
            if(isAfter(parsedDate, closestElement)) {
            
                let formattedClosestElement = format(closestElement, 'yyyy-MM-dd')

                if(dateArray.indexOf(formattedClosestElement) !== dateArray.lastIndexOf(formattedClosestElement)) {
                    
                    parsedDateArray.splice(dateArray.lastIndexOf(formattedClosestElement)+1,0,parsedDate)
                    dateArray.splice(dateArray.lastIndexOf(formattedClosestElement)+1,0, date)

                    console.log(list)
                
                } else {

                parsedDateArray.splice(closestDateIndex+1,0,parsedDate)
                dateArray.splice(closestDateIndex+1,0, date)
                
                console.log(list)
            
                }

            } else {

                parsedDateArray.splice(closestDateIndex,0,parsedDate)
                dateArray.splice(closestDateIndex,0,date)
                
                console.log(list)


            }
        }
    }

    static deleteDate(date) {

        let dateIndex = dateArray.indexOf(date)

        dateArray.splice(dateIndex,1)
        parsedDateArray.splice(dateIndex,1)
        
        console.log(list)
    }

    
    static editDate(oldDateIndex, newDate) {

        oldDateIndex = oldDateIndex-1

        let oldDate = dateArray[oldDateIndex]

        if(oldDate !== newDate) {

            dateArray.splice(oldDateIndex,1)
            parsedDateArray.splice(oldDateIndex,1)

            Task.addDate(newDate)

        }

        
    }


    static addTask(date, task) {

        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, parsedDateArray)
        let closestElement = parsedDateArray[closestDateIndex]
        let latestDate = max(parsedDateArray)

        if(parsedDateArray.length === 0 || isAfter(parsedDate, latestDate)) {
            
            taskArray.push(task)
            
        } else {
            
            if(isAfter(parsedDate, closestElement)) {
            
                let formattedClosestElement = format(closestElement, 'yyyy-MM-dd')

                if(dateArray.indexOf(formattedClosestElement) !== dateArray.lastIndexOf(formattedClosestElement)) {
                    
                    taskArray.splice(dateArray.lastIndexOf(formattedClosestElement)+1,0,task)
                
                } else {

                taskArray.splice(closestDateIndex+1,0,task)
            
                }

            } else {

                taskArray.splice(closestDateIndex,0,task)

            }
        }
        
    }

    static deleteTask(task) {

        let taskIndex = taskArray.indexOf(task)

        taskArray.splice(taskIndex,1)
        

    }

}



export default Task