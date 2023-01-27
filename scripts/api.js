const SERVER_URL = 'http://localhost:8000'
const USER_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDE5YmNiOGMwZmE5NjM0OTNhMjFmZSIsImlhdCI6MTY3NDc2NDQzMCwiZXhwIjoxNjc0ODAwNDMwfQ.0rWsCJoQm7V3vKuVFeRJ3h5iwbwvzDSYpr8pKKfCFjk'

export const indexUserGames = (collectionId) => {
  return fetch(
    `${SERVER_URL}/games/`, // ?collection=${collectionId}`,
    {
      headers: {
        Authorization: `Bearer ${USER_TOKEN}`,
      },
    }
  )
}
