import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { STATUS } from "../../config/status"
import { PERIOD } from "../../config/period"
import { Button, Checkbox, Form, Input, Select } from "antd"

const NewNoteForm = ({ users }) => {

    const [form] = Form.useForm();

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('This is description, id required in future.')
    const [userId, setUserId] = useState(users[0].id)
    const [status, setStatus] = useState('Open')
    const [period, setPeriod] = useState('Short Term')


    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            setStatus('')
            setPeriod('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    
    const onStatusChanged = e => setStatus(e)
    const onPeriodChanged = e => setPeriod(e)

    const canSave = [title, text, status, userId, period].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await addNewNote({ user: userId, status, title, text, period })
        }
    }
    
    const options = Object.values(STATUS).map(status => {
        const obj={
                key: status,
                label: status,
                value: status
            }
        return obj;
    })

    const options2 = Object.values(PERIOD).map(period => {
        const obj={
            key: period,
            label: period,
            value: period
            }
        return obj;
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validStatusClass = !status ? "form__input--incomplete" : ''
    const validPeriodClass = !period ? "form__input--incomplete" : ''

    const content = (
        <div className={`vh-100 p-4 rounded bg-light mx-5 my-4 text-dark`}>
            <p className={errClass}>{error?.data?.message}</p>
            <h2 className="p-3">Add New Order</h2>
            <Form form={form} className="p-3" onFinish={onSaveNoteClicked}>
                <Form.Item name="title" label="Order ID: " rules={[{required: true}]}>
                    <Input className={`form__input ${validTitleClass}`} value={title} onChange={onTitleChanged}/>
                </Form.Item>   
                <Form.Item name="status" label="Status: " rules={[{required: true}]}>
                    <Select options={options} value={status} onChange={onStatusChanged} className={`form__input ${validStatusClass}`}/>
                </Form.Item> 
                <Form.Item name="period" label="Period: " rules={[{required: true}]}>
                    <Select options={options2} value={period} onChange={onPeriodChanged} className={`form__input ${validPeriodClass}`}/>
                </Form.Item> 
                <Form.Item className="form__action-buttons">
                    <Button htmlType="submit" disabled={!canSave} title="Save">Save</Button>
                </Form.Item>
            </Form>
            
        </div>
    )

    return content
}

export default NewNoteForm