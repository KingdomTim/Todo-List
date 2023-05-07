import {parseISO, closestIndexTo,max,isAfter, isToday, format} from 'date-fns'

let parsedDateArray = []
let dateArray = []
let taskArray = []
let projectList = {}

class Project {
    constructor(name) {
        this.name = name
    }

    static getDateArrayIndex(project, date) {
       
        return projectList[project]['dateArray'].indexOf(date)
    
    }

    static addDate(project, date) {

        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, projectList[project]['parsedDateArray'])
        let closestElement = projectList[project]['parsedDateArray'][closestDateIndex]
        let latestDate = max(projectList[project]['parsedDateArray'])

        if(projectList[project]['parsedDateArray'].length === 0 || isAfter(parsedDate, latestDate)) {
            
            projectList[project]['parsedDateArray'].push(parsedDate)
            projectList[project]['dateArray'].push(date)
            
            console.log(projectList[project])
            
        } else {
            
            if(isAfter(parsedDate, closestElement)) {

                let thing = format(closestElement, 'yyyy-MM-dd')

                if(projectList[project]['dateArray'].indexOf(thing) !== projectList[project]['dateArray'].lastIndexOf(thing)) {
                    
                    projectList[project]['parsedDateArray'].splice(projectList[project]['dateArray'].lastIndexOf(thing)+1,0,parsedDate)
                    projectList[project]['dateArray'].splice(projectList[project]['dateArray'].lastIndexOf(thing)+1,0, date)

                    console.log(projectList[project])
                
                } else {

                projectList[project]['parsedDateArray'].splice(closestDateIndex+1,0,parsedDate)
                projectList[project]['dateArray'].splice(closestDateIndex+1,0, date)
                
                console.log(projectList[project])
            
                }

            } else {

                projectList[project]['parsedDateArray'].splice(closestDateIndex,0,parsedDate)
                projectList[project]['dateArray'].splice(closestDateIndex,0,date)
                
                console.log(projectList[project])


            }
        }
    }

    static deleteDate(project, date) {

        let regularDateIndex = projectList[project]['dateArray'].indexOf(date)

        projectList[project]['parsedDateArray'].splice(regularDateIndex,1)
        projectList[project]['dateArray'].splice(regularDateIndex,1)

    }

    static editDate(project, oldDateIndex, newDate) {

        oldDateIndex = oldDateIndex - 1

        let oldDate = projectList[project]['dateArray'][oldDateIndex]

        if(oldDate !== newDate) {

            projectList[project]['dateArray'].splice(oldDateIndex,1)
            projectList[project]['parsedDateArray'].splice(oldDateIndex,1)

            Project.addDate(project, newDate)

        }
    }

    static addTask(project, date, task) {
        
        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, projectList[project]['parsedDateArray'])
        let closestElement = projectList[project]['parsedDateArray'][closestDateIndex]
        let latestDate = max(projectList[project]['parsedDateArray'])

        if(parsedDateArray.length === 0 || isAfter(parsedDate, latestDate)) {
            
            projectList[project]['taskArray'].push(task)
            
        } else {
            
            if(isAfter(parsedDate, closestElement)) {
            
                let thing = format(closestElement, 'yyyy-MM-dd')

                if(projectList[project]['dateArray'].indexOf(thing) !== projectList[project]['dateArray'].lastIndexOf(thing)) {
                    
                    projectList[project]['taskArray'].splice(projectList[project]['dateArray'].lastIndexOf(thing)+1,0,task)
                
                } else {

                    projectList[project]['taskArray'].splice(closestDateIndex+1,0,task)
            
                }

            } else {

                projectList[project]['taskArray'].splice(closestDateIndex,0,task)

            }
        }
        
        
    }

    static deleteTask(project, task) {

        let taskIndex = projectList[project]['taskArray'].indexOf(task)

        projectList[project]['taskArray'].splice(taskIndex,1)
        
        console.log(projectList)

    }

    static tasksDueToday(project) {

        let dueToday = projectList[project]['parsedDateArray'].filter((x) => isToday(x)).length

        return dueToday
    }


    static addProject(project) {
        
        projectList[`${project}Page`] = {
            
                                'parsedDateArray':parsedDateArray,
                                'taskArray':taskArray, 
                                'dateArray':dateArray    
                                                
                                                            }
        
        console.log(projectList)
        
    }


    static deleteProject(project) { 

        let projectIndex = projectArray.indexOf(project)

        projectArray.splice(projectIndex,1)
        
        console.log(projectArray)
    }
}

export default Project