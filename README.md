# ETS - Attributeur de rôle(s) | Discord bot

Ce bot Discord vous permet d'attribuer des rôles à des utilisateurs Discord à partir d'un fichier .JSON.

Le fichier JSON doit avoir une structure comme suit:
```json
{
    "users": [
        {
            "user": "Hex#1011",
            "groups": ["TCH098", "Groupe 1", "Équipe 1"]
        },
        {
            "user": "Unknown#1011",
            "groups": ["TCH052", "Groupe 5", "Équipe 3"]
        }
    ]
}
```

**Si un rôle spécifié n'existe pas, l'utilisateur ne sera pas affecté au groupe.**

Pour configurer le bot, il suffit d'éditer le fichier de configuration `config.json` à l'aide de votre éditeur de texte favori.

Développé par Simon Hamelin. Pour tout aide, contactez moi via Discord (Hex#1011)!