import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='h-20 border-t border-t-text-muted text-center flex items-center text-text-secondary justify-center'>
      <p>Copyright &copy; {currentYear} All rights reserved.</p>
    </div>
  );
};

export default Footer;
