import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    author: 'Jane Doe',
    title: 'Project Lead, Tech Solutions Inc.',
    quote: "Working with [Your Name] was a game-changer. Their MERN stack expertise and attention to detail ensured our project was not only delivered on time but exceeded all performance expectations. A true full-stack professional.",
    rating: 5,
    date: '2023-11-20',
  },
  {
    id: 2,
    author: 'John Smith',
    title: 'CTO, Innovate Labs',
    quote: "They demonstrated an incredible ability to architect complex backend systems and integrate them seamlessly with a modern React frontend. Their code is clean, well-documented, and robust. Highly recommended!",
    rating: 5,
    date: '2023-09-15',
  },
  {
    id: 3,
    author: 'Emily White',
    title: 'Founder, Startup Hub',
    quote: "Beyond the technical skill, their communication and problem-solving abilities were exceptional. They're not just a coder; they're a partner who understands business goals and delivers solutions that drive value.",
    rating: 4,
    date: '2023-07-30',
  },
];

const Review = ({ review, isVisible }) => (
  <div
    className={`bg-gray-900 border-2 border-green-400/20 p-6 sm:p-8 relative overflow-hidden transition-all duration-700 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {/* Terminal-style header */}
    <div className="flex items-center space-x-2 mb-6">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
      <span className="ml-4 text-green-400 text-sm hidden sm:inline">client@review:~$</span>
    </div>

    {/* Code-like content */}
    <div className="space-y-3 font-mono text-sm sm:text-base">
      <p className="text-gray-300 leading-relaxed">
        <span className="text-purple-400">{'/*'} Review from {review.author} {'*/'}</span>
      </p>
      <p className="text-white leading-relaxed italic">
        "{review.quote}"
      </p>
      <div className="flex items-center space-x-1 text-green-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 transition-transform duration-300 ${
              i < review.rating ? 'fill-current' : 'text-gray-500'
            }`}
          />
        ))}
      </div>
      <div className="text-right text-gray-500 text-xs mt-4">
        <span className="text-blue-400">-- {review.author}</span>
        <br />
        <span className="text-gray-400">{review.title}</span>
      </div>
    </div>
  </div>
);

const Reviews = ({ isVisible, reviewsRef }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 8000); // Auto-rotate every 8 seconds
    return () => clearInterval(timer);
  }, [currentReviewIndex]);

  return (
    <section
      id="reviews"
      ref={reviewsRef}
      className="min-h-screen relative z-10 flex items-center py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`transform transition-all duration-1000 ${
          isVisible.reviews ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-green-400/60 text-sm tracking-widest mb-2">
              // CLIENT_REVIEWS.DB
            </div>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
              TESTIMONIALS.EXECUTE()
            </h2>
            <div className="w-24 h-1 bg-green-400 mx-auto"></div>
          </div>

          <div className="relative">
            <div className="flex justify-center items-center">
              {reviewsData.map((review, index) => (
                <div
                  key={review.id}
                  className={`absolute w-full max-w-2xl transition-transform duration-500 ${
                    index === currentReviewIndex
                      ? 'scale-100 opacity-100 relative'
                      : 'scale-90 opacity-0 pointer-events-none'
                  }`}
                >
                  <Review review={review} isVisible={index === currentReviewIndex} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full transition-colors hidden md:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full transition-colors hidden md:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 flex space-x-2">
              {reviewsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentReviewIndex ? 'bg-green-400' : 'bg-gray-600 hover:bg-green-400/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;