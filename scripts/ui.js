import view from './view.js'
import cache from './cache.js'

export const showError = (error) => {
  view.messageContainer.innerHTML = `
  <div class="alert alert-danger">${error}</div>
  `
  view.messageContainer.classList.remove('d-none')
}

export const onSignUpSuccess = () => {
  view.messageContainer.innerHTML = `
  <div class="alert alert-secondary">Sign up success! Sign in to begin</div>
  `
  view.messageContainer.classList.remove('d-none')
  setTimeout(() => view.messageContainer.classList.add('d-none'), 1000 * 60)
}

export const onSignInSuccess = () => {
  view.mainContainer.classList.remove('d-none')
  view.collectionPage.classList.remove('d-none')

  view.messageContainer.classList.add('d-none')
  view.loginPage.classList.add('d-none')

  view.credentialsForm.reset()
}

export const showLoginPage = () => {
  hideAllPages()
  view.loginPage.classList.remove('d-none')
}

export const showCollectionPage = () => {
  hideAllPages()
  view.collectionPage.classList.remove('d-none')
}

const hideCollectionPage = () => {
  view.collectionPage.classList.add('d-none')
}

export const onIndexUserCollections = (collections) => {
  view.collectionList.innerHTML = ''

  for (let i = 0; i < collections.length; i++) {
    const li = document.createElement('li')
    li.classList.add('text-center')
    li.innerText = collections[i].title
    li.dataset.id = collections[i]._id
    view.collectionList.appendChild(li)
  }
  if (!cache.activeCollection) {
    const defaultIndex = collections.findIndex(
      (collection) => collection.title === 'My Games'
    )
    const defaultCollection = {
      _id: collections[defaultIndex]._id,
      title: collections[defaultIndex].title,
    }
    cache.activeCollection = defaultCollection
  }
  view.activeCollectionTitle.innerText = cache.activeCollection.title
}

export const onIndexCollectionGames = (collections) => {
  //this was originally onindexusercollections but copied it because it has the code to populate collection area
  const games = collections[0].games

  view.collectionGrid.innerHTML = ''
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
    <div class="card text-center h-100 text-bg-primary" role="button" data-id="${game._id}">
      <h3 class="card-title">${game.title}</h3>
      <div class="card-body">
        <p class="card-text">Players: ${game.minPlayers} - ${game.maxPlayers}</p>
        <p class="card-text">click to see more</p>
      </div>
    </div>
    `
    view.collectionGrid.appendChild(div)
  }
}

export const showCreateGamePage = () => {
  hideAllPages()
  view.createGamePage.classList.remove('d-none')
}

export const hideCreateGamePage = () => {
  view.createGamePage.classList.add('d-none')
  view.createGameForm.reset()
}

export const showGameDetailsPage = (gameData) => {
  hideAllPages()
  view.gameDetailsPage.classList.remove('d-none')
  view.deleteGameButton.classList.remove('d-none')

  view.updateGameForm.title.value = gameData.title
  view.updateGameForm.minPlayers.value = gameData.minPlayers
  view.updateGameForm.maxPlayers.value = gameData.maxPlayers
  view.updateGameForm.description.value = gameData.description

  view.updateGameForm.dataset.id = gameData._id
  view.deleteGameButton.dataset.id = gameData._id
}

export const hideGameDetailsPage = () => {
  view.gameDetailsPage.classList.add('d-none')
  view.deleteGameButton.classList.add('d-none')

  view.updateGameForm.reset()
  view.updateGameForm.dataset.id = ''
  view.deleteGameButton.dataset.id = ''
  clearDeleteConfirmation()
}

export const startDeleteConfirmation = () => {
  const decrementCountdown = () => {
    if (countdown === 0) {
      clearDeleteConfirmation()
      return
    }
    countdown--
    view.deleteGameButton.innerText = `confirm...${countdown}`
  }

  let countdown = 3
  view.deleteGameButton.innerText = `confirm...${countdown}`
  cache.deleteIntervalId = setInterval(decrementCountdown, 1000)
}

export const clearDeleteConfirmation = () => {
  clearInterval(cache.deleteIntervalId)
  cache.deleteEnabled = false
  view.deleteGameButton.innerText = 'Delete Game'
}

const hideAllPages = () => {
  hideCollectionPage()
  hideCreateGamePage()
  hideGameDetailsPage()
  hideCollectionPage()
  hideCreateCollectionForm()
  view.messageContainer.classList.add('d-none')
}

export const toggleViewCreateCollectionForm = () => {
  const isHidden = view.createCollectionCard.classList.toggle('d-none')
}

const hideCreateCollectionForm = () => {
  view.createCollectionCard.classList.add('d-none')
  view.createCollectionForm.reset()
}
