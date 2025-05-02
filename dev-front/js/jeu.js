// --- Récupération de l'id du jeu dans l'URL ---
const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');

const likeBtn = document.getElementById('like-btn');
const title = document.getElementById('game-title');
const image = document.getElementById('game-image');
const description = document.getElementById('game-description');
const category = document.getElementById('game-category');
const duration = document.getElementById('game-duration');

let currentGame = null; // 👈 global pour pouvoir liker

// --- Fonction de transformation du nom en nom de fichier image ---
function slugify(nom) {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

// --- Appel de l’API pour récupérer le jeu ---
async function fetchGame(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/games/${id}`);
    if (!response.ok) throw new Error('Jeu non trouvé');
    const game = await response.json();
    displayGame(game);
  } catch (error) {
    console.error(error);
    title.textContent = 'Jeu introuvable';
  }
}

// --- Remplir la page avec les données du jeu ---
function displayGame(game) {
  currentGame = game; // 👈 stocké globalement

  title.textContent = game.nom;
  image.src = `../images/jeux/${slugify(game.nom)}.webp`;
  description.textContent = game.description;
  duration.textContent = game.duree + ' min';
  category.textContent = `${game.nb_joueurs_min} à ${game.nb_joueurs_max} joueurs`;

  if (game.quantite_disponible < 1) {
    const rentBtn = document.getElementById('rent-btn');
    if (rentBtn) {
      rentBtn.disabled = true;
      rentBtn.textContent = 'Indisponible';
    }
  }
}

fetchGame(gameId);

// --- Gestion du token et affichage connecté ---
const token = localStorage.getItem('token');
const logoutLink = document.getElementById('logout-link');
const loginLink = document.getElementById('login-link');

if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    document.querySelectorAll('.connected-only').forEach(btn => {
      btn.style.display = 'inline-block';
    });

    if (logoutLink) {
      logoutLink.style.display = 'inline-block';
      logoutLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('http://localhost:3000/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('token');
        window.location.href = 'index.html';
      });
    }

    if (loginLink) loginLink.style.display = 'none';

  } catch (e) {
    console.error('Token invalide');
    localStorage.removeItem('token');
  }
} else {
  document.querySelectorAll('.connected-only').forEach(btn => {
    btn.style.display = 'none';
  });
  if (logoutLink) logoutLink.style.display = 'none';
  if (loginLink) loginLink.style.display = 'inline-block';
}

// --- Gestion du bouton Like ---
if (likeBtn) {
  likeBtn.addEventListener('click', async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/games/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_jeu: currentGame.id_jeu })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        likeBtn.disabled = true;
        likeBtn.textContent = "❤️ Liké";
      } else {
        alert(data.message || 'Erreur lors du like');
      }
    } catch (err) {
      console.error(err);
    }
  });
}