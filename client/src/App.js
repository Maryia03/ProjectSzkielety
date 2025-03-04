import { Route, Routes, Navigate } from "react-router-dom"
import AdminView from "./components/AdminView"
import Signup from "./components/Signup"
import Login from "./components/Login"
import More from "./components/More"
import UserView from "./components/UserView"
import CreateLogged from "./components/CreateLogged"

function App() {
  const user = localStorage.getItem("token")
  const status = localStorage.getItem("role")
  var admin = ""
  if (status == "admin")
    admin = true
  else
    admin = false
  return (
    <Routes>
      {user && admin && <Route path="/" exac element={<AdminView />} />}
      {user && admin && <Route path="/moreinfo" exac element={<More />} />}
      {user && <Route path="/" exac element={<UserView />} />}
      {user && <Route path="/create" exac element={<CreateLogged />} />}
      <Route path="/" exac element={<Login />} />
      <Route path="/signup" exac element={<Signup />} />
      <Route path="/login" exac element={<Login />} />
      <Route path="/moreinfo" element={<Navigate replace to="/" />} />
    </Routes>

  )
}

export default App