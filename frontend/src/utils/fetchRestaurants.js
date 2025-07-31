// import axios from "axios";

// export const getNearbyRestaurants = async (lat, lng) => {
//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/google-places/nearby`,
//       {
//         params: { lat, lng },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Google Places API Error:", error);
//     return [];
//   }
// };

import axios from "axios";

export const getNearbyRestaurants = async () => {
  if (!navigator.geolocation) {
    console.warn("Geolocalización no disponible en este navegador.");
    return [];
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const response = await axios.get(
            `http://localhost:3001/api/google-places/nearby`,
            {
              params: { lat: latitude, lng: longitude },
            }
          );

          const results = response.data || [];

          const mapped = results.map((place) => ({
            _id: place.place_id,
            brandName: place.name,
            address: place.vicinity,
            puntuacion: place.rating,
            transporte: "Google",
            isExternal: true,
            img: place.photos?.[0]
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                  place.photos[0].photo_reference
                }&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
              : null,
          }));

          resolve(mapped);
        } catch (error) {
          console.error("Error al obtener restaurantes de Google:", error);
          resolve([]);
        }
      },
      (error) => {
        console.error("Error de geolocalización:", error);
        resolve([]);
      }
    );
  });
};
