import logoMark from "../../imports/logos/kasaji-mark.png";

interface KasajiLogoProps {
  size?: number;
  variant?: "color" | "white";
  className?: string;
}

export function KasajiLogo({ size = 32, className = "" }: KasajiLogoProps) {
  return (
    <img
      src={logoMark}
      alt="Kasaji Logo"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        filter: "drop-shadow(0 10px 22px rgba(20, 184, 212, 0.18))",
      }}
      className={className}
    />
  );
}
