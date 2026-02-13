import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "./Menu.css";

export default function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      setFoodItems(data[0] || []);
      setCategories(data[1] || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="menu-hero">
        <h1>Our Menu</h1>
        <input
          type="text"
          placeholder="Search for dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="menu-content container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          categories.map((category) => {
            const filteredItems = foodItems.filter(
              (item) =>
                item.CategoryName === category.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              filteredItems.length > 0 && (
                <div key={category._id} className="menu-category">
                  <h2>{category.CategoryName}</h2>

                  <div className="food-grid">
                    {filteredItems.map((item) => (
                      <Card
                        key={item._id}
                        item={item}
                        options={item.options?.[0] || {}}
                      />
                    ))}
                  </div>
                </div>
              )
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
}
