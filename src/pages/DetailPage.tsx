import { useLocation, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state
      
  return (
    <div className='flex m-12 flex-col'>
      <button onClick={()=> navigate(-1)} className="text-start">Go back</button>
      <div className='flex items-center flex-col p-5 m-5 border border-slate-300 rounded text-start'>
        <img className='inline-block h-12 w-12 rounded-full ring-2 ring-white mr-3' alt='profile-img' src={info.accountInfo.picture.thumbnail} />
        <div>
            <p className='text-base font-semibold'>{info.accountInfo.name.first} {info.accountInfo.name.last} ( {info.accountInfo.login.username})</p>
            <p className='text-slate-400'>{info.accountInfo.location.state}, {info.accountInfo.location.country}</p>
            <h6>{info.accountInfo.login.email}</h6>
            <h6>{info.cat.fact}</h6>
        </div>  
      </div>
    </div>
  )
}

export default DetailPage
