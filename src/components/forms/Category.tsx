import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

type Category = {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
};

type Response = {
  status: "success";
  results: number;
  data: {
    categories: Category[];
  };
};

export function Category() {
  const [name, setName] = useState("");

  const { data, isLoading, isError } = useQuery<Response, Error>({
    // include name so the cache key changes on each search
    queryKey: ["categories", name],
    // only fire when there’s something to search
    enabled: name.length > 0,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/categories?name=${encodeURIComponent(
          name
        )}`,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return (await res.json()) as Response;
    },
  });

  return (
    <div>
      <h1>Category</h1>

      <Input
        type="text"
        placeholder="Search or Create Category"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {isLoading && <p>Loading…</p>}
      {isError && <p style={{ color: "red" }}>Error loading categories.</p>}

      {data?.data.categories.length ? (
        <ul>
          {data.data.categories.map((cat) => (
            <li key={cat.id}>
              <strong style={{ color: cat.color }}>{cat.name}</strong>:{" "}
              {cat.description}
            </li>
          ))}
        </ul>
      ) : (
        // if name is non-empty but no results
        name.length > 0 &&
        !isLoading && <p>No categories found for “{name}”.</p>
      )}
    </div>
  );
}
