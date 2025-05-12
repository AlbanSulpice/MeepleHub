document.addEventListener("DOMContentLoaded", async () => {
  const forumContent = document.getElementById("forum-content");
  const notConnected = document.getElementById("not-connected");
  const jeuSelect = document.getElementById("jeu-select");
  const messagesDiv = document.getElementById("messages");
  const sendBtn = document.getElementById("send-btn");
  const messageInput = document.getElementById("message-input");

  const token = localStorage.getItem("token");
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

  // Récupérer les jeux pour le menu déroulant
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

      // Jeu aléatoire au chargement
      const randomIndex = Math.floor(Math.random() * jeux.length);
      jeuSelect.selectedIndex = randomIndex;

      chargerMessages(jeuSelect.value);
    } catch (err) {
      messagesDiv.innerHTML = "<p>Erreur de chargement des jeux.</p>";
    }
  }

  // Charger les messages pour un jeu
  async function chargerMessages(id_jeu) {
    messagesDiv.innerHTML = "<p>Chargement...</p>";
    try {
      const res = await fetch(`${API_BASE}/messages/${id_jeu}`);
      const messages = await res.json();

      messagesDiv.innerHTML = "";
      messages.forEach((msg) => {
        const div = document.createElement("div");
        div.className = "message";
        div.innerHTML = `
          <div class="author">${msg.nom}</div>
          <div class="date">${new Date(msg.date_creation).toLocaleString()}</div>
          <div class="content">${msg.message}</div>
        `;
        messagesDiv.appendChild(div);
      });

      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
      messagesDiv.innerHTML = "<p>Erreur de chargement des messages.</p>";
    }
  }

  // Poster un message
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

      if (res.ok) {
        messageInput.value = "";
        chargerMessages(id_jeu);
      } else {
        alert("Erreur lors de l’envoi du message.");
      }
    } catch (err) {
      alert("Erreur réseau.");
    }
  }

  jeuSelect.addEventListener("change", () => {
    chargerMessages(jeuSelect.value);
  });

  sendBtn.addEventListener("click", envoyerMessage);

  chargerJeux();
});
