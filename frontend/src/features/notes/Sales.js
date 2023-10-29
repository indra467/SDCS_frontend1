import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import "./Notes.css";
import {AiFillCalculator, AiFillControl} from 'react-icons/ai'
import {GrVmMaintenance} from 'react-icons/gr'
import {MdOutlineWork} from 'react-icons/md'
import {FaFirstdraft} from 'react-icons/fa'
import { NodeExpandOutlined } from "@ant-design/icons";

const Sales_welcome = () => {
  const { username, isManager, isAdmin, isSales_Employee } = useAuth();

  useTitle(`techNotes: ${username}`);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome vh-100">
      {isSales_Employee || isAdmin && (
        <div className="left-sidebar d-grid">
            <h2 className=" ml-3">Functionalities: </h2>
          <div className="row">
            <Link to="/dash/notes" className="p-3 border-func rounded m-4 ml-5 col-5">
              <p className="function">
                <div><AiFillControl size={50}/> Manage RFQ</div>
              </p>
            </Link>
            <Link to="/dash/users" className="p-3 border-func rounded m-4 ml-5 col-5">
              <p className="function">
                <div><AiFillCalculator size={50}/>Deal Quality Calculation</div>
              </p>
            </Link>
            </div>
            <div className="row">
            <Link to="/dash/drafts" className="p-3 border-func rounded m-4 ml-5 col-5">
              <p className="function">
                <div><FaFirstdraft size={50}/>Manage Equipped Occupancy</div>
              </p>
            </Link>
            <Link to="/dash/drafts/new" className="p-3 border-func rounded m-4 ml-5 col-5">
              <p className="function">
                <div><MdOutlineWork size={50}/>Manage Work Order</div>
              </p>
            </Link>
            <Link to="/dash/mentos" className="p-3 border-func rounded m-4 ml-5 col-5">
              <p className="function">
                <div><GrVmMaintenance size={50}/>Maintenance</div>
              </p>
            </Link>
          </div>
        </div>
      )}
    </section>
  );

  return content;
};
export default Sales_welcome;
