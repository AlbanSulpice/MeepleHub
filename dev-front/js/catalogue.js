// Récupère tous les jeux (cards)
const cards = Array.from(document.querySelectorAll('.game-card'));
const container = document.querySelector('.game-grid');

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
