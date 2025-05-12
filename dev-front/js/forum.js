document.addEventListener("DOMContentLoaded", async () => {
  const forumContent = document.getElementById("forum-content");
  const notConnected = document.getElementById("not-connected");
  const jeuSelect = document.getElementById("jeu-select");
  const messagesDiv = document.getElementById("messages");
  const sendBtn = document.getElementById("send-btn");
  const messageInput = document.getElementById("message-input");

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;
  const API_BASE = "http://localhost:3000/api/forum";

  // Si pas connecté
  if (!token) {
    notConnected.style.display = "block";
    forumContent.style.display = "none";
    return;
  }

  // Sinon afficher le forum
  notConnected.style.display = "none";
  forumContent.style.display = "block";

  // Récupérer les jeux
  async function chargerJeux() {
    try {
      const res = await fetch(`${API_BASE}/games`);
      const jeux = await res.json();

      jeux.forEach((jeu) => {
        const option = document.createElement("option");
        option.value = jeu.id_jeu;
        option.textContent = jeu.nom;
        jeuSelect.appendChild(option);
      });

      const randomIndex = Math.floor(Math.random() * jeux.length);
      jeuSelect.selectedIndex = randomIndex;

      chargerMessages(jeuSelect.value);
    } catch (err) {
      messagesDiv.innerHTML = "<p>Erreur de chargement des jeux.</p>";
    }
  }

  // Charger les messages d’un jeu
  async function chargerMessages(id_jeu) {
  messagesDiv.innerHTML = "<p>Chargement...</p>";
  try {
    const res = await fetch(`${API_BASE}/messages/${id_jeu}`);
    const messages = await res.json();

    messagesDiv.innerHTML = "";
    messages.forEach((msg) => {
      const container = document.createElement("div");
      container.className = "message";

      const author = document.createElement("div");
      author.className = "author";
      author.textContent = msg.nom;

      const date = document.createElement("div");
      date.className = "date";
      date.textContent = new Date(msg.date_creation).toLocaleString();

      const content = document.createElement("div");
      content.className = "content";
      content.textContent = msg.message;

      container.appendChild(author);
      container.appendChild(date);
      container.appendChild(content);

      // Si l'utilisateur est l'auteur → bouton 🗑️
      if (msg.id_utilisateur === userId) {
        const btn = document.createElement("button");
        btn.className = "btn-supprimer";
        btn.innerHTML = "🗑️";
        btn.title = "Supprimer";

        btn.addEventListener("click", async () => {
          if (!confirm("Supprimer ce message ?")) return;

          const res = await fetch(`${API_BASE}/messages/${msg.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();
          alert(data.message);
          chargerMessages(id_jeu);
        });

        container.appendChild(btn);
      }

      messagesDiv.appendChild(container);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    messagesDiv.innerHTML = "<p>Erreur de chargement des messages.</p>";
  }
}


  // Envoyer un message
  async function envoyerMessage() {
    const id_jeu = jeuSelect.value;
    const message = messageInput.value.trim();

    if (!message) return;

    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_jeu, message }),
      });

      const data = await res.json();

      if (res.ok) {
        messageInput.value = "";
        chargerMessages(id_jeu);
      } else {
        if (res.status === 403 && data.message?.includes("bloqué")) {
          alert("🚫 Vous avez été bloqué par un administrateur. Vous ne pouvez plus écrire dans le forum.");
        } else {
          alert("❌ Erreur lors de l’envoi du message.");
        }
      }
    } catch (err) {
      alert("🌐 Erreur réseau.");
    }
  }

  jeuSelect.addEventListener("change", () => {
    chargerMessages(jeuSelect.value);
  });

  sendBtn.addEventListener("click", envoyerMessage);

  chargerJeux();
});
