import view from './view.js'
import {
  signUp,
  signIn,
  indexCollectionGames,
  indexUserCollections,
  createGame,
  showGame,
  updateGame,
  deleteGame,
} from './api.js'
import {
  showError,
  onSignUpSuccess,
  onSignInSuccess,
  onIndexUserCollections,
  showCreateGamePage,
  hideCreateGamePage,
  onCreateGameSuccess,
  showGameDetailsPage,
  hideGameDetailsPage,
  startDeleteConfirmation,
  clearDeleteConfirmation,
  showLoginPage,
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

view.signOutButton.addEventListener('click', () => {
  cache.token = ''
  showLoginPage()
})

view.closeCreateGameButton.addEventListener('click', () => {
  hideCreateGamePage()
})

view.closeGameDetailsButton.addEventListener('click', () => {
  hideGameDetailsPage()
})

view.createGameButton.addEventListener('click', (event) => {
  event.preventDefault()
  showCreateGamePage()
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
    .then((POJO) => showGameDetailsPage(POJO.game))
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
    .then(hideGameDetailsPage)
    .then(indexUserCollections)
    .then((res) => res.json())
    .then((POJO) => onIndexUserCollections(POJO.collections))
    .catch(showError)
})

const triggerDeletion = () => {
  deleteGame(view.deleteGameButton.dataset.id)
    .then(hideGameDetailsPage)
    .then(indexUserCollections)
    .then((res) => res.json())
    .then((POJO) => onIndexUserCollections(POJO.collections))
    .catch(showError)
}
view.deleteGameButton.addEventListener('click', (event) => {
  if (cache.deleteEnabled) {
    clearDeleteConfirmation()
    triggerDeletion()
  } else {
    cache.deleteEnabled = true
    startDeleteConfirmation()
  }
})
