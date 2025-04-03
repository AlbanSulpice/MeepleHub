-- -----------------------------------------------------
-- Création de la base de données MeepleHub
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS MeepleHub;
USE MeepleHub;

-- -----------------------------------------------------
-- Table : utilisateur
-- -----------------------------------------------------
CREATE TABLE utilisateur (
    id_utilisateur INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------
-- Table : jeu
-- -----------------------------------------------------
CREATE TABLE jeu (
    id_jeu INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    duree INT,
    nb_joueurs_min INT,
    nb_joueurs_max INT,
    quantite_total INT NOT NULL,
    quantite_disponible INT NOT NULL
);

-- -----------------------------------------------------
-- Table : categorie
-- -----------------------------------------------------
CREATE TABLE categorie (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------
-- Table : mecanique
-- -----------------------------------------------------
CREATE TABLE mecanique (
    id_mecanique INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------
-- Table de liaison : jeu_categorie
-- -----------------------------------------------------
CREATE TABLE jeu_categorie (
    id_jeu INT,
    id_categorie INT,
    PRIMARY KEY (id_jeu, id_categorie),
    FOREIGN KEY (id_jeu) REFERENCES jeu(id_jeu) ON DELETE CASCADE,
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table de liaison : jeu_mecanique
-- -----------------------------------------------------
CREATE TABLE jeu_mecanique (
    id_jeu INT,
    id_mecanique INT,
    PRIMARY KEY (id_jeu, id_mecanique),
    FOREIGN KEY (id_jeu) REFERENCES jeu(id_jeu) ON DELETE CASCADE,
    FOREIGN KEY (id_mecanique) REFERENCES mecanique(id_mecanique) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table de liaison : jeu_favori
-- -----------------------------------------------------
CREATE TABLE jeu_favori (
    id_utilisateur INT,
    id_jeu INT,
    date_ajout DATE,
    PRIMARY KEY (id_utilisateur, id_jeu),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (id_jeu) REFERENCES jeu(id_jeu) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table : note
-- -----------------------------------------------------
CREATE TABLE note (
    id_note INT PRIMARY KEY AUTO_INCREMENT,
    id_utilisateur INT,
    id_jeu INT,
    valeur INT CHECK (valeur BETWEEN 1 AND 5),
    commentaire TEXT,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (id_jeu) REFERENCES jeu(id_jeu) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table : location
-- -----------------------------------------------------
CREATE TABLE location (
    id_location INT PRIMARY KEY AUTO_INCREMENT,
    id_utilisateur INT,
    id_jeu INT,
    date_debut DATE NOT NULL,
    date_fin DATE,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (id_jeu) REFERENCES jeu(id_jeu) ON DELETE CASCADE
);