import { BrowserRouter , Route , Routes } from "react-router-dom";
import App from "./page/App";
import injectContext from "./store/appContext";
import FormAddContact from "./page/addContact";


const Layout = () => {
    return(

        <BrowserRouter>
            <Routes>
                <Route element={<App/>} path='/' />
                <Route element={<FormAddContact/>} path='/add' />
                <Route element={<FormAddContact/>} path='/add' />
                <Route element={<FormAddContact/>} path='/update/:id' />
            </Routes>
        </BrowserRouter>
    )
}

export default injectContext(Layout)