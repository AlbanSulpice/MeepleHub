// js/auth.js

// Inscription
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful ✅');
        window.location.href = 'login.html'; // Redirection vers login
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  });
}

// Connexion
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Stocker le token
        alert('Login successful ✅');
        window.location.href = 'games.html'; // Redirection vers une page protégée après login
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  });
}