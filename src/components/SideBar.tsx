import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import { Content } from "./Content";

export function SideBar() {
  interface GenreResponseProps {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  }
  interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
  useEffect(() => {
    console.log("aquui");
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
      setSelectedGenre(response.data[0]);
    });
  }, []);

  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenre(genre);
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <nav className="sidebar">
        <span>
          Watch<p>Me</p>
        </span>

        <div className="buttons-container">
          {genres.map((genre) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>
      </nav>
      <Content genroSideBar={selectedGenre} />;
    </div>
  );
}
