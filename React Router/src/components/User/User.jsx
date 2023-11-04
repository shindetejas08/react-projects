import {useParams} from "react-router-dom"

function User() {
    const {userId} = useParams()
  return (
    <div className="bg-gray-500 text-white p-4 text-3xl text-center">
      User: {userId}
    </div>
  )
}

export default User
