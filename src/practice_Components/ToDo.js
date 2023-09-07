import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'

function ToDo() {

    const [title, setTitle] = useState("")
    const [discrip, setDiscrip] = useState("")
    const [displayData, setDisplayData] = useState([])
    const [flag, setFlag] = useState(false)
    const [changeTitle, setChangeTitle] = useState("")
    const [changeDiscrip, setChangeDiscrip] = useState("")
    const [visible, setVisible] = useState(false)
    const[indexValue, setIndexValue] = useState("")

    const display = () => {
        const Todos = JSON.parse(localStorage.getItem('ToDos'))
        if(Todos === null){
            localStorage.setItem("ToDos", JSON.stringify([]))
        }
        else{
            for(let i=0; i<Todos.length; i++){
                const title = Todos[i].title
                const discription = Todos[i].discription
            }
            setDisplayData(Todos)
        }
    }

    const store = () => {
        if(!title || !discrip){
            setFlag(true)
        }else{
            const Todos = JSON.parse(localStorage.getItem('ToDos')) || [];
            const storeData = {title:title, discription: discrip};

            Todos.push(storeData);
            localStorage.setItem("ToDos", JSON.stringify(Todos));
            setDisplayData(Todos)
            setFlag(false)
        }
        const inputs = document.querySelectorAll('input');

  inputs.forEach(input => {
    input.value = '';
  }
  )
  setTitle('')
  setDiscrip('')
    }

    const removeItem = (index) => {
        const updatedFiles = [...(JSON.parse(localStorage.getItem('ToDos')))]; 
        updatedFiles.splice(index, 1); 
        localStorage.setItem("ToDos", JSON.stringify(updatedFiles));
        setDisplayData(updatedFiles);
    }

    const clearAll = (index) => {
        localStorage.clear('Todos')
        const updatedFiles = []; 
        localStorage.setItem("ToDos", JSON.stringify(updatedFiles));
        setDisplayData(updatedFiles);
    }

    const editItem = (index) => {
        const editDataArr = displayData
        setIndexValue(index)
        if (index >= 0 && index < editDataArr.length) {
            if(!changeTitle || !changeDiscrip){
                setChangeTitle(editDataArr[index].title)
                setChangeDiscrip(editDataArr[index].discription)
            }
            else{
        editDataArr[index].title = changeTitle;
        editDataArr[index].discription = changeDiscrip;
            }
        }
        localStorage.setItem("ToDos", JSON.stringify(editDataArr));
        setDisplayData(editDataArr);
        setVisible(!visible)
        setChangeTitle('')
        setChangeDiscrip('')
    }

    const editClose = (index) => {
        const editDataArr = displayData
        setIndexValue(index)
        if (index >= 0 && index < editDataArr.length) {
                setChangeTitle(editDataArr[index].title)
                setChangeDiscrip(editDataArr[index].discription)
            }

        localStorage.setItem("ToDos", JSON.stringify(editDataArr));
        setDisplayData(editDataArr);
        setVisible(false)
        setChangeTitle('')
        setChangeDiscrip('')
    }
    

    useEffect(()=>{
        display()
    },[])

  return (
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 col-12'>
        <div className='fs-3 fw-bold text-secondary'>ToDo Application</div>
        <div className='p-3 d-flex gap-5 shadow-lg  rounded col-11'>
            <input type='text' placeholder='ToDo Title' className='form-control'  name='input'
             onChange={(e)=> setTitle(e.target.value)}
            />
            <input type='text' placeholder='Discription' className='form-control' name='input'
            onChange={(e)=> setDiscrip(e.target.value)}
            />
            <button className="btn btn-primary text-nowrap fw-bold" onClick={store}>Create ToDo</button>
        </div>
        {flag && <div className='text-danger fs-4 fw-bold'>Please Enter Datas!...</div>}
        {displayData.length === 0 ? 
            <div className='text-success fs-4 fw-bold p-3 d-flex gap-5 shadow-lg d-flex justify-content-center rounded col-11 mt-5 Scroll'>Create Your ToDo</div>
        :
        <div className='col-11'>
        <div className='d-flex gap-5 justify-content-end col-12 p-3'>
            <div className='btn btn-danger fw-bold' onClick={clearAll}>cleare ToDos</div>
            <>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClick={() => editClose(indexValue)}>
        <CModalTitle>Edit ToDo Item</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <div className='p-3 d-flex flex-column gap-5 shadow-lg  rounded col-12'>
            <input type='text' placeholder='Edit ToDo Title' className='form-control' 
             value={changeTitle} onChange={(e)=> setChangeTitle(e.target.value)}
            />
            <input type='text' placeholder='Edit Discription' className='form-control'
            value={changeDiscrip} onChange={(e)=> setChangeDiscrip(e.target.value)}
            />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => editClose(indexValue)}>
          Close
        </CButton>
        <CButton color="primary" onClick={() => editItem(indexValue)}>Save changes</CButton>
      </CModalFooter>
    </CModal>
  </>
        </div>
        <div className='p-3 d-flex gap-5 shadow-lg  rounded col-12 Scroll'>
        <table className='table table-striped-columns shadow-lg  rounded'>
            <thead className='table-light'>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Discription</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody className='table-secondary'>
                {displayData.map((x,i)=>(
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{x.title}</td>
                    <td>{x.discription}</td>
                    <td><AiFillEdit style={{cursor:'pointer', fontSize:'30px',color:'#0d6efd'}} onClick={() => editItem(i)}/></td>
                    <td><AiFillDelete style={{cursor:'pointer', fontSize:'30px',color:'#dc3c45'}} onClick={()=>removeItem(i)}/></td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
        }
    </div>
  )
}

export default ToDo
