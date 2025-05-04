const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');

const likeBtn = document.getElementById('like-btn');
const rateBtn = document.getElementById('rate-btn');
const ratingStars = document.getElementById('rating-stars');
const title = document.getElementById('game-title');
const image = document.getElementById('game-image');
const description = document.getElementById('game-description');
const category = document.getElementById('game-category');
const duration = document.getElementById('game-duration');

let currentGame = null;

function slugify(nom) {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

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

function displayGame(game) {
  currentGame = game;

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

// --- Gestion du bouton Noter ---
if (rateBtn && ratingStars) {
  rateBtn.addEventListener('click', () => {
    ratingStars.style.display = 'block';
  });
}

// --- Système d'étoiles ---
const stars = ratingStars ? ratingStars.querySelectorAll('.star') : [];

function displayStars(note) {
  stars.forEach(star => {
    const val = Number(star.dataset.value);
    star.textContent = val <= note ? '★' : '☆';
  });
}

if (ratingStars && token) {
  (async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/games/rating/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.note) displayStars(data.note);
    } catch (err) {
      console.error('Erreur en chargeant la note :', err);
    }
  })();

  stars.forEach(star => {
    star.addEventListener('click', async () => {
      const rating = Number(star.dataset.value);

      try {
        const res = await fetch(`http://localhost:3000/api/games/rating/${gameId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ note: rating })
        });

        if (res.ok) {
          displayStars(rating);
        }
      } catch (err) {
        console.error('Erreur lors de l’enregistrement de la note :', err);
      }
    });
  });
}