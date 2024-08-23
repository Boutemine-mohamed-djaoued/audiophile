"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
interface buttonProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  role?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}
const Button = ({ children, role = "primary", className, href, type = "button", onClick, isLoading = false }: buttonProps) => {
  const handleclick = () => {
    if (!isLoading && onClick) {
      onClick();
    }
  };

  const loaderStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    borderWidth: "3px",
    borderStyle: "dashed solid solid dotted",
    borderColor: "#fff #fff transparent #fff",
    borderRadius: "50%",
    display: "inline-block",
    position: "relative",
    boxSizing: "border-box" as "border-box", // Explicitly cast as 'border-box'
    animation: "rotation 1s linear infinite",
  };

  const afterStyle: React.CSSProperties = {
    content: "''",
    boxSizing: "border-box" as "border-box",
    position: "absolute",
    left: "6px",
    top: "13px",
    border: "6px solid transparent",
    borderRightColor: "#fff",
    transform: "rotate(-40deg)",
  };

  const rotationKeyframes = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
  const classes = twMerge(
    className,
    "py-3 px-5 uppercase font-semibold w-fit flex items-center justify-center gap-2 text-nowrap",
    role === "primary"
      ? "bg-accent text-white hover:bg-accent-hover"
      : role === "secondary-dark"
        ? "bg-off-black text-white hover:bg-[#555]"
        : role === "secondary-light"
          ? "bg-transparent ring-1 ring-black hover:!bg-off-black hover:!text-white"
          : role === "link"
            ? "bg-grey text-black text-opacity-50 hover:!text-accent"
            : null
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {role === "link" && <IoIosArrowForward className="text-accent" />}
      </Link>
    );
  }
  return (
    <button className={classes} onClick={handleclick} type={type}>
      {children}
      {isLoading && (
        <div className="grid place-content-center">
          <style jsx>{rotationKeyframes}</style>
          <div style={loaderStyle}>
            <div style={afterStyle}></div>
          </div>
        </div>
      )}
    </button>
  );
};
export default Button;
