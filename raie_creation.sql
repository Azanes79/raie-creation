-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 24 Janvier 2020 à 16:37
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `raie_creation`
--

-- --------------------------------------------------------

--
-- Structure de la table `meeting`
--

CREATE TABLE `meeting` (
  `id` int(11) NOT NULL,
  `dateStart` datetime NOT NULL,
  `dateEnd` datetime NOT NULL,
  `description` varchar(500) NOT NULL,
  `salon_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `meeting`
--

INSERT INTO `meeting` (`id`, `dateStart`, `dateEnd`, `description`, `salon_id`, `service_id`, `user_id`) VALUES
(1, '2020-01-25 10:00:00', '2020-01-25 12:00:00', 'une description', 1, 1, 1),
(2, '2020-01-27 14:00:00', '2020-01-27 15:30:00', 'une description autre', 1, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `offer`
--

CREATE TABLE `offer` (
  `id_salon` int(11) NOT NULL,
  `id_service` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `offer`
--

INSERT INTO `offer` (`id_salon`, `id_service`) VALUES
(1, 1),
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `salon`
--

CREATE TABLE `salon` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `city` varchar(128) NOT NULL,
  `addresse` varchar(128) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `salon`
--

INSERT INTO `salon` (`id`, `name`, `city`, `addresse`, `zipcode`, `description`) VALUES
(1, 'La raie création - TOULOUSE', 'TOULOUSE', 'fegzigfbiu', '31000', 'coiffure'),
(2, 'La raie création - PARIS', 'PARIS', 'fbzevbi', '75000', 'coiffure');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `timeEstimation` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `service`
--

INSERT INTO `service` (`id`, `name`, `price`, `timeEstimation`) VALUES
(1, 'Couleur', 70, '02:00:00'),
(2, 'Mèches', 60, '01:30:00');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mdp` varchar(128) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `type` enum('Client','User','Admin','') NOT NULL,
  `gender` enum('Men','Women','Other','') NOT NULL,
  `id_salon` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `email`, `mdp`, `firstName`, `lastName`, `type`, `gender`, `id_salon`) VALUES
(1, 'test@test.com', '1234', 'Test', 'TEST', 'Client', 'Men', NULL),
(2, 'admin@admin.com', '1234', 'admin', 'ADMIN', 'Admin', 'Other', 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salon_id` (`salon_id`,`service_id`,`user_id`),
  ADD KEY `FK_MEETING_USER` (`user_id`),
  ADD KEY `FK_MEETING_SERVICE` (`service_id`);

--
-- Index pour la table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id_salon`,`id_service`),
  ADD KEY `id_salon` (`id_salon`),
  ADD KEY `id_service` (`id_service`);

--
-- Index pour la table `salon`
--
ALTER TABLE `salon`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_salon` (`id_salon`),
  ADD KEY `id_salon_2` (`id_salon`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `salon`
--
ALTER TABLE `salon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `FK_MEETING_SALON` FOREIGN KEY (`salon_id`) REFERENCES `salon` (`id`),
  ADD CONSTRAINT `FK_MEETING_SERVICE` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `FK_MEETING_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `FK_OFFER_SALON` FOREIGN KEY (`id_salon`) REFERENCES `salon` (`id`),
  ADD CONSTRAINT `FK_OFFER_SERVICE` FOREIGN KEY (`id_service`) REFERENCES `service` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_USER_SALON` FOREIGN KEY (`id_salon`) REFERENCES `salon` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
