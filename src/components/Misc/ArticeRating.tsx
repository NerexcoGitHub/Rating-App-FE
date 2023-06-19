import { Rating } from "@mui/material";

const ArticleRating = (props:any) => {

  let rate=0
  if (props.count && props.sum) {
   rate =  props.sum/props.count;
  }

  return (
    <div className="mb-2 flex flex-col items-center  ">
      <span className="flex items-center gap-4 text-sm rounded text-slate-500">
        <Rating name="read-only" value={Math.round(rate)} readOnly />
        <span>{rate} out 5</span>
      </span>

      <span className="text-xs leading-6 text-slate-400">
        based on {props.usercount} user ratings
      </span>
    </div>
  );
};

export default ArticleRating;
