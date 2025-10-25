  import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { 
  Loader2, 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Clock,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

// Utility function to generate share URLs
const getShareUrls = (url, title) => ({
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
});

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { BackendUrl } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); // Bookmark state
  const [toastMessage, setToastMessage] = useState(''); // Toast for feedback

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BackendUrl}/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to load blog post. Please try again.');
        console.error('Error fetching blog details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, BackendUrl]);

  // Get the current URL for sharing
  const currentUrl = window.location.href;

  // Handle sharing via Web Share API or fallback to copy link
  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: blog.description,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy link to clipboard
      handleCopyLink();
    }
  };

  // Handle copying the link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(''), 3000); // Clear toast after 3 seconds
    }).catch(err => {
      console.error('Failed to copy link:', err);
      setToastMessage('Failed to copy link.');
      setTimeout(() => setToastMessage(''), 3000);
    });
  };

  // Handle bookmark toggle (client-side only for demo)
  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
    setToastMessage(isBookmarked ? 'Bookmark removed!' : 'Bookmarked!');
    setTimeout(() => setToastMessage(''), 3000);
    // Note: For persistent bookmarks, you'd need to integrate with a backend API
  };

  // Handle Instagram share (fallback message)
  const handleInstagramShare = () => {
    setToastMessage('Instagram sharing is not supported on web. Please share manually!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Early returns for loading, error, and not found states remain unchanged
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-md p-8 max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <p className="text-xl font-semibold mb-2">Error</p>
            <p className="text-base">{error}</p>
          </div>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 
                     text-white px-6 py-3 font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-md p-8 max-w-md w-full text-center">
          <div className="text-gray-700 mb-4">
            <p className="text-xl font-semibold mb-2">404: Blog not found</p>
            <p className="text-base">The requested post does not exist.</p>
          </div>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 
                     text-white px-6 py-3 font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  // Generate share URLs
  const shareUrls = getShareUrls(currentUrl, blog.title);

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
        <meta name="keywords" content={blog.tags?.join(', ')} />
        <meta name="author" content={blog.author} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {/* Header Navigation */}
      <div className="shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/blogs" 
              className="flex items-center gap-2 text-white hover:text-green-600 
                       font-medium transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
            </Link>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="p-2 border border-green-300 hover:border-white
                         hover:text-white transition-all duration-300"
                title="Share this article"
              >
                <Share2 className="text-white w-5 h-5" />
              </button>
              <button 
                onClick={handleBookmark}
                className={`p-2 border ${isBookmarked ? 'bg-green-600 border-green-600' : 'border-green-300'} 
                         hover:border-white hover:text-white transition-all duration-300`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-white' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 py-12">
          {/* Article Header */}
        <header className="mb-12">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block bg-green-600 text-white px-4 py-1.5 
                           text-sm font-semibold uppercase tracking-wide">
              {blog.category || 'Article'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-200 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {blog.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 border-t border-b 
                        border-gray-200 py-5">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              <span className="font-medium">{blog.author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span>{blog.readTime || 5} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.imageUrl && (
          <div className="mb-12 overflow-hidden shadow-lg">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-auto object-cover" 
            />
          </div>
        )}

        {/* AdSense Ad Unit (Above Content) */}
        <div className="my-8">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
          ></ins>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-200 leading-relaxed space-y-6">
            {(() => {
              let sentenceCounter = 0; // Track sentences across all paragraphs
              return blog.longDescription.split('\n\n').map((paragraph, index) => {
                // HEADING LOGIC
                const isHeading = paragraph.trim().startsWith('#') || 
                                 (paragraph.split(' ').length < 20 && paragraph === paragraph.toUpperCase());
                
                if (isHeading) {
                  const headingText = paragraph.replace(/^#+\s*/, '').trim();
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-200 mt-10 mb-4">
                      {headingText}
                    </h2>
                  );
                }
                
                // PARAGRAPH / SENTENCE LOGIC
                const sentences = paragraph.split('. ').filter(sentence => sentence.trim() !== '');
                
                return (
                  <p key={index} className="text-lg leading-relaxed text-gray-200">
                    {sentences.map((sentence, sentenceIndex, array) => {
                      if (sentence.trim() === '') return null;
                      
                      sentenceCounter++; // Increment global sentence counter
                      const isBreakSentence = sentenceCounter % 5 === 0;
                      const isLastSentenceInArray = sentenceIndex === array.length - 1;
                      
                      // Ensure sentence has a period unless it’s malformed
                      const formattedSentence = sentence.endsWith('.') ? sentence : `${sentence}.`;
                      
                      return (
                        <React.Fragment key={sentenceCounter}>
                          <span>{formattedSentence}{isLastSentenceInArray ? '' : ' '}</span>
                          {isBreakSentence && !isLastSentenceInArray && (
                            <span className="block mb-4"></span>
                          )}
                          {/* AdSense Ad Unit (After 5th Sentence) */}
                          {sentenceCounter === 5 && (
                            <div className="my-6">
                              <ins
                                className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                                data-ad-slot="XXXXXXXXXX"
                                data-ad-format="auto"
                              ></ins>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </p>
                );
              });
            })()}
          </div>
        </div>

        {/* Tags Section */}
        {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="mb-12 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-200">Tags</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-green-500 hover:bg-green-100 text-white hover:text-green-700 
                           px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Share Section */}
        <div className="p-8 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-200 mb-2">Share This Article</h3>
            <p className="text-gray-300">Spread the knowledge with your network</p>
          </div>
          
          <div className="flex justify-center gap-4">
            <a 
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 
                       text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </a>
            
            <a 
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer bg-black hover:bg-slate-900 
                       text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              <Twitter className="w-5 h-5" />
              <span>X</span>
            </a>
            
            <a 
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer bg-blue-800 hover:bg-blue-900 
                       text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            
            <button 
              onClick={handleInstagramShare}
              className="flex items-center gap-2 cursor-pointer bg-pink-600 hover:bg-pink-900 
                       text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </button>
          </div>
        </div>

        {/* AdSense Ad Unit (Footer) */}
        <div className="my-8">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
          ></ins>
        </div>

        {/* Back to Blog Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/blogs"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-800 
                     text-white px-8 py-4 font-semibold text-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Explore More Articles</span>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailsPage;
  
  
  
  
  
  
