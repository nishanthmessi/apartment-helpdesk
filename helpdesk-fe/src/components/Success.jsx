import { useParams } from "react-router-dom"

const Success = () => {
  const params = useParams()
   
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <h3>You issue has been submitted successfully {params.id}</h3>
      </div>
    </>
  )
}

export default Success