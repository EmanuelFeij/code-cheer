# Code Cheer: development notes

Project lives in `~/Documents/code-cheer` (never inside `~/.vscode/extensions`, which
VS Code's installer owns). Source is `src/extension.ts`, compiled into `out/`.

## Cheat sheet

| I want to...                        | Do this                                               |
| ----------------------------------- | ----------------------------------------------------- |
| Try my changes while coding         | Open the folder in VS Code, press **F5**              |
| Reload after editing code           | **Cmd+Shift+F5** in the main window                   |
| Install it for the first time       | `npm run install-ext`, then reload VS Code            |
| Install an update                   | Bump `version` in `package.json`, then `npm run install-ext`, then reload |
| Check if it's installed             | `code --list-extensions --show-versions \| grep -i cheer` |
| Uninstall it                        | `code --uninstall-extension local.code-cheer`         |

## 1. Develop and test (no install needed)

1. `code ~/Documents/code-cheer`
2. Press **F5**. This starts `tsc -watch` and opens a second VS Code window
   (the Extension Development Host) with the extension loaded.
3. In that second window, save a file: "Nice save!" appears.
4. Edit `src/extension.ts`. The watch task recompiles; press **Cmd+Shift+F5** to
   restart the host and see the change.
5. Breakpoints in `extension.ts` work (source maps are emitted).

## 2. First install (make it permanent)

```
cd ~/Documents/code-cheer
npm run install-ext
```

Then reload VS Code (Cmd+Shift+P, "Developer: Reload Window").

What it does: builds, packages into `code-cheer.vsix`, and installs it. VS Code creates
`~/.vscode/extensions/local.code-cheer-<version>` and registers it itself.

## 3. Installing updates later

1. Edit the code and test it with F5.
2. Bump `"version"` in `package.json` (e.g. `1.0.0` to `1.0.1`).
3. `npm run install-ext`
4. Reload VS Code.

`--force` is built into the script, so it reinstalls over the existing version.

## Notes and gotchas

- **Duplicate messages:** if the extension is installed *and* you run F5, both copies
  fire. Uninstall the installed one while developing, or ignore the doubles.
- **Packaging warnings:** the scripts pass `--allow-missing-repository --skip-license`.
  Fine for personal use. To publish, add a `repository` field and a `LICENSE` file.
- **What goes in the package:** controlled by `.vscodeignore` (sources, `.vscode`, maps,
  `node_modules`, this file and `*.vsix` are left out). `README.md` is the extension's
  description page.
- **Manual commands**, if you ever need them:
  `npm run build`, `npm run package` (builds `code-cheer.vsix` only), `npm run watch`.
- Activation is `onStartupFinished`, so it loads right after VS Code starts.
