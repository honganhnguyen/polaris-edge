import CommentItem from "./CommentItem";

export default function CreateComment({ isClosedStatus }: { isClosedStatus: boolean}) {
  return (
    <div className='comment'>
      <CommentItem isClosedStatus={isClosedStatus} />
    </div>
  );
}
