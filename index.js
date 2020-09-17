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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    })
        .then(response => response.json())
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
        const editUsernameForm = document.createElement('form')
        const usernameField = document.createElement('input')
        const submitButton = document.createElement('input')
        const deleteButton = document.createElement('button')

        card.className = 'card'
        username.textContent = user.username
        usernameField.name = 'username'
        usernameField.placeholder = 'Update username'
        submitButton.type = 'submit'
        deleteButton.textContent = 'Delete User'

        editUsernameForm.append(usernameField, submitButton)
        card.append(username, editUsernameForm, deleteButton)
        usersContainer.appendChild(card)

        editUsernameForm.addEventListener('submit', (event) => updateUser(event, user, usernameElement))
        deleteButton.addEventListener('click', () => deleteUser(user))
    })
}
function deleteUser(user){
    fetch(`${USERS_URL}/${user.id}`,{
        method: 'DELETE'
    }).then(response => response.json())
        .then(console.log)
}

function updateUser(event, user, usernameElement){
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')

    usernameElement.textContent = username

    fetch(`${USERS_URL}/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    }).then(response => response.json())
        .then(console.log)

}