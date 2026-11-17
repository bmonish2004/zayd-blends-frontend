
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Kruthika",
    rating: 4,
    text: "Absolutely loved the fragrance! It smells premium and lasts really well. Definitely worth buying.",
  },
  {
    id: 2,
    name: "Prabha",
    rating: 5,
    text: "Amazing perfume quality and beautiful packaging. Got so many compliments. Highly recommended!",
  },
  {
    id: 3,
    name: "Deepa",
    rating: 4,
    text: "Beautiful fragrance with a premium feel. The scent is lovely for everyday use.",
  },
  {
    id: 4,
    name: "Magesh",
    rating: 5,
    text: "Best Product for daily use",
  },
];

const RatingReviews = () => {
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for sharing your review!");
    setForm({ name: "", rating: 5, comment: "" });
    setShowForm(false);
  };

  return (
    <section className="bg-[#f8f7f6] py-16 px-5 md:px-10">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif text-[#211b1d] mb-10">
          Ratings & Reviews
        </h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

          {/* Overall Rating */}
          <div className="flex gap-8 items-center">

            <div>
              <div className="flex items-end gap-1">
                <span className="text-6xl font-light text-[#211b1d]">
                  4.5
                </span>
                <span className="text-gray-500 mb-2">/5</span>
              </div>

              <div className="text-yellow-500 text-xl tracking-wider">
                ★★★★★
              </div>

              <p className="text-xs text-gray-500 mt-2">
                (50+ Reviews)
              </p>
            </div>

            {/* Rating Bars */}
            <div className="flex-1 space-y-3">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm w-3">{star}</span>
                  <span className="text-yellow-500">★</span>

                  <div className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden">
                    <div
                      className="h-full bg-[#b58b9b] rounded-full"
                      style={{
                        width: ["85%", "65%", "35%", "15%", "0%"][index],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Write Review */}
          <div className="flex flex-col items-center justify-center border-l-0 md:border-l border-gray-300 md:pl-10">

            <h3 className="text-xl font-serif mb-2">
              Review this product
            </h3>

            <p className="text-sm text-gray-500 mb-5 text-center">
              Share your thoughts with other customers
            </p>

          </div>
        </div>

        
        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            >

              {/* Customer Info */}
              <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8dce1] flex items-center justify-center font-semibold text-[#775363]">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Verified Buyer
                    </p>
                  </div>
                </div>

              </div>

              {/* Stars */}
              <div className="text-yellow-500 tracking-widest mb-3">
                {"★".repeat(review.rating)}
                <span className="text-gray-300">
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>

              {/* Review */}
              <p className="text-sm text-gray-600 leading-6 mb-5">
                {review.text}
              </p>

            </div>
          ))}

        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border border-black px-10 py-3 rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            {showAll ? "Show Less" : "Load More"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default RatingReviews;
