import {
  FaXTwitter,
  FaLinkedinIn,
  FaGithubAlt,
  FaGlobe,
} from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer footer-center sm:flex sm:flex-row sm:justify-evenly p-10'>
      <nav className='grid grid-flow-col gap-4'>
        <Link to='/' className='link link-hover'>
          <IoHome size='1.4rem' />
        </Link>
        <a className='link link-hover'>About MoneyGro</a>
        <a className='link link-hover'>Contact</a>
      </nav>
      <aside>
        {/* <p>2024 - {new Date().getFullYear()} - Built by Steve Xero</p> TODO: Uncomment when 2025 */}
        <p>2024 - Built by Steve Xero</p>
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
