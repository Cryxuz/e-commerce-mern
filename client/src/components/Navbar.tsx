import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md h-20 px-[3%] py-[3%]">
      <p className='text-5xl cursive text-center'><img className="inline pr-5" src="/images/logo.png" alt="" />Tailored Tails</p>

      {/* Hamburger menu for smaller screens */}
      <div className="lg:hidden">
        {open ? (
        <div className='mt-[215px] bg-slate-200 rounded-lg p-4'>
          <FaTimes className="text-3xl cursor-pointer" onClick={handleMenu} />
          <li className='py-2 list-none'>
            <Link to="/" className="px-3 py-2 font-semibold text-lg merriweather hover:underline">
              Home
            </Link>
          </li>
          <li className='py-2 list-none'>
            <Link to="/items" className="px-3 py-2 font-semibold text-lg merriweather hover:underline">
              Items
            </Link>
          </li>
          
          <li className='py-2 list-none'>
            <Link to="/cart" className="px-3 py-2 font-semibold text-lg merriweather hover:underline">
            Cart<span className='bg-slate-600 rounded-full px-2 py-[1px] m-2 text-white'>{cartTotalQuantity}</span> 
            </Link>
          </li>

         
          {!auth.name && (
            <>
              <li className="px-3 py-2 font-semibold text-lg merriweather hover:underline list-none">
                <Link to="/registration">Register</Link>
              </li>
              <li className="px-3 py-2 font-semibold text-lg merriweather hover:underline list-none">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {auth.name && (
            <li className="px-3 py-2 font-semibold text-lg merriweather hover:underline">
              <Link to="/" onClick={() => {
                dispatch(logoutUser(null));
                toast.warning("You have logged out", { position: "bottom-left" });
              }}>Logout</Link>
            </li>
          )}
        </div>
        )
        
        : 
        
        (
          <FaBars className="text-3xl cursor-pointer" onClick={handleMenu} />
        )}
      </div>

      {/* Navigation links */}
      <ul className={`lg:flex text-2xl merriweather items-center space-x-4 justify-end semi-bold;
      ${open ? 'hidden' : 'hidden'}`}>
        <li>
          <Link to="/" className="px-3 py-2 font-semibold hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/items" className="px-3 py-2 font-semibold hover:underline">
            Items
          </Link>
        </li>
        <li>
          <Link to="/cart" className="px-3 py-2 font-semibold hover:underline">
          Cart<span className='bg-slate-600 rounded-full px-2 py-[1px] m-2 text-white'>{cartTotalQuantity}</span> 
          </Link>
        </li>
        
        {!auth.name && (
          <>
            <li className="px-3 py-2 font-semibold hover:underline">
              <Link to="/registration">Register</Link>
            </li>
            <li className="px-3 py-2 font-semibold hover:underline">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {auth.name && (
          <li className="px-3 py-2 font-semibold hover:underline">
            <Link to="/" onClick={() => {
              dispatch(logoutUser(null));
              toast.warning("You have logged out", { position: "bottom-left" });
            }}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;