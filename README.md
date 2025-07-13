## Enviroment

Copy `./.docker/dev/conf/.env.dev` to `./.docker/dev/conf/.env.dev.local` folder to setup enviroment.

### Build

```bash
# build images
make build-dev

# up containers
make up-logs-dev
```

### VS Code Configuration

Create a `.vscode` folder in the root directory with the following files:

#### .vscode/extensions.json

```json
{
  "recommendations": [
    "Vue.volar",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```

#### .vscode/settings.json

```json
{
  "eslint.codeActionsOnSave.rules": null,
  "eslint.workingDirectories": ["backend", "frontend"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false
}
```
