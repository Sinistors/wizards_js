# 🧙‍♂️ TP DOM – Duel de Sorciers : Que le meilleur gagne !

## Objectif

Créer une mini-application où **deux sorciers** s'affrontent dans un **combat automatisé** au tour par tour.

L'utilisateur saisit les **noms** des sorciers et leur **maison** (Gryffondor, Serpentard, Serdaigle, Poufsouffle), puis lance le combat.

Les deux sorciers ont **200 points de vie** chacun.  
À chaque tour, l’un attaque l’autre avec un coup entre **10 PV ± 50%** (donc entre 5 et 15).  
On affiche le **résultat du tour** dans une liste d’historique.

Le duel continue automatiquement jusqu’à ce que l’un des sorciers tombe à 0 PV.  
Un message annonce alors le **vainqueur**.

---

## 1. Interface utilisateur

Le formulaire contiendra :

- 🔤 **Nom du sorcier 1** (champ texte)
- 🏠 **Maison du sorcier 1** (liste déroulante)

- 🔤 **Nom du sorcier 2** (champ texte)
- 🏠 **Maison du sorcier 2** (liste déroulante)

Bouton : `Lancer le duel`

---

## 2. Affichage dynamique

Après soumission du formulaire :

- Une **carte de duel** apparaît avec :
    - Les deux sorciers et leur maison
    - Leurs **PV actuels** (mis à jour à chaque tour)
    - Un encadré ou un texte d’**historique du combat** (ex : `Tour 1 : Harry attaque Drago pour 12 dégâts. Il reste 188 PV à Drago.`)

Quand le duel est terminé, on affiche un message du type :

> 💥 **Harry (Gryffondor) a vaincu Drago (Serpentard) au bout de 7 tours !**

---

## 3. Contraintes techniques

- Utilise `document.querySelector` ou `document.querySelectorAll` pour manipuler le DOM.
- Utilise `createElement`, `append`, `innerHTML` ou `insertAdjacentHTML` pour générer dynamiquement les éléments HTML.
- Ne fais **aucun rechargement de page**.
- Utilise un fichier HTML et un fichier JavaScript **séparé**.
---

## 4. Conseils

- Tu vas avoir besoin de `event.preventDefault()` pour stopper la soumission automatique du formulaire.
- Voici une démarche conseillée pour avancer :

1. Fais un `console.log()` pour vérifier que tu rentres bien dans ta fonction quand le formulaire est soumis.
2. Récupère chaque donnée du formulaire (nom, maison...) et affiche-les avec `console.log()`.
3. Crée une première structure HTML vide (par ex. une div `.duel`) et insère-la dynamiquement pour tester que ça fonctionne.
4. Ajoute les infos des sorciers dedans, puis les PV.
5. Crée une fonction `attaquer()` qui gère un tour : tirage aléatoire, mise à jour des PV, ajout d’un message dans l’historique.

---

## 5. Bonus (facultatifs)

- Affiche une **barre de vie** visuelle pour chaque sorcier.
- Affiche l’emblème de la maison selon la maison choisie.
- 
---

## 6. Exemple de rendu HTML

```text
Tour 1 : Hermione attaque Drago pour 13 dégâts. Il reste 187 PV à Drago.
Tour 2 : Drago attaque Hermione pour 6 dégâts. Il reste 194 PV à Hermione.
Tour 3 : Hermione attaque Drago pour 14 dégâts. Il reste 173 PV à Drago.
...
💥 Hermione (Gryffondor) a vaincu Drago (Serpentard) en 11 tours !
```

## 7. À toi de jouer !
```text
   Travaille proprement avec un fichier index.html et un fichier script.js.
   Utilise des fonctions pour organiser ton code.
   Teste chaque étape avec des console.log() !
```

## Résultat attendu

Un exemple de rendu visuel :

![Nom de l’image](s-1.png)
![Nom de l’image](s-2.png)

---