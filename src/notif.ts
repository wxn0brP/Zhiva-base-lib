import { spawn } from "child_process";
const { platform } = process;

export function showNotification(title: string, message: string): void {
    if (platform === "linux") {
        spawn(`notify-send`, [title, message]);
    } else if (platform === "win32") {
        const cmd = `
[reflection.assembly]::LoadWithPartialName("System.Windows.Forms");
$notify = New-Object System.Windows.Forms.NotifyIcon;
$notify.Icon = [System.Drawing.SystemIcons]::Information;
$notify.Visible = $true;
$notify.ShowBalloonTip(10000, "${title}", "${message}", [System.Windows.Forms.ToolTipIcon]::Info);
`.split("\n").join(" ");
        spawn("powershell.exe", ["-NoProfile", "-Command", cmd]);
    } else if (platform === "darwin") {
        const script = `display notification "${message}" with title "${title}"`;
        spawn("osascript", ["-e", script]);
    } else {
        console.warn("Notifications not supported on this platform:", platform);
    }
}