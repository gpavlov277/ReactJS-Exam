import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { AuthProvider } from "./contexts/authContext";
import List from "./components/list/List";
import Footer from "./components/footer/Footer";
import ItemDetails from "./components/item-details/ItemDetails";
function App() {
  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<List></List>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />

          <Route path="/item/:itemId" element={<ItemDetails></ItemDetails>}></Route>
        </Routes>
      </AuthProvider>

      <Footer></Footer>
    </>
  );
}

export default App;
