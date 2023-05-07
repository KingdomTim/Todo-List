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
       
        return list['dateArray'].indexOf(date)
    
    }

    static addDate(date) {

        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, list['parsedDateArray'])
        let closestElement = list['parsedDateArray'][closestDateIndex]
        let latestDate = max(list['parsedDateArray'])

        if(parsedDateArray.length === 0 || isAfter(parsedDate, latestDate)) {
            
            list['parsedDateArray'].push(parsedDate)
            list['dateArray'].push(date)
            
            console.log(list)

        
        } else {
            
            if(isAfter(parsedDate, closestElement)) {
            
                let thing = format(closestElement, 'yyyy-MM-dd')

                if(list['dateArray'].indexOf(thing) !== list['dateArray'].lastIndexOf(thing)) {
                    
                    list['parsedDateArray'].splice(list['dateArray'].lastIndexOf(thing)+1,0,parsedDate)
                    list['dateArray'].splice(list['dateArray'].lastIndexOf(thing)+1,0, date)

                    console.log(list)
                
                } else {

                list['parsedDateArray'].splice(closestDateIndex+1,0,parsedDate)
                list['dateArray'].splice(closestDateIndex+1,0, date)
                
                console.log(list)
            
                }

            } else {

                list['parsedDateArray'].splice(closestDateIndex,0,parsedDate)
                list['dateArray'].splice(closestDateIndex,0,date)
                
                console.log(list)


            }
        }
    }

    static deleteDate(date) {

        let dateIndex = list['dateArray'].indexOf(date)

        list['dateArray'].splice(dateIndex,1)
        list['parsedDateArray'].splice(dateIndex,1)
        
        console.log(list)
    }

    
    static editDate(oldDateIndex, newDate) {

        oldDateIndex = oldDateIndex-1

        let oldDate = list['dateArray'][oldDateIndex]

        if(oldDate !== newDate) {

            list['dateArray'].splice(oldDateIndex,1)
            list['parsedDateArray'].splice(oldDateIndex,1)

            Task.addDate(newDate)

        }

        
    }


    static addTask(date, task) {

        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, list['parsedDateArray'])
        let closestElement = list['parsedDateArray'][closestDateIndex]
        let latestDate = max(list['parsedDateArray'])

        if(parsedDateArray.length === 0 || isAfter(parsedDate, latestDate)) {
            
            list['taskArray'].push(task)
            
        } else {
            
            if(isAfter(parsedDate, closestElement)) {
            
                let thing = format(closestElement, 'yyyy-MM-dd')

                if(list['dateArray'].indexOf(thing) !== list['dateArray'].lastIndexOf(thing)) {
                    
                    list['taskArray'].splice(list['dateArray'].lastIndexOf(thing)+1,0,task)
                
                } else {

                list['taskArray'].splice(closestDateIndex+1,0,task)
            
                }

            } else {

                list['taskArray'].splice(closestDateIndex,0,task)

            }
        }
        
    }

    static deleteTask(task) {

        let taskIndex = list['taskArray'].indexOf(task)

        taskArray.splice(taskIndex,1)
        

    }

}



export default Task