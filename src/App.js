import React, { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/plants") // backend API
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app" style={{ padding: "20px" }}>
      <h1>🌱 Plant Store</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {plants.map((plant) => (
          <div
            key={plant.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              width: "200px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            {/* Image */}
            <img
              src={plant.image}
              alt={plant.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
            {/* Name */}
            <h3>{plant.name}</h3>
            {/* Price */}
            <p>💰 ₹{plant.price}</p>
            {/* Category */}
            <p>🌿 {plant.category}</p>
            {/* Stock */}
            <p>Stock: {plant.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
