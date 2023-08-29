import NewDraftForm from './NewDraftForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import MaintenanceForm from './MaintenanceForm'

const NewDraft = () => {
    useTitle('techNotes: New Draft')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewDraftForm users={users} />
<<<<<<< HEAD
   // const content = <MaintenanceForm users={users}/>
=======
    // const content = <MaintenanceForm users={users}/>
>>>>>>> f96075aeb8a0779cfa4f144cc12b1a1de9b9c956
    return content
}
export default NewDraft