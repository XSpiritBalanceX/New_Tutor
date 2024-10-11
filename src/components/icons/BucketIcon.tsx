interface IBucketIconProps {
  fill: string;
}

const BucketIcon = ({ fill }: IBucketIconProps) => {
  return (
    <svg
      width="17.500000"
      height="17.937500"
      viewBox="0 0 17.5 17.9375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs />
      <path
        id="path"
        d="M7 3.06L10.5 3.06C10.5 2.59 10.31 2.15 9.98 1.82C9.66 1.49 9.21 1.31 8.75 1.31C8.28 1.31 7.83 1.49 7.51 1.82C7.18 2.15 7 2.59 7 3.06ZM5.68 3.06C5.68 2.66 5.76 2.26 5.92 1.89C6.07 1.51 6.3 1.18 6.58 0.89C6.86 0.61 7.2 0.38 7.57 0.23C7.94 0.07 8.34 0 8.75 0C9.15 0 9.55 0.07 9.92 0.23C10.29 0.38 10.63 0.61 10.91 0.89C11.19 1.18 11.42 1.51 11.57 1.89C11.73 2.26 11.81 2.66 11.81 3.06L16.84 3.06C17.01 3.06 17.18 3.13 17.3 3.25C17.42 3.37 17.5 3.54 17.5 3.71C17.5 3.89 17.42 4.05 17.3 4.18C17.18 4.3 17.01 4.37 16.84 4.37L15.68 4.37L14.66 14.97C14.58 15.78 14.2 16.53 13.6 17.08C13 17.63 12.21 17.93 11.39 17.93L6.1 17.93C5.28 17.93 4.5 17.63 3.89 17.08C3.29 16.53 2.91 15.78 2.83 14.97L1.81 4.37L0.65 4.37C0.48 4.37 0.31 4.3 0.19 4.18C0.07 4.05 0 3.89 0 3.71C0 3.54 0.07 3.37 0.19 3.25C0.31 3.13 0.48 3.06 0.65 3.06L5.68 3.06ZM7.43 7.21C7.43 7.04 7.36 6.87 7.24 6.75C7.12 6.63 6.95 6.56 6.78 6.56C6.6 6.56 6.44 6.63 6.31 6.75C6.19 6.87 6.12 7.04 6.12 7.21L6.12 13.78C6.12 13.95 6.19 14.12 6.31 14.24C6.44 14.36 6.6 14.43 6.78 14.43C6.95 14.43 7.12 14.36 7.24 14.24C7.36 14.12 7.43 13.95 7.43 13.78L7.43 7.21ZM10.71 6.56C10.89 6.56 11.05 6.63 11.18 6.75C11.3 6.87 11.37 7.04 11.37 7.21L11.37 13.78C11.37 13.95 11.3 14.12 11.18 14.24C11.05 14.36 10.89 14.43 10.71 14.43C10.54 14.43 10.37 14.36 10.25 14.24C10.13 14.12 10.06 13.95 10.06 13.78L10.06 7.21C10.06 7.04 10.13 6.87 10.25 6.75C10.37 6.63 10.54 6.56 10.71 6.56ZM4.14 14.84C4.18 15.33 4.41 15.78 4.77 16.11C5.14 16.44 5.61 16.62 6.1 16.62L11.39 16.62C11.88 16.62 12.35 16.44 12.72 16.11C13.08 15.78 13.31 15.33 13.35 14.84L14.37 4.37L3.12 4.37L4.14 14.84Z"
        fill={fill}
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default BucketIcon;
