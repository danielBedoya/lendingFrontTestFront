import React, { useState } from "react"

import loadingImg from "../../assets/img/loading.gif"
import "./Form.css"

const defaultValues = {
  text: "",
  number: 0,
  bool: false,
}

const Form = ({ fields, onSendData }) => {
  const [form, setForm] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const getFieldValue = (field) => {
    if (!(field.name in form)) {
      return defaultValues[field.type]
    }
    return form[field.name]
  }

  const validateFields = () => {
    let emptyFields = false
    fields.map((field) => {
      if (!(field.name in form)) {
        setError(field.name)
        emptyFields = true
      }
    })

    Object.keys(form).map((field) => {
      if (form[field].length === 0 || form[field] === 0) {
        setError(field)
        emptyFields = true
      }
    })

    return emptyFields
  }

  const handleSetForm = (e) => {
    const { type, name, value } = e.target
    if (type === "number" && value < 0) return
    if (type !== "number" && value.length === 0) {
      setError(name)
    } else {
      if (type !== "number" && value.length > 0 && name === error) {
        setError("")
      }
    }
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSetData = async (e) => {
    if (validateFields()) {
      return
    }
    setLoading(true)
    await onSendData(form)
    setLoading(false)
  }

  return (
    <div className="form">
      <div className="form-body">
        {fields.map((field) => (
          <>
            <div className="field">
              <label> {field.label} </label>
              <input
                name={field.name}
                className="input"
                type={field.type}
                placeholder={field.placeholder}
                onChange={handleSetForm}
                value={getFieldValue(field)}
              />
              {field.name === error && (
                <label className="error">❗️ Empty field</label>
              )}
            </div>
          </>
        ))}
        <div className="button-container">
          {loading && (
            <img className="loading" src={loadingImg} alt="loading" />
          )}
          {!loading && (
            <button className="button" onClick={handleSetData}>
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form
