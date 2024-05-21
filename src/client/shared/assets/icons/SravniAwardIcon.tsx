import React from 'react';

export const SravniAwardIcon: FC<{ width?: number; height?: number }> = ({ className, width = 16, height = 16 }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.028 11.2H3.01769C2.67829 11.2 2.39844 10.9658 2.39844 10.6146V5.34627C2.39844 4.87797 2.86115 4.73372 3.20054 5.08494L5.56611 6.75116L7.60248 4.17541C7.82874 3.94126 8.16814 3.94126 8.3944 4.17541L10.4308 6.75116L12.8258 5.08494C13.1652 4.73372 13.5984 4.87797 13.5984 5.34627V10.6146C13.5984 10.9554 13.3674 11.2 13.028 11.2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
