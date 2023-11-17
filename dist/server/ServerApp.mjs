import { jsxs, jsx } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import "react-dom/client";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, lazy, Suspense } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return /* @__PURE__ */ jsxs("a", { href: `/details/${id}`, className: "pet", children: [
    /* @__PURE__ */ jsx("div", { className: "image-container", children: /* @__PURE__ */ jsx("img", { src: hero, alt: name }) }),
    /* @__PURE__ */ jsxs("div", { className: "info", children: [
      /* @__PURE__ */ jsx("h1", { children: name }),
      /* @__PURE__ */ jsx("h2", { children: `${animal} — ${breed} — ${location}` })
    ] })
  ] });
};
const Results = ({ pets }) => {
  return /* @__PURE__ */ jsx("div", { className: "search", children: !pets.length ? /* @__PURE__ */ jsx("h1", { children: "No Pets Found" }) : pets.map((pet) => {
    return /* @__PURE__ */ jsx(
      Pet,
      {
        animal: pet.animal,
        name: pet.name,
        breed: pet.breed,
        images: pet.images,
        location: `${pet.city}, ${pet.state}`,
        id: pet.id
      },
      pet.id
    );
  }) });
};
async function fetchBreedList({ queryKey }) {
  const animal = queryKey[1];
  const url = `http://pets-v2.dev-apis.com/breeds?animal=${animal}`;
  if (!animal)
    return [];
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`breeds ${animal} fetch not ok`);
  }
  return res.json();
}
function useBreedList(animal) {
  var _a;
  const results = useQuery({
    queryKey: ["breeds", animal],
    queryFn: fetchBreedList
  });
  return [((_a = results == null ? void 0 : results.data) == null ? void 0 : _a.breeds) ?? [], results.status];
}
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  useEffect(() => {
    requestPets();
  }, []);
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }
  return /* @__PURE__ */ jsxs("div", { className: "search-params", children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          requestPets();
        },
        children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "location", children: [
            "Location",
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "location",
                value: location,
                placeholder: "Location",
                onChange: (e) => setLocation(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { htmlFor: "animal", children: [
            "Animal",
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "animal",
                value: animal,
                onChange: (e) => {
                  setAnimal(e.target.value);
                  setBreed("");
                },
                onBlur: (e) => {
                  setAnimal(e.target.value);
                  setBreed("");
                },
                children: [
                  /* @__PURE__ */ jsx("option", {}),
                  ANIMALS.map((animal2) => /* @__PURE__ */ jsx("option", { value: animal2, children: animal2 }, animal2))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { htmlFor: "breed", children: [
            "Breed",
            /* @__PURE__ */ jsxs(
              "select",
              {
                disabled: !breeds.length,
                id: "breed",
                value: breed,
                onChange: (e) => setBreed(e.target.value),
                onBlur: (e) => setBreed(e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", {}),
                  breeds.map((breed2) => /* @__PURE__ */ jsx("option", { value: breed2, children: breed2 }, breed2))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("button", { children: "Submit" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Results, { pets })
  ] });
};
const AdoptedPetContext = createContext();
function Loader() {
  return /* @__PURE__ */ jsx("div", { className: "loading-pane", children: /* @__PURE__ */ jsx("h2", { className: "loader", children: "🌀" }) });
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});
const Details = lazy(() => import("./assets/Details-7e336760.mjs"));
const AppContainer = () => {
  const adoptedPet = useState(null);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(AdoptedPetContext.Provider, { value: adoptedPet, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx(Loader, {}),
      children: [
        /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Adopt Me!" }) }),
        /* @__PURE__ */ jsxs(Routes, { children: [
          /* @__PURE__ */ jsx(Route, { path: "/details/:id", element: /* @__PURE__ */ jsx(Details, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(SearchParams, {}) })
        ] })
      ]
    }
  ) }) }) }) });
};
function render(url, opts) {
  const stream = renderToPipeableStream(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(AppContainer, {}) }),
    opts
  );
  return stream;
}
export {
  AdoptedPetContext as A,
  render as default
};
