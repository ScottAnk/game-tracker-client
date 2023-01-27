import cache from './cache.js'

const SERVER_URL = 'http://127.0.0.1:8000'

// game operations
export const indexUserGames = (collectionId) => {
  return fetch(
    `${SERVER_URL}/games/`, // ?collection=${collectionId}`,
    {
      headers: {
        Authorization: `Bearer ${cache.token}`,
      },
    }
  )
}

export const createGame = (gameDetails) => {
  return fetch(
    `${SERVER_URL}/games/`, // ?collection=${collectionId}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${cache.token}`,
      },
      body: JSON.stringify({ game: gameDetails }),
    }
  )
}

// user operations
export const signUp = (credentials) => {
  return fetch(`${SERVER_URL}/sign-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ credentials: credentials }),
  })
}

export const signIn = (credentials) => {
  return fetch(`${SERVER_URL}/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ credentials: credentials }),
  })
}

// collection operations
export const indexUserCollections = () => {
  return fetch(`${SERVER_URL}/collections`, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${cache.token}`,
    },
  })
}
