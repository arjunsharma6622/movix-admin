import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Edit3, Trash2 } from "lucide-react";
import { deleteList, getLists } from "../../apiCalls/list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import "./AllLists.css";
import { ListType } from "../../types/list";

export default function AllLists() {
  const [lists, setLists] = useState<ListType[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      const data = await getLists();
      setLists(data);
    };

    fetchLists();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteList(id);
    setLists((prev) => prev.filter((list) => list._id !== id));
  };

  return (
    <div className="p-10">
      <div className="mx-auto bg-white p-8 pb-10 rounded-xl flex flex-col gap-5">
        <div className="flex flex-col text-center justify-center items-center">
          <h1 className="text-center text-2xl font-semibold">Lists</h1>
          <Link to="/createList" className="w-fit text-blue-500">
            <button className="text-sm">Create a new List? <ArrowUpRight className=" inline w-5 h-5" /></button>
          </Link>
        </div>

        <Table className="border">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lists.map((list) => (
              <TableRow key={list._id}>
                <TableCell>{list._id}</TableCell>
                <TableCell>{list.title}</TableCell>
                <TableCell>{list.genre}</TableCell>
                <TableCell>{list.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4 ">
                    <Link to={`/lists/${list._id}`}>
                      <Edit3 className="text-gray-500" />
                    </Link>
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(list._id as string)}
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