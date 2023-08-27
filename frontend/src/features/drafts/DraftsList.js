import { Link } from "react-router-dom";
import { useGetDraftsQuery } from "./draftsApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { Button, Table } from "antd";
import { Container } from "react-bootstrap";

const column = [
  {
    key: "machine_no",
    width: 80,
    dataIndex: "machine_no",
    title: "Machine No.",
    fixed: 'left',
    sorter: 'true'
  },
  {
    key: "c_name",
    width: 100,
    dataIndex: "c_name",
    title: "Customer",
    fixed: 'left'
  },
  {
    key: "current_location",
    width: 100,
    dataIndex: "current_location",
    title: "Current Location",
  },
  {
    key: "site_location",
    width: 100,
    dataIndex: "site_location",
    title: "Site",
  },
  {
    key: "order_duration",
    width: 100,
    dataIndex: "order_duration",
    title: "Order Duration",
  },
  {
    key: "configuration",
    width: 100,
    dataIndex: "configuration",
    title: "Configuration",
  },
  {
    key: "rental_charges",
    width: 100,
    dataIndex: "rental_charges",
    title: "Rental Charges",
  },
  {
    key: "number_of_shifts",
    width: 50,
    dataIndex: "number_of_shifts",
    title: "Shifts",
  },
  {
    key: "mobilization_charges",
    width: 100,
    dataIndex: "mobilization_charges",
    title: "Mobilization Charges",
  },
  {
    key: "demobilization_charges",
    width: 100,
    dataIndex: "demobilization_charges",
    title: "Demobilization Charges",
  },
  {
    key: "SDCS_poc",
    width: 100,
    dataIndex: "SDCS_poc",
    title: "SDCS POC",
  },
  {
    key: "delivery_deadline",
    width: 100,
    dataIndex: "delivery_deadline",
    title: "Delivery By",
  },
  {
    key: "customer_poc",
    width: 100,
    dataIndex: "customer_poc",
    title: "Customer POC",
  },
  {
    key: "document",
    width: 60,
    dataIndex: "document",
    title: "Document",
    render: ()=><Button>View</Button>
  },
  {
    key: "urgency",
    width: 50,
    dataIndex: "urgency",
    title: "Urgency",
  }
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
        document: entities[draftId].document,
        urgency: entities[draftId].urgency
      }));

    content = (
      <Container className="vh-100 pt-3">
        <h1>ORDER DESCRIPTION</h1>
        <Table columns={column} dataSource={tableContent} scroll={{x:2500, y: 300}}/>
      </Container>
    );
  }

  return content;
};
export default DraftsList;
