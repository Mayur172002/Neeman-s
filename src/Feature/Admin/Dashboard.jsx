import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from './Navbar'

function Dashboard() {
    return (
        <div>
       
            <div className="container-scroller">
                {/* partial:partials/_sidebar.html */}
                <Navbar/>
                {/* partial */}
                <div className="container-fluid page-body-wrapper">
                    <div className="main-panel">
                        <div className="content-wrapper">
                        <div className="row">
                                <div className="col-sm-4 grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>Revenue</h5>
                                            <div className="row">
                                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                                        <h2 className="mb-0">$32123</h2>
                                                        <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                                                    </div>
                                                    <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
                                                </div>
                                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>Sales</h5>
                                            <div className="row">
                                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                                        <h2 className="mb-0">$45850</h2>
                                                        <p className="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
                                                    </div>
                                                    <h6 className="text-muted font-weight-normal"> 9.61% Since last month</h6>
                                                </div>
                                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                                    <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>Purchase</h5>
                                            <div className="row">
                                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                                        <h2 className="mb-0">$2039</h2>
                                                        <p className="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
                                                    </div>
                                                    <h6 className="text-muted font-weight-normal">2.27% Since last month</h6>
                                                </div>
                                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                                    <i className="icon-lg mdi mdi-monitor text-success ml-auto" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-12 grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Order Status</h4>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <div className="form-check form-check-muted m-0">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" />
                                                                    </label>
                                                                </div>
                                                            </th>
                                                            <th> Client Name </th>
                                                            <th> Order No </th>
                                                            <th> Product Cost </th>
                                                            <th> Project </th>
                                                            <th> Payment Mode </th>
                                                            <th> Start Date </th>
                                                            <th> Payment Status </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check form-check-muted m-0">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <img src="Admin/assets/images/faces/face1.jpg" alt="image" />
                                                                <span className="pl-2">Henry Klein</span>
                                                            </td>
                                                            <td> 02312 </td>
                                                            <td> $14,500 </td>
                                                            <td> Dashboard </td>
                                                            <td> Credit card </td>
                                                            <td> 04 Dec 2019 </td>
                                                            <td>
                                                                <div className="badge badge-outline-success">Approved</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check form-check-muted m-0">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <img src="Admin/assets/images/faces/face2.jpg" alt="image" />
                                                                <span className="pl-2">Estella Bryan</span>
                                                            </td>
                                                            <td> 02312 </td>
                                                            <td> $14,500 </td>
                                                            <td> Website </td>
                                                            <td> Cash on delivered </td>
                                                            <td> 04 Dec 2019 </td>
                                                            <td>
                                                                <div className="badge badge-outline-warning">Pending</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check form-check-muted m-0">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <img src="Admin/assets/images/faces/face5.jpg" alt="image" />
                                                                <span className="pl-2">Lucy Abbott</span>
                                                            </td>
                                                            <td> 02312 </td>
                                                            <td> $14,500 </td>
                                                            <td> App design </td>
                                                            <td> Credit card </td>
                                                            <td> 04 Dec 2019 </td>
                                                            <td>
                                                                <div className="badge badge-outline-danger">Rejected</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check form-check-muted m-0">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <img src="Admin/assets/images/faces/face3.jpg" alt="image" />
                                                                <span className="pl-2">Peter Gill</span>
                                                            </td>
                                                            <td> 02312 </td>
                                                            <td> $14,500 </td>
                                                            <td> Development </td>
                                                            <td> Online Payment </td>
                                                            <td> 04 Dec 2019 </td>
                                                            <td>
                                                                <div className="badge badge-outline-success">Approved</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check form-check-muted m-0">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <img src="Admin/assets/images/faces/face4.jpg" alt="image" />
                                                                <span className="pl-2">Sallie Reyes</span>
                                                            </td>
                                                            <td> 02312 </td>
                                                            <td> $14,500 </td>
                                                            <td> Website </td>
                                                            <td> Credit card </td>
                                                            <td> 04 Dec 2019 </td>
                                                            <td>
                                                                <div className="badge badge-outline-success">Approved</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Visitors by Countries</h4>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <i className="flag-icon flag-icon-us" />
                                                                    </td>
                                                                    <td>USA</td>
                                                                    <td className="text-right"> 1500 </td>
                                                                    <td className="text-right font-weight-medium"> 56.35% </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <i className="flag-icon flag-icon-de" />
                                                                    </td>
                                                                    <td>Germany</td>
                                                                    <td className="text-right"> 800 </td>
                                                                    <td className="text-right font-weight-medium"> 33.25% </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <i className="flag-icon flag-icon-au" />
                                                                    </td>
                                                                    <td>Australia</td>
                                                                    <td className="text-right"> 760 </td>
                                                                    <td className="text-right font-weight-medium"> 15.45% </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <i className="flag-icon flag-icon-gb" />
                                                                    </td>
                                                                    <td>United Kingdom</td>
                                                                    <td className="text-right"> 450 </td>
                                                                    <td className="text-right font-weight-medium"> 25.00% </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <i className="flag-icon flag-icon-ro" />
                                                                    </td>
                                                                    <td>Romania</td>
                                                                    <td className="text-right"> 620 </td>
                                                                    <td className="text-right font-weight-medium"> 10.25% </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <i className="flag-icon flag-icon-br" />
                                                                    </td>
                                                                    <td>Brasil</td>
                                                                    <td className="text-right"> 230 </td>
                                                                    <td className="text-right font-weight-medium"> 75.00% </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-md-7">
                                                    <div id="audience-map" className="vector-map" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content-wrapper ends */}
                       
                        {/* partial */}
                    </div>
                    {/* main-panel ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>

        </div>
    )
}

export default Dashboard