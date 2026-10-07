import './icomoon.scss';
import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from '../../assets/fonts/font-icon/16_dec_2024.json';

const Icon = (props: IconProps) => <IcoMoon className="iconMoon" iconSet={iconSet} {...props} />;

export default Icon;