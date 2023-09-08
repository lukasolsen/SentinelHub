import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { getUserInformation } from "../service/api-service";

interface IUser {
  _id: string;
  ip: string;
  email: string;
  verified: boolean;
  loggedIn: boolean;
  role: string;
  token: string;
}

// Define the initial state and actions
type State = {
  searchTerm: string;
  isLoading: boolean;
  user: IUser;
  // Add more data properties as needed
};

type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: IUser }
  | { type: "SET_USER_LOGGED_IN"; payload: boolean };
// Add more action types as needed

const initialState: State = {
  searchTerm: "",
  isLoading: false,
  user: {
    ip: "",
    email: "",
    verified: false,
    loggedIn: false,
    role: "member",
    token: "",
  },
  // Initialize other data properties here
};

// Create the context
type DataContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// Define a reducer function
const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Create a DataProvider component
type DataProviderProps = { children: ReactNode };

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    // Get the user here.

    const getUser = async () => {
      getUserInformation().then((res) => {
        console.log(res);
        dispatch({ type: "SET_USER", payload: res.user });
      });
    };

    getUser();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

// Create custom hooks for using the context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
