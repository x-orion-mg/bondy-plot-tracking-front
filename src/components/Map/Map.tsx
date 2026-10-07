import { forwardRef } from 'react';
import './map.scss';

const Map = forwardRef((props, ref) => (
  <div
    id='map'
    className='map'
    ref={ref as React.RefObject<HTMLDivElement>}
    {...props}
  />
));

export default Map;
