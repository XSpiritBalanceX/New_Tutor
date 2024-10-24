interface IChatIconProps {
  fill: string;
}

const ChatIcon = ({ fill }: IChatIconProps) => {
  return (
    <svg
      width="24.000000"
      height="24.000000"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          id="Vector"
          d="M13 3C17.96 3 22 7.02 22 12C22 16.97 17.96 21 13 21L6 21C3.78 21 2 19.2 2 17L2 12C2 7.02 6.03 3 11 3L13 3ZM8 10L16 10M8 14L12 14"
          stroke={fill}
          strokeOpacity="1.000000"
          strokeWidth="1.500000"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default ChatIcon;
