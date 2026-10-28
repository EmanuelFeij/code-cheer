import * as vscode from 'vscode';

const messages = [
    "You're crushing it! 🚀",
    "Take a quick sip of water, you're doing amazing! 💧",
    "Bug? What bug? You're going to fix this in no time! 💪",
    "Great code takes time—keep going! ✨",
    "You're making awesome progress today! 🔥",
    "Stand up and stretch for 30 seconds, your back will thank you! 🧘",
    "Look at something far away for 20 seconds. Your eyes deserve a break! 👀",
    "Every expert was once a beginner who kept going. 🌱",
    "It's okay to not know yet. Googling is a skill too! 🔍",
    "Small commits, big wins. 📦",
    "Remember to breathe. In... and out. 🌬️",
    "Future you is going to be so grateful for the work you're doing now! 🙌",
    "That problem looks scary, but you've solved harder ones before. 🏆",
    "Rubber duck time? Explain it out loud, the answer might pop up! 🦆",
    "Done is better than perfect. Ship it! 🚢",
    "You're allowed to take a break. Rested brains write better code! ☕",
    "Proud of you for showing up today. 💛",
    "Fun fact: every senior dev has broken something in production. You're fine! 😅",
    "Your code doesn't have to be clever, just clear. 💡",
    "Keep going, the green tests are closer than you think! ✅",
    "Posture check! Shoulders down, back straight. 🪑"
];

const save_messages = [
    "Nice save! Keep that momentum going! 🎉",
    "Saved! Ctrl+Z can't hurt you now. 💾",
    "Another save, another step forward! 👣",
    "Saved. Your future self says thanks! 🙏",
    "Look at you, saving like a pro! 😎",
    "Progress saved. Progress made. ✅",
    "Save early, save often. Smart move! 🧠",
    "Boom, saved! Keep the flow going. 🌊",
    "Clean save! That file is in good hands. 🤝",
    "Saved! Go on, you're on a roll. 🎲",
    "One more file in the books! 📚",
    "Saved and still smiling? That's the spirit! 😄",
    "Safe and sound. Nothing lost on your watch! 🛡️"
]

function config() {
    return vscode.workspace.getConfiguration('codeCheer');
}

const pickTimerMessages = (): string => {
    const allTimerMessages = [
        ...messages,
        ...config().get<string[]>('messages', [])
    ];
    return allTimerMessages[
        Math.floor(Math.random() * allTimerMessages.length)
    ];
}

const pickSavedMessages = (): string => {
    const saveMessages = [
        ...save_messages,
        ...config().get<string[]>('saveMessages', [])
    ];
    return saveMessages[
        Math.floor(Math.random() * saveMessages.length)
    ];
}

export function activate(context: vscode.ExtensionContext) {
    let quiet = context.globalState.get<boolean>('quiet', false)

    const quietItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        1,
    );
    quietItem.command = 'codeCheer.toggleQuiet'

    const updateQuietItem = () => {
        quietItem.text = quiet ? '$(bell-slash) Cheer: off' : '$(bell) Cheer: on';
        quietItem.tooltip = quiet ? 'Click to turn cheering on' : 'Click to mute cheering';
    };
    updateQuietItem();
    quietItem.show();

    const toggleQuietItem = vscode.commands.registerCommand('codeCheer.toggleQuiet', () => {
        quiet = !quiet
        context.globalState.update('quiet', quiet)
        updateQuietItem()
    })


    let timer: NodeJS.Timeout | undefined;
    const startTimer = () => {
        if (timer) {
            clearInterval(timer)
        }
        const ms = config().get<number>('intervalMinutes', 5) * 60 * 1000;

        timer = setInterval(() => {
            if (quiet) return;
            vscode.window.showInformationMessage(pickTimerMessages())
        }, ms);
    }

    startTimer();

    // Also encourage on file save
    const saveListener = vscode.workspace.onDidSaveTextDocument(() => {
        if (!config().get<boolean>('showOnSave', true)) { return; }
        if (quiet) { return; }
        const saveMessage = pickSavedMessages();
        vscode.window.showInformationMessage(saveMessage);
    });

    const onConfigChangedListener = vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('codeCheer.intervalMinutes')) {
            startTimer();
        }
    });

    context.subscriptions.push({ dispose: () => clearInterval(timer) });
    context.subscriptions.push(saveListener);
    context.subscriptions.push(onConfigChangedListener);
    context.subscriptions.push(quietItem, toggleQuietItem)
}

export function deactivate() { } 