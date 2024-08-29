import { Link } from 'react-router-dom';
import { GrMoney } from 'react-icons/gr';
import {
  FaXTwitter,
  FaLinkedinIn,
  FaGithubAlt,
  FaGlobe,
  FaBug,
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='w-full footer p-10'>
      <div className='w-full flex flex-col justify-between items-center'>
        <form>
          <h6 className='footer-title mt-12 text-center'>
            Steve Xero Newsletter
          </h6>
          <fieldset className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Enter your email address</span>
            </label>
            <div className='flex flex-col md:block join'>
              <input
                type='text'
                placeholder='username@site.com'
                className='input input-bordered md:join-item'
              />
              <button className='btn btn-primary md:join-item mt-4 md:mt-0'>
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
        <div className='w-full max-w-sm flex flex-col md:flex-row justify-evenly mt-8 items-center md:items-start'>
          <aside>
            <div className='flex flex-row items-center'>
              <div className='text-primary'>
                <GrMoney size='1.5rem' />
              </div>
              <div>
                <Link to='/' className='text-xl'>
                  &nbsp;Money
                  <span className='text-secondary'>
                    G<span className='text-primary'>.</span>ro
                  </span>
                </Link>
              </div>
            </div>
            {/* <p>2024 - {new Date().getFullYear()} - Built by Steve Xero</p> TODO: Uncomment when 2025 */}
            <p className='mt-4'>&copy; 2024 - Steve Xero</p>
          </aside>
          <nav className='flex flex-col mt-8 md:mt-0'>
            {/* <h6 className='footer-title'>Services</h6> */}
            <a className='link link-hover flex flex-row items-center mt-4 md:mt-0'>
              <FaBug />
              &nbsp;Bug Report
            </a>
            <a className='link link-hover mt-4'>About</a>
            <a className='link link-hover mt-4'>Contact</a>
          </nav>
        </div>
        <div>
          <div className='footer footer-center sm:flex sm:flex-row sm:justify-evenly p-10'>
            <nav>
              <div className='grid grid-flow-col gap-4'>
                <a href='https:stevexero.com' target='_blank'>
                  <FaGlobe size='1.4rem' />
                </a>
                <a href='https:x.com/steve_xero' target='_blank'>
                  <FaXTwitter size='1.4rem' />
                </a>
                <a
                  href='https:www.linkedin.com/in/steve-xero-7a422713b/'
                  target='_blank'
                >
                  <FaLinkedinIn size='1.4rem' />
                </a>
                <a href='https:github.com/stevexero' target='_blank'>
                  <FaGithubAlt size='1.4rem' />
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className='w-full max-w-md'>
          <nav className='w-full flex flex-col sm:flex-row sm:justify-between items-center'>
            <a className='link link-hover'>Terms of use</a>
            <a className='link link-hover mt-4 md:mt-0'>Privacy policy</a>
            <a className='link link-hover mt-4 md:mt-0'>Cookie policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
