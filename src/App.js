/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import MainRouter from './MainRouter/MainRouter';

export const ApiContext = createContext();
export const GlobalContext = createContext();
export const DataContext = createContext();
export const ModalContext = createContext();

const App = () => {
    const [globalData, updateGlobalData] = useState({});
    const [info, setInfo] = useState({});
    const [mod, setMod] = useState({});
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
        <ApiContext.Provider value={[header, setHeader]}>
            <GlobalContext.Provider value={[globalData, updateGlobalData]}>
                <DataContext.Provider value={[info, setInfo]}>
                    <ModalContext.Provider value={[mod, setMod]}>
                        <MainRouter />
                    </ModalContext.Provider>
                </DataContext.Provider>
            </GlobalContext.Provider>
        </ApiContext.Provider>
    );
};

export default App;
