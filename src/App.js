
import {AuthProvider} from "./auth/firebaseAuth";
import { BrowserRouter } from 'react-router-dom';
import {Layout} from './components/Layout/Layout'

function App() {


    return (
        <AuthProvider>
            <BrowserRouter basename="/">
                <Layout />
            </BrowserRouter>
        </AuthProvider>

       )
}

export default App
