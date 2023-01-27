import view from './view.js'

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
}

export const onIndexUserCollections = (collections) => {
  const games = collections[0].games
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const div = document.createElement('div')
    div.classList.add('game-listing')
    div.innerHTML = `
    <h3>${game.title}</h3>
    <p>Players: ${game.minPlayers} - ${game.maxPlayers}</p>
    <p>click to see more</p>
    `
    view.collectionContents.appendChild(div)
  }
}

export const showError = (error) => {
  view.messageContainer.innerHTML = `
  <div class="error">${error}</div>
  `
  view.messageContainer.classList.remove('hidden')
}
