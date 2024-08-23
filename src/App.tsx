import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard"
import { Provider } from "react-redux";
import { store } from "./redux/store";


function App() {


  return (
    <>
      <Provider store={store}>
        
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Layout />}>
      
            <Route path="dashboard" element={<Dashboard />} />
         
          </Route>
        </Routes>
     
      </BrowserRouter>
       </Provider>
    </>
  );
}

export default App
