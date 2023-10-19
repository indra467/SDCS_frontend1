import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetNotifsQuery } from './notifsApiSlice'
import { memo } from 'react'

const Notif = ({ notifId }) => {

    const { notif } = useGetNotifsQuery("notifsList", {
        selectFromResult: ({ data }) => ({
            notif: data?.entities[notifId]
        }),
    })

    const navigate = useNavigate()

    if (notif) {
        const created = new Date(notif.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(notif.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notifs/${notifId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__title">Changes made  to {notif.fleet_number} at {created}</td>
               
            </tr>
            
        )

    } else return null
}

const memoizedNotif = memo(Notif)

export default memoizedNotif