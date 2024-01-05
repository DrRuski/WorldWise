import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

export function CitiesProvide({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error);
        throw new Error("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error(error);
      throw new Error("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error(error);
      throw new Error("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined) {
    throw new Error("Context was used outside its Provider");
  }
  return value;
}
