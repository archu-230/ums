import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
        setOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to="/"
                    className="text-3xl font-bold text-[#43245c] tracking-wider font-['Georgia']"
                >
                    UMS
                </Link>

                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/"
                                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-[#43245c] hover:bg-purple-100 transition font-['Georgia']"
                            >
                                Home
                            </Link>

                            <Link
                                to="/create-user"
                                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-[#43245c] hover:bg-purple-100 transition font-['Georgia']"
                            >
                                Create User
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#43245c] to-[#6d3ea3] text-white font-medium hover:opacity-90 transition font-['Georgia']"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-[#43245c] transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#43245c] to-[#6d3ea3] text-white font-medium hover:opacity-90 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-3xl text-[#43245c]"
                >
                    ☰
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3 shadow-lg">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-purple-100 font-['Georgia'] text-center"
                            >
                                Home
                            </Link>

                            <Link
                                to="/create-user"
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-purple-100 font-['Georgia'] text-center"
                            >
                                Create User
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full rounded-lg bg-gradient-to-r from-[#43245c] to-[#6d3ea3] py-3 text-white font-medium font-['Georgia']"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-purple-100"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                onClick={() => setOpen(false)}
                                className="block rounded-lg bg-gradient-to-r from-[#43245c] to-[#6d3ea3] px-4 py-3 text-center text-white font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;
