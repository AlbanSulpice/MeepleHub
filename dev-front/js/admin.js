const token = localStorage.getItem('token');
const API = 'http://localhost:3000/api/admin';

if (!token) {
  alert('Accès interdit. Vous devez être connecté.');
  window.location.href = 'login.html';
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
};

// 🔄 Chargement des jeux
async function loadGames() {
  const res = await fetch('http://localhost:3000/api/games');
  const games = await res.json();

  const editSelect = document.getElementById('edit-select');
  const deleteSelect = document.getElementById('delete-select');

  editSelect.innerHTML = '';
  deleteSelect.innerHTML = '';

  games.forEach(game => {
    const option1 = new Option(game.nom, game.id_jeu);
    const option2 = new Option(game.nom, game.id_jeu);
    editSelect.appendChild(option1);
    deleteSelect.appendChild(option2);
  });

  if (games.length > 0) fillEditForm(games[0]);
  editSelect.addEventListener('change', () => {
    const selected = games.find(g => g.id_jeu == editSelect.value);
    fillEditForm(selected);
  });
}

// 🎯 Pré-remplir le formulaire de modification
function fillEditForm(game) {
  const form = document.getElementById('edit-form');
  form.nom.value = game.nom;
  form.description.value = game.description;
  form.duree.value = game.duree;
  form.min.value = game.nb_joueurs_min;
  form.max.value = game.nb_joueurs_max;
  form.quantite.value = game.quantite_total;
}

// ➕ Ajouter un jeu
document.getElementById('add-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const body = {
    nom: form.nom.value,
    description: form.description.value,
    duree: Number(form.duree.value),
    nb_joueurs_min: Number(form.min.value),
    nb_joueurs_max: Number(form.max.value),
    quantite_total: Number(form.quantite.value)
  };

  const res = await fetch(`${API}/jeu`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  const data = await res.json();
  alert(data.message);
  form.reset();
  loadGames();
});

// ✏️ Modifier un jeu
document.getElementById('edit-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const id = form.jeu.value;

  const body = {
    nom: form.nom.value,
    description: form.description.value,
    duree: Number(form.duree.value),
    nb_joueurs_min: Number(form.min.value),
    nb_joueurs_max: Number(form.max.value),
    quantite_total: Number(form.quantite.value)
  };

  const res = await fetch(`${API}/jeu/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });

  const data = await res.json();
  alert(data.message);
  loadGames();
});

// 🗑️ Supprimer un jeu
document.getElementById('delete-form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = e.target.jeu.value;

  const res = await fetch(`${API}/jeu/${id}`, {
    method: 'DELETE',
    headers
  });

  const data = await res.json();
  alert(data.message);
  loadGames();
});

// 👥 Charger les utilisateurs
async function loadUsers() {
  const res = await fetch(`${API}/utilisateurs`, { headers });
  const users = await res.json();
  const container = document.getElementById('users-list');
  container.innerHTML = '';

  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user-row';

    const span = document.createElement('span');
    span.textContent = `${user.nom} (${user.email}) ${user.is_admin ? '[admin]' : ''}`;

    const btn = document.createElement('button');
    btn.textContent = user.est_bloque ? 'Débloquer' : 'Bloquer';
    btn.addEventListener('click', async () => {
      const res = await fetch(`${API}/utilisateur/${user.id_utilisateur}/blocage`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ est_bloque: !user.est_bloque })
      });
      const data = await res.json();
      alert(data.message);
      loadUsers();
    });

    div.appendChild(span);
    div.appendChild(btn);
    container.appendChild(div);
  });
}

// 🔁 Initialisation
loadGames();
loadUsers();
