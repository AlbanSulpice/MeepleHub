document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const container = document.getElementById("recommendations");
  const warning = document.getElementById("recommendation-warning");

  if (!token) {
    warning.style.display = "block";
    return;
  }

  function slugify(nom) {
    return nom
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');
  }

  try {
    const res = await fetch("http://localhost:3000/api/games/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const jeux = await res.json();

    if (jeux.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>Aucune recommandation disponible pour l’instant.</p>";
      return;
    }

    jeux.forEach(jeu => {
      const card = document.createElement("div");
      card.className = "game-card";

      const imagePath = `../images/jeux/${slugify(jeu.nom)}.webp`;

      card.innerHTML = `
        <img src="${imagePath}" alt="${jeu.nom}" loading="lazy">
        <h3>${jeu.nom}</h3>
        <p>${jeu.description}</p>
        <a href="jeu.html?id=${jeu.id_jeu}">Voir détails</a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p style='text-align:center;'>Erreur lors du chargement des recommandations.</p>";
    console.error(err);
  }
});
