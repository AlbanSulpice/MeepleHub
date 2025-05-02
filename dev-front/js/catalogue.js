// Récupère tous les jeux (cards)
// gestion des boutons visibles uniquement si connecté

const cards = Array.from(document.querySelectorAll('.game-card'));
const container = document.querySelector('.game-grid');


const token = localStorage.getItem('token');
const welcome = document.getElementById('welcome-message');
const logoutLink = document.getElementById('logout-link'); // renommé pour plus de clarté
const loginLink = document.getElementById('login-link');

if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (welcome && payload.nom) {
      welcome.textContent = `Bienvenue ${payload.nom} !`;
    }

    document.querySelectorAll('.connected-only').forEach(btn => {
      btn.style.display = 'inline-block';
    });

    if (logoutLink) {
      logoutLink.style.display = 'inline-block';
      logoutLink.addEventListener('click', async (e) => {
        e.preventDefault(); // empêche la navigation
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
  if (welcome) {
    welcome.textContent = `Bienvenue sur le catalogue MeepleHub !`;
  }

  document.querySelectorAll('.connected-only').forEach(btn => {
    btn.style.display = 'none';
  });

  if (logoutLink) logoutLink.style.display = 'none';
  if (loginLink) loginLink.style.display = 'inline-block';
}


// Fonction de tri
function sortGames(criteria) {
  let sortedCards = [];

  if (criteria === 'popularity') {
    // Imaginons que la popularité soit simplement l'ordre actuel
    sortedCards = cards;
  } else if (criteria === 'rating') {
    // Tri imaginaire par meilleures notes (on pourrait utiliser un dataset-rating si besoin)
    sortedCards = [...cards].sort((a, b) => {
      // Exemple fictif : note random pour tester
      const ratingA = Math.random();
      const ratingB = Math.random();
      return ratingB - ratingA;
    });
  } else if (criteria === 'duration') {
    // Tri par durée (idem, dans la vraie vie on prendra une vraie donnée)
    sortedCards = [...cards].sort((a, b) => {
      const durationA = Math.random();
      const durationB = Math.random();
      return durationA - durationB;
    });
  }

  // Vide la grille
  container.innerHTML = '';
  // Réinsère les jeux triés
  sortedCards.forEach(card => {
    container.appendChild(card);
  });
}

// Gestionnaire de l'événement sur le select
document.getElementById('sort').addEventListener('change', (e) => {
  sortGames(e.target.value);
});
