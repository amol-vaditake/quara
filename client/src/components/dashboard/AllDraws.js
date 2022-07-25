import React, { Fragment, useContext, useEffect, useState } from 'react';
import Axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;


const AllDraws = ({draws, update , date, setEditData, setAddTable,setUpdate}) => {
	let [data,setData] = useState({})
	const deleteReq = async id => {
       let res = await Axios.get(`${apiURL}/api/draw/delete/${id}`);
			 if(res.data.success){
				 setUpdate(!update)
			 }
  };

	const setalerts=(msg,type)=>{
    if(type==='success')
    setData({success:msg,error:false})
    if(type==='error')
    setData({success:false,error:msg})
  }
    /* This method call the editmodal & dispatch draw context */
    const editDraw = (id, draw, type) => {
			draw.date=draw.date.substring(0, 10);	
			draw.time=draw.time.substring(0, 5);
			setEditData(draw);
			setAddTable(true);
    };

    if (data.loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <svg
                    className="w-12 h-12 animate-spin text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="col-span-1 overflow-auto bg-white shadow-lg p-4" style={{marginTop:'5rem'}}>
                <table className="table-auto border w-full my-2">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Number</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Time</th>
                            <th className="px-4 py-2 border">First Price</th>
                            <th className="px-4 py-2 border">Second Price</th>
                            <th className="px-4 py-2 border">Third Price</th>
														<th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {draws && draws.length > 0 ? (
                            draws.map((item, key) => {
                                return (
                                    <Table
                                        setalert={setalerts}
                                        draw={item}
                                        editDraw={(id, draw, type) => editDraw(id, draw, type)}
                                        deleteDraw={id => deleteReq(id)}
                                        key={key}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-xl text-center font-semibold py-8">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="text-sm text-gray-600 mt-2">Total {draws && draws.length} draws found</div>
            </div>
        </Fragment>
    );
};


const Table = ({ draw, deleteDraw, editDraw, setalert }) => {
    return (
        <Fragment>
            <tr>
                <td className="p-2 text-center">{draw.no}</td>
								<td className="p-2 text-center">{new Date(draw.date).toLocaleDateString()}</td>
								<td className="p-2 text-center">{draw.time}</td>
								<td className="p-2 text-center">{draw.firstPrice}</td>
								<td className="p-2 text-center">{draw.secondPrice}</td>
								<td className="p-2 text-center">{draw.thirdPrice}</td>
                <td className="p-2 flex items-center justify-center">
                    <span
                        onClick={e => editDraw(draw._id, draw, true)}
                        className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1">
                        <svg
                            className="w-6 h-6 fill-current text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>

                    <span
                        onClick={e => deleteDraw(draw._id)}
                        className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1">
                        <svg
                            className="w-6 h-6 fill-current text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </td>
            </tr>
        </Fragment>
    );
};

export default AllDraws;
