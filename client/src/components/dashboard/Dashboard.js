import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AddTable from './AddTable'
import ChangePass from './ChangePass'
import AllDraws from './AllDraws'
import Axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;


function Dashboard (props) {
  function onLogoutClick (e){
    e.preventDefault();
    props.logoutUser();
  };

	let [addTable,setAddTable] = useState(false)
	let [changePass,setChangePass] = useState(false)
	let [date, setDate] = useState(null);
	let [update, setUpdate] = useState('');
	let [editData, setEditData] = useState(null);
	let [draws, setDraws] = useState('');

	useEffect(()=>{
		async function fetchData() {
			let res = await Axios.get(`${apiURL}/api/draw/get${date ? `?date=${date}` :''}`);
			setDraws(res.data);
		}
		fetchData();		
	},[date,update])
	return (
		<>
		<div style={{margiTop:'2rem'}}>
			<button
		    style={{
					float:'left',
					margin:'1rem',
					borderRadius: '3px',
					letterSpacing: '1.5px',
        }}
			onClick={() => {setEditData({
					no: '',
					date: '',
					thirdPrice: '',
					secondPrice: '',
					firstPrice: '',
					time:'7 AM'
			});setAddTable(true)}}
			className="btn btn-medium waves-effect waves-light hoverable blue accent-3">Add new </button>
			<button
        style={{
					float:'right',
					margin:'1rem',
					borderRadius: '3px',
					letterSpacing: '1.5px',
        }}
        onClick={onLogoutClick}
        className="btn btn-medium waves-effect waves-light hoverable blue accent-3">
        Logout
      </button>
			<button
        style={{
					float:'right',
					margin:'1rem',
					borderRadius: '3px',
					letterSpacing: '1.5px',
        }}
        onClick={()=>setChangePass(true)}
        className="btn btn-medium waves-effect waves-light hoverable blue accent-3">
        Change Password
      </button>
    </div>
		<div className="flex space-x-3 py-4 ">
		<div className="w-1/3 flex flex-col space-y-3 space-x-3" >
			<label htmlFor="name">Date</label>
			<input
				required
				value={date?date:'dd/mm/yyyy'}
				onChange={(e) =>					
				setDate( e.target.value)}				
				className="px-4 py-2 border focus:outline-none"
				type="date"
			/>
		</div>
		<div className="w-1/10 flex flex-col space-y-3 space-x-3" style={{marginBottom:'1.3rem',justifyContent:'flex-end',fontSize:'1.5rem'}} >
			<button title='Clear date' onClick={()=>setDate(null)}>X</button>
		</div>
		</div>
    <AllDraws {...{setAddTable,draws,setEditData,update, setUpdate,date}}/>
    {addTable && <AddTable {...{setAddTable,editData, update, setUpdate}}/>}
		{changePass && <ChangePass {...{setChangePass}}/>}
		</>
	);
}


Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
