import './style.css'

function home() {
    
    const title = document.createElement('h2')
    title.classList.add('title')
    title.textContent = 'Inbox'

    return title
}

const mainPage = document.querySelector('.mainPage')

mainPage.appendChild(home())