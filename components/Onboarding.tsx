import {
  Canvas,
  FitBox,
  Group,
  Path,
  rect,
  Skia,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const path_1 = Skia.Path.MakeFromSVGString(
  "M1144 1102 c-67 -73 -249 -221 -301 -245 -21 -9 -33 -37 -16 -37 12 0 107 64 173 116 99 78 220 202 220 224 0 11 -1 20 -2 20 -2 0 -35 -35 -74 -78z"
)!;
const path_2 = Skia.Path.MakeFromSVGString(
  "M1255 1756 c-23 -7 -40 -18 -40 -26 0 -8 7 -13 15 -11 8 2 31 8 50 14 52 14 116 -6 135 -43 32 -61 8 -188 -53 -284 -18 -28 -32 -56 -32 -63 0 -60 94 99 116 195 28 125 3 191 -85 221 -41 13 -54 13 -106 -3z"
)!;
const path3 = Skia.Path.MakeFromSVGString(
  "M1065 1553 c-35 -98 -29 -357 11 -452 22 -54 37 -26 18 34 -10 31 -18 102 -21 190 -4 120 -2 149 15 202 11 34 17 65 14 68 -12 12 -21 2 -37 -42z"
)!;

const path_4 = Skia.Path.MakeFromSVGString(
  "M126 022 c-10 -16 92 -127 147 -160 60 -37 133 -55 125 -31 -2 7 -18 16 -34 20 -52 10 -124 60 -171 118 -48 59 -58 67 -67 53z"
)!;

const path_5 = Skia.Path.MakeFromSVGString(
  "M1745 924 c-27 -24 -69 -53 -93 -65 -30 -15 -40 -25 -33 -32 7 -7 19 -7 38 2 34 16 153 110 153 121 0 22 -19 15 -65 -26z"
)!;

const path_6 = Skia.Path.MakeFromSVGString(
  "M1874 1518 c17 -101 24 -224 16 -273 -15 -93 -42 -189 -61 -221 -21 -34 -24 -54 -10 -54 20 0 53 74 78 172 23 92 25 116 20 228 -6 124 -19 190 -39 190 -7 0 -8 -15 -4 -42z"
)!;

const path_7 = Skia.Path.MakeFromSVGString(
  "M1619 1748 c-22 -15 -46 -47 -69 -93 -33 -67 -35 -75 -34 -170 1 -100 16 -167 34 -149 5 5 5 27 -1 54 -18 78 -7 187 26 259 24 54 35 67 69 82 23 10 47 19 54 19 8 0 40 -25 72 -56 41 -39 60 -51 66 -43 5 8 -13 31 -50 66 -48 45 -63 53 -95 53 -23 0 -52 -9 -72 -22z"
)!;

const path_8 = Skia.Path.MakeFromSVGString(
  "M1630 1145 c0 -20 98 -133 132 -153 48 -28 43 -4 -9 42 -27 24 -62 63 -77 85 -30 43 -46 52 -46 26z"
)!;

const path_9 = Skia.Path.MakeFromSVGString(
  "M1830 959 c0 -30 103 -82 200 -102 132 -28 150 -29 150 -14 0 9 -16 16 -44 20 -100 14 -187 40 -241 73 -64 38 -65 38 -65 23z"
)!;

export const OnboardingSVG = () => {
  const insets = useSafeAreaInsets();

  // const progress = useSharedValue(0);
  // useEffect(() => {
  //   progress.value = withTiming(1, { duration: 2000 });
  // }, []);

  // const path = usePathInterpolation(
  //   progress,
  //   [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
  //   [
  //     angryPath,
  //     normalPath,
  //     goodPath,
  //     path_4,
  //     path_5,
  //     path_6,
  //     path_7,
  //     path_8,
  //     path_9,
  //   ]
  // );

  return (
    <Canvas
      style={{
        flex: 1,
        backgroundColor: "red",
        height: 256,
        width: width,
        paddingTop: insets.top,
      }}
    >
      <FitBox src={rect(0, 0, 300, 259)} dst={rect(0, 0, 300, 900)}>
        <Group
          transform={[
            { translateX: 0, translateY: 259, scaleX: 0.1, scaleY: -0.1 },
          ]}
        >
          <Path
            path={path_4}
            style="fill"
            strokeWidth={5}
            strokeCap="round"
            strokeJoin="round"
            color={"black"}
          />
        </Group>
      </FitBox>
    </Canvas>
  );
};

{
  /*
  <Path
    path="M86.4932 7.20196C58.9832 25.7789 48.0665 53.202 48.0665 103.404C48.0665 122.644 48.9399 128.615 53.9615 142.106L59.8565 158.029L51.1232 165.548C46.5382 169.529 33.0015 180.144 21.4299 188.769C9.63987 197.615 0.0332031 206.019 0.0332031 207.789C0.0332031 210.221 1.3432 210.221 6.14654 206.904C19.0282 198.5 51.5599 173.067 56.5815 167.538L61.8215 161.788L65.7515 167.981C69.6815 175.058 81.6899 187.442 95.0082 199.164C107.017 209.558 124.047 213.317 151.12 211.99C176.447 210.664 192.385 204.25 207.013 189.875L216.183 180.808L222.297 184.567C237.58 194.519 257.667 202.039 276.225 204.914C288.233 206.904 296.53 207.346 297.84 206.019C300.46 203.365 298.058 202.702 276.443 199.385C260.942 196.952 241.073 189.212 223.388 178.817L218.585 175.942L222.952 169.308C227.973 161.567 230.812 151.837 234.742 126.846C240.418 92.5673 237.798 57.625 228.41 42.3654C226.008 38.1635 222.297 31.3077 220.55 26.8847C212.472 7.42311 203.52 1.45196 186.053 3.6635C174.7 4.99042 172.735 6.09619 162.255 16.9327C151.775 27.9904 150.902 29.3173 149.592 43.4712C147.19 65.3654 149.373 83.9423 155.705 97.6539C158.762 104.289 164.438 117.779 168.368 127.51C176.01 146.308 186.272 159.356 201.555 169.75C206.577 173.067 211.162 176.385 211.598 176.606C214 178.375 199.153 190.76 187.8 196.952C168.587 207.346 137.583 210.664 121.208 204.029C97.8465 194.519 81.0349 181.914 72.0832 167.096L67.2799 159.356L77.9782 147.192C103.742 117.115 125.793 82.3943 134.308 57.625C138.675 45.2404 138.457 22.6827 134.09 16.2693C129.942 10.077 116.405 3.00003 105.488 1.45196C98.5015 0.125035 95.4449 1.2308 86.4932 7.20196ZM116.623 10.077C126.667 14.2789 133.217 23.5673 133.217 33.5193C133.217 44.7981 127.322 63.8173 120.335 75.5385C116.842 81.0673 110.728 91.9039 106.362 99.8654C102.213 107.827 91.0782 123.087 81.6899 133.923L64.6599 153.385L60.5115 143.875C51.3415 122.644 51.5599 72 60.7299 47.8943C67.7165 29.3173 90.8599 6.9808 103.087 6.9808C106.58 6.9808 112.475 8.30773 116.623 10.077ZM204.83 12.5097C208.323 15.3847 212.472 21.1347 214 25.1154C215.528 29.0962 219.677 38.3847 223.388 45.6827C229.502 57.625 230.157 61.3847 231.03 84.1635C232.34 116.673 226.663 152.5 218.367 166.875L214.655 172.846L206.14 166.433C189.547 154.048 181.25 143.212 171.643 120.654C156.797 85.7116 154.177 76.4231 154.395 56.2981C154.613 24.6731 167.058 10.077 195.878 7.20196C197.188 7.20196 201.337 9.4135 204.83 12.5097Z"
    color="white"
  /> */
}
