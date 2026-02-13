import React from "react";

export default function Card({ item }) {
  // Get first price from options
  let displayPrice = 0;

  if (item.options && item.options.length > 0) {
    const firstOption = item.options[0];
    const firstPrice = Object.values(firstOption)[0];
    displayPrice = firstPrice || 0;
  }

  return (
    <div className="card menu-card shadow-sm h-100 position-relative">
      {/* Price Circle */}
      <div className="price-badge">
        ₹{displayPrice}
      </div>

      <img
        src={item.img}
        className="card-img-top"
        alt={item.name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text text-muted">{item.description}</p>

        <button className="btn btn-primary mt-auto">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
