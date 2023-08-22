import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewDraftMutation } from "./draftsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { STATUS } from "../../config/status"
import { PERIOD } from "../../config/period"

const NewDraftForm = ({ users }) => {

    const [addNewDraft, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewDraftMutation()

    const navigate = useNavigate()

    const [c_name, setC_name] = useState('')
    const [site_location, setSite_location] = useState('')
    const [userId, setUserId] = useState(users[0].id)
    const [order_duration, setOrder_duration] = useState('')
    const [configuration, setConfiguration] = useState('')
    const [rental_charges, setRental_charges] = useState('')
    const [number_of_shifts, setNumber_of_shifts] = useState('')
    const [mobilization_charges, setMobilization_charges] = useState('')
    const [SDCS_poc, setSDCS_poc] = useState('')
    const [delivery_deadline, setDelivery_deadline] = useState('')
    const [customer_poc, setCustomer_poc] = useState('')
    const [urgency, setUrgency] = useState('')



    useEffect(() => {
        if (isSuccess) {
            setC_name('')
            setSite_location('')
            setUserId('')
            setOrder_duration('')
            setConfiguration('')
            setRental_charges('')
            setNumber_of_shifts('')
            setMobilization_charges('')
            setSDCS_poc('')
            setDelivery_deadline('')
            setCustomer_poc('')
            setUrgency('')
            navigate('/dash/drafts')
        }
    }, [isSuccess, navigate])

    const onC_nameChanged = e => setC_name(e.target.value)
    const onSite_locationChanged = e => setSite_location(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onOrder_durationChanged = e => setOrder_duration(e.target.value)
    const onConfigurationChanged = e => setConfiguration(e.target.value)
    const onRental_chargesChanged = e => setRental_charges(e.target.value)
    const onNumber_of_shiftsChanged = e => setNumber_of_shifts(e.target.value)
    const onMobilization_chargesChanged = e => setMobilization_charges(e.target.value)
    const onSDCS_pocChanged = e => setSDCS_poc(e.target.value)
    const onDelivery_deadlineChanged = e => setDelivery_deadline(e.target.value)
    const onUrgencyChanged = e => setUrgency(e.target.value)
    const onCustomer_pocChanged = e => setCustomer_poc(e.target.value)

    const canSave = [c_name, site_location, order_duration, configuration, rental_charges, number_of_shifts, mobilization_charges, SDCS_poc, delivery_deadline, customer_poc, urgency, userId].every(Boolean) && !isLoading

    const onSaveDraftClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewDraft({ user: userId, c_name, site_location, order_duration, configuration, rental_charges, number_of_shifts, mobilization_charges, SDCS_poc, delivery_deadline, customer_poc, urgency })
        }
    }



    const errClass = isError ? "errmsg" : "offscreen"
    const validC_nameClass = !c_name ? "form__input--incomplete" : ''
    const validSite_locationClass = !site_location ? "form__input--incomplete" : ''
    const validOrder_durationClass = !order_duration ? "form__input--incomplete" : ''
    const validConfigurationClass = !configuration ? "form__input--incomplete" : ''
    const validRental_chargesClass = !rental_charges ? "form__input--incomplete" : ''
    const validNumber_of_shiftsClass = !number_of_shifts ? "form__input--incomplete" : ''
    const validMobilization_chargesClass = !mobilization_charges ? "form__input--incomplete" : ''
    const validSDCS_pocClass = !SDCS_poc ? "form__input--incomplete" : ''
    const validDelivery_deadlineClass = !delivery_deadline ? "form__input--incomplete" : ''
    const validCustomer_pocClass = !customer_poc ? "form__input--incomplete" : ''
    const validUrgencyClass = !urgency ? "form__input--incomplete" : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveDraftClicked}>
                <div className="form__title-row">
                    <h2>Add New Draft</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="c_name">
                    Customer Name:</label>
                <input
                    className={`form__input ${validC_nameClass}`}
                    id="c_name"
                    name="c_name"
                    type="text"
                    autoComplete="off"
                    value={c_name}
                    onChange={onC_nameChanged}
                />

                <label className="form__label" htmlFor="site_location">
                    Site Location:</label>
                <input
                    className={`form__input ${validSite_locationClass}`}
                    id="site_location"
                    name="site_location"
                    type="text"
                    autoComplete="off"
                    value={site_location}
                    onChange={onSite_locationChanged}
                />

                <label className="form__label" htmlFor="order_duration">
                    Order duration:</label>
                <input
                    className={`form__input ${validOrder_durationClass}`}
                    id="order_duration"
                    name="order_duration"
                    type="text"
                    autoComplete="off"
                    value={order_duration}
                    onChange={onOrder_durationChanged}
                />

                <label className="form__label" htmlFor="configuration">
                    Configuration:</label>
                <input
                    className={`form__input ${validConfigurationClass}`}
                    id="configuration"
                    name="configuration"
                    type="text"
                    autoComplete="off"
                    value={configuration}
                    onChange={onConfigurationChanged}
                />


                <label className="form__label" htmlFor="rental_charges">
                    Rental Charges:</label>
                <input
                    className={`form__input ${validRental_chargesClass}`}
                    id="rental_charges"
                    name="rental_charges"
                    type="text"
                    autoComplete="off"
                    value={rental_charges}
                    onChange={onRental_chargesChanged}
                />
                <label className="form__label" htmlFor="number_of_shifts">
                    Number of shifts:</label>
                <input
                    className={`form__input ${validNumber_of_shiftsClass}`}
                    id="number_of_shifts"
                    name="number_of_shifts"
                    type="text"
                    autoComplete="off"
                    value={number_of_shifts}
                    onChange={onNumber_of_shiftsChanged}
                />
                <label className="form__label" htmlFor="mobilization_charges">
                Mobilization charges:</label>
                <input
                    className={`form__input ${validMobilization_chargesClass}`}
                    id="mobilization_charges"
                    name="mobilization_charges"
                    type="text"
                    autoComplete="off"
                    value={mobilization_charges}
                    onChange={onMobilization_chargesChanged}
                />
                <label className="form__label" htmlFor="SDCS_poc">
                SDCS poc:</label>
                <input
                    className={`form__input ${validSDCS_pocClass}`}
                    id="SDCS_poc"
                    name="SDCS_poc"
                    type="text"
                    autoComplete="off"
                    value={SDCS_poc}
                    onChange={onSDCS_pocChanged}
                />
                <label className="form__label" htmlFor="delivery_deadline">
                Delivery deadline:</label>
                <input
                    className={`form__input ${validDelivery_deadlineClass}`}
                    id="delivery_deadline"
                    name="delivery_deadline"
                    type="text"
                    autoComplete="off"
                    value={delivery_deadline}
                    onChange={onDelivery_deadlineChanged}
                />
                 <label className="form__label" htmlFor="customer_poc">
                 Customer poc:</label>
                <input
                    className={`form__input ${validCustomer_pocClass}`}
                    id="customer_poc"
                    name="customer_poc"
                    type="text"
                    autoComplete="off"
                    value={customer_poc}
                    onChange={onCustomer_pocChanged}
                />
                 <label className="form__label" htmlFor="urgency">
                 Urgency:</label>
                <input
                    className={`form__input ${validUrgencyClass}`}
                    id="urgency"
                    name="urgency"
                    type="text"
                    autoComplete="off"
                    value={urgency}
                    onChange={onUrgencyChanged}
                />






            </form>
        </>
    )

    return content
}

export default NewDraftForm