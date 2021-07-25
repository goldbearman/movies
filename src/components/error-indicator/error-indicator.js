import React from 'react';

import './error-indecator.css';
import icon from './error.png'
import {Alert} from 'antd';

const ErrorIndicator = () => {

  const text = 'Something has gone terrible wrong.\n But we already sent programmer to fix it'

  return (
    //<div className='error-indicator'>
    // <img className='icon' src={icon} alt="icon error"/><br/>
    // <span>Boom!</span><br/>
    // <span>Something has gone terrible wrong</span><br/>
    // <span>(but we already sent programmer to fix it)</span><br/>
    //</div>
    <Alert className='error-indicator'
           message="Error"
           description={text}
           type="error"
           showIcon
    />
  );
};

export default ErrorIndicator;