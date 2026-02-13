import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const About = () => {
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // ✅ Initialize EmailJS once
  useEffect(() => {
    emailjs.init("wCNyXQw-8vmyqhi6y"); // Your Public Key
  }, []);

 const sendEmail = async (e) => {
  e.preventDefault();

  try {
    const result = await emailjs.sendForm(
      "service_ltshinm",
      "template_izzdkhs",
      form.current,
      "wCNyXQw-8vmyqhi6y"
    );

    console.log("SUCCESS:", result);
    alert("Message Sent Successfully!");
    e.target.reset();
  } catch (error) {
    console.log("FULL ERROR:", error);
    alert("Failed to send message. Check console.");
  }
};

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
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#3D5A80] mb-4">
            🎯 Our Mission
          </h2>
          <p className="text-[#2B2D42] leading-7">
            To make quality education accessible and affordable for everyone
            through digital innovation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#3D5A80] mb-4">
            🚀 Our Vision
          </h2>
          <p className="text-[#2B2D42] leading-7">
            To become a global leader in online education technology.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-6 md:px-20 bg-[#F4F1EC]">
        <h2 className="text-3xl font-bold text-center text-[#3D5A80] mb-8">
          Contact Us
        </h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D5A80]"
          />

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D5A80]"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D5A80]"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3D5A80] text-white py-3 rounded-lg hover:bg-[#2A9D8F] transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Status Messages */}
          {status === "success" && (
            <p className="text-green-600 mt-4 text-center">
              ✅ Message sent successfully!
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 mt-4 text-center">
              ❌ Failed to send message. Check console.
            </p>
          )}
        </form>
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
