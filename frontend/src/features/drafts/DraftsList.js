import { Link } from 'react-router-dom'
import { useGetDraftsQuery } from "./draftsApiSlice"
import Draft from "./Draft"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const DraftsList = () => {
    useTitle('techNotes: Drafts List')

    const { username, isManager, isAdmin, isSales_Employee } = useAuth()

    const {
        data: drafts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDraftsQuery('draftsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = drafts

        let filteredIds
        if (isManager || isAdmin || isSales_Employee) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(draftId => entities[draftId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(draftId => <Draft key={draftId} draftId={draftId} />)

        content = (
           
      <table className="table">
                <thead className="table__thead">
                    <tr>
                        
                        <th scope="col" className="table__cell note__title">c_name</th>
                <th scope="col" className="table__cell note__username">site_location</th>
                <th scope="col" className="table__cell note__username">order_duration</th>
                <th scope="col" className="table__cell note__title">configuration</th>
                <th scope="col" className="table__cell note__username">rental_charges</th>
                <th scope="col" className="table__cell note__username">number_of_shifts</th>
                <th scope="col" className="table__cell note__title">mobilization_charges</th>
                <th scope="col" className="table__cell note__username">SDCS_poc</th>
                <th scope="col" className="table__cell note__username">delivery_deadline</th>
                <th scope="col" className="table__cell note__title">customer_poc</th>
                <th scope="col" className="table__cell note__username">urgency</th>
                        
                       
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
     
    
    
        )
    }

    return content
}
export default DraftsList