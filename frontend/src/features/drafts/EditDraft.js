import { useParams } from 'react-router-dom'
import EditDraftForm from './EditDraftForm'
import { useGetDraftsQuery } from './draftsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditDraft = () => {
    useTitle('techNotes: Edit Draft')

    const { id } = useParams()

    const { username, isManager, isAdmin , isOperation_Employee} = useAuth()

    const { draft } = useGetDraftsQuery("draftsList", {
        selectFromResult: ({ data }) => ({
            draft: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!draft || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin && !isOperation_Employee) {
        if (draft.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditDraftForm draft={draft} users={users} />

    return content
}
export default EditDraft