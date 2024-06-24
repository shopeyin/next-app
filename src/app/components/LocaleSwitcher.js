"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/i18n-config";

export default function LocaleSwitcher({ lang }) {
  const localeToCountry = {
    de: "Deutschland",
    fr: "France",
    it: "Italia",
    "fr-ch": "Suisse",
    "de-ch": "Schweiz",
    en: "United Kingdom",
  };
  const initialLocale = i18n.locales.find((locale) => locale === lang);
  const [territory, setTerritory] = useState(
    initialLocale ? localeToCountry[initialLocale] : ""
  );
  const [showTerritory, setShowTerritory] = useState(false);

  const toggleTerritory = () => setShowTerritory(!showTerritory);
  const handleMouseLeave = () => setShowTerritory(false);
  const pathName = usePathname();

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const pathnameIsMissingLocale = i18n.locales.every(
      (loc) => !pathName.startsWith(`/${loc}/`) && pathName !== `/${loc}`
    );
    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathName;
      return `/${locale}${pathName}`;
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathName.split("/");
        const isHome = segments.length === 2;
        if (isHome) return "/";
        segments.splice(1, 1);
        return segments.join("/");
      } else {
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          width: "13rem",
          justifyContent: "flex-end",
          cursor: "pointer",
          textDecoration: "underline",
          color: "#4c5267",
          '&:hover': {
            color: "#111f4b"
          }
        }}
        onClick={toggleTerritory}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
          style={{ width: "2rem" }}
        >
          {/* SVG path here */}
        </svg>
        <span>{localeToCountry[lang]}</span>
      </div>
      {showTerritory && (
        <div
          style={{
            position: "absolute",
            left: "0",
            backgroundColor: "white",
            marginTop: "1.7rem",
            paddingRight: "1rem",
            paddingBottom: "0.6rem",
            borderRadius: "1rem",
            zIndex: "2"
          }}
          onMouseLeave={handleMouseLeave}
        >
          {Object.entries(localeToCountry).map(([locale, country]) => (
            <div
              key={locale}
              style={{
                backgroundColor: "#F0F4FF",
                width: "10rem",
                padding: "1rem 0",
                borderRadius: "1rem",
                marginBottom: "0.5rem",
                marginLeft: "1rem",
                '&:hover': {
                  backgroundColor: "#CBD7FF",
                }
              }}
            >
              <Link href={redirectedPathName(locale)}>
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "1rem"
                  }}
                >
                  {country}
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
