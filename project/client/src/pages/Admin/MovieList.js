import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Simulate fetching movies from an API
    const fetchMovies = async () => {
      const allMovies = await getMoviesFromAPI();
      const updatedMovies = allMovies.map((item) => ({
        ...item,
        key: `movie${item._id}`,
      }));
      setMovies(updatedMovies);
    };

    fetchMovies();
  }, []);

  // Simulate an API call
  const getMoviesFromAPI = async () => {
    return [
      { _id: 1, name: 'Movie 1' },
      { _id: 2, name: 'Movie 2' },
    ];
  };

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.key}>{movie.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;