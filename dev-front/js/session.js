// session.js – gestion globale connexion/déconnexion
const token = localStorage.getItem('token');
const logoutLink = document.getElementById('logout-link');
const loginLink = document.getElementById('login-link');
const welcomeMessage = document.getElementById('welcome-message');

if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Affichage personnalisé si souhaité
    if (welcomeMessage && payload.nom) {
      welcomeMessage.textContent = `Bienvenue ${payload.nom} !`;
    }

    // Boutons dynamiques
    document.querySelectorAll('.connected-only').forEach(el => {
      el.style.display = 'inline-block';
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
  document.querySelectorAll('.connected-only').forEach(el => {
    el.style.display = 'none';
  });

  if (logoutLink) logoutLink.style.display = 'none';
  if (loginLink) loginLink.style.display = 'inline-block';
}