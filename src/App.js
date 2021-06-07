/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import MainRouter from './MainRouter/MainRouter';

export const GlobalContext = createContext();
export const DataContext = createContext();
export const ModalContext = createContext();

const App = () => {
    const [globalData, updateGlobalData] = useState({});
    const [info, setInfo] = useState({});
    const [mod, setMod] = useState({});
    return (
        <GlobalContext.Provider value={[globalData, updateGlobalData]}>
            <DataContext.Provider value={[info, setInfo]}>
                <ModalContext.Provider value={[mod, setMod]}>
                    <MainRouter />
                </ModalContext.Provider>
            </DataContext.Provider>
        </GlobalContext.Provider>
    );
};

export default App;
