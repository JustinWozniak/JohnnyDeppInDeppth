import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h1>
        <Link to="/">
          <Image
          className='mainlogo'
            src={require('./../../../assets/images/swirllogo.svg')}
            alt="Open"
            width={64}
            height={64} />
        </Link>
      </h1>
    </div>
  );
}

export default Logo;