-- Insérer des utilisateurs
INSERT INTO utilisateur (nom, email, mot_de_passe) VALUES
('Alice Dupont', 'alice.dupont@email.com', 'motdepasse123'),
('Bob Martin', 'bob.martin@email.com', 'securepass'),
('Charlie Durand', 'charlie.durand@email.com', 'charlie123'),
('David Lefevre', 'david.lefevre@email.com', 'davidpass'),
('Emma Rolland', 'emma.rolland@email.com', 'emma2025'),
('Florian Morel', 'florian.morel@email.com', 'florianM'),
('Gabrielle Simon', 'gabrielle.simon@email.com', 'gabysimon');

-- Insérer des jeux
INSERT INTO jeu (nom, description, duree, nb_joueurs_min, nb_joueurs_max, quantite_total, quantite_disponible) VALUES
('Catan', 'Jeu de gestion et de stratégie sur une île en expansion.', 90, 3, 4, 5, 3),
('Dixit', 'Jeu de cartes et d''imagination avec de magnifiques illustrations.', 30, 3, 6, 4, 2),
('7 Wonders', 'Jeu de civilisation où vous développez votre cité.', 45, 2, 7, 6, 5),
('Azul', 'Jeu de stratégie et de placement de tuiles.', 40, 2, 4, 3, 2),
('Time’s Up!', 'Jeu d’ambiance où l’on doit faire deviner des personnages.', 30, 4, 12, 6, 6),
('Risk', 'Jeu de conquête et de stratégie militaire.', 180, 2, 6, 4, 3),
('Les Aventuriers du Rail', 'Jeu de gestion et de placement de trains.', 45, 2, 5, 5, 4),
('Splendor', 'Jeu de cartes et de gestion de ressources.', 30, 2, 4, 3, 2),
('Terraforming Mars', 'Jeu de stratégie sur la colonisation de Mars.', 120, 1, 5, 4, 3);

-- Insérer des catégories
INSERT INTO categorie (nom) VALUES
('Stratégie'),
('Familial'),
('Ambiance'),
('Cartes'),
('Gestion'),
('Conquête');

-- Insérer des mécaniques
INSERT INTO mecanique (nom) VALUES
('Gestion de ressources'),
('Bluff'),
('Draft'),
('Déduction'),
('Placement de tuiles'),
('Majorité'),
('Conquête de territoire');

-- Associer les jeux aux catégories
INSERT INTO jeu_categorie (id_jeu, id_categorie) VALUES
(1, 1), (2, 2), (3, 1), (4, 1), (5, 3),
(6, 6), (7, 2), (8, 5), (9, 1);

-- Associer les jeux aux mécaniques
INSERT INTO jeu_mecanique (id_jeu, id_mecanique) VALUES
(1, 1), (2, 4), (3, 3), (4, 5), (5, 2),
(6, 7), (7, 6), (8, 1), (9, 1);

-- Ajouter des favoris
INSERT INTO jeu_favori (id_utilisateur, id_jeu, date_ajout) VALUES
(1, 1, '2025-03-01'), (2, 3, '2025-03-02'), (3, 2, '2025-03-03'),
(4, 6, '2025-03-04'), (5, 7, '2025-03-05'), (6, 8, '2025-03-06');

-- Ajouter des notes
INSERT INTO note (id_utilisateur, id_jeu, valeur, commentaire) VALUES
(1, 1, 5, 'Un excellent jeu de stratégie !'),
(2, 2, 4, 'Très beau jeu, mais il faut être inspiré.'),
(3, 3, 5, 'Rapide et intense, j''adore.'),
(4, 6, 3, 'Un peu long mais stratégique.'),
(5, 7, 5, 'Super jeu familial !'),
(6, 9, 4, 'Bonne immersion, mais un peu complexe.');

-- Ajouter des locations
INSERT INTO location (id_utilisateur, id_jeu, date_debut, date_fin) VALUES
(1, 1, '2025-03-01', '2025-03-07'),
(2, 2, '2025-03-02', NULL),
(3, 3, '2025-03-03', '2025-03-08'),
(4, 6, '2025-03-04', NULL),
(5, 7, '2025-03-05', '2025-03-10'),
(6, 8, '2025-03-06', NULL),
(7, 9, '2025-03-07', '2025-03-14');
