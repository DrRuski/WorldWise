import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvide } from "./context/CitiesContext";

// Components
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";

// Country Flag Converter
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
polyfillCountryFlagEmojis();

export default function App() {
  return (
    <BrowserRouter>
      <CitiesProvide>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CitiesProvide>
    </BrowserRouter>
  );
}
