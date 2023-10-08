import React, { useState } from "react"

import Form from "../../components/Form"
import { loanApply } from "../../services/api"
import check from "../../assets/img/check.png"
import declined from "../../assets/img/declined.png"
import undecided from "../../assets/img/undecided.png"
import "./LoanApply.css"

const LoanApply = () => {
  const [decision, setDecision] = useState({})
  const [error, setError] = useState('')

  let fields = [
    {
      name: "tax",
      label: "Tax ID",
      type: "text",
      placeholder: "Type your Tax ID",
    },
    {
      name: "bussiness",
      label: "Bussiness Name",
      type: "text",
      placeholder: "Type your Bussiness Name",
    },
    {
      name: "amount",
      label: "Requested amount",
      type: "number",
      placeholder: "Type your Requested amount",
    },
  ]

  const onSendApply = async (form) => {
    const response = await loanApply(form)
    if (typeof response === 'object'){
      setError(response.error.message)
      setDecision('error')
    } else {
      setDecision(response)
    }
  }

  return (
    <div className="loan-apply">
      <section className="title">
        <h1>Loan Apply</h1>
      </section>
      <section className="body">
        <Form fields={fields} onSendData={onSendApply}/>
      </section>
      <section className="title result">
        {decision === "Approved" && 
           <>
            <p>Your loan apply has been approved</p>
            <img className="check" src={check} alt="check" />
          </>
        }
        {decision === "Declined" && 
          <>
            <p>Your loan apply has been declined</p>
            <img src={declined} alt="declined" />
          </>
          }
        {decision === "Undecided" && (
          <>
            <p>Your loan apply has been undecided</p>
            <img src={undecided} alt="undecided" />
          </>
        )}
        {decision === "error" && (
          <p className="error">Sorry, the following error occurred: {error}</p>
        )}
      </section>
    </div>
  )
}

export default LoanApply
