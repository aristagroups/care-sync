/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastProvider } from 'react-toast-notifications';
import ErrorFallback from './ErrorFallback';
import MainRouter from './MainRouter';

export const ApiContext = createContext();
export const GlobalContext = createContext();
export const DataContext = createContext();
export const ModalContext = createContext();
export const UserContext = createContext();
export const AuthContext = createContext();
export const AlertContext = createContext();

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [globalData, updateGlobalData] = useState({});
    const [auth, setAuth] = useState({
        provider: '',
        collection: '',
        address: '',
    });
    const [info, setInfo] = useState({});
    const [mod, setMod] = useState({});
    const [al, setAl] = useState([]);
    const [header, setHeader] = useState([
        {
            name: '',
            email: '',
            phone: '',
        },
        {
            bg: '',
            border: '',
        },
        {
            id: '',
        },
        {
            type: '',
            collection: '',
            document: '',
            method: '',
        },
        {
            modal: '',
        },
    ]);

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                document.location.reload(true);
            }}
        >
            <ToastProvider autoDismiss={200}>
                <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
                    <ApiContext.Provider value={[header, setHeader]}>
                        <GlobalContext.Provider value={[globalData, updateGlobalData]}>
                            <DataContext.Provider value={[info, setInfo]}>
                                <ModalContext.Provider value={[mod, setMod]}>
                                    <AuthContext.Provider value={[auth, setAuth]}>
                                        <AlertContext.Provider value={[al, setAl]}>
                                            <MainRouter />
                                        </AlertContext.Provider>
                                    </AuthContext.Provider>
                                </ModalContext.Provider>
                            </DataContext.Provider>
                        </GlobalContext.Provider>
                    </ApiContext.Provider>
                </UserContext.Provider>
            </ToastProvider>
        </ErrorBoundary>
    );
};

export default App;
