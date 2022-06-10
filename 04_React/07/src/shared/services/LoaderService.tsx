import React, { createContext, FunctionComponent } from "react";
import { ReactElement } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { Spinner } from "../components/Spinner/Spinner";

interface LoaderState {
  isLoading: boolean;
  lastError: string;
}

enum LoaderStates {
  INTERRUPT = "INTERRUPT",
  START = "START_LOADING",
  STOP = "STOP_LOADING",
}

interface LoaderService extends LoaderState {
  startLoading: () => void;
  stopLoading: () => void;
  interruptLoading: () => void;
  loaderWidget: ReactElement<any, any> | null;
}

const initialState: LoaderState = {
  isLoading: false,
  lastError: "",
};

type LoadingAction = {
  type: LoaderStates.START | LoaderStates.STOP;
  // payload?: string;
};

type ErrorAction = {
  type: LoaderStates.INTERRUPT;
  payload: Error;
};

export const useLoader: () => LoaderService = () => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: LoadingAction | ErrorAction) => {
      switch (action.type) {
        case LoaderStates.START:
          return { ...prevState, isLoading: true };
        case LoaderStates.STOP:
          return { ...prevState, isLoading: false };
        case LoaderStates.INTERRUPT: {
          return { ...prevState, isLoading: false, lastError: action?.payload };
        }
        default:
          break;
      }
      return prevState;
    },
    initialState,
  );

  return {
    ...state,
    startLoading: () => dispatch({ type: LoaderStates.START }),
    stopLoading: () => dispatch({ type: LoaderStates.STOP }),
    interruptLoading: (reason: Error) => {
      dispatch({ type: LoaderStates.INTERRUPT, payload: reason });
    },
    loaderWidget: state.isLoading ? (
      <Spinner />
    ) : state?.lastError ? (
      <div>{`An error has occured: ${state.lastError?.message}`}</div>
    ) : null,
  };
};

const LoaderContext = createContext<LoaderService>({} as LoaderService);

interface LoaderProviderProps {
  children: React.ReactNode;
}

const LoaderProvider: FunctionComponent<LoaderProviderProps> = ({
  children,
}) => {
  return (
    <LoaderContext.Provider value={useLoader()}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;

export const useLoaderService = () => useContext(LoaderContext);
