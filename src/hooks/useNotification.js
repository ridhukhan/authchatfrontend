
export const useNotification = () => {

  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      console.log("Notification permission granted ✅")
    }
  }

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/lovebirds.webp"
      })
    }
  }

  return { requestPermission, showNotification }
}