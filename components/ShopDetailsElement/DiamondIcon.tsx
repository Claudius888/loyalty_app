import Svg, { Path, SvgProps } from "react-native-svg";
export const DiamondIcon: React.FC<SvgProps> = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
    fill="white"
  >
    <Path d="M89.78 48.04C69 42 55 25 52.42 6.25c-.42-.86-1.3-1.41-2.26-1.41s-1.84.55-2.26 1.41C44 24 32 41 10.54 48.04c-.69.46-1.12 1.22-1.13 2.05-.02.83.37 1.61 1.05 2.1C29 56 44 76 48.01 94.23c.46.76 1.28 1.23 2.17 1.23s1.71-.47 2.17-1.23C56 75 73 57 89.9 52.19c.67-.49 1.06-1.27 1.05-2.1s-.44-1.6-1.13-2.05ZM50.15 88.12C45 67 28 54 16.25 50.24 36 44 47 29 50.15 12.8 54 30 67 46 84.05 50.24 73 52 55 68 50.15 88.12" />
  </Svg>
);
