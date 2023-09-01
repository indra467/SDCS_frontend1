import NewMentoForm from './NewMentoForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'


const NewMento = () => {
    useTitle('techNotes: New Mento')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"} />

    // const content = <NewDraftForm users={users} />
   const content = <NewMentoForm users={users}/>
    return content
}
export default NewMento