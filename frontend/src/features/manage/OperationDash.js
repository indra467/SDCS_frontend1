import React from 'react'
import Styles from './Dash.module.css'
import { useGetDraftsQuery } from "../drafts/draftsApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { Table } from "antd";

const column = [
  {
    key: "machine_no",
    dataIndex: "machine_no",
    title: "Machine No.",
  }
];

const OperationDash = () => {
  
  useTitle("techNotes: Drafts List");

  const { username, isManager, isAdmin, isSales_Employee, isOperation_Employee } = useAuth();

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
    if (isManager || isAdmin || isOperation_Employee) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (draftId) => entities[draftId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((draftId) => ({
        key: draftId,
        machine_no: entities[draftId].machine_no,
        
      }));

    content = (
      <>
        <h1>ORDER DESCRIPTION</h1>
        <Table columns={column} dataSource={tableContent} />
      </>
    );
  }

  return content;
  return (
    <div className='p-4 text-dark d-flex flex-row justify-content-between align-items-center '>
      <div className={`m-3 p-4 px-5 border rounded w-50 ${Styles.bgcontainer}`}>
        <h3 className={`mb-2 pb-2 ${Styles.heading}`}>Final Quotations</h3>
        <ul className='px-1'>
            <li>Machine 1</li>
            <li>Machine 2</li>
            <li>Machine 3</li>
            <li>Machine 4</li>
        </ul>
      </div>
      <div className={`m-3 p-4 px-5 border rounded w-50 ${Styles.bgcontainer}`}>
        <h3 className={`mb-2 pb-2 ${Styles.heading}`}>Marching</h3>
        <ul className='px-1'>
            <li>Machine 1</li>
            <li>Machine 2</li>
            <li>Machine 3</li>
            <li>Machine 4</li>
        </ul>
      </div>
    </div>
  )
}

export default OperationDash
