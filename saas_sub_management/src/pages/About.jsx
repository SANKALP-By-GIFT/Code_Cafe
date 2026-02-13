import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F1EC]">

      {/* Hero Section */}
      <div className="text-center py-16 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A80] mb-6">
          About EduPlatform
        </h1>
        <p className="text-lg md:text-xl text-[#2B2D42] max-w-3xl mx-auto leading-8">
          EduPlatform is a modern SaaS-based learning platform designed to help
          students and professionals upgrade their skills through structured
          courses, smart billing systems, and seamless user experience.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 px-6 md:px-20 pb-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-[#3D5A80] mb-4">
            🎯 Our Mission
          </h2>
          <p className="text-[#2B2D42] leading-7">
            To make quality education accessible and affordable for everyone
            through digital innovation. We focus on real-world practical
            knowledge and structured learning paths.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-[#3D5A80] mb-4">
            🚀 Our Vision
          </h2>
          <p className="text-[#2B2D42] leading-7">
            To become a global leader in online education technology,
            empowering millions of learners to achieve career success.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-[#3D5A80] mb-12">
          Why Choose EduPlatform?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-[#F4F1EC]">
            <h3 className="text-xl font-semibold mb-3 text-[#3D5A80]">
              📚 Structured Courses
            </h3>
            <p className="text-[#2B2D42]">
              Well-organized courses designed by experts with real-world
              examples and practical learning.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-[#F4F1EC]">
            <h3 className="text-xl font-semibold mb-3 text-[#3D5A80]">
              💳 Smart Subscription System
            </h3>
            <p className="text-[#2B2D42]">
              Easy billing management with transparent pricing and flexible
              plans.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-[#F4F1EC]">
            <h3 className="text-xl font-semibold mb-3 text-[#3D5A80]">
              ⚡ Fast & Secure Platform
            </h3>
            <p className="text-[#2B2D42]">
              Built with modern technologies ensuring speed, performance,
              and security.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-[#3D5A80] mb-12">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-4xl font-bold text-[#2A9D8F]">10K+</h3>
            <p className="text-[#2B2D42] mt-2">Active Learners</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#2A9D8F]">150+</h3>
            <p className="text-[#2B2D42] mt-2">Courses</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#2A9D8F]">95%</h3>
            <p className="text-[#2B2D42] mt-2">Satisfaction Rate</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#2A9D8F]">24/7</h3>
            <p className="text-[#2B2D42] mt-2">Support</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#3D5A80] py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Learning?
        </h2>
        <button
          onClick={() => navigate("/plans")}
          className="px-8 py-3 rounded-xl font-semibold bg-[#2A9D8F] hover:scale-105 transition"
        >
          Explore Courses
        </button>
      </div>

    </div>
  );
};

export default About;