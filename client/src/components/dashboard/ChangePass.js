import React, { Fragment, useState } from 'react';
import Axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

const ChangePass = ({ setChangePass }) => {
    const [data, setData] = useState({});

    async function submitForm(e) {
        e.preventDefault();
				if(!data.newPass || !data.oldPass || !data.confirmPass){
					setErrMsg('Please fill all the fields');
					return
				}
				if(data.newPass !== data.confirmPass){
					setErrMsg('Password does not match');
					return
				}
        setData({ ...data, loading: true });
				data.token=localStorage.getItem('jwtToken')
        let res = await Axios.post(`${apiURL}/api/users/change-pass`, data);
				setData({ ...data, loading: false });
        if (res.data.error) {
            setMsg(null);
            setErrMsg(res.data.error);
        } else {
            setMsg('Password Updated successfully');
            setData({oldPass:'',newPass:'',confirmPass:''});
            setErrMsg(null);
        }
    }
    let [errMsg, setErrMsg] = useState(null);
    let [msg, setMsg] = useState(null);

    return (
        <Fragment>
            <div className={`fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />
            <div className={`fixed inset-0 flex items-center z-30 justify-center overflow-auto`}>
                <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
                    <div className="flex items-center justify-between w-full pt-4"></div>
                    {/* form start from here and model done */}
                    {!data.loading ? (
                        <>
                            {errMsg && <div className="text-lg text-red-500">{errMsg}</div>}
                            {msg && <div className="text-lg text-green-500">{msg}</div>}
                            <form className="w-full" onSubmit={e => submitForm(e)}>
                                <div className="flex">
																	<label style={{marginTop:'3%',width:'22%'}} htmlFor="name">Old Password</label>
																	<input
																			required
																			value={data.oldPass}
																			onChange={e => {
																					setMsg(null);
																					setErrMsg(null);
																					setData({
																							...data,
																							error: false,
																							success: false,
																							oldPass: e.target.value,
																					});
																			}}
																			className="px-4 py-2 border focus:outline-none"
																			type="password"
																	/>
                                </div>
                                <div className="flex space-x-3 py-4">
																	<label style={{marginTop:'3%',width:'22%'}} htmlFor="name">New Password</label>
																	<input
																			required
																			value={data.newPass}
																			onChange={e => {
																			setMsg(null);
																			setErrMsg(null);
																			setData({
																					...data,
																					error: false,
																					success: false,
																					newPass: e.target.value,
																			});
																	}}
																	className="px-4 py-2 border focus:outline-none"
																	type="password"
															/>
                                </div>
																<div className="flex space-x-3 py-4">
																	<label style={{marginTop:'3%',width:'22%'}} htmlFor="name">Confirm Password</label>
																	<input
																			required
																			value={data.confirmPass}
																			onChange={e => {
																			setMsg(null);
																			setErrMsg(null);
																			setData({
																					...data,
																					error: false,
																					success: false,
																					confirmPass: e.target.value,
																			});
																	}}
																	className="px-4 py-2 border focus:outline-none"
																	type="password"
															/>
                              </div>
															<div className="flex space-y-3 space-x-3 w-1/2 pb-4 md:pb-6 mt-4" style={{margin:'auto'}}>
															<button
																style={{ background: "#303031" ,height:'40px',width:'150px',margin:'auto',borderRadius:'10px'}}
																type="submit"
																className="bg-gray-800 text-gray-100 text-lg font-medium py-2"
															>
																Update Password
															</button>
															<button
																style={{ background: "#303031" ,height:'40px',width:'150px',margin:'auto',borderRadius:'10px'}}
																onClick={()=>setChangePass(false)}
																className="bg-gray-800 text-gray-100 text-lg font-medium py-2"
															>
																Cancel
															</button>
														</div>
                            </form>
                        </>
                    ) : (
                        <div className="flex items-center justify-center p-8">
                            <svg
                                class="w-12 h-12 animate-spin text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ChangePass;
