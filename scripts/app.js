import view from './view.js'
import { indexUserGames } from './api.js'
import { onIndexUserGames, loadCreateGameInterface } from './ui.js'

indexUserGames()
  .then((res) => res.json())
  .then((POJO) => onIndexUserGames(POJO.games))
  .then(console.log)

view.createGameButton.addEventListener('click', (event) => {
  event.preventDefault()
  loadCreateGameInterface()
})
