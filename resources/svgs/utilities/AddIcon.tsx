import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {View} from 'react-native';

type addIconProps = {
  width: number;
  height: number;
};

const AddIcon: React.FC<addIconProps> = ({width, height}) => {
  return (
    <View style={{width: width, height: height}}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={'0 0 256 256'}>
        <Path
          d="M45 90C20.187 90 0 69.813 0 45S20.187 0 45 0s45 20.187 45 45-20.187 45-45 45z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#4ebc3b"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M45 70.454a5 5 0 01-5-5V24.545a5 5 0 0110 0v40.909a5 5 0 01-5 5z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M65.454 50H24.545a5 5 0 110-10h40.909a5 5 0 110 10z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
      </Svg>
    </View>
  );
};

export default AddIcon;
