
import { useGetMentosQuery } from "./mentosApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import Mento from "./Mento";
import PulseLoader from "react-spinners/PulseLoader";
import { Button, Table } from "antd";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom'


const MentosList = () => {
  useTitle("techNotes: Mentos List");

  const { username, isManager, isAdmin, isOperation_Employee} = useAuth();

  const {
    data: mentos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMentosQuery("mentosList", {
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
    const { ids, entities } = mentos;

    let filteredIds;
    if (isManager || isAdmin || isOperation_Employee) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (mentoId) => entities[mentoId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((mentoId) => <Mento key={mentoId} mentoId={mentoId} />);

    content = (
      <table className="table">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="note__title">
              Fleet No
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
      <p><Link to="/dash/mentos/new">Add new machine to maintenance</Link></p>
      <div className="">{content}</div>
    </div>
  );
};
export default MentosList;
