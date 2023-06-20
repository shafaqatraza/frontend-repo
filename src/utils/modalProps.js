import { isMobile } from "react-device-detect";

export const modalMobileProps = isMobile ? {size: "full"} : {size: "2xl"};
export const modalContentMobileProps = isMobile ? {margin: 0, rounded: "none"} : {};
