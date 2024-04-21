import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface iconProps {
  width?: string;
  height?: string;
}

const XCutIcon: React.FC<iconProps> = ({width, height}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : '40px'}
      height={height ? height : '40px'}
      fill="currentColor"
      className="bi bi-x-circle-fill"
      viewBox="0 0 16 16"
      color="#000">
      <Path
        d="M16 8A8 8 0 110 8a8 8 0 0116 0zM5.354 4.646a.5.5 0 10-.708.708L7.293 8l-2.647 2.646a.5.5 0 00.708.708L8 8.707l2.646 2.647a.5.5 0 00.708-.708L8.707 8l2.647-2.646a.5.5 0 00-.708-.708L8 7.293 5.354 4.646z"
        fill="#000"
      />
    </Svg>
  );
};

export default XCutIcon;
