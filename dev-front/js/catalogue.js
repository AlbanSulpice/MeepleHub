const container = document.querySelector('.game-grid');

// --- Utilitaire : transforme un nom en nom d'image ---
function slugify(nom) {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

// --- Création dynamique des cartes jeux ---
function createCard(game) {
  const div = document.createElement('div');
  div.className = 'game-card';
  div.innerHTML = `
    <img src="../images/jeux/${slugify(game.nom)}.webp" alt="${game.nom}">
    <h3>${game.nom}</h3>
    <p>${game.description}</p>
    <a href="jeu.html?id=${game.id_jeu}">Voir détails</a>
  `;
  return div;
}

// --- Chargement depuis l’API ---
let loadedCards = [];

async function loadGames() {
  try {
    const res = await fetch('http://localhost:3000/api/games');
    const games = await res.json();
    container.innerHTML = ''; // vide la grille

    games.forEach(game => {
      const card = createCard(game);
      container.appendChild(card);
      loadedCards.push({ game, card }); // stocke pour le tri
    });
  } catch (err) {
    console.error('Erreur chargement jeux :', err);
  }
}

// --- Tri local (fictif pour l'instant) ---
function sortGames(criteria) {
  let sorted = [];

  if (criteria === 'popularity') {
    sorted = loadedCards;
  } else if (criteria === 'rating') {
    sorted = [...loadedCards].sort(() => Math.random() - 0.5);
  } else if (criteria === 'duration') {
    sorted = [...loadedCards].sort(() => Math.random() - 0.5);
  }

  container.innerHTML = '';
  sorted.forEach(({ card }) => container.appendChild(card));
}

document.getElementById('sort').addEventListener('change', (e) => {
  sortGames(e.target.value);
});

// --- Lancement ---
loadGames();