import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    const handleLogout = () => {
        if (loading) {
            return <div className="min-h-screen flex justify-center items-center"><img src="https://i.ibb.co/GMCwfS6/loading-spinner.gif" /></div>
        } else {
            logOut().then(() => { }).catch(err => console.error(err))
        }
    }
    return (
        <div className="navbar shadow-lg fixed top-0 z-50 ">
            <div className="w-full md:w-10/12 lg:w-10/12 mx-auto flex md:flex-row justify-between items-center">
                <div className="flex items-center justify-center">

                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <Link to='/' className="p-2 hover:bg-orange hover:text-neutral-100 font-medium">Home</Link>
                        </ul>
                    </div>
                    <Link to='/' className="text-3xl font-bold">Logo</Link>
                </div>
                <div className=" hidden lg:flex justify-between items-center">
                    <ul className="menu menu-horizontal flex gap-4">
                        <NavLink to='/' className={({ isActive }) =>
                            isActive
                                ? "active font-bold uppercase"
                                : "font-bold uppercase"
                        }>

                            home
                        </NavLink>


                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    {user ?
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-circle ">
                                <span>{user.photoURL === null ? <FaUserCircle className='text-2xl' title={user.displayName} /> : <img className='w-10 h-10 rounded-full object-cover' src={user.photoURL} title={user.displayName} />}</span>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-neutral-100 rounded-box">
                                <li><button onClick={handleLogout} className="btn p-4 border-0 bg-orange text-neutral-100 hover:bg-transparent hover:text-orange hover:border hover:border-orange">Log Out</button></li>
                            </ul>
                        </div>

                        : <Link to='/login'><button className="btn bg-blue text-neutral-100 border-0">Log In</button></Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;