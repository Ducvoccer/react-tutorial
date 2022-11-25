## Update submodule

```
  git submodule update --init --remote --merge
```

## How to develop

```bash
  yarn && yarn dev
```

## Setup VScode

- setup extensions on Linux / Mac:
  ```
    cat .vscode/extensions | xargs -L 1 code --install-extension
  ```
- on Window:
  ```
    cat .vscode/extensions |% { code --install-extension $_}
  ```
- If you cannot run, maybe your vscode install is not correct
  - setup your vscode path into environment
  - Cmd+Shift+P (MAC) or Ctrl+Shift+P (Windows) and typing: 'install code ...'
  - Rerun your command to install extensions

## Memo: Use to setup project, use in CAUTIONS

- Export all extensions:
  ```bash
    code --list-extensions > .vscode/extensions
  ```
