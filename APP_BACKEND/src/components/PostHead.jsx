import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const PostHead = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:4500/api/posts/${post._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const body = await response.text();
    const json = JSON.parse(body);
    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
      console.log("post deleted successfully", json);
    }
  };
  return (
    <li className="bg-lime-300 flex flex-col gap-2 mt-4">
      <span className="flex gap-5">
        <h2 className="text-2xl font-serif font-bold">
          <Link to={`/api/posts/${post._id}`}>{post.title}</Link>
        </h2>
        <span
          className="material-symbols-outlined cursor-pointer"
          onClick={handleClick}
        >
          delete
        </span>
      </span>
      <div>{format(new Date(post.date), "MMMM d,y")}</div>
      <p>{post.content.substring(0, 200) + "..."}</p>
    </li>
  );
};

PostHead.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostHead;
