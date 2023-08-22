import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetDraftsQuery } from './draftsApiSlice' 
import { memo } from 'react'

const Draft = ({ draftId }) => {

    const { draft } = useGetDraftsQuery("draftsList", {
        selectFromResult: ({ data }) => ({
            draft: data?.entities[draftId]
        }),
    })

    const navigate = useNavigate()

    if (draft) {
        const created = new Date(draft.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(draft.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/drafts/${draftId}`)

        return (
         
            <tr className="table__row">
                
                
                <td className="table__cell note__title">{draft.c_name}</td>
                <td className="table__cell note__username">{draft.site_location}</td>
                <td className="table__cell note__username">{draft.order_duration}</td>
                <td className="table__cell note__title">{draft.configuration}</td>
                <td className="table__cell note__username">{draft.rental_charges}</td>
                <td className="table__cell note__username">{draft.number_of_shifts}</td>
                <td className="table__cell note__title">{draft.mobilization_charges}</td>
                <td className="table__cell note__username">{draft.SDCS_poc}</td>
                <td className="table__cell note__username">{draft.delivery_deadline}</td>
                <td className="table__cell note__title">{draft.customer_poc}</td>
                <td className="table__cell note__username">{draft.urgency}</td>
                
               

                
            </tr>
        )

    } else return null
}

const memoizedDraft = memo(Draft)

export default memoizedDraft