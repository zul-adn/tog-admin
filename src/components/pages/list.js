import React from 'react';
import { connect } from "react-redux";

import {
    getAllDatas,
    createName,
    getDetails,
    resetDetails
} from './../../store/app/action';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';  // without this line it didn't work

moment.locale('id');

function List({ datas, getAllDatas, createName, getDetails, resetDetails, datas_detail }) {

    const [dataas, setDataas] = React.useState([])
    const [tambahNama, setTambah] = React.useState(false)
    const [newName, setNewName] = React.useState('')
    const [updateNomor, setUpdateNomor] = React.useState('')
    const [isDetail, setIsDetail] = React.useState(false)
    const [nama, setNama] = React.useState('')

    const setVal = (dataaa) => {
        setTambah(false)
        setDataas(dataaa)
        document.querySelector('.modal-container').style.top = '0px'
    }

    const closeModal = () => {
        document.querySelector('.modal-container').style.top = '1000px'
    }

    const tambahNamaBaru = () => {
        setTambah(true)
        document.querySelector('.modal-container').style.top = '0px'
    }

    const createNew = () => {
        const body = {
            nama: newName
        }

        axios.post('https://dinartech.com/tog/public/api/createname', body)
            .then(response => {
                if (response.status === 200) {
                    getAllDatas()
                    closeModal()
                } else {

                }
            })
    }

    const updateNo = (id) => {
        const body = {
            id: id,
            nomor: updateNomor
        }

        axios.post('https://dinartech.com/tog/public/api/updatenomor', body)
            .then(response => {
                if (response.status === 200) {
                    getAllDatas()
                    closeModal()
                    setUpdateNomor("")
                } else {

                }
            })
    }

    const updateStatus = (id, status) => {
        const body = {
            id: id,
            status: status === '1' ? '0' : '1'
        }

        axios.post('https://dinartech.com/tog/public/api/updatestatus', body)
            .then(response => {
                if (response.status === 200) {
                    getAllDatas()
                    closeModal()
                    setUpdateNomor("")
                } else {

                }
            })
    }

    const getDetail = (name, id) => {
        setNama(name)
        setIsDetail(true)
        getDetails(id)
    }

    const resetDetail = () => {
        setIsDetail(false)
        resetDetails()
    }

    const del = (id) => {
        const body = {
            id: id,
        }

        axios.post('https://dinartech.com/tog/public/api/delete', body)
            .then(response => {
                if (response.status === 200) {
                    getAllDatas()
                    closeModal()
                    setUpdateNomor("")
                } else {

                }
            })
    }

    const delDetail = (id, id_nama) => {
        const body = {
            id: id,
        }
        axios.post('https://dinartech.com/tog/public/api/deletedetail', body)
            .then(response => {
                if (response.status === 200) {
                    getDetail(nama, id_nama)
                } else {

                }
            })
    }

    return (
        <div className="main-admin">

            <div className="modal-container">
                {tambahNama ?
                    <>
                        <div className="modal-header">
                            Tambah Nama
                        </div>
                        <div className="modal-body">
                            <input type="text" name="nama" placeholder="Nama" onChange={e => setNewName(e.target.value)} />
                            <button style={{ backgroundColor: '#273c75' }} onClick={createNew}>Tambah</button>
                            <button style={{ backgroundColor: '#e84118' }} onClick={closeModal}>Close</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="modal-header">
                            Update Nomor
                        </div>
                        <div className="modal-body">
                            <input type="text" name="username" placeholder="Nama" value={dataas.nama} readOnly />
                            <input type="text" name="password" placeholder="Nomor" onChange={e => setUpdateNomor(e.target.value)} />
                            <button style={{ backgroundColor: '#273c75' }} onClick={() => updateNo(dataas.id)}>Update</button>
                            <button style={{ backgroundColor: '#e84118' }} onClick={closeModal}>Close</button>
                        </div>
                    </>
                }
            </div>

            <div className="header">
                {!isDetail ? "List Togel" : nama}
            </div>
            <div className="table-container">
                {!isDetail ?
                    <table className="tb">
                        {datas.length !== 0 ?
                            datas.map((data, i) =>
                                <tr key={i} >
                                    <td onClick={() => getDetail(data.nama, data.id)}>{data.nama}</td>
                                    <td >{data.status === "1" ? <div><span className="open">Open</span></div> : <div><span className="close">Close</span></div>}</td>
                                    <td >{data.status === "1" ? data.nomor : <div><span className="close">Close</span></div>}</td>
                                    <td >
                                        <div >
                                            <div onClick={() => setVal(data)} style={{ padding: 5, textAlign: 'center', backgroundColor: data.status === '1' ? 'red' : '#273c75', color: 'white', borderRadius: 10 }} onClick={() => updateStatus(data.id, data.status)}>{data.status === '1' ? 'Tutup' : 'Buka'}</div>
                                            <div onClick={() => setVal(data)} style={{ padding: 5, textAlign: 'center', backgroundColor: '#273c75', color: 'white', borderRadius: 10 }}>Edit</div>
                                            <div onClick={() => del(data.id)} style={{ padding: 5, textAlign: 'center', backgroundColor: 'red', color: 'white', borderRadius: 10 }}>Hapus</div>
                                        </div>
                                    </td>
                                </tr>
                            )
                            :
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                Belum ada data...
                            </div>
                        }
                    </table>
                    :
                    <table className="tb">
                        {datas_detail.length !== 0 ?
                            datas_detail.map((data, i) =>
                                <tr key={i}>
                                    <td >{moment(data.created_at).format("dddd, Do MMMM YYYY")}</td>
                                    <td >{data.nomor}</td>
                                    <div onClick={() => delDetail(data.id, data.id_nama)} style={{ padding: 5, textAlign: 'center', backgroundColor: 'red', color: 'white', borderRadius: 10 }}>Hapus</div>
                                </tr>
                            )
                            :
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                Belum Ada Data
                            </div>
                        }
                    </table>
                }
            </div>
            {!isDetail ?
                <div className="footer" onClick={tambahNamaBaru}>
                    Tambah Nama
                </div>
                :
                <div className="footer-back" onClick={resetDetail}>
                    Kembali
                </div>
            }
        </div>
    )
}

const mapStateToProps = ({ app }) => {
    return {
        datas: app.datas,
        datas_detail: app.datas_detail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDatas: () => dispatch(getAllDatas()),
        createName: (payload) => dispatch(createName(payload)),
        getDetails: (payload) => dispatch(getDetails(payload)),
        resetDetails: () => dispatch(resetDetails())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

