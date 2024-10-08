interface IWhatsAppIconProps {
  fill: string;
}

const WhatsAppIcon = ({ fill }: IWhatsAppIconProps) => {
  return (
    <svg
      width="16.800781"
      height="16.799805"
      viewBox="0 0 15.8008 17.7998"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs />
      <path
        id="Vector"
        d="M14.33 2.45C12.76 0.87 10.65 0 8.42 0C3.8 0 0.05 3.73 0.05 8.34C0.05 9.79 0.46 11.25 1.17 12.48L0 16.79L4.44 15.63C5.67 16.27 7.02 16.62 8.42 16.62C13.05 16.62 16.8 12.89 16.8 8.28C16.74 6.12 15.92 4.02 14.33 2.45ZM12.46 11.31C12.29 11.78 11.47 12.25 11.06 12.3C10.71 12.36 10.24 12.36 9.77 12.25C9.48 12.13 9.07 12.01 8.6 11.78C6.49 10.9 5.15 8.8 5.03 8.63C4.91 8.51 4.15 7.52 4.15 6.47C4.15 5.42 4.68 4.95 4.85 4.72C5.03 4.49 5.26 4.49 5.44 4.49C5.56 4.49 5.73 4.49 5.85 4.49C5.97 4.49 6.14 4.43 6.32 4.84C6.49 5.25 6.9 6.29 6.96 6.35C7.02 6.47 7.02 6.59 6.96 6.7C6.9 6.82 6.84 6.94 6.73 7.05C6.61 7.17 6.49 7.35 6.43 7.4C6.32 7.52 6.2 7.64 6.32 7.81C6.43 8.04 6.84 8.69 7.49 9.27C8.31 9.97 8.95 10.2 9.19 10.32C9.42 10.44 9.54 10.38 9.66 10.26C9.77 10.14 10.18 9.68 10.3 9.45C10.41 9.21 10.59 9.27 10.76 9.33C10.94 9.39 12 9.91 12.17 10.03C12.41 10.14 12.52 10.2 12.58 10.26C12.64 10.44 12.64 10.85 12.46 11.31Z"
        fill={fill}
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default WhatsAppIcon;
