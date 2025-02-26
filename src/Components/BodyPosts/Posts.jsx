import { getData, deleteData } from "../../API/GETapi";
import { useEffect, useState } from "react";
import { Header } from "../HeaderPage/Header.jsx";
import post_obj from "./Post.module.css";

export function Posts() {
  //Store the data which is come from API
  const [data, setData] = useState([]);

  //Store the current edit data
  const [updateData, setUpdateData] = useState({});

  //Fetch
  let fetchData = async () => {
    try {
      let res = await getData();
      setData(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  //call fetch function
  useEffect(() => {
    fetchData();
  }, []);

  //Delete
  let handleDelete = async (id) => {
    try {
      let res = await deleteData(id);
      if (res.status === 200) {
        let newData = data.filter((curData) => {
          return curData.id != id;
        })
        setData(newData);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  //Edit
  let handleEdit = (curData) => {
    setUpdateData(curData);
  }

  return (
    <>
      <Header data={data} setData={setData} updateData={updateData} setUpdateData={setUpdateData}/>
      <div className={post_obj["div-main"]}>
        {
          data.map((curData, index) => {
            return (
              <div className={post_obj["post-card"]} key={curData.id}>
                <p>Note: {index + 1}</p>
                <p>Title: {curData.title}</p>
                <p>Post: {curData.body}</p>
                <p>
                  <button className={post_obj["edit-btn"]} onClick={() => handleEdit(curData)}><i className="fa-solid fa-pen-to-square" /> Edit</button>
                  <button className={post_obj["delete-btn"]} onClick={() => handleDelete(curData.id)}><i className="fa-solid fa-trash" /> Delete</button>
                </p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
