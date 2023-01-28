import view from './view.js'

export const showError = (error) => {
  view.messageContainer.innerHTML = `
  <div class="error">${error}</div>
  `
  view.messageContainer.classList.remove('hidden')
}

export const onSignUpSuccess = () => {
  view.messageContainer.innerHTML = `
  <div class="notification">Sign up success! Sign in to begin</div>
  `
  view.messageContainer.classList.remove('hidden')
  setTimeout(() => view.messageContainer.classList.add('hidden'), 1000 * 60)
}

export const onSignInSuccess = () => {
  view.loginPage.classList.add('hidden')
  view.mainPage.classList.remove('hidden')
  view.messageContainer.classList.add('hidden')

  view.credentialsForm.reset()
}

export const showLoginPage = () => {
  view.mainPage.classList.add('hidden')
  view.loginPage.classList.remove('hidden')
}

export const onIndexUserCollections = (collections) => {
  const games = collections[0].games

  view.collectionPage.innerHTML = ''
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const div = document.createElement('div')
    div.classList.add('game-listing')
    div.dataset.id = game._id
    div.innerHTML = `
    <h3>${game.title}</h3>
    <p>Players: ${game.minPlayers} - ${game.maxPlayers}</p>
    <p>click to see more</p>
    `
    view.collectionPage.appendChild(div)
  }
}

export const showCreateGameInterface = () => {
  view.collectionPage.classList.add('hidden')
  view.createGamePage.classList.remove('hidden')
}

export const onCreateGameSuccess = () => {
  view.createGamePage.classList.add('hidden')
  view.collectionPage.classList.remove('hidden')
  view.createGameForm.reset()
}

export const showUpdateGamePage = (gameData) => {
  view.updateGamePage.classList.remove('hidden')
  view.deleteGameButton.classList.remove('hidden')
  view.collectionPage.classList.add('hidden')

  view.updateGameForm.title.value = gameData.title
  view.updateGameForm.minPlayers.value = gameData.minPlayers
  view.updateGameForm.maxPlayers.value = gameData.maxPlayers
  view.updateGameForm.description.value = gameData.description

  view.updateGameForm.dataset.id = gameData._id
  view.deleteGameButton.dataset.id = gameData._id
}

export const hideUpdateGamePage = () => {
  view.updateGamePage.classList.add('hidden')
  view.deleteGameButton.classList.add('hidden')
  view.collectionPage.classList.remove('hidden')

  view.updateGameForm.reset()
  view.updateGameForm.dataset.id = ''
  view.deleteGameButton.dataset.id = ''
}
