import React from 'react';
import { connect } from "react-redux";

import {
    getAllDatas,
    createName
} from './../../store/app/action';
import axios from 'axios';

function List({ datas, getAllDatas, createName }) {

    const [dataas, setDataas] = React.useState([])
    const [tambahNama, setTambah] = React.useState(false)
    const [newName, setNewName] = React.useState('')
    const [updateNomor, setUpdateNomor] = React.useState('')

    const setVal = (dataaa) => {
        setTambah(false)
        setDataas(dataaa)
        document.querySelector('.modal-container').style.top = '0px'
    }

    const closeModal = () => {
        document.querySelector('.modal-container').style.top = '700px'
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
            status: status === '1' ? '0' :'1'
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
                List Togel
            </div>
            <div className="table-container">
                <table className="tb">
                    {datas.length !== 0 ?
                        datas.map((data, i) =>
                            <tr key={i} >
                                <td >{data.nama}</td>
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
            </div>
            <div className="footer" onClick={tambahNamaBaru}>
                Tambah Nama
            </div>
        </div>
    )
}

const mapStateToProps = ({ app }) => {
    return {
        datas: app.datas,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDatas: () => dispatch(getAllDatas()),
        createName: (payload) => dispatch(createName(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

