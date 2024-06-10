import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vazamento from "./pages/Vazamento";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cadastro" element={<Cadastro />}></Route>
                <Route path="/vazamento" element={<Vazamento/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;