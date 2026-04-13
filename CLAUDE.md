# CLAUDE.md — Belfield Festival Website

## Contexte du projet

Site vitrine pour le **Belfield Festival**, festival de musique électronique à **Caussade (82)**.
- **7ème édition**
- **Dates : 14 & 15 août 2026**
- **Lieu : Parc de la Lère, Caussade**
- **Billetterie externalisée** (lien vers appli externe, pas de gestion sur le site)
- **2 scènes** : La Mainstage + La Quercy Stage

---

## Texte officiel (description billetterie — à réutiliser sur le site)

> 🔥 BELFIELD FESTIVAL 2026 // ENTRE DANS LA LÉGENDE 🔥
>
> Les 14 & 15 août 2026, le Belfield Festival revient transformer Caussade en épicentre de la fête pour une 7ème fois.
>
> Deux jours. Deux scènes. Une seule mission : te faire vivre un moment hors du temps.
>
> 🌪 La Mainstage : massive, vibrante, fédératrice.
> 🔥 La Quercy Stage : plus brute, plus proche, plus intense.
> Deux ambiances. Deux énergies. Même décharge d'adrénaline.
>
> Au programme ? Des DJs prêts à retourner le parc, des basses qui frappent au cœur, des drops qui unissent des centaines de voix, et cette atmosphère unique que seul Belfield sait créer. Ici, on ne vient pas juste écouter du son. On vient le ressentir ;)
>
> ✨ Belfield, c'est une communauté.
> ✨ Belfield, c'est une claque collective.
> ✨ Belfield, c'est ton week-end de l'été.

**Ton à reproduire sur tout le site** : direct, énergique, communautaire, second degré assumé. Tutoiement systématique. Pas de langage corporate.

---

## Identité visuelle (extraite de l'affiche officielle)

| Élément | Valeur |
|---|---|
| Couleur primaire | Orange vif `#FF6B1A` / `#FF7A00` |
| Couleur secondaire | Violet / Mauve `#6B35C8` / `#7B2FBE` |
| Fond | Orange dégradé chaud |
| Typographie titre | Bold, condensée, style techno/rave (ex: Bebas Neue, Rajdhani, Space Grotesk Bold) |
| Typographie corps | Sans-serif moderne et lisible |
| Motif | Halftone (points tramés) en surimpression |
| Mascotte | Oie(s) illustrées — élément humoristique et identitaire fort à réutiliser |
| Éléments déco | Fleurs, oiseaux en vol, texture granuleuse |
| Style général | Rétro-rave, sérigraphie, énergie brute — **pas minimaliste, assumé et bold** |

### Règles CSS à appliquer partout
```css
:root {
  --color-primary: #FF7A00;
  --color-secondary: #7B2FBE;
  --color-bg: #FF6B1A;
  --color-text-light: #FFF5E6;
  --color-text-dark: #1A0A00;
  --font-display: 'Bebas Neue', 'Rajdhani', sans-serif;
  --font-body: 'Space Grotesk', 'Inter', sans-serif;
}
```

---

## Architecture du site

```
/                    → Page d'accueil (Home)
/lineup              → Artistes & Programmation
/infos               → Informations pratiques
/editions            → Éditions précédentes
/presse              → Espace presse & partenaires
/contact             → Contact & Newsletter
```

---

## Page 1 — Accueil (`/`)

### Hero section
- **Affiche officielle** en fond ou en élément central (fichier : `poster.avif`)
- Logo BELFIELD FESTIVAL en grand
- Dates et lieu en évidence : *14 & 15 août 2026 — Parc de la Lère, Caussade*
- **Bouton principal** : "Prendre mes billets" → lien externe vers billetterie
- Mention "7ème Édition" en bandeau défilant (style ticker)

### Compte à rebours
- Compte à rebours dynamique jusqu'au 14 août 2026 00:00
- Affichage : JOURS / HEURES / MINUTES / SECONDES
- Style : chiffres bold, orange/violet, fond sombre contrasté
- Texte d'accroche au-dessus : *"Le festival commence dans..."*

