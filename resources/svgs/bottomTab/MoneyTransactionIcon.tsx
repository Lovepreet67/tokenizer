import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type moneyTransactionIconProps = {
  width: string;
  height: string;
  color: string;
};

const MoneyTransactionIcon: React.FC<moneyTransactionIconProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6 4h4.5m0 0a4.5 4.5 0 110 9H6l7 7M10.5 4H18M6 8.5h12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MoneyTransactionIcon;
