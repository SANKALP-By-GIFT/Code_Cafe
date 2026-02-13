import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await axios.post("http://localhost:5000/contacts", formData);

      setStatus("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F4F1EC]">
      
      <div className="w-full max-w-xl bg-white p-8 md:p-10 rounded-2xl shadow-xl">
        
        <h1 className="text-3xl font-bold text-center mb-8 text-[#3D5A80]">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #3D5A80, #2A9D8F)",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className="text-center mt-4 text-sm font-medium">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
