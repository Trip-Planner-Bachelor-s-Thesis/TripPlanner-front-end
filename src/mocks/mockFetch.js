const myTripsList = [
  {
    id: "-NGTvWu_IyGeBtOr8bXX",
    date: "2022-11-30T00:00:00.000Z",
    preferences: "entertainment",
    type: "car",
    waypoints: [
      {
        lat: 53.7767239,
        lng: 20.477780523409734,
        name: "Olsztyn, powiat olsztyński, województwo warmińsko-mazurskie, Polska",
      },
      {
        lat: 52.2319581,
        lng: 21.0067249,
        name: "Warszawa, województwo mazowieckie, Polska",
      },
    ],
  },
];

export default async function mockFetch(url) {
  switch (url) {
    case "https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips.json": {
      return {
        ok: true,
        status: 200,
        json: async () => myTripsList,
      };
    }
    case "https://dog.ceo/api/breed/husky/images":
    case "https://dog.ceo/api/breed/cattledog/images": {
      return {
        ok: true,
        status: 200,
        json: async () => dogImagesResponse,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
