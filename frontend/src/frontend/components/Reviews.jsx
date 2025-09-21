import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeft, ChevronRight, Star, Loader2, Search } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../context/AuthContext'; // Import AuthContext

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
      {review.featured && (
        <Star className="w-4 h-4 text-yellow-400 fill-current ml-2" />
      )}
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
  const { BackendUrl } = useContext(AuthContext); // Use BackendUrl from AuthContext
  const [reviews, setReviews] = useState([]); // State to hold fetched reviews
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BackendUrl}/api/reviews`);
        setReviews(response.data.map(review => ({
          id: review._id,
          author: review.reviewerName,
          title: 'Client Review', // Placeholder as title is not in model
          quote: review.reviewContent,
          rating: review.rating,
          date: new Date(review.date).toLocaleDateString(),
          featured: review.featured || false,
        })));
      } catch (err) {
        setError('Failed to load reviews. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [BackendUrl]);

  useEffect(() => {
    if (reviews.length === 0) return; // Don't auto-rotate if no reviews
    const timer = setInterval(() => {
      nextReview();
    }, 8000); // Auto-rotate every 8 seconds
    return () => clearInterval(timer);
  }, [currentReviewIndex, reviews]); // Add reviews to dependency array

  const featuredReviews = reviews.filter(review => review.featured);
  const reviewsToDisplay = featuredReviews.length > 0 ? featuredReviews : reviews; // Prioritize featured reviews

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

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[30vh]">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-green-400 mx-auto animate-spin" />
                <p className="text-gray-400 mt-4">LOADING REVIEWS...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12 sm:py-16">
              <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-2">Error Loading Reviews</h3>
              <p className="text-gray-500 text-sm sm:text-base">{error}</p>
            </div>
          ) : reviewsToDisplay.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-2">No Reviews Found</h3>
              <p className="text-gray-500 text-sm sm:text-base">Check back soon for testimonials!</p>
            </div>
          ) : (
            <div className="relative">
              <div className="flex justify-center items-center">
                {reviewsToDisplay.map((review, index) => (
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
                {reviewsToDisplay.map((_, index) => (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;