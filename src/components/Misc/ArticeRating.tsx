import { Rating } from "@mui/material";

const ArticleRating = (props:any) => {
  return (
    <div className="mb-2 flex flex-col items-center gap-2 ">
      <span className="flex items-center gap-4 text-sm rounded text-slate-500">
        <Rating name="read-only" value={props.rating} readOnly />
        <span>4.1 out 5</span>
      </span>

      <span className="text-xs leading-6 text-slate-400">
        based on 42 user ratings
      </span>
    </div>
  );
};

export default ArticleRating;
