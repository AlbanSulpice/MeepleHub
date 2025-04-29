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
        body: JSON.stringify({ email, mot_de_passe }) // clé "mot_de_passe" et pas "password"
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Stocker le token
        alert('Connexion réussie ✅');
        window.location.href = 'games.html'; // Redirection vers une page protégée
      } else {
        alert(data.message); // Affiche le message d'erreur du serveur
      }

    } catch (error) {
      console.error('Erreur:', error);
    }
  });
}