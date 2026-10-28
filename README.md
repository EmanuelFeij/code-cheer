# Code Cheer

A small encouragement bot for VS Code. It keeps your mood up while you code with friendly popups, break reminders and a cheer every time you save.

## Features

- **Periodic cheers:** a random motivational message every few minutes, mixed with reminders to drink water, stretch and rest your eyes.
- **Save cheers:** a short message when you save a file.
- **Quiet button:** a status-bar button (bottom left) that mutes or unmutes all popups. Click it, or run **Code Cheer: Toggle quiet mode** from the Command Palette. Your choice is remembered between sessions.
- **Your own messages:** add your own lines for both kinds of popups in Settings.

## Settings

Open Settings (`Cmd+,` / `Ctrl+,`) and search for "Code Cheer".

| Setting | Default | Description |
| --- | --- | --- |
| `codeCheer.intervalMinutes` | `5` | Minutes between the periodic cheer popups. Applies immediately. |
| `codeCheer.showOnSave` | `true` | Show a message when saving a file. |
| `codeCheer.messages` | `[]` | Your own messages, added to the periodic cheer popups. |
| `codeCheer.saveMessages` | `[]` | Your own messages, added to the popups shown when saving. |

Example `settings.json`:

```json
{
    "codeCheer.intervalMinutes": 20,
    "codeCheer.messages": ["Hydrate, then debug. 💧"],
    "codeCheer.saveMessages": ["Saved! Coffee time? ☕"]
}
```

## Install from source

Requires Node.js and the `code` command on your PATH.

```sh
git clone https://github.com/EmanuelFeij/code-cheer.git
cd code-cheer
npm install
npm run install-ext
```

Then reload VS Code. See [DEVELOPMENT.md](DEVELOPMENT.md) for the development workflow.

## License

[MIT](LICENSE)
