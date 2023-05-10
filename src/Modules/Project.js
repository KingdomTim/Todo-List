import {parseISO, closestIndexTo,max,isAfter, isToday, format} from 'date-fns'

let projectList = {}

class Project {
    constructor(name) {
        this.name = name
    }

    static getDateArrayIndex(project, date) {
        
        let projectDateArray = projectList[project]['dateArray']

        return projectDateArray.indexOf(date)
    
    }

    static addDate(project, date) {

        let projectDateArray = projectList[project]['dateArray']
        let projectParsedDateArray = projectList[project]['parsedDateArray']

        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, projectParsedDateArray)
        let closestElement = projectParsedDateArray[closestDateIndex]
        let latestDate = max(projectParsedDateArray)

        if(projectParsedDateArray.length === 0 || isAfter(parsedDate, latestDate)) {
            
            projectParsedDateArray.push(parsedDate)
            projectDateArray.push(date)
            
            console.log(projectList)
            
        } else {
            
            if(isAfter(parsedDate, closestElement)) {

                let formattedClosestElement = format(closestElement, 'yyyy-MM-dd')

                if(projectDateArray.indexOf(formattedClosestElement) !== projectDateArray.lastIndexOf(formattedClosestElement)) {
                    
                    projectParsedDateArray.splice(projectDateArray.lastIndexOf(formattedClosestElement)+1,0,parsedDate)
                    projectDateArray.splice(projectDateArray.lastIndexOf(formattedClosestElement)+1,0, date)

                    console.log(projectList)
                
                } else {

                projectParsedDateArray.splice(closestDateIndex+1,0,parsedDate)
                projectDateArray.splice(closestDateIndex+1,0, date)
                
                console.log(projectList)
            
                }

            } else {

                projectParsedDateArray.splice(closestDateIndex,0,parsedDate)
                projectDateArray.splice(closestDateIndex,0,date)
                
                console.log(projectList)


            }
        }
    }

    static deleteDate(project, date) {

        let projectDateArray = projectList[project]['dateArray']
        let projectParsedDateArray = projectList[project]['parsedDateArray']

        let regularDateIndex = projectDateArray.indexOf(date)

        projectParsedDateArray.splice(regularDateIndex,1)
        projectDateArray.splice(regularDateIndex,1)

    }

    static editDate(project, oldDateIndex, newDate) {

        let projectDateArray = projectList[project]['dateArray']
        let projectParsedDateArray = projectList[project]['parsedDateArray']

        oldDateIndex = oldDateIndex - 1

        let oldDate = projectDateArray[oldDateIndex]

        if(oldDate !== newDate) {

            projectDateArray.splice(oldDateIndex,1)
            projectParsedDateArray.splice(oldDateIndex,1)

            Project.addDate(project, newDate)

        }
    }

    static addTask(project, date, task) {
        
        let projectTaskArray = projectList[project]['taskArray']
        let projectDateArray = projectList[project]['dateArray']
        let projectParsedDateArray = projectList[project]['parsedDateArray']

        let parsedDate = parseISO(date)
        let closestDateIndex = closestIndexTo(parsedDate, projectParsedDateArray)
        let closestElement = projectParsedDateArray[closestDateIndex]
        let latestDate = max(projectParsedDateArray)

        if(projectParsedDateArray.length === 0 || isAfter(parsedDate, latestDate)) {
            
            projectTaskArray.push(task)
            
        } else {
            
            if(isAfter(parsedDate, closestElement)) {
            
                let formattedClosestElement = format(closestElement, 'yyyy-MM-dd')

                if(projectDateArray.indexOf(formattedClosestElement) !== projectDateArray.lastIndexOf(formattedClosestElement)) {
                    
                    projectTaskArray.splice(projectDateArray.lastIndexOf(formattedClosestElement)+1,0,task)
                
                } else {

                    projectTaskArray.splice(closestDateIndex+1,0,task)
            
                }

            } else {

                projectTaskArray.splice(closestDateIndex,0,task)

            }
        }
        
        
    }

    static deleteTask(project, task) {

        let projectTaskArray = projectList[project]['taskArray']

        let taskIndex = projectTaskArray.indexOf(task)

        projectTaskArray.splice(taskIndex,1)
        
        console.log(projectList)

    }

    static tasksDueToday(project) {

        let projectParsedDateArray = projectList[project]['parsedDateArray']

        let dueToday = projectParsedDateArray.filter((x) => isToday(x)).length

        return dueToday
    }


    static addProject(project) {
        
        let parsedDateArray = []
        let taskArray = []
        let dateArray = []

        projectList[`${project}Page`] = {
            
                                'parsedDateArray':parsedDateArray,
                                'taskArray':taskArray, 
                                'dateArray':dateArray    
                                                
                                                            }
        
        console.log(projectList)
        
    }


    static deleteProject(project) { 

        delete projectList[project]
        
        console.log(projectList)
        
    }
}

export default Project