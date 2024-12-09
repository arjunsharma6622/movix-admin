// import { DataGrid } from "@material-ui/data-grid";
// import { Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { deleteUser, getUsers } from "../../apiCalls/user";
// import "./userList.css";

// export default function UserList() {

//   const [users, setUsers] = useState([]);

//   console.log(users)

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const data = await getUsers();
//       setUsers(data);
//     }
//     fetchUsers();
//   }, [])

//   const handleDelete = async (id) => {
//     await deleteUser(id)
//     setUsers(users.filter((item) => item._id !== id));
//   };

//   const columns = [
//     { field: "id", headerName: "S/no", width: 200 },
//     {
//       field: "user",
//       headerName: "User",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="userListUser">
//             {params.row.username}
//           </div>
//         );
//       },
//     },
//     { field: "email", headerName: "Email", width: 200 },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={"/user/" + params.row.id}>
//               <button className="userListEdit">Edit</button>
//             </Link>
//             <Trash2
//               className="userListDelete"
//               onClick={() => handleDelete(params.row._id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="userList dashContainer">
//         <h1>Users</h1>
//       <DataGrid
//         rows={users.map((user, index) => ({ ...user, id: index + 1 }))}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={10}
//       />
//     </div>
//   );
// }


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