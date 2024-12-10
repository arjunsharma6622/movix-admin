import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getGenres } from "../../apiCalls/genres";
import { getList, updateList } from "../../apiCalls/list";
import { getMovies } from "../../apiCalls/movie";
import { InputBox } from "../../components/InputBox";
import { SelectBox } from "../../components/SelectBox";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { GenreType } from "../../types/genre";
import { ListType } from "../../types/list";
import { MovieType } from "../../types/movie";
import "./updateList.css";

export default function UpdateList() {
    const {id} = useParams();

    const [genreData, setGenreData] = useState<GenreType[]>([]);

    const navigate = useNavigate();

    const [list, setList] = useState<ListType>({
        title: "",
        type: "",
        genre: null,
        content: []
    })
    const [movies, setMovies] = useState<MovieType[]>([]);

    console.log(list)

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies();
            setMovies(data);
        }
        fetchMovies();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await updateList(list)
        toast.success("List Updated");
        navigate("/lists")
    }

    const handleSelectChange = (key: string, value: string | number | boolean) => {
        setList((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleAddContent = (movieId: string) => {
        setList((prev) => {
            const isMovieInContent = prev.content?.includes(movieId);
    
            return {
                ...prev,
                content: isMovieInContent
                    ? prev.content!.filter((item) => item !== movieId) // Remove movieId if it exists
                    : [...prev.content!, movieId], // Add movieId if it doesn't exist
            };
        });
    };
    useEffect(() => {
        const fetchList = async () => {
            const data = await getList(id as string);
            setList(data);
        };
        const fetchGenres = async () => {
            const data = await getGenres();
            setGenreData(data);
        };
        fetchList()
        fetchGenres();
    }, []);

    return (
        <div className="p-10">
            <form className="flex flex-col gap-4 w-[80%] mx-auto bg-white p-10 py-6 pb-10 rounded-xl">
                <h1 className="text-center text-2xl font-semibold">update List</h1>

                <div className="flex w-full gap-4">
                    <div className="flex flex-col gap-4 w-full">
                        <InputBox
                            title="Title"
                            name="title"
                            id="listTitle"
                            type="text"
                            placeholder="List title"
                            value={list.title}
                            onChange={handleChange}
                        />

                        <SelectBox
                            title="List Type"
                            placeholder="Type of list"
                            optionsData={[
                                { value: "movie", name: "Movie" },
                                { value: "series", name: "Series" },
                                { value: "mixed", name: "Mixed" },
                            ]}
                            onChange={(value) => handleSelectChange("type", value)}
                        />

                        <SelectBox
                            title="Genre"
                            placeholder="Select Genre"
                            optionsData={
                                genreData.map((genre) => {
                                    return {
                                        value: genre._id as string,
                                        name: genre.name as string
                                    }
                                })}
                            onChange={(value) => handleSelectChange("genre", value)}
                        />


                    </div>


                    <div className="w-full h-full">
                        <div className="flex flex-col gap-2">
                            <Label>Select Movies</Label>
                            <div id="" className="border p-4 flex rounded-xl flex-col gap-1 items-start overflow-auto h-[40vh]">
                                {movies.map((movie) => (
                                    <span
                                        className={`p-2 w-full rounded-xl cursor-pointer ${list.content?.includes(movie._id as string) ? "bg-gray-100" : ""} `}
                                        key={movie._id}
                                        onClick={() => handleAddContent(movie._id as string)}
                                    >
                                        {list.content?.includes(movie._id as string) &&
                                            <Check className="inline w-5 h-5 mr-2" />
                                        }
                                        {movie.title} . {typeof movie.genre === "object" && movie.genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Button className="w-44 mx-auto mt-6" onClick={handleSubmit}>Update</Button>
            </form>
        </div>
    );
}
