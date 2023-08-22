import { Link } from "react-router-dom";
import { useGetDraftsQuery } from "./draftsApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { Table } from "antd";

const column = [
  {
    key: "machine_no",
    dataIndex: "machine_no",
    title: "Machine No.",
  },
  {
    key: "current_location",
    dataIndex: "current_location",
    title: "Current Location",
  },
  {
    key: "c_name",
    dataIndex: "c_name",
    title: "Customer",
  },
  {
    key: "site_location",
    dataIndex: "site_location",
    title: "Site",
  },
  {
    key: "order_duration",
    dataIndex: "order_duration",
    title: "Order Duration",
  },
  {
    key: "configuration",
    dataIndex: "configuration",
    title: "Configuration",
  },
  {
    key: "rental_charges",
    dataIndex: "rental_charges",
    title: "Rental Charges",
  },
  {
    key: "number_of_shifts",
    dataIndex: "number_of_shifts",
    title: "Shifts",
  },
  {
    key: "mobilization_charges",
    dataIndex: "mobilization_charges",
    title: "Mobilization Charges",
  },
  {
    key: "demobilization_charges",
    dataIndex: "demobilization_charges",
    title: "Demobilization Charges",
  },
  {
    key: "SDCS_poc",
    dataIndex: "SDCS_poc",
    title: "SDCS POC",
  },
  {
    key: "delivery_deadline",
    dataIndex: "delivery_deadline",
    title: "Delivery By",
  },
  {
    key: "customer_poc",
    dataIndex: "customer_poc",
    title: "Customer POC",
  },
  {
    key: "urgency",
    dataIndex: "urgency",
    title: "Urgency",
  },
];
const DraftsList = () => {
  useTitle("techNotes: Drafts List");

  const { username, isManager, isAdmin, isSales_Employee } = useAuth();

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
    if (isManager || isAdmin || isSales_Employee) {
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
        current_location: entities[draftId].current_location,
        c_name: entities[draftId].c_name,
        
        site_location: entities[draftId].site_location,
        order_duration: entities[draftId].order_duration,
        configuration: entities[draftId].configuration,
        rental_charges: entities[draftId].rental_charges,
        number_of_shifts: entities[draftId].number_of_shifts,
        mobilization_charges: entities[draftId].mobilization_charges,
        demobilization_charges: entities[draftId].demobilization_charges,
        SDCS_poc: entities[draftId].SDCS_poc,
        delivery_deadline: entities[draftId].delivery_deadline,
        customer_poc: entities[draftId].customer_poc,
        urgency: entities[draftId].urgency,
      }));

    content = (
      <>
        <h1>ORDER DESCRIPTION</h1>
        <Table columns={column} dataSource={tableContent} />
      </>
    );
  }

  return content;
};
export default DraftsList;
