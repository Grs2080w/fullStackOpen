import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 2.5,
    marginBottom: 20,
    borderRadius: 8,
  };

  if (notification.showNotification === true) {
    return <div style={style}>{notification.message}</div>;
  } else {
    return <div></div>;
  }
};

export default Notification;
