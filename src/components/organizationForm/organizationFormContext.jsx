// components/organizationForm/organizationFormContext.jsx
import React, { createContext, useContext, useState } from 'react';
const OrganizationFormContext = createContext();

export const OrganizationFormProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // New state for the modal
    const [orgType, setOrgType] = useState(0); 
    const [organizationSlug, setOrganizationSlug] = React.useState("");

    const goToNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        
    };
    
    const contextValue = {
        currentStep,
        setCurrentStep,
        goToNextStep,
        isModalOpen,
        openModal, 
        closeModal,
        orgType,
        setOrgType,
        organizationSlug,
        setOrganizationSlug
    };

    return (
        <OrganizationFormContext.Provider value={contextValue}>
        {children}
        </OrganizationFormContext.Provider>
    );
};

export const useOrganizationFormContext = () => {
    const context = useContext(OrganizationFormContext);
    if (!context) {
        throw new Error('useOrganizationFormContext must be used within an OrganizationFormProvider');
    }
    return context;
};
