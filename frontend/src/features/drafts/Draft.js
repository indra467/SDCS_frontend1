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
                <td className="table__cell note__title text-center">{draft.machine_no}</td>
                <td className={`table__cell text-center`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button></td>
            </tr>
            
        )

    } else return null
}

const memoizedDraft = memo(Draft)

export default memoizedDraft