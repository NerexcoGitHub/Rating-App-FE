import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShareIcon from "@mui/icons-material/Share";

const ShareIconComponent = ({ text }: { text: string }): JSX.Element => {
  const [copyState, setCopyState] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCopyState(false);
    }, 1000);
  }, [copyState]);

  return (
    <CopyToClipboard text={text} onCopy={() => setCopyState(true)}>
      {copyState ? (
        <CheckCircleOutlineIcon className="text-green-500 " />
      ) : (
        <ShareIcon className="hover:text-slate-400" />
      )}
    </CopyToClipboard>
  );
};

export default ShareIconComponent;
