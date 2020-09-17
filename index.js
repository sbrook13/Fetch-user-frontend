const USERS_URL = 'http://localhost:3000/users'
const form = document.querySelector('form')

form.addEventListener('submit', createUser)
getUsers()

function createUser(event){
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')
    const password = formData.get('password')

    fetch(USERS_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())
        .then(console.log)
}

function getUsers(){
    fetch(USERS_URL)
        .then(response => response.json())
        .then(displayUsers)
}

function displayUsers(users){
    const usersContainer = document.querySelector('#users')

    users.forEach(user => {
        const card = document.createElement('div')
        const username = document.createElement('p')

        card.className = 'card'
        username.textContent = user.username

        card.append(username)
        usersContainer.appendChild(card)
    })
}