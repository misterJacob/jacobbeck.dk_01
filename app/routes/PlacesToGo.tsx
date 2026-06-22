import React from "react";
import { placesToGoData } from "~/data/places_to_go_data";
import ButtonGoBack from "~/components/ButtonGoBack";

export default function PlacesToGo() {
  return (
    <div style={styles.container}>
      <ButtonGoBack />
      
      <div style={styles.header}>
        <h1 style={styles.title}>Popular Places to Explore in Gran Canaria</h1>
        <p style={styles.subtitle}>Discover the island's most enchanting destinations</p>
      </div>

      <div style={styles.placesGrid}>
        {placesToGoData.map((place) => (
          <div key={place.id} style={styles.placeCard}>
            <div style={styles.placeNumber}>{place.id}</div>
            <h2 style={styles.placeTitle}>{place.title}</h2>
            <p style={styles.description}>{place.description}</p>
            <div style={styles.divider}></div>
            <p style={styles.information}>{place.information}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "3rem",
    marginTop: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    color: "#1a1a1a",
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#666",
    fontStyle: "italic",
  },
  placesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
  },
  placeCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative" as const,
  },
  placeNumber: {
    position: "absolute" as const,
    top: "1rem",
    right: "1rem",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  placeTitle: {
    fontSize: "1.5rem",
    color: "#007bff",
    marginBottom: "0.75rem",
    marginTop: "0.5rem",
    fontWeight: "600",
  },
  description: {
    fontSize: "1rem",
    color: "#333",
    fontStyle: "italic",
    marginBottom: "1rem",
    lineHeight: "1.5",
  },
  divider: {
    height: "2px",
    backgroundColor: "#e0e0e0",
    margin: "1rem 0",
  },
  information: {
    fontSize: "0.95rem",
    color: "#555",
    lineHeight: "1.6",
    margin: "0",
  },
};
