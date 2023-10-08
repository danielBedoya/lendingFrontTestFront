import axios from "axios"

const URL = process.env.REACT_APP_BACKEND_URL

export const loanApply = async (data) => {
    const processeData = {
        tax_id: data.tax,
        business_name: data.bussiness,
        requested_amount: data.amount,
    }
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }
  try {
    const response = await axios.post(`${URL}/api/apply`, processeData, config)

    return response.data.decision
  } catch (error) {
    console.error("Error:", error)
    return { error: error }
  }
}