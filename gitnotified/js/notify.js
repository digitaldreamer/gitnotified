export function notify(body, title) {
    title = title || 'Git Notified';
    Notification.requestPermission();
    var notify = new Notification(title, {body: body, icon: 'img/original.png' });
}
