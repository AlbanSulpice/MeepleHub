// js/auth.js

// --- LOGIN ---
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const mot_de_passe = document.getElementById('password').value.trim();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, mot_de_passe })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Stocker le token
        alert('Connexion réussie ✅');
        window.location.href = 'index.html';
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error('Erreur:', error);
    }
  });
}

// --- REGISTER ---
const registerForm = document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mot_de_passe = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (mot_de_passe !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom, email, mot_de_passe })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Inscription réussie ✅');
        window.location.href = 'login.html'; // Redirection après inscription
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error('Erreur:', error);
    }
  });
}

// --- LOGOUT ---
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    } catch (err) {
      console.error('Erreur de déconnexion :', err);
    }
  });
}