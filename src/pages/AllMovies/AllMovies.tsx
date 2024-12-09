import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Edit3, Trash2 } from "lucide-react";
import { deleteMovie, getMovies } from "../../apiCalls/movie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import "./AllMovies.css";
import { MovieType } from "../../types/movie";
import { toast } from "sonner";

export default function AllMovies() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies([...data]);
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteMovie(id);
    toast.success("Movie Deleted")
    setMovies((prev) => prev.filter((movie) => movie._id !== id));
  };

  return (
    <div className="p-10">
      <div className="mx-auto bg-white p-8 pb-10 rounded-xl flex flex-col gap-5">
        <div className="flex flex-col text-center justify-center items-center">
          <h1 className="text-center text-2xl font-semibold">Movies</h1>
          <Link to="/createmovie" className="w-fit text-blue-500">
            <button className="text-sm">Create a new movie? <ArrowUpRight className=" inline w-5 h-5" /></button>
          </Link>
        </div>

        <Table className="bg-gray border">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>S/No</TableHead>
              <TableHead>Movies</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>Is Series</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie: MovieType, index) => (
              <TableRow className="w-20" key={movie._id}>
                <TableCell className="border-b">{index + 1}</TableCell>
                <TableCell className="border-b">
                  <div className="productListItem">
                    <img className="productListImg" src={movie.img} alt="" />
                    {movie.title}
                  </div>
                </TableCell>
                <TableCell className="border-b">{movie.genre.name}</TableCell>
                <TableCell className="border-b">{movie.year}</TableCell>
                <TableCell className="border-b">{movie.limit}</TableCell>
                <TableCell className="border-b">{movie.isSeries ? "Yes" : "No"}</TableCell>
                <TableCell className="border-b">
                  <div className="flex items-center gap-4 ">
                    <Link to={`/movie/${movie._id}`}>
                      <Edit3 className="text-gray-500" />
                    </Link>
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(movie._id as string)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}