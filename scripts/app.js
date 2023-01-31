import view from './view.js'
import {
  signUp,
  signIn,
  indexCollectionGames,
  createCollection,
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
  onIndexCollectionGames,
  updateCollectionHeader,
  toggleViewCreateCollectionForm,
  showCollectionPage,
  showCreateGamePage,
  showGameDetailsPage,
  startDeleteConfirmation,
  clearDeleteConfirmation,
  showLoginPage,
} from './ui.js'
import cache from './cache.js'

const devMode = true

view.signUpButton.addEventListener('click', () => {
  const credentials = {
    userName: view.credentialsForm.userName.value,
    password: view.credentialsForm.password.value,
  }
  signUp(credentials)
    .then((res) => {
      if (res.status === 201) {
        return
      } else if (res.status === 409) {
        throw new Error('please pick another username')
      } else if (res.status === 400) {
        throw new Error('invalid username or password')
      } else {
        throw new Error('unspecified error')
      }
    })
    .then(onSignUpSuccess) //TODO I should probably call showLoginPage() here, but I don't want to break anything right now with unanticipated consequences
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
    .then(() => indexCollectionGames(cache.activeCollection._id))
    .then((res) => res.json())
    .then((POJO) => onIndexCollectionGames(POJO.games))
    .catch(console.error)
})

view.signOutButton.addEventListener('click', () => {
  cache.token = ''
  cache.activeCollection = null
  cache.defaultCollection = null
  showLoginPage()
})

view.collectionList.addEventListener('click', (event) => {
  if (!event.target.dataset.id) {
    return
  }

  cache.activeCollection = {
    _id: event.target.dataset.id,
    title: event.target.dataset.title,
  }
  indexCollectionGames(cache.activeCollection._id)
    .then((res) => res.json())
    .then((POJO) => onIndexCollectionGames(POJO.games))
    .then(updateCollectionHeader)
    .then(showCollectionPage)
    .catch(showError)
})

view.closeCreateGameButton.addEventListener('click', () => {
  showCollectionPage()
})

view.closeGameDetailsButton.addEventListener('click', () => {
  showCollectionPage()
})

view.createGameButton.addEventListener('click', (event) => {
  event.preventDefault()
  showCreateGamePage()
})

view.createCollectionButton.addEventListener('click', (event) => {
  toggleViewCreateCollectionForm()
})

view.createCollectionForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const collectionData = { title: view.createCollectionForm.title.value }
  createCollection(collectionData).then(showCollectionPage).catch(showError)
})

view.createGameForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const gameDetails = {
    title: view.createGameForm.title.value,
    minPlayers: view.createGameForm.minPlayers.value,
    maxPlayers: view.createGameForm.maxPlayers.value,
    description: view.createGameForm.description.value,
  }

  const collections = [cache.defaultCollection._id]
  if (!cache.defaultCollection._id === cache.activeCollection._id) {
    collections.push(cache.activeCollection._id)
  }

  createGame(gameDetails, collections)
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('could not create game')
      }
    })
    .then(() => indexCollectionGames(cache.activeCollection._id))
    .then((res) => res.json())
    .then((POJO) => onIndexCollectionGames(POJO.games))
    .then(showCollectionPage)
    .catch(showError)
})

view.collectionPage.addEventListener('click', (event) => {
  let searchPointer = event.target
  while (!searchPointer.dataset.id) {
    if (searchPointer === view.collectionPage) {
      break
    }
    searchPointer = searchPointer.parentElement
  }
  if (!searchPointer.dataset.id) {
    return
  }

  showGame(searchPointer.dataset.id)
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
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('update rejected by server')
      } else {
        return res
      }
    })
    .then(indexCollectionGames)
    .then((res) => res.json())
    .then((POJO) => onIndexCollectionGames(POJO.games))
    .then(showCollectionPage)
    .catch(showError)
})

const triggerDeletion = () => {
  deleteGame(view.deleteGameButton.dataset.id)
    .then(() => indexCollectionGames(cache.activeCollection._id))
    .then((res) => res.json())
    .then((POJO) => onIndexCollectionGames(POJO.games))
    .then(showCollectionPage)
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

if (devMode) {
  view.credentialsForm.userName.value = 'C'
  view.credentialsForm.password.value = 'C'
  view.signInButton.click()
  // setTimeout(() => {
  //   view.createGameButton.click()
  // }, 120)
}
