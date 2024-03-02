import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

const withMobileRedirect = (WrappedComponent) => {
  const MobileRedirectWrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const shouldRedirect = isMobile && router.asPath.includes('/organization');

      if (shouldRedirect) {
        router.push('/donor-management-portal');
      }
    }, [router.asPath]);

    return <WrappedComponent {...props} />;
  };

  return MobileRedirectWrapper;
};

export default withMobileRedirect;
