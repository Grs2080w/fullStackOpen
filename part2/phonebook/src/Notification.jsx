export default function Notification({ message , showNotification }) {
    if (!showNotification) {
        
      return null;

    } else {

      return <div className={`${message.color}`}>{message.message}</div>;
    }

}
