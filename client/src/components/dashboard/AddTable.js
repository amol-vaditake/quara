import React, { Fragment, useState} from "react";
import Axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;


const AddProductDetail = ({setAddTable,editData,update,setUpdate}) => {
	const [data, setData] = useState(editData || {
			no: '',
			date: '',
			thirdPrice: '',
			secondPrice: '',
			firstPrice: '',
			time:'7 AM'
	});

	async function submitForm (e){
		e.preventDefault()
		setData({ ...data, loading: true });

		let res = await Axios.post(`${apiURL}/api/draw/addupdate`, data);
		if(res.data.error){
			setMsg(null)
			setErrMsg(res.data.error)
		} else {
			setMsg(!res.data.update?'Added draw successfully':'Updated successfully');
			setData({
				no: '',
				date: '',
				thirdPrice: '',
				secondPrice: '',
				firstPrice: '',
				time:'7 AM'
		  });
			setUpdate(!update)
			if(res.data.update){
				setAddTable(false)
			}
			setErrMsg(null);
		}
	}
	let [errMsg,setErrMsg]=useState(null)
	let [msg, setMsg] = useState(null);

	console.log(data)

  return (
    <Fragment >
      <div
        className={`fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      <div
        className={`fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
				<div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-4/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between w-full pt-4"></div>
				{/* form start from here and model done */}
				{!data.loading ? 
				<>
			  {errMsg && <div className="text-lg text-red-500">{errMsg}</div>}
				{msg && <div className="text-lg text-green-500">{msg}</div>}
					<form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-3 py-4">
              <div className="w-1/2 flex flex-col space-y-3 space-x-3" style={{paddingLeft:'2rem',paddingRight:'2rem'}}>
                <label htmlFor="name">Draw Number</label>
                <input
								  required
                  value={data.no}
                  onChange={(e) =>
                    {setMsg(null);setErrMsg(null);
										setData({
                      ...data,
                      error: false,
                      success: false,
                      no: e.target.value,
                    })}
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-3 space-x-3" style={{paddingLeft:'2rem',paddingRight:'2rem'}}>
                <label htmlFor="name">Date</label>
                <input
								  required
                  value={data.date}
                  onChange={(e) =>
                    {setMsg(null);setErrMsg(null);
										setData({
                      ...data,
                      error: false,
                      success: false,
                      date: e.target.value,
                    })}
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="date"
                />
              </div>
            </div>
            <div className="flex space-x-3 py-4">
							{console.log(data)}
              <div className="w-1/2 flex flex-col space-y-3 space-x-3" style={{paddingLeft:'2rem',paddingRight:'2rem'}}>
                <label htmlFor="name">Time</label>
                <select
								  required
									name='time'
                  value={data.time}
									style={{display:'block'}}
                  onChange={(e) =>
                    {setMsg(null);setErrMsg(null);
										setData({
                      ...data,
                      error: false,
                      success: false,
                      time: e.target.value,
                    })}
                  }
                  >
										{[1,2,3,4,5,6,7,8,9,10,11,12].map(a=>{return<option value={`${a} AM`}>{`${a} AM`}</option>})}
										{[1,2,3,4,5,6,7,8,9,10,11,12].map(a=>{return<option value={`${a} PM`}>{`${a} PM`}</option>})}
									</select>
              </div>
							<div className="w-1/2 flex flex-col space-y-3 space-x-3" style={{paddingLeft:'2rem',paddingRight:'2rem'}}>
                <label htmlFor="name">First Price</label>
                <input
								  required
                  value={data.firstPrice}
                  onChange={(e) =>
                    {setMsg(null);setErrMsg(null);
										setData({
                      ...data,
                      error: false,
                      success: false,
                      firstPrice: e.target.value,
                    })}
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                />
              </div>
            </div>
            <div className="flex space-x-3 py-4">
              <div className="w-1/2 flex flex-col space-y-3 space-x-3" style={{paddingLeft:'2rem',paddingRight:'2rem'}}>
                <label htmlFor="name">Second Price</label>
                <input
								  required
                  value={data.secondPrice}
                  onChange={(e) =>
                    {setMsg(null);setErrMsg(null);
										setData({
                      ...data,
                      error: false,
                      success: false,
                      secondPrice: e.target.value,
                    })}
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                />
              </div>
							<div className="w-1/2 flex flex-col space-y-3 space-x-3" style={{paddingLeft:'2rem',paddingRight:'2rem'}}>
                <label htmlFor="name">Third Price</label>
                <input
								  required
                  value={data.thirdPrice}
                  onChange={(e) =>
                    {setMsg(null);setErrMsg(null);
										setData({
                      ...data,
                      error: false,
                      success: false,
                      thirdPrice: e.target.value,
                    })}
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                />
              </div>
            </div>
            <div className="flex space-y-3 space-x-3 w-1/2 pb-4 md:pb-6 mt-4" style={{margin:'auto'}}>
              <button
                style={{ background: "#303031" ,height:'40px',width:'150px',margin:'auto',borderRadius:'10px'}}
                type="submit"
                className="bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                {data._id ? 'Update Draw': 'Create draw'}
              </button>
              <button
                style={{ background: "#303031" ,height:'40px',width:'150px',margin:'auto',borderRadius:'10px'}}
								onClick={()=>setAddTable(false)}
                className="bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Cancel
              </button>
            </div>
          </form>
				</>:
				<div className="flex items-center justify-center p-8">
        <svg
          class="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        </div>
			}
				</div>
      </div>
    </Fragment>
  );
};


export default AddProductDetail;
