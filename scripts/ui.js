import view from './view.js'
import cache from './cache.js'
// TODO it may be worth creating a hideall function that hides all the pages, then I can call that at the top of every show function to avoid accidentally showing two pages simultaneously
export const showError = (error) => {
  view.messageContainer.innerHTML = `
  <div class="error">${error}</div>
  `
  view.messageContainer.classList.remove('d-none')
}

export const onSignUpSuccess = () => {
  view.messageContainer.innerHTML = `
  <div class="notification">Sign up success! Sign in to begin</div>
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
  view.mainContainer.classList.add('d-none')
  view.loginPage.classList.remove('d-none')
  hideGameDetailsPage()
  hideCreateGamePage()
}

export const onIndexUserCollections = (collections) => {
  const games = collections[0].games

  view.collectionPage.innerHTML = ''
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const div = document.createElement('div')
    // div.classList.add('card')
    // div.classList.add('text-center')
    // div.dataset.id = game._id
    // div.innerHTML = `
    // <h3 class="card-title">${game.title}</h3>
    // <div class="card-body">
    // <p class="card-text">Players: ${game.minPlayers} - ${game.maxPlayers}</p>
    // <p class="card-text">click to see more</p>
    // </div>
    // `
    div.classList.add('col')
    div.dataset.id = game._id
    div.innerHTML = `
    <div class="card text-center h-100">
      <h3 class="card-title">${game.title}</h3>
      <div class="card-body">
        <p class="card-text">Players: ${game.minPlayers} - ${game.maxPlayers}</p>
        <p class="card-text">click to see more</p>
      </div>
    </div>
    `
    view.collectionPage.appendChild(div)
  }
}

export const onCreateGameSuccess = () => {
  hideCreateGamePage()
  view.createGameForm.reset()
}

export const showCreateGamePage = () => {
  view.collectionPage.classList.add('d-none')
  view.createGamePage.classList.remove('d-none')
}

export const hideCreateGamePage = () => {
  view.createGamePage.classList.add('d-none')
  view.messageContainer.classList.add('d-none')
  view.collectionPage.classList.remove('d-none')
}

export const showGameDetailsPage = (gameData) => {
  // TODO this should hide the new game button
  view.gameDetailsPage.classList.remove('d-none')
  view.deleteGameButton.classList.remove('d-none')
  view.collectionPage.classList.add('d-none')

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
  view.messageContainer.classList.add('d-none')
  view.collectionPage.classList.remove('d-none')

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
