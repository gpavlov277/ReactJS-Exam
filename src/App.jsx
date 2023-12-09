import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { AuthProvider } from "./contexts/authContext";
import List from "./components/list/List";
import Footer from "./components/footer/Footer";
import ItemDetails from "./components/item-details/ItemDetails";
import Create from "./components/create/Create";
import { ItemProvider } from "./contexts/itemContext";
import EditItem from "./components/edit-item/EditItem";
import AuthGuard from "./components/guards/authGuard";
import Profile from "./components/profile/Profile";
function App() {
  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<List></List>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route element={<AuthGuard></AuthGuard>}>
            <Route
              path="/create/item"
              element={
                <ItemProvider>
                  <Create />
                </ItemProvider>
              }
            ></Route>
            <Route
              path="/edit/item/:itemId"
              element={
                <ItemProvider>
                  <EditItem />
                </ItemProvider>
              }
            />
            <Route path="/profile-settings" element={<Profile />}></Route>
          </Route>
          <Route
            path="/item/:itemId"
            element={
              <ItemProvider>
                <ItemDetails></ItemDetails>
              </ItemProvider>
            }
          ></Route>
        </Routes>
      </AuthProvider>

      <Footer></Footer>
    </>
  );
}

export default App;
