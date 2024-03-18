// components/OrganizationTypeGuard.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { currentOrganization } from "../../Helper/index";

const DonationGuard = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const organizationType = currentOrganization?.type; // Example: 'Charity Organization', 'Non-Profit Organization', 'For-Profit Organization'


  useEffect(() => {
    
    // Check if the organization type allows donation-related functionality
    if (organizationType !== 'Charity Organization' && organizationType !== 'Non-Profit Organization') {
      // Redirect to a different page or show a message
      router.push('/organization/not-authorized');
    }

  }, [organizationType, router]);
  
  // Render the wrapped children if organization is eligible
  return children;
};

export default DonationGuard;
