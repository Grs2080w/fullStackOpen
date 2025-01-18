import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  
  const [notification] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 3,
    marginBottom: 5,
    borderRadius: 5,
    fontWeight: "bold",
  };

  if (!notification.isShow) return null;

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
