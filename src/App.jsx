
import { useEffect, useState } from "react"
import './App.css'
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/authSlice";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import { Outlet } from "react-router-dom";
import appwriteAuthService from "./appwrite/auth_service";


function App() {

  const [loading, setLoading] = useState(true);
  const disptach = useDispatch();

  useEffect(() => {
    appwriteAuthService.getCurrentUser()
      .then((currentUserData) => {
        if (currentUserData) {
          disptach(login({ userData: currentUserData }))
        } else {
          disptach(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ?
    (
      <div className="min-h-screen flex flex-wrap content-btween bg-blue-100">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) : null


}

export default App



