import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Main from "./pages/MainPage";
import AccountPage from "./pages/Account";
import HistoryPage from "./pages/History";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
])

const App=() => {
  return <RouterProvider router={routes} />

}

export default App;
