import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { CommonContext } from "../App"
import { useNavigate } from "react-router-dom"

const Form = () => { 
  const [issueTypes, setIssueTypes] = useState([])
  const commonContext = useContext(CommonContext)

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [mobile,setMobile] = useState("")
  const [issueType,setIssueType]= useState("")
  const [issueTitle,setIssueTitle] = useState("")
  const [issueDescription,setIssueDescription] = useState("")

  const navigate = useNavigate()

  const loadIssueTypes = async () => {
    const res = await axios.get(`${commonContext.apiurl}/issue-types`)
    if(res.data.statusCode===200) {
      setIssueTypes(res.data.issueTypes)  
    } else {

    }
  }

  useEffect(() => {
    loadIssueTypes()
  }, [])

  const handleSubmit = async () => {
    const res = await axios.post(`${commonContext.apiurl}/issues`, {
      name,
      email,
      mobile,
      issueType,
      issueTitle,
      issueDescription
    })
    if(res.data.statusCode===200) {
      navigate(`/success/${res.data.issue_id}`)
    } else {

    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center mb-10">Issue Form</h1>
          <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Mobile
              </label>
              <input className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="mobile no." onChange={(e) => setMobile(e.target.value)}/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                email
              </label>
              <input className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="email" placeholder="jane@mail.com" onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Issue Title
              </label>
              <input className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="email" placeholder="" onChange={(e) => setIssueTitle(e.target.value)}/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block mb-2 text-sm font-medium">Describe your issue</label>
              <textarea rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" placeholder="what's the issue..." onChange={(e) => setIssueDescription(e.target.value)}></textarea>
            </div>   
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Type of Issue
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) =>{setIssueType(e.target.value)}}>
                  {
                    issueTypes.map((types, i) => {
                      return <option value={types} key={i}>{types}</option>
                    })
                  }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center btn px-6 mt-10" onClick={() => handleSubmit()}>Submit</div>
        </form>
      </div>
    </>
  )
}

export default Form