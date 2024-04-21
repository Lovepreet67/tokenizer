import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type profileIconProps = {
  width: string;
  height: string;
  color: string;
};

const ProfileIcon: React.FC<profileIconProps> = ({width, height, color}) => {
  return (
    <Svg
      fill={color}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={3}>
      <Path d="M12 11a5 5 0 10-5-5 5.006 5.006 0 005 5zm0-8a3 3 0 11-3 3 3 3 0 013-3zM4 23h16a1 1 0 001-1v-4a5.006 5.006 0 00-5-5H8a5.006 5.006 0 00-5 5v4a1 1 0 001 1zm1-5a3 3 0 013-3h8a3 3 0 013 3v3H5z" />
    </Svg>
  );
};

export default ProfileIcon;
