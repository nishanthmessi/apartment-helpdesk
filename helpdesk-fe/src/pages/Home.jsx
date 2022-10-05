import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 h-screen">
        <h1 className="text-5xl font-bold">Help Desk</h1>
        <p>Your one stop solution for all your problems</p>
        <Link to='/new-issue' className="btn btn-primary rounded-md">Report your issue</Link>
      </div>
      
    </>
  )
}

export default Home