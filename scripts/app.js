import view from './view.js'
import { indexUserGames, indexUserCollections, signUp, signIn } from './api.js'
import {
  onIndexUserCollections,
  loadCreateGameInterface,
  onSignUpSuccess,
  onSignInSuccess,
  showError,
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

// TODO put this in the login flow

view.createGameButton.addEventListener('click', (event) => {
  event.preventDefault()
  loadCreateGameInterface()
})
