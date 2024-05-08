import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="md:text-lg lg:text-xl">
      <Link
        to={"books/CreateBook"}
        className="flex items-center justify-between my-4 text-green-500 cursor-pointer "
      >
        Book Lists{" "}
        <MdOutlineAddBox className="duration-150 md:text-lg lg:text-3xl acctiver:text-green-800 active:scale-110" />
      </Link>

      <div>
        <table className="w-full border border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border rounded-md border-slate-600">S.No</th>
              <th className="border rounded-md border-slate-600">Title</th>
              <th className="border rounded-md border-slate-600 max-md:hidden">
                Author
              </th>
              <th className="border rounded-md border-slate-600 max-md:hidden">
                PublishedYear
              </th>
              <th className="border rounded-md border-slate-600">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr key={book._id}>
                <td className="text-center border rounded-md border-slate-700">
                  {i + 1}
                </td>
                <td className="text-center border rounded-md border-slate-700">
                  {book.title}
                </td>
                <td className="text-center border rounded-md border-slate-700 max-md:hidden">
                  {book.author}
                </td>
                <td className="text-center border rounded-md border-slate-700 max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="text-center border rounded-md border-slate-700">
                  {
                    <div className="flex items-center justify-around ">
                      <Link
                        to={`books/details/${book._id}`}
                        className="text-blue-500"
                      >
                        <AiFillInfoCircle />
                      </Link>
                      <Link
                        to={`books/edit/${book._id}`}
                        className="text-green-500"
                      >
                        <MdEditDocument />
                      </Link>

                      <Link
                        to={`books/delete/${book._id}`}
                        className="text-red-500"
                      >
                        <RiDeleteBin7Fill />
                      </Link>
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
