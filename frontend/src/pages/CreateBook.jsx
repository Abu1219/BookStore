import React, { useState } from "react";
import BackButton from "../Components/BackButton";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const saveBookHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };
    console.log(data);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book has been created", { variant: "success" });

        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Kindly check console", { variant: "error" });

        console.log(error.message);
        navigate("/");
      });
  };

  return (
    <div className=" text-start">
      <BackButton destination="/" />
      <div className="w-full p-2 mx-auto border-2 border-blue-500 rounded md:w-1/2 lg:p-4 min-w-min md:rounded-md lg:rounded-lg">
        <h1 className="text-lg text-start">Create Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col mt-2 space-y-4">
            <div className="">
              <label htmlFor="" className="block mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full border-2"
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="" className="block mb-2">
                Author
              </label>
              <input
                type="text"
                name="title"
                className="w-full border-2"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="" className="block mb-2">
                Published Year
              </label>
              <input
                type="number"
                name="title"
                className="w-full border-2"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="p-1 my-2 text-white transition-all bg-green-500 border rounded active:scale-110"
              onClick={saveBookHandler}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;
