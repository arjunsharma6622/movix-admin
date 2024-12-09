import { UploadCloud } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovie, updateMovie } from "../../apiCalls/movie";
import { MovieType } from "../../types/movie";
import "./updateMovie.css";
import { getGenres } from "../../apiCalls/genres";
import { GenreType } from "../../types/genre";
import { InputBox } from "../../components/InputBox";
import { SelectBox } from "../../components/SelectBox";

export default function UpdateMovie() {

    const [genreData, setGenreData] = useState<GenreType[]>([]);

    const { id } = useParams();
    console.log("ID IS", id)
    const [movieData, setMovieData] = useState<MovieType>({
        title: "",
        desc: "",
        img: "",
        imgTitle: "",
        imgSm: "",
        trailer: "",
        video: "",
        year: 0,
        limit: 0,
        genre: "",
        isSeries: false
    });

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await getMovie(id!);
            setMovieData(data);
        }
        fetchMovie()
    }, [id])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value
        setMovieData({ ...movieData, [e.target.name]: value })
    }

    const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateMovie(movieData)
    }

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await getGenres();
            setGenreData(data);
        };
        fetchGenres();
    }, []);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movies</h1>
                <Link to="/newmovie">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="flex flex-col gap-4">
                        <InputBox
                            title="Movie Title"
                            name="title"
                            type="text"
                            id="movieTitle"
                            value={movieData.title}
                            onChange={handleChange}
                        />
                        <InputBox
                            title="Year"
                            name="year"
                            type="number"
                            id="year"
                            value={movieData.year}
                            onChange={handleChange}
                        />
                        <InputBox
                            title="Age Limit"
                            name="limit"
                            type="number"
                            id="ageLimit"
                            value={movieData.limit}
                            onChange={handleChange}
                        />

                        <SelectBox title="Genre" placeholder="Select Genre" optionsData={
                            genreData.map((genre) => {
                                return {
                                    value: genre._id as string,
                                    name: genre.name as string
                                }
                            })
                        } />


                        <label>Trailer</label>
                        <video src={movieData.trailer} controls width={"300px"} height={"300px"} />
                        <input type="file" />

                        <label>Video</label>
                        <video src={movieData.video} controls width={"300px"} height={"300px"} />
                        <input type="file" />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={movieData.img} alt="" className="productUploadImg" />
                            <label>
                                <UploadCloud /> {/*icon*/}
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
