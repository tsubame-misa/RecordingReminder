import { Plugins, LocalNotification } from "@capacitor/core";
const { LocalNotifications } = Plugins;

class Notifications {
  async schedule(hour, minute) {
    try {
      // Request/ check permissions
      if (!(await LocalNotifications.requestPermission()).granted) return;

      // Clear old notifications in prep for refresh (OPTIONAL)
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0)
        await LocalNotifications.cancel(pending);

      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Triumph30",
            body: "hello",
            id: 3,
            //10秒後に通知
            schedule: { at: new Date(Date.now() + 1000 * 120) },
            /*schedule: {
              at: { day: 15, month: 11, year: 2020, hour: 5, minute: 25 },
            },*/
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Notifications();
