# Guide Workflow: AI Studio → GitHub → Vercel

## 📋 Étape 1: Prompt pour AI Studio Google

Utilisez ce prompt pour générer du code:

```
Crée une composante React TypeScript pour [DESCRIPTION DE CE QUE TU VEUX].

Requis:
- Utilise React 19+ et TypeScript
- Intègre Tailwind CSS pour le style
- Compatible avec Vite (build tool)
- Exports la composante par défaut
- Ajoute les PropTypes/interfaces TypeScript

Retourne UNIQUEMENT le code prêt à copier-coller.
```

### Exemples de prompts:

#### 1. Créer une page produit
```
Crée une page produit React pour un site e-commerce. 
Elle doit avoir:
- Image du produit
- Titre et description
- Prix et bouton d'achat
- Avis clients (3-5 avis en exemple)
- Design moderne avec Tailwind
```

#### 2. Créer un formulaire de contact
```
Crée un formulaire de contact React avec:
- Champs: nom, email, message
- Validation des emails
- Bouton submit qui log les données
- Messages d'erreur
- Effet de chargement pendant l'envoi
```

#### 3. Créer un panier d'achat
```
Crée un composant panier React qui:
- Affiche les articles avec quantité et prix
- Permet d'augmenter/diminuer les quantités
- Calcule le total
- Intègre PayPal (utilise @paypal/react-paypal-js)
- Responsive design
```

---

## 🔧 Étape 2: Ajouter le code dans AI Studio

1. **Créer un nouveau fichier** dans AI Studio:
   - Clic droit sur `src/` → "New File"
   - Nom: `components/MonComposant.tsx`

2. **Copier-coller le code** généré par AI

3. **Tester localement** (optionnel):
   ```bash
   npm run dev
   # Visite http://localhost:5173
   ```

---

## 📤 Étape 3: Push vers GitHub

### Option A: Via Interface Web GitHub

1. **Ouvrir GitHub.com** → Votre repo `Aqualume`
2. **Clic "Upload files"** (bouton vert)
3. **Drag-drop les fichiers** ou naviguer
4. **Commit message**: `feat: ajoute [nom du composant]`
5. **Commit directly** à `main`

### Option B: Workflow Automatisé avec Git (Recommandé)

```bash
# Cloner le repo (une seule fois)
git clone https://github.com/onlinedefend9-create/Aqualume.git
cd Aqualume

# À chaque fois que vous avez du nouveau code:
git add .
git commit -m "feat: ajoute [nom du composant]"
git push origin main
```

### Option C: Via AI Studio (Si support natif)

- Cherchez un bouton **"Sync to GitHub"** ou **"Push to Repository"**
- Si disponible, configurez avec votre token GitHub personnel

---

## ✅ Après le Push

**Vercel se déclenche automatiquement:**
1. ✅ GitHub reçoit votre push
2. ✅ Webhook Vercel se déclenche
3. ✅ Vercel build votre projet
4. ✅ Nouvelle version en ligne sur `https://www.aqualum.online`

**Temps: ~30-60 secondes** ⚡

---

## 🐛 Troubleshooting

### "Push refusé"
```bash
git pull origin main
git push origin main
```

### "Code ne s'affiche pas"
- Vérifiez que le composant est **importé** dans une page
- Vérifiez les logs Vercel: dashboard.vercel.com

### "Erreur build"
```bash
npm run lint  # Vérifier les erreurs TypeScript
npm run build # Simuler le build
```

---

## 📚 Template Rapide pour Nouveaux Composants

```typescript
import React from 'react';

interface Props {
  // Vos props ici
}

export default function MonComposant({ }: Props) {
  return (
    <div className="flex justify-center items-center">
      <h1 className="text-3xl font-bold">Hello World</h1>
    </div>
  );
}
```

---

**Besoin d'aide? Posez une question! 🚀**
