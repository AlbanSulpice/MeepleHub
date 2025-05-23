// session.js – gestion globale connexion/déconnexion
const token = localStorage.getItem('token');
const logoutLink = document.getElementById('logout-link');
const loginLink = document.getElementById('login-link');
const welcomeMessage = document.getElementById('welcome-message');

if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Message de bienvenue
    if (welcomeMessage && payload.nom) {
      welcomeMessage.textContent = `Bienvenue ${payload.nom} !`;
    }

    // Boutons pour utilisateurs connectés
    document.querySelectorAll('.connected-only').forEach(el => {
      el.style.display = 'inline-block';
    });

    // Boutons réservés aux admins
    document.querySelectorAll('.admin-only').forEach(el => {
      if (payload.is_admin) {
        el.style.display = 'inline-block';
      } else {
        el.style.display = 'none';
      }
    });

    // Déconnexion
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

    // Promotion admin si non-admin
    const adminLink = document.getElementById('admin-link');
    const adminBadge = document.getElementById('admin-badge');

    if (payload.is_admin) {
      if (adminBadge) adminBadge.style.display = 'inline';
      if (adminLink) adminLink.style.display = 'none';
    } else {
      if (adminLink) {
        adminLink.style.display = 'inline-block';
        adminLink.addEventListener('click', async () => {
          const code = prompt("Entrez le code admin :");
          if (!code) return;

          const res = await fetch('http://localhost:3000/api/auth/promote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ code })
          });

          const data = await res.json();
          if (res.ok) {
            alert(data.message);
            window.location.reload();
          } else {
            alert(data.message);
          }
        });
      }
    }

  } catch (e) {
    console.error('Token invalide');
    localStorage.removeItem('token');
  }
} else {
  // Utilisateur non connecté
  document.querySelectorAll('.connected-only, .admin-only').forEach(el => {
    el.style.display = 'none';
  });

  if (logoutLink) logoutLink.style.display = 'none';
  if (loginLink) loginLink.style.display = 'inline-block';
}
