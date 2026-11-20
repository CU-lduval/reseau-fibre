# Éditeur de réseaux fibre — application (PWA)

Ce dossier contient l'application complète. Il suffit de le mettre en ligne sur un
hébergement **HTTPS** pour pouvoir l'installer sur Android, iPhone/iPad et PC.

```
index.html             l'éditeur
manifest.webmanifest   nom, icônes, couleurs de l'application
sw.js                  fonctionnement hors connexion
icons/                 icônes de l'application
```

## Mise en ligne avec GitHub Pages (gratuit)

1. Créez un compte sur https://github.com (si besoin).
2. En haut à droite : **+ › New repository**. Nom : `reseau-fibre` par exemple.
   Choisissez **Public** (GitHub Pages gratuit l'exige ; vos plans ne sont pas
   dans le dépôt, seulement le logiciel). Cliquez **Create repository**.
3. Sur la page du dépôt : **uploading an existing file** (ou *Add file › Upload files*).
   Glissez **le contenu** du dossier (index.html, manifest.webmanifest, sw.js et le
   dossier icons), pas le dossier lui-même. Cliquez **Commit changes**.
4. **Settings › Pages** : *Source* = **Deploy from a branch**, *Branch* = **main** / **/(root)**,
   puis **Save**.
5. Après une à deux minutes, l'adresse s'affiche en haut de cette page :
   `https://VOTRE-NOM.github.io/reseau-fibre/`

## Installation sur la tablette ou le téléphone

- **Android (Chrome)** : ouvrez l'adresse, puis menu ⋮ › **Installer l'application**
  (ou Fichier › 📲 Installer l'application dans l'éditeur).
- **iPhone / iPad (Safari)** : bouton Partager › **Sur l'écran d'accueil**.
- **PC (Chrome / Edge)** : icône d'installation à droite de la barre d'adresse.

Ouvrez l'application une fois avec du réseau (et importez un fond PDF une fois si
vous en utilisez) : ensuite elle fonctionne hors connexion.

## Enregistrer et échanger les plans

- **💾 Enregistrer** : garde le plan dans l'application, sur cet appareil.
- **Fichier › Exporter le plan › Télécharger** : fichier `.json` dans *Téléchargements*.
- **Partager le fichier…** : envoie le plan vers Drive, un mail… Sur Android il est
  envoyé en `.txt` (Android refuse le partage de `.json`) ; il se rouvre normalement.
- **Fichier › Ouvrir un plan** : rouvre un `.json` ou un `.txt` exporté.

Le fichier exporté reste la vraie sauvegarde : désinstaller l'application ou effacer
les données du navigateur supprime les plans enregistrés dans l'appareil.

## Publier une nouvelle version

1. Remplacez `index.html` dans le dépôt GitHub par la nouvelle version.
2. Dans `sw.js`, changez la ligne `const VERSION = 'fibre-v1';` en `'fibre-v2'`, etc.
3. Les appareils récupèrent la mise à jour à la prochaine ouverture avec du réseau.
