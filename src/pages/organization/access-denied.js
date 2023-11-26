// pages/access-denied.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AccessDenied = () => {
  const router = useRouter();

  useEffect(() => {
    // Example: Redirect to home page after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/organization');
    }, 3000);

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="access-denied-container">
        <h1 className="access-denied-title">Access Denied</h1>
        <p className="access-denied-message">You don't have the necessary permissions to access this page.</p>
    </div>
   
  );
};

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   title: {
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     color: 'red',
//   },
//   message: {
//     fontSize: '1.2rem',
//     color: '#333',
//   },
// };

export default AccessDenied;
