import { useParams } from 'react-router-dom'
import EditMentoForm from './EditMentoForm'
import { useGetMentosQuery } from './mentosApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'

import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditMento = () => {
    useTitle('techNotes: Edit Mento')

    const { id } = useParams()

    const { username, isManager, isAdmin , isOperation_Employee, isBilling_Employee} = useAuth()

    const { mento } = useGetMentosQuery("mentosList", {
        selectFromResult: ({ data }) => ({
            mento: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!mento || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin && !isOperation_Employee && !isBilling_Employee) {
        if (mento.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditMentoForm mento={mento} users={users} />

    return content
}
export default EditMento