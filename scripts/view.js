export default {
  loginPage: document.querySelector('#login-page'),
  signInButton: document.querySelector('#sign-in-button'),
  signUpButton: document.querySelector('#sign-up-button'),
  credentialsForm: document.querySelector('#credentials-form'),

  mainContainer: document.querySelector('#main-container'),
  createGameButton: document.querySelector('#create-game-button'),
  createCollectionButton: document.querySelector('#create-collection-button'),
  createCollectionForm: document.querySelector('#create-collection-form'),
  createCollectionCard: document.querySelector('#create-collection-card'),
  signOutButton: document.querySelector('#sign-out-button'),

  collectionPage: document.querySelector('#collection-page'),
  activeCollectionTitle: document.querySelector('#active-collection-title'),
  collectionList: document.querySelector('#collection-list'),
  collectionGrid: document.querySelector('#collection-grid'),

  createGamePage: document.querySelector('#create-game-page'),
  createGameForm: document.querySelector('#create-game-form'),
  submitNewGameButton: document.querySelector('#submit-new-game'),
  closeCreateGameButton: document.querySelector('#create-game-page .fa-xmark'),

  gameDetailsPage: document.querySelector('#game-details-page'),
  updateGameForm: document.querySelector('#update-game-form'),
  closeGameDetailsButton: document.querySelector(
    '#game-details-page .fa-xmark'
  ),

  deleteGameButton: document.querySelector('#delete-game-button'),
  messageContainer: document.querySelector('#message-container'),
}
