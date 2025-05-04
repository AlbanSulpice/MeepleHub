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

  // ❤️ Ajout visuel du nombre de likes
  const likesEl = document.createElement('p');
  likesEl.textContent = `❤️ ${game.nb_likes || 0} likes`;
  likesEl.style.marginTop = '0.5rem';
  likesEl.style.fontWeight = 'bold';
  likesEl.style.color = '#fff';
  div.appendChild(likesEl);

  return div;
}

let loadedCards = [];

async function loadGames() {
  try {
    const res = await fetch('http://localhost:3000/api/games');
    const games = await res.json();

    loadedCards = games.map(game => {
      const card = createCard(game);
      return { game, card };
    });

    // 🟢 Affiche les jeux dans l’ordre brut reçu (pas trié)
    container.innerHTML = '';
    loadedCards.forEach(({ card }) => container.appendChild(card));

  } catch (err) {
    console.error('Erreur chargement jeux :', err);
  }
}

// --- Tri local déclenché par l'utilisateur ---
function sortGames(criteria) {
  let sorted = [];

  if (criteria === 'popularity') {
    sorted = [...loadedCards].sort((a, b) => (b.game.nb_likes || 0) - (a.game.nb_likes || 0));
  } else if (criteria === 'rating') {
    sorted = [...loadedCards].sort((a, b) => (b.game.note_moyenne || 0) - (a.game.note_moyenne || 0));
  } else if (criteria === 'duration') {
    sorted = [...loadedCards].sort((a, b) => (a.game.duree || 0) - (b.game.duree || 0));
  } else {
    sorted = loadedCards;
  }

  container.innerHTML = '';
  sorted.forEach(({ card }) => container.appendChild(card));
}

// --- Écouteur sur la liste déroulante ---
document.getElementById('sort').addEventListener('change', (e) => {
  sortGames(e.target.value);
});

// --- Chargement initial brut ---
loadGames();