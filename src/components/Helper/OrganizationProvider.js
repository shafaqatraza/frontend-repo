import React, { createContext, useContext, useEffect, useState } from 'react';
import { accessToken, baseUrl, isLogin } from "./index";
import axios from 'axios'

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [organizationData, setOrganizationData] = useState(null);

  useEffect(() => {
    if(isLogin()){
        axios
        .get(`${baseUrl}/organizations`, {
            headers: {
            Authorization: "Bearer " + accessToken(),
            "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            setOrganizationData(res.data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }, []);

  return (
    <OrganizationContext.Provider value={organizationData}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const organizationData = useContext(OrganizationContext);
  return organizationData;
};