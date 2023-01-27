import view from './view.js'
import { indexUserGames, indexUserCollections, signUp, signIn, createGame} from './api.js'
import {
  onIndexUserCollections,
  showCreateGameInterface,
  onSignUpSuccess,
  onSignInSuccess,
  showError,
  onCreateGameSuccess,
} from './ui.js'
import cache from './cache.js'

view.signUpButton.addEventListener('click', () => {
  const credentials = {
    userName: view.credentialsForm.userName.value,
    password: view.credentialsForm.password.value,
  }
  signUp(credentials)
    .then((res) => res.json())
    .then((res) => {
      return new Promise((resolve, reject) => {
        if (res.status === 201) {
          resolve(res)
        } else if (res.error) {
          reject(res.error)
        } else {
          reject('unknown error')
        }
      })
    })
    .then(onSignUpSuccess)
    .catch((error) => showError(error))
})

view.signInButton.addEventListener('click', () => {
  const credentials = {
    userName: view.credentialsForm.userName.value,
    password: view.credentialsForm.password.value,
  }
  signIn(credentials)
    .then((res) => res.json())
    .then((res) => (cache.token = res.token))
    .then(onSignInSuccess)
    .then(indexUserCollections)
    .then((res) => res.json())
    .then((POJO) => onIndexUserCollections(POJO.collections))
    .catch(console.error)
})

view.createGameButton.addEventListener('click', (event) => {
  event.preventDefault()
  showCreateGameInterface()
})

view.createGameForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const gameDetails = {
    title: view.createGameForm.title.value,
    minPlayers: view.createGameForm.minPlayers.value,
    maxPlayers: view.createGameForm.maxPlayers.value,
    description: view.createGameForm.description.value,
  }
  createGame(gameDetails)
  .then(onCreateGameSuccess)
  .then(indexUserCollections)
  .then((res) => res.json())
  .then((POJO) => onIndexUserCollections(POJO.collections))
  .catch(showError)
})
