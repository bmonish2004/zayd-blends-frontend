
import musk from "../../src/assets/musk.jpeg";
import Fruity from "../../src/assets/Forbidden_Bloom.jpeg";
import Fresh from "../../src/assets/Aqua_Dawn.jpeg";
import sweet from "../../src/assets/Baked_Vanilla.jpeg";
import Banner from "../assets/banner1.png"
import heroImage from "../assets/About_hero.png";
import { Link } from "react-router-dom";


const Scents = [
    {
        id: 1,
        img: Fresh,
        head: "Aqua",
        para: "Energize. Vitalize. Awaken",
        arrow: "→"
    },
    {
        id: 2,
        img: Fruity,
        head: "Fruity",
        para: "Fruity. Bloom. Candylicious",
        arrow: "→"
    },
    {
        id: 3,
        img: musk,
        head: "Musk",
        para: "Deep.Warm.Addictive",
        arrow: "→"
    },
    {
        id: 4,
        img: sweet,
        head: "Sweet",
        para: "Espresso.Vanilla.Pistachio",
        arrow: "→"
    }
];

export function Hero() {
    return (
        <>
           <div className="w-full mb-10">
                <Link to="/combo-offer" className="block cursor-pointer group">
                    <img
                        src={Banner}
                        alt="Buy 2 Get 1 Free Promo Offer"
                        className="w-full h-auto block group-hover:opacity-95 transition-opacity"
                    />
                </Link>
            </div>


            <section className="mx-5 my-10">

                {/* Heading */}
                <div className="pb-5">
                    <h1 className="font-outfit text-3xl md:text-4xl">
                        EXPLORE SCENTS
                    </h1>
                </div>

                {/* Scent Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">


                    {Scents.map((scent) => (
                        <Link
                            to={`/scents/${scent.head.toLowerCase()}`}
                            key={scent.id}
                            className="relative h-[400px] overflow-hidden rounded-2xl group cursor-pointer block"
                        >
                            <img
                                src={scent.img}
                                alt={scent.head}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            <div className="absolute bottom-0 left-0 w-full p-6 text-white flex items-end justify-between">
                                <div>
                                    <h2 className="font-outfit text-2xl font-medium pb-2 tracking-wide">
                                        {scent.head}
                                    </h2>

                                    <p className="font-outfit text-base tracking-widest">
                                        {scent.para}
                                    </p>
                                </div>

                                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                                    {scent.arrow}
                                </span>
                            </div>
                        </Link>
                    ))}


                </div>
            </section>



            <section className="relative w-full h-[300px] sm:h-[350px] md:h-[420px] lg:h-[480px] overflow-hidden flex items-center">

                {/* Background Image */}
                <img
                    src={heroImage}
                    alt="ZAYD BLENDS Perfume"
                    className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Left Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1c1017]/70 via-[#1c1017]/30 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

                    <div className="w-[60%] sm:w-[55%] md:w-[48%] lg:w-[45%] max-w-xl">

                        <p className="text-[9px] sm:text-xs tracking-[0.35em] text-[#e5c2d0] mb-2 sm:mb-3">
                            GET TO KNOW US
                        </p>

                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                            About Us
                        </h1>

                        <div className="w-12 sm:w-16 h-[2px] bg-[#c18da3] my-3 sm:my-4"></div>

                        <p className="text-xs sm:text-sm md:text-base text-white/90 leading-5 sm:leading-7 mb-4 sm:mb-6">
                            A fragrance brand born from a passion for unique scents,
                            timeless elegance, and everyday confidence.
                        </p>

                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 bg-[#4b101f] hover:bg-[#701c32] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-xs sm:text-sm font-medium transition-all duration-300"
                        >
                            Explore More →
                        </Link>

                    </div>
                </div>
            </section>



        </>
    );
}
