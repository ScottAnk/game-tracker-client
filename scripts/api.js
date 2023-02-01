import cache from './cache.js'

const SERVER_URL = 'http://127.0.0.1:8000'

// game operations
export const indexCollectionGames = (collectionId) => {
  if (!collectionId) {
    throw new Error(
      'Application Error: indexCollectionGames: no collection given'
    )
  }
  return fetch(`${SERVER_URL}/games/?collection=${collectionId}`, {
    headers: {
      Authorization: `Bearer ${cache.token}`,
    },
  })
}

export const showGame = (gameId) => {
  return fetch(`${SERVER_URL}/games/${gameId}`, {
    headers: {
      Authorization: `Bearer ${cache.token}`,
    },
  })
}

export const createGame = (gameDetails, collections) => {
  return fetch(`${SERVER_URL}/games/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${cache.token}`,
    },
    body: JSON.stringify({ game: gameDetails, collections: collections }),
  })
}

export const updateGame = (gameId, gameDetails) => {
  return fetch(`${SERVER_URL}/games/${gameId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${cache.token}`,
    },
    body: JSON.stringify({ game: gameDetails }),
  })
}

export const deleteGame = (gameId) => {
  return fetch(`${SERVER_URL}/games/${gameId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${cache.token}`,
    },
  })
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

export const createCollection = (collectionData) => {
  return fetch(`${SERVER_URL}/collections`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${cache.token}`,
    },
    body: JSON.stringify({ collection: collectionData }),
  })
}
