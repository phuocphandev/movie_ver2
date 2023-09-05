import { useState } from "react";
import cn from "classnames";

const NavBar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const handleIsToggled = () => {
    setIsToggled(!isToggled); //Trả về gtrị opposite
  };
  return (
    <nav className="bg-transparent fixed w-full z-20 top-0 left-0 h-[10vh] ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="../../../../image/navbar/Logo.png"
            className="h-10 mr-2 pt-1"
            alt="Logo"
          />
          <span className="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Movids
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white transition-all ease-in-out hover:bg-[#C5CAE9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 ml-2 md:mr-2 md:ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#C5CAE9]"
          >
            Login
          </button>
          <div className="bg-white w-[0.25px] h-8"></div>
          <button
            type="button"
            className="text-white transition-all ease-in-out hover:bg-[#C5CAE9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 ml-2 md:mr-2 md:ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#C5CAE9]"
          >
            Register
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={handleIsToggled}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            className={cn(
              "transition-all ease-in-out overflow-hidden flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#424242] md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent",
              { hidden: isToggled }
            )}
            style={{ borderColor: "#e3b5d9"}}
          >
            <li>
              <a
                href="#"
                className="block my-1 py-2 pl-3 pr-4 rounded-2xl text-white bg-[#E91E63] md:bg-[#E91E63] md:px-3 md:dark:text-blue-500 transition-all ease-in-out"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block my-1 py-2 pl-3 pr-4 rounded-2xl text-white  hover:bg-[#E91E63] md:px-3 md:dark:text-blue-500 transition-all ease-in-out"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block my-1 py-2 pl-3 pr-4 rounded-2xl text-white  hover:bg-[#E91E63] md:px-3 md:dark:text-blue-500 transition-all ease-in-out"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block my-1 py-2 pl-3 pr-4 rounded-2xl text-white hover:bg-[#E91E63] md:px-3 md:dark:text-blue-500 transition-all ease-in-out"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
