import { useEffect, useState } from 'react'
import { createGenre, deleteGenre, getGenres } from '../../apiCalls/genres'
import "./allGenres.css"
import { Link } from 'react-router-dom'
import { GenreType } from '../../types/genre'
import { ArrowUpRight, Edit3, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { toast } from 'sonner'
import { InputBox } from '../../components/InputBox'
import { Button } from '../../components/ui/button'

const AllGenres = () => {
    const [genres, setGenres] = useState<GenreType[]>([])

    const [genre, setGenre] = useState<GenreType>({
        name : ""
    })

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await getGenres();
            setGenres(data);
        }
        fetchGenres();
    }, [])


    const handleDelete = async (id: string) => {
        await deleteGenre(id);
        toast.success("Genre Deleted");
        setGenres((prev) => prev.filter((genre) => genre._id !== id));
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setGenre({ ...genre, [e.target.name]: value })        
    }

    const handleCreateGenre = async () => {
        await createGenre(genre);
        toast.success("Genre Created!");
        setGenre({name : ""});
    }


    return (
        <div className="p-10">
            <div className="mx-auto bg-white p-8 pb-10 rounded-xl flex flex-col gap-5">
                <div className="flex flex-col text-center justify-center items-center">
                    <h1 className="text-center text-2xl font-semibold">All Genres</h1>
                </div>

                <div className='flex items-start w-full gap-6'>

                <div className='w-full border rounded-xl flex items-center justify-center flex-col p-5 gap-4'>
                        <h1 className='text-xl font-semibold'>Create Genre</h1>
                        <InputBox
                            title='Name'
                            id='name' 
                            type='text'
                            name="name"
                            placeholder='Genre Name'
                            value={genre.name}
                            onChange={handleChange}
                        />
                        <Button onClick={handleCreateGenre} className='w-44'>Create</Button>
                    </div>

                    <div className='max-h-[60vh] overflow-auto w-full'>
                    <Table className="bg-gray border w-full">
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead>S/No</TableHead>
                                <TableHead>Genre Name</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {genres.map((genre, index) => (
                                <TableRow className=''>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{genre.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4 ">
                                            <Link to={`/genre/${genre._id}`}>
                                                <Edit3 className="text-gray-500" />
                                            </Link>
                                            <Trash2
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => handleDelete(genre._id as string)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllGenres