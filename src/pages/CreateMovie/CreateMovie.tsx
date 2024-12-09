import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../../apiCalls/genres";
import { createMovie } from "../../apiCalls/movie";
import app from "../../firebase";
import { GenreType } from "../../types/genre";
import { MovieType } from "../../types/movie";
import { InputBox } from "../../components/InputBox";
import { SelectBox } from "../../components/SelectBox";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Progress } from "../../components/ui/progress";
import { CheckCircle, UploadCloud } from "lucide-react";

const storage = getStorage(app);

interface UploadItem {
  file: File;
  label: string;
}

export default function CreateMovie() {
  const [genreData, setGenreData] = useState<GenreType[]>([]);

  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieType>({
    title: "",
    desc: "",
    img: "",
    imgTitle: "",
    imgSm: "",
    duration: "",
    year: 0,
    limit: 0,
    genre: "",
    isSeries: false,
  });

  console.log("Movie ", movie)

  const [image, setImage] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState<File | null>(null);
  const [imageSm, setImageSm] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentFile, setCurrentFile] = useState<string>("");

  const [uploadStarted, setUploadStarted] = useState<boolean>(false);
  const [allUploadsDone, setAllUploadsDone] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSelectChange = (key: string, value: string | boolean | number) => {
    setMovie((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const uploadItem = async (item: UploadItem) => {
    if (!item.file) return; // Ensure that the file exists

    setCurrentFile(item.label);

    const fileName = new Date().getTime() + item.label + item.file.name;
    const storageRef = ref(storage, `/items/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, item.file);

    return new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log(`Upload of ${item.file.name} is ${progress}% done`);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setMovie((prev) => ({ ...prev, [item.label]: url }));
            console.log(`Uploaded ${item.label} successfully`);
            resolve();
          } catch (error) {
            console.error(error);
            reject(error);
          }
        }
      );
    });
  };

  const uploadAllItems = async (items: UploadItem[]) => {
    for (const item of items) {
      await uploadItem(item);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStarted(true);
    try {
      await uploadAllItems([
        { file: image as File, label: "img" },
        { file: imageTitle as File, label: "imgTitle" },
        { file: imageSm as File, label: "imgSm" },
        { file: video as File, label: "video" },
        { file: trailer as File, label: "trailer" },
      ]);
      setAllUploadsDone(true);
      toast.success("All Media Uploaded")
      console.log("All uploads completed");
    } catch (error) {
      console.error("Error during uploads:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMovie(movie);
    toast.success("Movie Created");
    navigate("/movies")
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenreData(data);
    };
    fetchGenres();
  }, []);

  return (
    <div className="p-10">
      <form className="flex flex-col gap-4 w-[75%] mx-auto bg-white p-10 py-6 pb-10 rounded-xl">
      <h1 className="text-center text-2xl font-semibold">New Movie</h1>

      <hr />

        <div className="flex items-start w-full gap-10 mt-4">
          
          <div className="w-full flex items-center flex-col gap-5">
            
            <InputBox
              title="Movie Title"
              name="title"
              type="text"
              id="movieTitle"
              placeholder="Movie Title"
              value={movie.title}
              onChange={handleChange}
            />
            <InputBox
              title="Description"
              name="desc"
              type="text"
              id="description"
              placeholder="Description"
              value={movie.desc}
              onChange={handleChange}
            />

            <div className="flex items-center gap-4 w-full">

              <InputBox
                title="Year"
                name="year"
                type="number"
                id="year"
                placeholder="Movie Year"
                value={movie.year}
                onChange={handleChange}
              />

              <InputBox
                title="Age Limit"
                name="limit"
                type="text"
                id="ageLimit"
                placeholder="Age Limit"
                value={movie.limit}
                onChange={handleChange}
              />

            </div>

            <SelectBox
              title="Is Series"
              placeholder="select is series"
              optionsData={[
                { name: "Yes", value: "true" },
                { name: "No", value: "false" },
              ]}
              onChange={(value) => handleSelectChange("isSeries", value)}
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

            <InputBox
              title="Duration"
              name="duration"
              type="text"
              id="duration"
              placeholder="Movie Duration"
              value={movie.duration}
              onChange={handleChange}
            />

          </div>

          <div className="w-full flex items-center flex-col gap-5">

            <InputBox
              title="Image"
              name="image"
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            <InputBox
              title="Title Image"
              name="imgTitle"
              type="file"
              id="imgTitle"
              onChange={(e) => setImageTitle(e.target.files ? e.target.files[0] : null)}
            />

            <InputBox
              title="Thumbnail Image"
              name="imgSm"
              type="file"
              id="imgSm"
              onChange={(e) => setImageSm(e.target.files ? e.target.files[0] : null)}
            />

            <InputBox
              title="Trailer"
              name="trailer"
              type="file"
              id="trailer"
              onChange={(e) => setTrailer(e.target.files ? e.target.files[0] : null)}
            />

            <InputBox
              title="Full Movie"
              name="video"
              type="file"
              id="video"
              onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)}
            />


            <div className="mt- w-full">

              {allUploadsDone ?
                <div className="text-green-500 mt-2 bg-green-50 w-full flex items-center gap-4 px-5 py-3 rounded-xl">
                  <CheckCircle className="text-green-500 text-xl" />
                  <p>All Files Uploaded</p>
                </div>
                :
                <>
                  {uploadStarted ?
                    <div className="w-full flex flex-col gap-2">
                      <p className="text-lg font-semibold flex items-center gap-2">
                        Uploading
                        <span className="underline">{currentFile}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress indicatorColor="bg-green-500" value={progress} />
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>
                    :
                    <Button className="w-full mt-[23px]" onClick={handleUpload}>
                      <UploadCloud className="inline text-xl" />
                      Upload Media
                    </Button>
                  }
                </>

              }

            </div>

          </div>
        </div>
        {allUploadsDone && (
          <Button className="" onClick={handleSubmit}>
            Create
          </Button>
        )}
      </form>
    </div>
  );
}