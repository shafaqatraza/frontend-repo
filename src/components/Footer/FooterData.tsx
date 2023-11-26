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
    title: "Campaigns",
    href: "/students-landing",
    links: [
      { label: "High School Students", href: "/students-landing" },
      { label: "Organizations", href: "/charities" },
    ],
  },
  {
    title: "Discover",
    href: "/about",
    links: [
      { label: "Items", href: "/browse?type=offering&activeTab=0" },
      { label: "Services", href: "/browse?type=offering&activeTab=1" },
      { label: "Volunteer", href: "/browse?type=offering&activeTab=2" },
      { label: "Donate", href: "/browse?type=offering&activeTab=3" },
    ],
  },
  {
    title: "ABOUT",
    href: "/about",
    links: [
      { label: "About Good Deeds", href: "/about" },
      { label: "Community Guidelines", href: "/community" },
      // { label: "Advertise With Us", href: "/advertisement-with-us" },

    ],
  },
  {
    title: "SUPPORT",
    href: "/contact-us",
    links: [
      { label: "Contact Us", href: "/contact-us" },

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
  { label: "Terms & Conditions", href: "/terms-of-service" },
  { label: "Privacy", href: "/privacy-policy" },
  // { label: 'Offer terms', href: '#' },
  // { label: 'Legal notice', href: '#' },
  // { label: 'Sitemap', href: '#' }
];
