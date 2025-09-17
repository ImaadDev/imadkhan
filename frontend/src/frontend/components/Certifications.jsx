import React from 'react';
import { Award } from 'lucide-react';

const Certifications = ({ isVisible, certificationsRef }) => {
  return (
    <section 
      id="certifications" 
      ref={certificationsRef}
      className="min-h-screen relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`transform transition-all duration-1000 ${
          isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-green-400/60 text-sm tracking-widest mb-2">
              // MY_CREDENTIALS.INFO
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CERTIFICATIONS
            </h2>
            <div className="w-24 h-1 bg-green-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Certification Card 1 */}
            <div className="bg-gray-900 border-2 border-green-400/20 p-8 transform transition-all duration-300 hover:scale-105 hover:border-green-400">
              <Award className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AWS Certified Developer</h3>
              <p className="text-gray-400 text-sm">Issued by Amazon Web Services</p>
              <p className="text-gray-300 mt-4">Demonstrates proficiency in developing, deploying, and debugging cloud-based applications using AWS.</p>
            </div>

            {/* Certification Card 2 */}
            <div className="bg-gray-900 border-2 border-green-400/20 p-8 transform transition-all duration-300 hover:scale-105 hover:border-green-400">
              <Award className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Google UX Design Professional Certificate</h3>
              <p className="text-gray-400 text-sm">Issued by Google</p>
              <p className="text-gray-300 mt-4">Comprehensive training in UX design principles, tools, and processes, from ideation to testing.</p>
            </div>

            {/* Certification Card 3 */}
            <div className="bg-gray-900 border-2 border-green-400/20 p-8 transform transition-all duration-300 hover:scale-105 hover:border-green-400">
              <Award className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Certified Kubernetes Administrator (CKA)</h3>
              <p className="text-gray-400 text-sm">Issued by Cloud Native Computing Foundation</p>
              <p className="text-gray-300 mt-4">Validates the ability to install, configure, and manage Kubernetes clusters.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
