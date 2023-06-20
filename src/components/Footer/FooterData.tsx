import * as React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";

export interface LinkGroup {
  title: string;
  href: string;
  links: Array<{
    label: string;
    href: string;
    badge?: React.ReactElement;
  }>;
}

export const links: LinkGroup[] = [
  {
    title: "Browse",
    href: "/browse",
    links: [
      { label: "Wanted", href: "/browse?type=wanted" },
      { label: "Offering", href: "/browse?type=offering" },
    ],
  },
  {
    title: "About",
    href: "/about",
    links: [
      { label: "About Good Deeds", href: "/about" },
      { label: "How to Use", href: "/how-to-use" },
      { label: "Community Guidelines", href: "/community" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Diversity & Inclusion", href: "/diversity" },
      { label: "Careers", href: "/careers" },
      // { label: "Trust & Security", href: "/trust-and-security" },
      // { label: "Integrations", href: "#" },
      // { label: "SAML SSO", href: "#" },
    ],
  },
  {
    title: "Support",
    href: "/contact-us",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Organization", href: "/organization" },
      { label: "Advertise With Us", href: "/advertisement-with-us" },

    ],
  },
];

interface SocialLink {
  label: string;
  icon: React.ReactElement;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: "Facebook", icon: <FaFacebook />, href: "https://www.facebook.com/gooddeeds.ca" },
  { label: "Instagram", icon: <FaInstagram />, href: "https://www.instagram.com/gooddeedsllc/" },
  { label: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/company/good-deeds-llc-1/" },
  { label: "TikTok", icon: <FaTiktok />, href: "https://www.tiktok.com/@gooddeedsllc" },
];

type FooterLink = {
  label: string;
  href: string;
};

export const footerLinks: FooterLink[] = [
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  // { label: 'Offer terms', href: '#' },
  // { label: 'Legal notice', href: '#' },
  // { label: 'Sitemap', href: '#' }
];
