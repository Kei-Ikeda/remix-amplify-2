import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PokeAPI } from "pokeapi-types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  const responseJson:PokeAPI.Pokemon = await response.json();

  // Return the data as JSON
  return json({ responseJson });
};

export default function Index() {
  const { responseJson } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix with Poke</h1>
      <div>
        <p>{responseJson.name}</p>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="pika"
        />
      </div>
      {JSON.stringify(responseJson)}
    </div>
  );
}
