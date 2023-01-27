import view from './view.js'

export const onIndexUserGames = (games) => {
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
