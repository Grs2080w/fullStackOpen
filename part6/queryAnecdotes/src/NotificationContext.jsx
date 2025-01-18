import { useReducer, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const NotificationContext = createContext();

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_VOTE":
      return {
        message: `A new vote has been added for ${action.id}`,
        isShow: true,
      };

    case "NEW_ANECDOTE":
      return {
        message:
          `Created a new new anecdote ${action.content.slice(0, 10)}` + "...",
        isShow: true,
      };

    case "ERROR_ADDING_ANECDOTE":
      return {
        message: action.message,
        isShow: true,
      };

    case "CLEAR_NOTIFICATION":
      return { message: "", isShow: false };

    default:
      return state;
  }
};

export function NotificationComponentProvider({ children }) {
  NotificationComponentProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [notification, setNotification] = useReducer(NotificationReducer, {
    message: "",
    isShow: false,
  });

  function NotificationDispatch(obj) {
    setNotification(obj);
    setTimeout(() => setNotification({ type: "CLEAR_NOTIFICATION" }), 5000);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContext.Provider value={[notification, NotificationDispatch]}>
        {children}
      </NotificationContext.Provider>
    </QueryClientProvider>
  );
}

export default NotificationContext;
