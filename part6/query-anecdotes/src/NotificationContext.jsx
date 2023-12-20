import { useReducer } from "react";
import { createContext, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADDED":
      return "Added a new anecdote " + action.payload;
    case "VOTE":
      return "Voted for " + action.payload;
    case "ERROR":
      return action.payload;
    default:
      return "";
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notificationMsg, notificationMsgDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider
      value={[notificationMsg, notificationMsgDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationMsgValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationMsgDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
