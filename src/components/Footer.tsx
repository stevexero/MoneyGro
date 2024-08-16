import {
  FaXTwitter,
  FaLinkedinIn,
  FaGithubAlt,
  FaGlobe,
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='footer footer-center text-base-content rounded p-10'>
      <aside>
        <p>2024 - {new Date().getFullYear()} - Built by Steve Xero</p>
      </aside>
      <nav>
        <div className='grid grid-flow-col gap-4'>
          <a href='https://stevexero.com' target='_blank'>
            <FaGlobe size='1.4rem' />
          </a>
          <a href='https://x.com/steve_xero' target='_blank'>
            <FaXTwitter size='1.4rem' />
          </a>
          <a
            href='https://www.linkedin.com/in/steve-xero-7a422713b/'
            target='_blank'
          >
            <FaLinkedinIn size='1.4rem' />
          </a>
          <a href='https://github.com/stevexero' target='_blank'>
            <FaGithubAlt size='1.4rem' />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
