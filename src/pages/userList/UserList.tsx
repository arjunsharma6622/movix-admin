import { Edit3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../apiCalls/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"; // Adjust the path based on your setup
import "./userList.css";
import { UserType } from "../../types/user";

export default function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter((item) => item._id !== id));
  };


  return (
    <div className="p-10">
      <div className="mx-auto bg-white p-8 pb-10 rounded-xl flex flex-col gap-5">
        <div className="flex flex-col text-center justify-center items-center">
          <h1 className="text-center text-2xl font-semibold">Users</h1>
        </div>
      <Table className="border">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>S/no</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell className="">{index + 1}</TableCell>
              <TableCell className="">
                <div className="userListUser">{user.username}</div>
              </TableCell>
              <TableCell className="">{user.email}</TableCell>
              <TableCell className="">{user.isAdmin ? "Yes" : "No"}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Link to={`/user/${user._id}`}>
                  <Edit3 className="text-gray-500"/>
                </Link>
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(user._id!)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}