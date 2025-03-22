import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Types for our case study data
interface CaseStudy {
  id: number;
  company: string;
  logo: string;
  foundersName: string;
  investorsName: string;
  fundingRaised: string;
  description: string;
  outcome: string;
  testimonial: string;
}

const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();
  // Sample case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      company: "GreenTech Solutions",
      logo: "/api/placeholder/100/100",
      foundersName: "Alex Johnson & Maria Rodriguez",
      investorsName: "EcoVenture Capital",
      fundingRaised: "$2.5M",
      description:
        "GreenTech Solutions was developing innovative solar panel technology but struggled to find investors who understood their vision. XYZ connected them with EcoVenture Capital, a firm specializing in sustainable technology investments.",
      outcome:
        "With the secured funding, GreenTech Solutions expanded their R&D team and brought their product to market 6 months ahead of schedule. They are now serving customers across 12 countries.",
      testimonial:
        "XYZ transformed our fundraising journey. Instead of months of cold outreach, we found the perfect investor within weeks. They truly understood our needs as founders.",
    },
    {
      id: 2,
      company: "HealthAI",
      logo: "/api/placeholder/100/100",
      foundersName: "Dr. James Chen",
      investorsName: "MedTech Ventures & Angel Investor Group",
      fundingRaised: "$4.2M",
      description:
        "HealthAI had developed an AI-driven diagnostic tool but needed specialized investors who understood both healthcare regulations and AI technology. XYZ matched them with MedTech Ventures and a group of angel investors with healthcare backgrounds.",
      outcome:
        "The strategic investment allowed HealthAI to complete clinical trials and secure FDA approval. They've since partnered with 15 major hospitals across the country.",
      testimonial:
        "Finding investors who understand the complexities of healthcare AI was our biggest challenge. XYZ didn't just find us investors; they found us partners who brought invaluable industry expertise.",
    },
    {
      id: 3,
      company: "FinConnect",
      logo: "/api/placeholder/100/100",
      foundersName: "Sarah Williams & Omar Patel",
      investorsName: "Blockchain Capital Partners",
      fundingRaised: "$3.8M",
      description:
        "FinConnect was developing a blockchain-based financial platform for underserved communities. They needed investors who shared their vision for financial inclusion. XYZ connected them with Blockchain Capital Partners who aligned perfectly with their mission.",
      outcome:
        "With the new funding, FinConnect expanded to 5 new markets and developed mobile applications that have helped over 50,000 previously unbanked individuals access financial services.",
      testimonial:
        "XYZ took the time to deeply understand our mission beyond the financials. The investor relationship they facilitated has been transformative for our growth and impact.",
    },
  ];

  const [activeCase, setActiveCase] = useState<number>(1);

  return (
    <div className="bg-yellow-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Success Stories: Founders Meet Investors
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mb-8">
            Discover how XYZ has been transforming startup funding by creating
            meaningful connections between visionary founders and strategic
            investors.
          </p>
          <button className="bg-white text-yellow-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
            Start Your Success Story
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-yellow-500 mb-2">$120M+</p>
              <p className="text-gray-600 text-lg">Total Funding Facilitated</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-yellow-500 mb-2">250+</p>
              <p className="text-gray-600 text-lg">
                Successful Founder-Investor Matches
              </p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-yellow-500 mb-2">92%</p>
              <p className="text-gray-600 text-lg">Founder Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-16">
          Case Studies
        </h2>

        {/* Case Study Navigation - more responsive */}
        <div className="flex flex-wrap justify-center mb-8 md:mb-12 gap-3 md:gap-4">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveCase(study.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition duration-300 ${
                activeCase === study.id
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {study.company}
            </button>
          ))}
        </div>

        {/* Active Case Study - improved responsive layout */}
        {caseStudies.map(
          (study) =>
            study.id === activeCase && (
              <div
                key={study.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Company Info Section */}
                  <div className="lg:col-span-2 p-6 md:p-8 bg-yellow-50">
                    <img
                      src={study.logo}
                      alt={`${study.company} logo`}
                      className="w-16 h-16 md:w-24 md:h-24 mb-6 rounded-lg"
                    />
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                      {study.company}
                    </h3>
                    <div className="mb-4 md:mb-6">
                      <p className="text-gray-600 mb-1 text-sm md:text-base">
                        Founders:
                      </p>
                      <p className="font-semibold">{study.foundersName}</p>
                    </div>
                    <div className="mb-4 md:mb-6">
                      <p className="text-gray-600 mb-1 text-sm md:text-base">
                        Investors:
                      </p>
                      <p className="font-semibold">{study.investorsName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1 text-sm md:text-base">
                        Funding Raised:
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-yellow-500">
                        {study.fundingRaised}
                      </p>
                    </div>
                  </div>

                  {/* Case Detail Section */}
                  <div className="lg:col-span-3 p-6 md:p-8">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                      The Challenge & Connection
                    </h4>
                    <p className="text-gray-700 mb-6 text-sm md:text-base">
                      {study.description}
                    </p>

                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                      The Outcome
                    </h4>
                    <p className="text-gray-700 mb-6 md:mb-8 text-sm md:text-base">
                      {study.outcome}
                    </p>

                    <div className="bg-yellow-50 p-4 md:p-6 rounded-lg">
                      <p className="text-gray-700 italic mb-3 md:mb-4 text-sm md:text-base">
                        "{study.testimonial}"
                      </p>
                      <p className="font-semibold text-sm md:text-base">
                        — {study.foundersName}, Founder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-yellow-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-16">
            How XYZ Makes Connections
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            <div className="text-center p-4 md:p-6">
              <div className="bg-yellow-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <span className="text-xl md:text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Profile Creation
              </h3>
              <p className="text-yellow-100 text-sm md:text-base">
                Founders and investors create detailed profiles highlighting
                their expertise, interests, and goals.
              </p>
            </div>

            <div className="text-center p-4 md:p-6">
              <div className="bg-yellow-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <span className="text-xl md:text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Smart Matching
              </h3>
              <p className="text-yellow-100 text-sm md:text-base">
                Our proprietary algorithm identifies potential matches based on
                industry, stage, funding needs, and values alignment.
              </p>
            </div>

            <div className="text-center p-4 md:p-6">
              <div className="bg-yellow-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <span className="text-xl md:text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Facilitated Introduction
              </h3>
              <p className="text-yellow-100 text-sm md:text-base">
                XYZ team members personally facilitate introductions and support
                both parties throughout the funding process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Ready to Connect With Your Perfect Match?
        </h2>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10">
          Whether you're a founder seeking investment or an investor looking for
          promising opportunities, XYZ can help you find the perfect match.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              navigate("/api/auth");
            }}
            className="bg-yellow-500 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Get started
          </button>
          <button
            onClick={() => {
              navigate("/api/auth");
            }}
            className="bg-white border-2 border-yellow-500 text-yellow-600 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-md hover:bg-yellow-50 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold">XYZ</h2>
              <p className="text-gray-400 text-sm md:text-base">
                Connecting Visionaries with Capital
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a
                href="#"
                className="hover:text-yellow-400 transition duration-300 text-sm md:text-base"
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-yellow-400 transition duration-300 text-sm md:text-base"
              >
                Services
              </a>
              <a
                href="#"
                className="hover:text-yellow-400 transition duration-300 text-sm md:text-base"
              >
                Case Studies
              </a>
              <a
                href="#"
                className="hover:text-yellow-400 transition duration-300 text-sm md:text-base"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} XYZ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudiesPage;
