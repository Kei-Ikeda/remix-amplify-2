import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PokeAPI } from "pokeapi-types";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Poke" },
    { name: "description", content: "Remix amplify with Poke!" },
  ];
};

export const loader = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  const responseJson: PokeAPI.Pokemon = await response.json();

  // Return the data as JSON
  return json({ responseJson });
};

const POKE_SOFT_VERTION_NAME_GOLD = "gold";

export default function Index() {
  const { responseJson } = useLoaderData<typeof loader>();
  const name = responseJson.name;
  const heIndexNum = responseJson.game_indices.find(
    (item) => item.version.name === POKE_SOFT_VERTION_NAME_GOLD
  )?.game_index;
  const jsonText = JSON.stringify(responseJson);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix with Poke</h1>
      <div>
        <p>{name}</p>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${heIndexNum}.png`}
          alt="pika"
        />
      </div>
      <p>{jsonText}</p>
    </div>
  );
}
