
import { useGetDraftsQuery } from "./draftsApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import Draft from "./Draft";
import PulseLoader from "react-spinners/PulseLoader";
import { Button, Table } from "antd";
import { Container } from "react-bootstrap";


const DraftsList = () => {
  useTitle("techNotes: Drafts List");

  const { username, isManager, isAdmin, isSales_Employee, isOperation_Employee, isBilling_Employee } = useAuth();

  const {
    data: drafts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDraftsQuery("draftsList", {
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
    const { ids, entities } = drafts;

    let filteredIds;
    if (isManager || isAdmin || isSales_Employee || isOperation_Employee|| isBilling_Employee) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (draftId) => entities[draftId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((draftId) => <Draft key={draftId} draftId={draftId} />);

    content = (
      <table className="table">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="note__title">
              Machine No
            </th>
            <th scope="col" className="table__th user__edit">Edit</th>
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
export default DraftsList;
