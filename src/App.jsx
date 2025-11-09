import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, Clock, Shield, Award, Code, BarChart, DollarSign, Box, Smartphone, Globe, Calculator, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About Us', id: 'about' },
    { name: 'Terms & Conditions', id: 'terms' },
    { name: 'Privacy & Security', id: 'privacy' },
    { name: 'Refund Policy', id: 'refund' },
    { name: 'Deadline Policy', id: 'deadline' },
    { name: 'Contact us', id: 'contact' }
  ];

  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "IT & Programming Assignments",
      description: "Expert support for Java, Python, C, C++, C# with debugging, API integration, and algorithm development.",
      features: ["Logic Building", "Code Debugging", "OOP & Data Structures", "Mini & Final Year Projects"]
    },
    {
      icon: <BarChart className="w-12 h-12" />,
      title: "Data Analysis & Statistical Tools",
      description: "Comprehensive statistical testing, visualization using R, SPSS, Jamovi, Orange, and KNIME.",
      features: ["Hypothesis Testing", "ANOVA & Regression", "Data Cleaning", "Dashboard Creation"]
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Finance & Accounting",
      description: "Professional help with financial statements, cost analysis, and investment portfolio reports.",
      features: ["Financial Statements", "Risk Analysis", "Budgeting", "Excel & QuickBooks"]
    },
    {
      icon: <Box className="w-12 h-12" />,
      title: "CAD & 3D Modelling",
      description: "Industry-grade design support using AutoCAD, Revit, Ansys, and CATIA for engineering projects.",
      features: ["2D/3D Drawing", "Simulation", "Structural Analysis", "Mechanical Design"]
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "App Development",
      description: "Build Android apps with Firebase, SQLite integration, and modern UI/UX design.",
      features: ["Android Studio", "Database Integration", "UI/UX Design", "Firebase Setup"]
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Web Development",
      description: "Full-stack development with MERN, MEAN, Django, and Spring Boot frameworks.",
      features: ["Frontend Design", "REST API", "Full-Stack Projects", "Portfolio Building"]
    },
    {
      icon: <Calculator className="w-12 h-12" />,
      title: "MATLAB Projects",
      description: "Advanced simulations for signal processing, control systems, and numerical computation.",
      features: ["Signal Processing", "Control Systems", "Optimization", "Machine Learning"]
    }
  ];

  const HomePage = () => (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slideUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-yellow-300">AssignNexus</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Your trusted partner for academic excellence. Expert solutions delivered with precision and care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setCurrentPage('services')}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 hover:text-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Services
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose AssignNexus?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Clock />, title: "24/7 Support", desc: "Always available when you need us" },
              { icon: <Shield />, title: "100% Confidential", desc: "Your data is completely secure" },
              { icon: <CheckCircle />, title: "Quality Guaranteed", desc: "Expert-reviewed submissions" },
              { icon: <Award />, title: "Timely Delivery", desc: "Meet your deadlines, always" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center animate-fadeIn" style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="text-indigo-600 mb-4 flex justify-center">{React.cloneElement(item.icon, { className: "w-16 h-16" })}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Excel in Your Academics?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students who trust AssignNexus for their academic success</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-yellow-400 text-indigo-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );

  const ServicesPage = () => (
    <div className="py-20 bg-gray-50 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Subject matter experts in every domain, ready to help you succeed</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 transform hover:-translate-y-2 animate-slideUp" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="text-indigo-600 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <ChevronRight className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Timely Delivery with 24x7 Support</h2>
          <p className="text-xl mb-6">Confidentiality Guaranteed • Expert Quality • On-Time Delivery</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105"
          >
            Contact Us Now
          </button>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="py-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">About AssignNexus</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              AssignNexus is a leading academic support platform dedicated to helping students achieve excellence in their studies. We connect students with expert professionals across various domains including programming, data analysis, finance, engineering, and more.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to provide high-quality, timely, and confidential academic assistance that empowers students to understand complex concepts and succeed in their academic journey.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-indigo-600">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Quality First", desc: "Every assignment is handled by subject matter experts" },
                { title: "Confidentiality", desc: "Your privacy and data security are our top priorities" },
                { title: "Integrity", desc: "We promote academic learning and understanding" },
                { title: "Reliability", desc: "Consistent delivery within promised timeframes" }
              ].map((value, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">Our Expertise</h2>
            <p className="text-lg text-gray-700 mb-4">
              With a team of qualified professionals spanning multiple disciplines, we offer comprehensive support across:
            </p>
            <ul className="grid md:grid-cols-2 gap-3">
              {["Programming Languages", "Data Science & Analytics", "Finance & Accounting", "Engineering & CAD", "Mobile App Development", "Web Development", "MATLAB Simulations", "Academic Research"].map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const TermsPage = () => (
    <div className="py-20 bg-gray-50 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Terms & Conditions</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Work Duration & Delivery Timelines</h2>
            <p className="text-gray-700 mb-4">
              We strive to deliver all academic assignments within the promised timeframe, typically between 12 hours to 2 days, based on task complexity. Delays caused by incomplete instructions, late payments, or unclear requirements are not the responsibility of AssignNexus.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Client Responsibilities</h2>
            <p className="text-gray-700 mb-3">By submitting your assignment, you agree to provide:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Complete and clear task instructions</li>
              <li>Required files or references</li>
              <li>Accurate deadlines and academic level</li>
              <li>Active communication for clarifications if needed</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              Work begins only after the scope is confirmed and payment is made.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Revision & Refund Policy</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Free revisions are offered within 48 hours of delivery, if within the original scope.</li>
              <li>Any changes outside the initial request, or revision requests after 48 hours, may incur additional charges.</li>
              <li>Refunds are not provided once the work is delivered unless there's a proven failure to meet the agreed requirements.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Plagiarism & AI-Free Guarantee</h2>
            <p className="text-gray-700 mb-4">
              All submissions are custom-written, plagiarism-free, and created by human experts. AssignNexus is not liable for any misuse, plagiarism allegations, or academic policy violations arising from the client's use of delivered materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Use of Work</h2>
            <p className="text-gray-700">
              Our services are intended solely for educational purposes. Clients must not submit our work as their own. Using our material in ways that violate academic integrity policies is strictly discouraged and beyond our responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Confidentiality & Data Security</h2>
            <p className="text-gray-700">
              We ensure complete confidentiality of all client data, assignments, communications, and personal information. No files or content are ever shared with third parties.
            </p>
          </section>
        </div>
      </div>
    </div>
  );

  const PrivacyPage = () => (
    <div className="py-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Privacy & Security</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Your Privacy Matters</h2>
            <p className="text-gray-700 mb-4">
              At AssignNexus, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Contact information (name, email, phone number)</li>
              <li>Assignment details and academic requirements</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Communication records for quality assurance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">How We Use Your Information</h2>
            <p className="text-gray-700 mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Process and complete your assignment requests</li>
              <li>Communicate updates and delivery status</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Encrypted data transmission (SSL/TLS)</li>
              <li>Secure storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Employee confidentiality agreements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Third-Party Sharing</h2>
            <p className="text-gray-700">
              We never sell, rent, or share your personal information with third parties for marketing purposes. Information is only shared with trusted service providers necessary for order fulfillment (e.g., payment processors) under strict confidentiality agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Your Rights</h2>
            <p className="text-gray-700 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Contact Us</h2>
            <p className="text-gray-700">
              For privacy-related questions or requests, please contact us through our Contact page or email us directly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );

  const RefundPage = () => (
    <div className="py-20 bg-gray-50 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Refund Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">General Guidelines</h2>
            <p className="text-gray-700 mb-4">
              Refunds are assessed on a case-by-case basis under specific conditions. Please review the policy carefully:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Refunds apply only to orders made directly through our official website.</li>
              <li>All requests are reviewed by our Quality Assurance team before approval.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Non-Refundable Conditions</h2>
            <p className="text-gray-700 mb-3">Refunds are not issued in the following scenarios:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>If the project is delivered as per the confirmed brief.</li>
              <li>If the delay is due to missing inputs or late responses from the client.</li>
              <li>If the client changes the scope after work has begun.</li>
              <li>If plagiarism or AI content issues (under 20%) are reported post-delivery unless pre-discussed.</li>
              <li>If the client changes their mind or places an order by mistake and fails to cancel it within 2 hours.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Order Cancellation</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You may cancel an order within 2 hours, provided the work has not started.</li>
              <li>Cancellations requested after this period may be declined if the order is already under process.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Refund Timeline</h2>
            <p className="text-gray-700">
              If your request is approved, refunds will be processed within 7–10 business days, credited to the original payment method used during the transaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Submitting a Refund Request</h2>
            <p className="text-gray-700 mb-3">
              To request a refund or cancellation, submit the form via our website with the subject:
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-indigo-800">📩 Subject: Refund Request – [Your Order ID]</p>
            </div>
            <p className="text-gray-700 mb-3">Include:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Your Order ID</li>
              <li>Date of Transaction</li>
              <li>Reason for Request</li>
              <li>Supporting documents or screenshots, if any</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Important Notes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All refund decisions are made by the AssignNexus Quality & Finance Team.</li>
              <li>Our support assistant can help you initiate the process, but the final decision rests with our human team.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Policy Updates</h2>
            <p className="text-gray-700">
              We may revise this policy periodically. Updates will be posted on this page with the latest revision date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );

  const DeadlinePage = () => (
    <div className="py-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Deadline Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Delivery Timing</h2>
            <p className="text-gray-700 mb-4">
              We do accept urgent or 24-hour delivery requests under special circumstances, based on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Team availability</li>
              <li>Task complexity</li>
              <li>Additional express fee (if applicable)</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              Urgent orders must be confirmed before payment, through WhatsApp or email communication.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Minimum Processing Time</h2>
            <p className="text-gray-700 mb-4">
              If the deadline or task requirements change after the order is placed, this may result in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Extended delivery time</li>
              <li>Extra charges (if additional work is added)</li>
              <li>Cancellation of the order if the task becomes unmanageable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Changes After Order Confirmation</h2>
            <p className="text-gray-700">
              If any delay is caused by the client (e.g., missing files, late payments, or unclear instructions), the deadline will be automatically adjusted based on when complete information is received.
            </p>
          </section>

          <section className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              At AssignNexus, we understand the importance of deadlines in academic work. We make every effort to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>Deliver work within the agreed timeframe</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>Communicate proactively about any potential delays</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>Provide realistic timelines based on task complexity</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>Work with you to adjust deadlines when circumstances change</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Questions?</h2>
            <p className="text-gray-700">
              If you have specific deadline requirements or concerns, please contact us before placing your order. Our team will work with you to ensure your needs are met.
            </p>
          </section>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Contact Us</h1>
            <p className="text-xl text-gray-600">Have a question? We're here to help 24/7</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea 
                    rows="4" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <Mail className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
                      <p className="text-gray-600">support@assignnexus.com</p>
                      <p className="text-gray-600">info@assignnexus.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <Phone className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Available 24/7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <MapPin className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                      <p className="text-gray-600">Global Support</p>
                      <p className="text-sm text-gray-500">Serving students worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Quick Response Guarantee</h3>
                <p className="mb-4">We typically respond within 1-2 hours during business hours and within 4 hours outside business hours.</p>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'services': return <ServicesPage />;
      case 'about': return <AboutPage />;
      case 'terms': return <TermsPage />;
      case 'privacy': return <PrivacyPage />;
      case 'refund': return <RefundPage />;
      case 'deadline': return <DeadlinePage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div 
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              AssignNexus
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 animate-fadeIn">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                AssignNexus
              </h3>
              <p className="text-gray-400">
                Your trusted partner for academic excellence and professional assignment support.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'About Us', 'Contact us'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => setCurrentPage(item.toLowerCase().replace(' ', ''))}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Policies</h4>
              <ul className="space-y-2">
                {['Terms & Conditions', 'Privacy & Security', 'Refund Policy', 'Deadline Policy'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => setCurrentPage(item.toLowerCase().replace(/\s+&\s+/g, '').replace(/\s+/g, ''))}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <p className="text-gray-400 mb-2">Email: support@assignnexus.com</p>
              <p className="text-gray-400 mb-4">Phone: +1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Available 24/7 for your support</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AssignNexus. All rights reserved. | Designed for academic excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;