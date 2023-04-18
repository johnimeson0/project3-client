import React from 'react';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


export const NavbarPage = () => {

  const {loggedIn, user, logout} = useContext(AuthContext)


   return (
    <>
    <Navbar className="bg-indigo-900 text-white">
      <NavbarBrand href="/home">
        <h1 className="font-mono uppercase">Revmatch</h1>
      </NavbarBrand>
      <NavbarToggler />
      <NavbarCollapse>
        <NavbarNav orientation="start">
          <NavbarItem>
            <NavbarLink href="/cars">Cars</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink href="/forum">Forum</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink href="/events">Events</NavbarLink>
          </NavbarItem>
        </NavbarNav>
        <NavbarNav orientation="end">
        {user && (
          <NavbarItem>
            <NavbarLink href={`/profile/${user._id}`}>Your Profile</NavbarLink>
          </NavbarItem>
        )}

        </NavbarNav>
      </NavbarCollapse>
    </Navbar>
    <div className='SecondaryNav'>
<Link to="/friends"><button>Friends List</button></Link>

 <button onClick={logout}>Logout</button>
 </div>

        </>
      )}
      

const style = {
  navbar: `fixed px-4 py-2 shadow top-0 w-full lg:flex lg:flex-row lg:items-center lg:justify-start lg:relative`,
  brand: `cursor-pointer font-bold inline-block mr-4 py-1.5 text-2xl whitespace-nowrap hover:text-gray-200`,
  toggler: `block float-right text-4xl lg:hidden focus:outline-none focus:shadow`,
  item: `whitespace-pre cursor-pointer px-4 py-3 hover:text-gray-200`,
  collapse: {
    default: `border-t border-gray-400 fixed left-0 mt-2 shadow py-2 text-center lg:border-none lg:flex lg:flex-grow lg:items-center lg:mt-0 lg:py-0 lg:relative lg:shadow-none`,
    open: `h-auto visible transition-all duration-500 ease-out w-full opacity-100 lg:transition-none`,
    close: `h-auto invisible w-0 transition-all duration-300 ease-in lg:opacity-100 lg:transition-none lg:visible`,
  },
  nav: {
    start: `block mb-0 mr-auto pl-0 lg:flex lg:mb-0 lg:pl-0`,
    middle: `block mb-0 ml-auto pl-0 lg:flex lg:pl-0 lg:mb-0 lg:mx-auto`,
    end: `block pl-0 mb-0 ml-auto lg:flex lg:pl-0 lg:mb-0`,
  },
};

const Context = React.createContext({});

const Navbar = ({ children, className }) => {
  const [open, setOpen] = React.useState(false);
  const navbarRef = React.useRef(null);

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (window.innerWidth < 1024) {
        if (!navbarRef.current?.contains(event.target)) {
          if (!open) return;
          setOpen(false);
        }
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [open, navbarRef]);

  return (
    <Context.Provider value={{ open, toggle }}>
      <nav ref={navbarRef} className={`${className} ${style.navbar}`}>
        {children}
      </nav>
    </Context.Provider>
  );
};

const useToggle = () => React.useContext(Context);

const NavbarBrand = ({ children, href }) => (
  <a href={href} className={style.brand}>
    <strong>{children}</strong>
  </a>
);

const NavbarToggler = () => {
  const { toggle } = useToggle();
  return (
    <button
      type="button"
      aria-expanded="false"
      aria-label="Toggle navigation"
      className={style.toggler}
      onClick={toggle}
    >
      &#8801;
    </button>
  );
};

const NavbarCollapse = ({ children }) => {
  const { open } = useToggle();
  return (
    <div
      style={{ backgroundColor: 'inherit' }}
      className={`${style.collapse.default}
        ${open ? style.collapse.open : style.collapse.close}`}
    >
      {children}
    </div>
  );
};

const NavbarNav = ({ children, orientation }) => (
  <ul className={style.nav[orientation]}>{children}</ul>
);

const NavbarItem = ({ children }) => <li className={style.item}>{children}</li>;

const NavbarLink = ({ children, href, active, activeClass }) => (
  <a href={href} className={active ? activeClass : ''}>
    {children}
  </a>
);

