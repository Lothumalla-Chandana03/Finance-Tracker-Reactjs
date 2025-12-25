import { createContext, useContext, useState } from "react";

const DataSourceContext = createContext();

export const DataSourceProvider = ({ children }) => {
  const [useApi, setUseApi] = useState(false);

  return (
    <DataSourceContext.Provider value={{ useApi, setUseApi }}>
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSource = () => useContext(DataSourceContext);
