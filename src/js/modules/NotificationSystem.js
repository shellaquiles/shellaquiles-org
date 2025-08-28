/**
 * NotificationSystem - Handles all notifications and user feedback
 */
export class NotificationSystem {
    constructor() {
        this.notifications = [];
    }

    /**
     * Show a notification to the user
     */
    showNotification(message, type = 'info') {
        const notification = this.createNotificationElement(message, type);
        document.body.appendChild(notification);

        this.animateNotification(notification);
        this.notifications.push(notification);
    }

    /**
     * Create notification element
     */
    createNotificationElement(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00ff00' : '#ffffff',
            color: type === 'success' ? '#000' : '#000',
            padding: '15px 20px',
            borderRadius: '5px',
            fontFamily: 'Courier New, monospace',
            fontWeight: 'bold',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
        });

        return notification;
    }

    /**
     * Animate notification in and out
     */
    animateNotification(notification) {
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                    // Remove from notifications array
                    const index = this.notifications.indexOf(notification);
                    if (index > -1) {
                        this.notifications.splice(index, 1);
                    }
                }
            }, 300);
        }, 3000);
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        this.notifications.forEach(notification => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        });
        this.notifications = [];
    }

    /**
     * Show success notification
     */
    success(message) {
        this.showNotification(message, 'success');
    }

    /**
     * Show info notification
     */
    info(message) {
        this.showNotification(message, 'info');
    }

    /**
     * Show error notification
     */
    error(message) {
        this.showNotification(message, 'error');
    }
}
