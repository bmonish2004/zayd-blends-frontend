
import { Link } from "react-router-dom";
import { FaInstagramSquare } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";


const Footer = () => {
    return (
        <footer className="bg-[#111111] text-white pt-16 pb-6">

            <div className="max-w-7xl mx-auto px-6">

                {/* Main Footer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">

                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-serif tracking-[0.2em]">
                            ZAYD
                        </h2>
                        <p className="text-sm tracking-[0.35em] text-[#c49aaa] mt-1">
                            BLENDS
                        </p>

                        <p className="text-gray-400 text-sm leading-7 mt-6 max-w-xs">
                            Discover your signature scent.
                            Crafted for those who believe fragrance
                            is more than a feeling — it's an identity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-widest mb-6">
                            QUICK LINKS
                        </h3>

                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/" className="hover:text-[#d6a9bb]">Home</Link></li>
                            <li><Link to="/shop" className="hover:text-[#d6a9bb]">Shop All</Link></li>
                            <li><Link to="/about" className="hover:text-[#d6a9bb]">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-[#d6a9bb]">Contact</Link></li>
                            {/* <li><Link className="hover:text-[#d6a9bb]" to="/admin">Admin Login</Link></li> */}

                        </ul>


                    </div>


                    {/* Customer Care */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-widest mb-6">
                            CUSTOMER CARE
                        </h3>

                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#d6a9bb]">FAQs</a></li>
                            <li><a href="#" className="hover:text-[#d6a9bb]">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-[#d6a9bb]">Return Policy</a></li>
                            <li><a href="#" className="hover:text-[#d6a9bb]">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-widest mb-6">
                            FOLLOW OUR JOURNEY
                        </h3>

                        <p className="text-gray-400 text-sm leading-6 mb-6">
                            Stay connected with us for new fragrances,
                            launches and exclusive updates.
                        </p>

                        <div className="flex gap-5 text-sm items-center">
                            <a
                                href="https://www.instagram.com/zayd_blend/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-pink-500  transition"
                            >
                                <FaInstagramSquare className="w-7 h-7" />
                            </a>

                            <a
                                href="tel:+918122993247"
                                target="_blank"
                                rel="noreferrer"
                                className=" bg-white text-black rounded hover:bg-green-500 transition"
                            >
                                <IoCallOutline className="w-6 h-6 p-0.5" />
                            </a>

                            <a
                                href="mailto:zaidfz777@gmail.com"
                                className=" bg-white text-black rounded hover:bg-red-500/50 transition"
                                aria-label="Send us an email"
                            >
                                <MdOutlineEmail className="w-6.5 h-6 p-0.5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-800"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-gray-500 text-xs">

                    <p>
                        © {new Date().getFullYear()} ZAYD BLENDS.
                        All Rights Reserved.
                    </p>

                    <p className="tracking-widest uppercase">
                        Crafted with elegance. Worn with confidence.
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
