import { Home, ImagePlay, List, ListVideo, LogOut, Users2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../apiCalls/auth";
import "./sidebar.css";

const menuItems = [
  {
    name: "Home",
    link: "/",
    icon: <Home className="sidebarIcon" />
  },
  {
    name: "Movies",
    link: "/movies",
    icon: <ImagePlay className="sidebarIcon" />
  },
  {
    name: "Lists",
    link: "/lists",
    icon: <List className="sidebarIcon" />
  },
  {
    name: "Genres",
    link: "/genres",
    icon: <ListVideo className="sidebarIcon" />
  },
  {
    name: "Users",
    link: "/users",
    icon: <Users2 className="sidebarIcon" />
  },
]

export default function Sidebar() {

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out!");
      setTimeout(() => { window.location.reload() }, 1000);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="sidebar">
      <h1 className="sidebarTitle">MoviX ADMIN</h1>
      <div className="sidebarWrapper">
        <div className="sidebarList">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link} className="link">
              <div className="sidebarListItem">
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))
          }
          <div 
            className="bg-red-100 cursor-pointer text-red-500 m-4 px-4 py-3 rounded-xl flex flex-row justify-between gap-4"
            onClick={handleLogout}
          >
            <span>
              Logout
            </span>

            <LogOut />
          </div>
        </div>
      </div>
    </div>
  );
}
