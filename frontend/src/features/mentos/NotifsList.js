
import { useGetNotifsQuery } from "./notifsApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import Notif from "./Notif";
import PulseLoader from "react-spinners/PulseLoader";
import { Button, Table } from "antd";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom'


const NotifsList = () => {
  useTitle("Notifications");

  const { username, isManager, isAdmin, isOperation_Employee} = useAuth();

  const {
    data: notifs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotifsQuery("notifsList", {
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
    const { ids, entities } = notifs;

    let filteredIds;
    if (isManager || isAdmin || isOperation_Employee) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (notifId) => entities[notifId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((notifId) => <Notif key={notifId} notifId={notifId} />);

    content = (
      <table className="table">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="note__title">
              Notifiation
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
export default NotifsList;
