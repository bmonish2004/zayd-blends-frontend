import heroImage from "../assets/About_hero1.png";
import mobileHeroImage from "../assets/mobile_hero.png";
import AboutImage from "../assets/About_img.jpeg";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { FaInstagramSquare } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const About = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#our-vision") {
            const timer = setTimeout(() => {
                document.getElementById("our-vision")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [location]);
    return (
        <div className="w-full overflow-hidden">


            <section className="relative w-full overflow-hidden">

                {/* DESKTOP DESIGN */}
                <div className="hidden lg:flex relative min-h-[620px] xl:min-h-[700px] items-center bg-[#260b19]">

                    <img
                        src={heroImage}
                        alt="Zayd Blends Perfume"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#240b18]/70 via-[#240b18]/30 to-transparent"></div>

                    <div className="relative z-10 max-w-7xl mx-auto w-full px-16">
                        <div className="max-w-[520px]">

                            <p className="text-xs tracking-[0.45em] text-[#e9b5c5] mb-6">
                                WELCOME TO ZAYD BLENDS
                            </p>

                            <h1 className="font-serif text-6xl xl:text-7xl text-white leading-[1.12]">
                                The Art of
                                <br />
                                <span className="italic text-[#e9a6bb]">
                                    Unforgettable
                                </span>
                                <br />
                                Fragrance
                            </h1>

                            <div className="w-20 h-[2px] bg-[#e9a6bb] my-7"></div>

                            <p className="text-base text-white/85 leading-8 max-w-md">
                                Discover the beauty of extraordinary fragrances.
                                Crafted with elegance, inspired by individuality,
                                and designed to leave a lasting impression.
                            </p>

                            <Link
                                to="/about#our-vision"
                                className="inline-flex items-center gap-4 mt-9 px-8 py-4 bg-[#e9a6bb] text-[#260b19] text-xs tracking-[0.2em] font-semibold hover:bg-white transition duration-300"
                            >
                                DISCOVER OUR STORY
                                <span className="text-lg" >→</span>
                            </Link>

                        </div>
                    </div>
                </div>




                {/* MOBILE DESIGN */}
                <div className="lg:hidden relative w-full min-h-[780px] sm:min-h-[850px] overflow-hidden bg-[#260b19]">

                    {/* Bottle Background Image */}
                    <img
                        src={mobileHeroImage}
                        alt="ZAYD BLENDS Forbidden Bloom"
                        className="absolute inset-0 w-full h-full object-contain object-bottom"
                    />

                    {/* Dark overlay only in the upper text area */}
                    <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-[#260b19]/95 via-[#260b19]/80 to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center px-5 pt-9 sm:pt-12">

                        <p className="text-[9px] sm:text-[10px] tracking-[0.4em] text-[#e9b5c5] mb-4">
                            WELCOME TO ZAYD BLENDS
                        </p>

                        <h1 className="font-serif text-[32px] sm:text-4xl text-white leading-[1.08]">
                            The Art of
                            <br />
                            <span className="italic text-[#e9a6bb]">
                                Unforgettable
                            </span>
                            <br />
                            Fragrance
                        </h1>

                        <div className="w-16 h-[2px] bg-[#e9a6bb] my-4"></div>

                        <p className="text-xs sm:text-sm text-white/90 leading-6 max-w-[320px]">
                            Discover the beauty of extraordinary fragrances.
                            Crafted with elegance, inspired by individuality,
                            and designed to leave a lasting impression.
                        </p>

                        <Link
                            to="/about#our-vision"
                            className="inline-flex items-center justify-center gap-4 mt-5 px-6 py-3.5 bg-[#e9a6bb] text-[#260b19] text-[10px] tracking-[0.2em] font-semibold hover:bg-white transition duration-300"
                        >
                            DISCOVER OUR STORY
                            <span className="text-base" >→</span>
                        </Link>

                    </div>

                </div>



            </section>





            {/* OUR PURPOSE */}
            <section id="our-purpose" className="bg-[#faf8f7] py-16 md:py-24">

                <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">

                    {/* Image */}
                    <div className="relative">
                        <div className="absolute -bottom-5 -left-5 w-full h-full bg-[#c49aaa]"></div>

                        <img
                            src={AboutImage}
                            alt="Perfume lifestyle"
                            className="relative w-full h-[350px] md:h-[430px] object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="md:pl-8">

                        <p className="text-xs tracking-[0.4em] text-[#9b6b80] mb-5">
                            OUR PURPOSE
                        </p>

                        <h2 className="font-serif text-4xl md:text-5xl text-[#211b1d] leading-tight mb-6">
                            Scents That Define You
                        </h2>

                        <p className="text-gray-600 leading-8 text-base">
                            At ZAYD BLENDS, we believe fragrance is more
                            than just a scent. It is an expression of
                            personality, confidence, and individuality.

                            We create fragrances that blend modern style
                            with timeless sophistication, crafted for
                            everyone, everywhere.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 mt-12">

                            <div className="text-center">
                                <span className="text-3xl text-[#93677b]">✧</span>
                                <p className="text-sm mt-3 font-medium">
                                    Premium<br />Ingredients
                                </p>
                            </div>

                            <div className="text-center border-x border-gray-300">
                                <span className="text-3xl text-[#93677b]">⌛</span>
                                <p className="text-sm mt-3 font-medium">
                                    Long<br />Lasting
                                </p>
                            </div>

                            <div className="text-center">
                                <span className="text-3xl text-[#93677b]">♧</span>
                                <p className="text-sm mt-3 font-medium">
                                    Unisex<br />Fragrances
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>


            {/* OUR VISION */}
            <section id="our-vision" className="relative bg-[#171416] text-white py-24 px-6 text-center overflow-hidden">

                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1600"
                        alt="Floral background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto">

                    <p className="text-xs tracking-[0.5em] text-[#d6a9bb] mb-6">
                        OUR VISION
                    </p>

                    <h2 className="font-serif italic text-4xl md:text-5xl leading-tight">
                        To Make Luxury Fragrances
                        <br />
                        Accessible for All
                    </h2>

                    <div className="w-16 h-1 bg-[#c18da3] mx-auto my-8"></div>

                    <p className="text-gray-300 text-base md:text-lg leading-8">
                        We believe a great fragrance isn't just a
                        product, but a part of how you express yourself
                        — your mood, your style, your story.
                    </p>

                </div>
            </section>


            {/* CONTACT SECTION */}
            <section
                id="contact"
                className="bg-[#260b19] text-white py-14 md:py-20 px-6"
            >
                <div className="max-w-4xl mx-auto text-center">

                    <p className="text-xs tracking-[0.4em] text-[#e9a6bb] mb-4">
                        GET IN TOUCH
                    </p>

                    <h2 className="font-serif text-3xl md:text-5xl mb-5">
                        We'd Love to Hear From You
                    </h2>

                    <p className="text-white/70 text-sm md:text-base leading-7 max-w-xl mx-auto">
                        Have questions about our fragrances?
                        Need help choosing your signature scent?
                        We're always here to help.
                    </p>

                    {/* Contact Links */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 mt-10">

                        {/* Email */}
                        <a
                            href="mailto:zaidfz777@gmail.com"
                            className="flex items-center gap-3 text-sm text-white hover:text-[#e9a6bb] transition "
                        >
                            <span className="text-xl text-[#e9a6bb]"><MdOutlineEmail className="w-9 h-9 bg-[#e9a6bb] text-black/80 p-0.5 rounded" /></span>
                            zaidfz777@gmail.com
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/zayd_blend/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-white hover:text-[#e9a6bb] transition"
                        >
                            <span className="text-xl text-[#e9a6bb]"><FaInstagramSquare className="w-10 h-10" /></span>
                            zayd_blend
                        </a>

                        <a
                            href="tel:91+8122993247"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-white hover:text-[#e9a6bb] transition"
                        >
                            <span className="text-xl text-[#e9a6bb]"><IoCallOutline className="w-9 h-9 p-0.5 bg-[#e9a6bb] text-black/80 rounded" />
                            </span>
                            91+ 8122993247
                        </a>

                    </div>

                    <div className="w-16 h-[1px] bg-[#93677b] mx-auto mt-12 mb-6"></div>

                    <p className="text-[#e9a6bb] text-[10px] tracking-[0.35em]">
                        YOUR SCENT. YOUR IDENTITY.
                    </p>

                </div>
            </section>



            {/* BRAND CLOSING */}
            <section className="bg-[#faf8f7] py-16 text-center px-6">

                <h2 className="font-serif text-3xl md:text-4xl text-[#211b1d] tracking-widest">
                    ZAYD BLENDS
                </h2>

                <p className="text-[#93677b] text-xs tracking-[0.4em] mt-4">
                    YOUR SCENT. YOUR IDENTITY.
                </p>

                <p className="text-gray-500 text-sm mt-5 max-w-lg mx-auto leading-7">
                    Discover fragrances that leave a lasting
                    impression and make every moment unforgettable.
                </p>

            </section>

        </div>
    );
};

export default About;
