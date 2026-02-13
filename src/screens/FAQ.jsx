import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./FAQ.css";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Our average delivery time is 30–45 minutes depending on your location and order size.",
    },
    {
      question: "Is there a minimum order value?",
      answer:
        "No minimum order is required. However, free delivery is available on orders above ₹299.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order before it reaches the 'Out for Delivery' stage.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "If there’s any issue with your order, please contact support and we’ll resolve it quickly.",
    },
    {
      question: "Are your meals freshly prepared?",
      answer:
        "Absolutely! Every dish is freshly prepared using high-quality ingredients.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="faq-wrapper">

        {/* HERO */}
        <section className="faq-hero text-center">
          <div className="container">
            <h1>❓ Frequently Asked Questions</h1>
            <p>
              Find answers to common questions about ComfortEats.
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="container py-5">
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h5>{faq.question}</h5>
                  <span>{activeIndex === index ? "−" : "+"}</span>
                </div>

                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="faq-cta text-center">
          <h4>Still have questions?</h4>
          <p>Our support team is happy to help you.</p>
          <Link to="/contact" className="faq-btn">
            Contact Us →
          </Link>
        </section>

      </div>

      <Footer />
    </>
  );
}
