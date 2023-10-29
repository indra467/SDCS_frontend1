import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetMentosQuery } from './mentosApiSlice'
import { memo } from 'react'
import { EditFilled } from '@ant-design/icons'
import Styles from './Mento.module.css';
const Mento = ({ mentoId }) => {

    const { mento } = useGetMentosQuery("mentosList", {
        selectFromResult: ({ data }) => ({
            mento: data?.entities[mentoId]
        }),
    })

    const navigate = useNavigate()

    if (mento) {
        const created = new Date(mento.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(mento.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/mentos/${mentoId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__title">{mento.fleet_number}</td>
                <td className={`table__cell `}>
                    <button
                        className={`icon-button table__button ${Styles.edit}`}
                        onClick={handleEdit}
                    >
                        <EditFilled size={50}/>
                    </button></td>
            </tr>
            
        )

    } else return null
}

const memoizedMento = memo(Mento)

export default memoizedMento