import { Link } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

const NotesList = () => {
  useTitle("techNotes: Notes List");

  const { username, isManager, isAdmin, isSales_Employee } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin || isSales_Employee) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

    content = (
      <table className="table">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="note__title">
              Order-id
            </th>
            <th scope="col" className="note__title">
              Period
            </th>
            <th scope="col" className="note__title">
              Status
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return (
    <div className="mt-5 mx-5 p-1 bg-white rounded border h-100 krish">
      <div className="">{content}</div>
    </div>
  );
};
export default NotesList;
