import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
};
