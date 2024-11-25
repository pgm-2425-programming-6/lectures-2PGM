import { Image, ImageStyle, StyleProp } from "react-native";
import LogoImg from "@assets/images/logo/logo.png";

type Props = {
  style?: StyleProp<ImageStyle>;
};

const Logo = ({ style }: Props) => {
  return <Image style={style} source={LogoImg} />;
};

export default Logo;
