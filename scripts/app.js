import view from './view.js'
import {
  indexUserGames,
  indexUserCollections,
  signUp,
  signIn,
  createGame,
  showGame,
  updateGame,
  deleteGame,
} from './api.js'
import {
  onIndexUserCollections,
  showCreateGameInterface,
  onSignUpSuccess,
  onSignInSuccess,
  showError,
  onCreateGameSuccess,
  showUpdateGamePage,
  hideUpdateGamePage,
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

view.collectionPage.addEventListener('click', (event) => {
  const gameListingDiv = event.target.matches('.game-listing')
    ? event.target
    : event.target.parentElement
  if (!gameListingDiv.dataset.id) {
    return
  }

  showGame(gameListingDiv.dataset.id)
    .then((res) => res.json())
    .then((POJO) => showUpdateGamePage(POJO.game))
    .catch(showError)
})

view.updateGameForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const gameDetails = {
    title: view.updateGameForm.title.value,
    minPlayers: view.updateGameForm.minPlayers.value,
    maxPlayers: view.updateGameForm.maxPlayers.value,
    description: view.updateGameForm.description.value,
  }
  updateGame(view.updateGameForm.dataset.id, gameDetails)
    .then((res) => res.json())
    .then(hideUpdateGamePage)
    .then(indexUserCollections)
    .then((res) => res.json())
    .then((POJO) => onIndexUserCollections(POJO.collections))
    .catch(showError)
})

view.deleteGameButton.addEventListener('click', (event) => {
  deleteGame(view.deleteGameButton.dataset.id)
    .then(hideUpdateGamePage)
    .then(indexUserCollections)
    .then((res) => res.json())
    .then((POJO) => onIndexUserCollections(POJO.collections))
    .catch(showError)
})
