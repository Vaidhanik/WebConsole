import React, { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import createGlobe from "cobe";
import Layout from "../layout";
import { Button } from "@/components/ui/button";
import GeoCard from "@/Props/GeoCard";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [latlong, setLatLong] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [blockedCountries, setBlockedCountries] = useState([]);

  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: { mass: 1, tension: 280, friction: 40, precision: 0.001 },
  }));

  const countryOptions = countryList().getData();

  const fetchCountryCoordinates = async (countryName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?country=${countryName}&format=json`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);
          return { lat: latitude, lng: longitude };
        } else {
          console.error("No results found for the country.");
        }
      } else {
        console.error("Failed to fetch country data.");
      }
    } catch (error) {
      console.error("Error fetching country coordinates:", error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const handleBlockCountry = async () => {
    if (selectedCountry) {
      const coordinates = await fetchCountryCoordinates(selectedCountry.value);
      if (coordinates) {
        setBlockedCountries((prev) => [
          ...prev,
          { name: selectedCountry.label, lat: coordinates.lat, lng: coordinates.lng },
        ]);
      }
    }
  };

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 28000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: blockedCountries.map((country) => ({
        location: [country.lat, country.lng],
        size: 0.1,
      })),
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + r.get();
      },
    });

    setTimeout(() => (canvasRef.current.style.opacity = "1"));

    return () => {
      globe.destroy();
    };
  }, [blockedCountries]);
  console.log(blockedCountries);

  return (
    <Layout>
      <div className="h-screen flex items-center justify-center p-6">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Search Country"
              className="w-[300px]"
            />
            <Button onClick={handleBlockCountry} disabled={loading}>
              Block
            </Button>
          </div>
          <div
            className="overflow-y-auto"
            style={{ height: 350, border: "2px solid #efefef", borderRadius: 10 }}
          >
            <GeoCard data={blockedCountries} />
          </div>
        </div>

        <div
          className="flex items-center justify-center"
          style={{
            width: "100%",
            maxWidth: 600,
            aspectRatio: 1,
            position: "relative",
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current;
              canvasRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              canvasRef.current.style.cursor = "grab";
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              canvasRef.current.style.cursor = "grab";
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({ r: delta / 200 });
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({ r: delta / 100 });
              }
            }}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
          />
        </div>
      </div>
    </Layout>
  );
}
