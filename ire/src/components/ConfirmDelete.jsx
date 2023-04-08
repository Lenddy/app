import {useState} from 'react';
import {Modal,Button} from "react-bootstrap"
import axios from 'axios';
import DashBoard from './DashBoard';
import { useNavigate } from 'react-router-dom';

const ConfirmDelete = (props) => {
    const {id,reload, name} = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deleted,setDeleted] = useState(false)
    const navigate = useNavigate()

        const deleteHandler = (id)=>{
            axios.delete(`http://localhost:8000/api/People/delete/${id}`)
            .then(res =>{
                console.log(res)
                setDeleted(!deleted);
                if(reload){
                <DashBoard refresh={reload()}/>
                }else{
                    navigate("/DashBoard")
                }
            }).catch(err=>console.log(err));
            handleClose();
        }

    return (
        <>
    <Button variant="danger" onClick={handleShow}>
        Borrar Cliente
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Vas a Borrar a {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body> si este cliente es borrado no podrás recuperar su información </Modal.Body>
        <Modal.Footer >
        <Button variant="success" onClick={handleClose}>
            cancelar
        </Button>
        <Button variant="danger" onClick={()=>{deleteHandler(id) }}>
            confirmar
        </Button>
        </Modal.Footer>
    </Modal>
        </>
    );
};



export default ConfirmDelete;