### Aperçu du Lineup
- Section "Artistes annoncés" avec 4 à 6 cartes artistes en avant-première
- Lien vers la page `/lineup` complète
- Style cartes : photo N&B avec couleur en overlay au survol

### Galerie photos (teaser)
- Grid de 6 photos issues des éditions précédentes
- Lien "Voir toutes les photos" → galerie complète ou page éditions

### Bandeau billetterie
- CTA fort : "Les places sont limitées — Réserve dès maintenant"
- Bouton → lien billetterie externe
- Optionnel : afficher les catégories de pass disponibles (ex: Pass 1 jour / Pass 2 jours) sans prix si non confirmés

### Section Lieu
- Carte Google Maps intégrée centrée sur Parc de la Lère, Caussade
- Adresse, aperçu photo du parc
- Lien "En savoir plus" → `/infos`

### Newsletter signup
- Formulaire simple : email + bouton
- Message : *"Sois le premier informé des annonces artistes et des offres early bird"*
- Intégration Mailchimp ou Brevo (à renseigner)

---

## Page 2 — Lineup & Programmation (`/lineup`)

### Vue Lineup
- Grille de tous les artistes annoncés
- Chaque carte : photo, nom, genre musical, scène assignée
- Filtre par jour (Vendredi 14 / Samedi 15) et par scène

### Programmation horaire
- Timeline interactive par scène et par jour
- **Scènes** :
  - 🌪 **La Mainstage** — massive, vibrante, fédératrice
  - 🔥 **La Quercy Stage** — plus brute, plus proche, plus intense
- Format : tableau horaire style festival avec blocs glissants

### Pages artistes individuelles (optionnel v2)
- Bio courte
- Mix ou lien SoundCloud/Spotify
- Liens réseaux sociaux

### Teaser progressif
- Section "Prochaine annonce dans..." avec mini compte à rebours
- Pour créer l'attente entre chaque annonce d'artiste

---

## Page 3 — Informations pratiques (`/infos`)

### Accès & Transports
- Adresse complète : Parc de la Lère, Caussade (82300)
- Carte interactive Google Maps
- En voiture : indications GPS, parkings disponibles
- En train : gare de Caussade (ligne Toulouse–Montauban), navettes si prévues
- Covoiturage : lien vers BlaBlaCar ou formulaire de mise en relation

### Hébergement
- Camping sur site (si disponible) avec tarif ou lien
- Hôtels / gîtes partenaires à proximité
- Liens partenaires hébergement

### Sur le site
- Plan interactif du festival (SVG ou image zoomable)
  - Scènes
  - Zones food & buvettes
  - Sanitaires / douches
  - Point médical / secours
  - Vestiaires / consignes
  - Point info

### FAQ
- Questions fréquentes organisées par catégorie :
  - Billetterie (remboursement, réservation, etc.)
  - Accès (parking, transports)
  - Sur place (objets interdits, animaux, etc.)
  - Hébergement
  - Éco-responsabilité
- Accordéon interactif (expand/collapse)

### Accessibilité
- Informations PMR (Personnes à Mobilité Réduite)
- Zones dédiées, accompagnateurs, contacts

### Règles & Charte
- Objets autorisés / interdits
- Politique alcool
- Charte éco-responsable du festival

---

## Page 4 — Éditions précédentes (`/editions`)

### Vue d'ensemble
- Timeline des éditions (Édition 1 à 6)
- Chaque édition : année, dates, affiche miniature, nb festivaliers, artistes phares

### Page détail par édition
- Aftermovie (embed YouTube/Vimeo)
- Galerie photos festivaliers
- Lineup complet de l'édition
- Chiffres clés (nb festivaliers, nb artistes, nb scènes)
- Témoignages / citations festivaliers

### Galerie globale
- Toutes les photos triées par édition
- Filtre par année
- Option : galerie participative (photos envoyées par festivaliers)

---

## Page 5 — Presse & Partenaires (`/presse`)

### Espace presse
- Kit média téléchargeable (logos, affiches HD, photos officielles)
- Dossier de presse PDF
- Revue de presse (articles, interviews)
- Contact presse dédié

