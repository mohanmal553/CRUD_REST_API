import { useState, useEffect, useRef } from "react";
import { addData, putData } from "../../API/GETapi";
import header_obj from "./Header.module.css";
export function Header({ data, setData, updateData, setUpdateData }) {

    //Input field data
    let [formData, setFormData] = useState({ title: "", body: "" });

    let btn = useRef(null);

    let handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    //Add data into API
    let btnClick = async () => {
        if (btn.current.value === "Add") {
            let res = await addData(formData);
            if (res.status === 201) {
                setData([...data, res.data]);
                setFormData({ title: "", body: "" });
            }
        }
        else if (btn.current.value === "Edit") {
            let res = await putData(updateData.id, formData);
            setData((prev) => {
                return prev.map((curElem) => {
                    return curElem.id === res.data.id ? res.data : curElem;
                })
            });
            setUpdateData({});
        }
    }

    //Change button name dynamically by checking value is null or not
    let isEmpty = Object.keys(updateData).length === 0;


    //Get update data into input feild
    useEffect(() => {
        setFormData({
            title: updateData.title || "", //When it render first time then updateData will be NULL so put ""
            body: updateData.body || ""
        });
    }, [updateData]); //If updateData have value then run it again


    return (
        <div className={header_obj["div-main"]}>
            <div className={header_obj["input-body"]}>
                <input type="text" name="title" placeholder="Add Title" value={formData.title} onChange={handleChange} />
                <input type="text" name="body" placeholder="Add Post" value={formData.body} onChange={handleChange} />
                <button type="submit" onClick={btnClick} value={isEmpty ? "Add" : "Edit"} ref={btn}><i className="fa-solid fa-circle-plus" /> {isEmpty ? "Add" : "Edit"}</button>
            </div>
        </div>
    )
}