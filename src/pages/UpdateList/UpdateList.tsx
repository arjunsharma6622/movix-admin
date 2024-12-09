import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getList, updateList } from "../../apiCalls/list";
import { ListType } from "../../types/list";
import "./updateList.css";

export default function UpdateList() {

    const { id } = useParams();
    const [listData, setListData] = useState<ListType>({});

    useEffect(() => {
        getList(id!);
    }, [id])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value
        setListData({ ...listData, [e.target.name]: value })
    }

    const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateList(listData)
    }


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/lists/create">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{listData.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{listData._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre :</span>
                            <span className="productInfoValue">{listData.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Type :</span>
                            <span className="productInfoValue">{listData.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleUpdate}>
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" placeholder={listData.title} onChange={handleChange} name="title" />
                        <label>Type</label>
                        <input type="text" placeholder={listData.type} onChange={handleChange} name="year" />
                        <label>Genre</label>
                        <input type="text" placeholder={listData.genre as string} onChange={handleChange} name="genre" />

                    </div>
                    <div className="productFormRight">
                        <button className="productButton" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
