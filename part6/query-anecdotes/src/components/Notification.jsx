import { useNotificationMsgValue } from "../NotificationContext";

const Notification = () => {

  const notificationMsg = useNotificationMsgValue();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notificationMsg === "") return null;

  return <div style={style}>{notificationMsg}</div>;
};

export default Notification;