### Partenaires & Sponsors
- Logos partenaires classés par niveau (Gold, Silver, Bronze ou équivalent)
- Description courte pour chaque partenaire si souhaité
- CTA "Devenir partenaire" → formulaire ou email dédié

---

## Page 6 — Contact (`/contact`)

### Formulaire de contact
- Champs : Nom, Email, Sujet (liste déroulante), Message
- Sujets : Général / Presse / Partenariat / Artiste / Autre
- Anti-spam (honeypot ou reCAPTCHA)

### Newsletter
- Formulaire d'inscription séparé
- Promesse : fréquence d'envoi, type de contenu

### Réseaux sociaux
- Liens : Instagram, Facebook, SoundCloud, TikTok (à renseigner)
- Possibilité d'embed feed Instagram

---

## Composants globaux

### Header / Navigation
- Logo Belfield Festival (SVG de préférence)
- Navigation : Accueil / Lineup / Infos / Éditions / Presse / Contact
- Bouton "Billetterie" toujours visible, style CTA (orange ou violet)
- Menu burger sur mobile
- Header transparent sur hero, opaque au scroll

### Footer
- Logo + tagline
- Liens rapides
- Réseaux sociaux
- Newsletter mini-form
- Mentions légales / CGU / Politique de confidentialité
- Copyright "© 2026 Belfield Festival"

### Bandeau défilant (Marquee)
- Texte répété en boucle : "7ÈME ÉDITION · 14 & 15 AOÛT 2026 · PARC DE LA LÈRE · CAUSSADE ·"
- Style typique des affiches rave

### Mascotte Oie
- L'oie (mascotte de l'affiche) peut apparaître en élément décoratif sur les pages
- Easter egg possible : animation de l'oie au clic

---

## Stack technique recommandée

```
Framework     : Next.js 14+ (App Router) ou Astro (site statique)
Styles        : Tailwind CSS + CSS custom properties
Animations    : Framer Motion ou GSAP
Carte         : Google Maps API ou Leaflet (open source)
Formulaires   : React Hook Form + Zod
Newsletter    : Mailchimp API ou Brevo (ex-Sendinblue)
Déploiement   : Vercel ou Netlify
Images        : next/image avec optimisation AVIF/WebP
CMS (optionnel): Sanity.io ou Notion API pour gérer lineup et artistes
```

---

## Fonctionnalités prioritaires (MVP)

1. ✅ Page d'accueil avec compte à rebours
2. ✅ Section lineup / artistes annoncés
3. ✅ Bouton billetterie → lien externe
4. ✅ Infos pratiques (accès, FAQ)
5. ✅ Page éditions précédentes avec galerie
6. ✅ Formulaire de contact
7. ✅ Newsletter signup
8. ✅ Responsive mobile-first
9. ✅ SEO de base (meta, og:image avec l'affiche)

## Fonctionnalités v2

- Programmation horaire interactive
- Galerie participative festivaliers
- Covoiturage / mise en relation
- Plan du site interactif (SVG)
- Page artistes individuelles
- Playlist Spotify embed
- Teaser artistes avec mini compte à rebours

---

## Assets disponibles

| Fichier | Usage |
|---|---|
| `poster.avif` | Affiche officielle 2026 (1920×1080px) — à utiliser en hero |
| Logo (à fournir) | SVG de préférence pour le header et favicon |
| Photos éditions passées (à fournir) | Galerie et page éditions |
| Photos artistes (à fournir) | Lineup cards |
| Aftermovies (à fournir) | Liens YouTube/Vimeo pour la page éditions |

---

## Notes importantes

- **Billetterie 100% externe** : ne jamais gérer de paiement sur le site, uniquement des liens vers l'appli partenaire
- **Mascotte oie** : élément identitaire fort, à intégrer subtilement dans le design (pas seulement sur l'accueil)
- **Bandeau "7ème Édition"** visible en permanence sur l'affiche → à reprendre comme fil conducteur
- **Ton** : festif, décalé, communautaire — tutoiement systématique, pas corporate. Voir "Texte officiel" en haut du fichier.
- **Accessibilité** : contraste minimum AA sur les textes (attention orange + blanc)
- **RGPD** : bannière cookies, politique de confidentialité obligatoires pour le formulaire et la newsletter