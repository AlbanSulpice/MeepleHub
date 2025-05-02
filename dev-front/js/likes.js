const container = document.getElementById('liked-games');

function slugify(nom) {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

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

async function loadLikedGames() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Vous devez être connecté pour voir vos likes.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/games/liked', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Erreur lors du chargement des jeux likés');

    const games = await response.json();

    if (games.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>Aucun jeu liké pour le moment.</p>";
      return;
    }

    games.forEach(game => {
      const card = createCard(game);
      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='text-align:center;'>Erreur de chargement.</p>";
  }
}

loadLikedGames();