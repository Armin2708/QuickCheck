import HomePage from "./pages/HomePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersListPage from "./pages/UsersListPage.jsx";
import AdminsListPage from "./pages/AdminsListPage.jsx";
import ClassroomsListPage from "./pages/ClassroomsListPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<HomePage />}/>
              <Route path={"users"} element={<UsersListPage />}/>
              <Route path={"admins"} element={<AdminsListPage />}/>
              <Route path={"classrooms"} element={<ClassroomsListPage />}/>

              {/*<Route path={"app"} element={<AppLayout />}>
                  <Route index element={<Navigate replace to={"cities"}/>}/>
                  <Route path={"cities"} element={<CityList/>}/>
                  <Route path={"cities/:id"} element={<City />}/>

                  <Route path={"countries"} element={<CountryList />}/>
                  <Route path={"form"} element={<Form/>}/>
              </Route>
              <Route path={"*"} element={<PageNotFound />}/>*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App
