import { ReactNode } from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  onClick = () => {},
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text" | "success"; // ✅ Added success
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  const baseStyles =
    "flex items-center justify-center font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-blue-300";

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: `bg-blue-600 hover:bg-blue-700 text-white ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
    secondary: `bg-gray-200 hover:bg-gray-300 text-gray-800 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
    outline: `border border-gray-300 hover:bg-gray-100 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
    text: `text-blue-600 hover:bg-gray-100 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
    success: `bg-green-600 hover:bg-green-700 text-white ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`, // ✅ Green style
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
}

export { Button };
