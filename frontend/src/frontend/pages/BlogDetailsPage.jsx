import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { 
  Loader2, 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Layers, 
  Clock, 
  ExternalLink,
  Terminal,
  FileText,
  Eye,
  Share2,
  Bookmark
} from 'lucide-react';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { BackendUrl } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="bg-gray-900 border-2 border-green-400 p-8">
            <Loader2 className="w-12 h-12 animate-spin text-green-400 mx-auto mb-4" />
            <div className="font-mono text-green-400">
              <div className="text-sm mb-2">// Loading blog post</div>
              <div className="text-xs text-gray-400">Fetching data from server...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="bg-gray-900 border-2 border-red-400 p-8 max-w-md w-full text-center">
          <div className="text-red-400 font-mono mb-4">
            <div className="text-lg mb-2">// Error occurred</div>
            <div className="text-sm">{error}</div>
          </div>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 bg-gray-800 border border-green-400/30 
                     hover:border-green-400 text-green-400 px-4 py-2 font-mono text-sm 
                     transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>return to blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="bg-gray-900 border-2 border-green-400/50 p-8 max-w-md w-full text-center">
          <div className="text-gray-400 font-mono mb-4">
            <div className="text-lg mb-2">// 404: Blog not found</div>
            <div className="text-sm">The requested post does not exist.</div>
          </div>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 bg-gray-800 border border-green-400/30 
                     hover:border-green-400 text-green-400 px-4 py-2 font-mono text-sm 
                     transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>return to blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Header Navigation */}
        <div className="border-b-2 border-green-400 bg-gray-900">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/blogs" 
                className="group flex items-center gap-3 text-green-400 hover:text-green-300 
                         font-mono transition-all duration-300"
              >
                <div className="bg-gray-800 border border-green-400/30 group-hover:border-green-400 
                              p-2 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="text-sm uppercase tracking-wider">Back to Blog</span>
              </Link>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="bg-gray-800 border border-green-400/30 hover:border-green-400 
                                 text-green-400 p-2 transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="bg-gray-800 border border-green-400/30 hover:border-green-400 
                                 text-green-400 p-2 transition-all duration-300">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Terminal Header */}
          <div className="mb-12">
            <div className="bg-gray-900 border-2 border-green-400 max-w-4xl mx-auto">
              <div className="bg-gray-800 border-b border-green-400 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500"></div>
                  <div className="w-3 h-3 bg-yellow-500"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                </div>
                <span className="text-green-400 font-mono text-sm">blog-post-{id}.md</span>
              </div>

              <div className="p-6 font-mono">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-5 h-5 text-green-400" />
                  <span className="text-white">reader@blog:~$</span>
                  <span className="text-green-400">cat blog-details.json</span>
                  <span className="animate-pulse text-green-400">|</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="text-gray-300">{`{`}</div>
                  <div className="ml-4">
                    <span className="text-green-400">"status"</span>
                    <span className="text-white">: </span>
                    <span className="text-orange-400">"published"</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-green-400">"author"</span>
                    <span className="text-white">: </span>
                    <span className="text-orange-400">"{blog.author}"</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-green-400">"readTime"</span>
                    <span className="text-white">: </span>
                    <span className="text-cyan-400">{blog.readTime || 5}</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-green-400">"category"</span>
                    <span className="text-white">: </span>
                    <span className="text-orange-400">"{blog.category || 'Development'}"</span>
                  </div>
                  <div className="text-gray-300">{`}`}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-4xl mx-auto">
            {/* Title Section */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-6xl font-black text-white font-mono mb-6 leading-tight">
                {blog.title}
                <span className="text-green-400">.</span>
              </h1>
              
              <p className="text-xl text-gray-400 font-mono leading-relaxed mb-8 max-w-3xl">
                {blog.description}
              </p>

              {/* Meta Information */}
              <div className="bg-gray-900 border-2 border-green-400/30 p-6">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-gray-400 font-mono">PUBLISHED</span>
                    <span className="text-sm text-white font-mono">
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <User className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-gray-400 font-mono">AUTHOR</span>
                    <span className="text-sm text-white font-mono">{blog.author}</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-gray-400 font-mono">READ TIME</span>
                    <span className="text-sm text-white font-mono">{blog.readTime || 5} min</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Layers className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-gray-400 font-mono">CATEGORY</span>
                    <span className="text-sm text-white font-mono">{blog.category || 'DEV'}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {blog.imageUrl && (
              <div className="mb-12 relative group">
                <div className="border-2 border-green-400/30 group-hover:border-green-400 
                              transition-all duration-300 overflow-hidden">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-auto object-cover transition-transform duration-700 
                             group-hover:scale-105" 
                  />
                </div>
                <div className="absolute top-4 right-4 bg-black/80 border border-green-400 
                              px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-green-400 font-mono text-xs">Featured Image</span>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="bg-gray-900 border-2 border-green-400/30 mb-12">
              {/* Content Header */}
              <div className="bg-gray-800 border-b border-green-400/30 px-6 py-3 flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-mono text-sm">Article Content</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 font-mono text-xs">READING</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8">
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-mono">
                  <div className="text-base leading-8 whitespace-pre-line">
                    {blog.longDescription}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="mb-12">
                <div className="bg-gray-900 border-2 border-green-400/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Tag className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-mono text-sm uppercase tracking-wider">
                      Tagged Topics
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {blog.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-green-400/10 border border-green-400/30 text-green-400 
                                 px-4 py-2 font-mono text-sm hover:bg-green-400/20 
                                 hover:border-green-400/60 transition-all duration-300 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="bg-gray-900 border-2 border-green-400 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Eye className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-mono text-sm">
                    Thanks for reading this post!
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="bg-gray-800 border border-green-400/30 hover:border-green-400 
                                   hover:bg-green-400/10 text-green-400 px-6 py-2 font-mono text-sm 
                                   transition-all duration-300 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>Share Post</span>
                  </button>
                  
                  <Link 
                    to="/blogs"
                    className="bg-green-400/10 border border-green-400 hover:bg-green-400 
                             hover:text-black text-green-400 px-6 py-2 font-mono text-sm 
                             transition-all duration-300 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>More Posts</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;