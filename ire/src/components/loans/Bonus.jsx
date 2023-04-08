import {useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Button,Modal } from 'react-bootstrap';
import OneLoan from "./OneLoan"


const Bonus = (props) => {

    const {id,payments} = props
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState();
    const [error,setError] = useState({})
    const [number,setNumber] = useState()
    const [loan,setLoan] = useState({})


    // console.log("this is the id:",id,"\n this is payments",payments)


    const numberWithCommas=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const changeHandler=(e)=>{
        setSelected( e.target.value)
    }


    // !sent a variable  boolean that switches from false to  true when you click the undo(anular) btn an  and attach this variable to the use effect that renders the cuotas  and also set the show to be false when click
    const submitHandler=(e,payment_id)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/Loan/update/status/undo/${id}/${payment_id}`)
        .then(res =>{
            console.log(res.data.results)
            if(payment_id == null || payment_id == undefined){
                setError({err:"debes de seleccionar una cuota "})
            }else{
                <OneLoan cancelPayment={alertUser} />
                setError()
                // setShow(false)
                axios.get(`http://localhost:8000/api/Loan/${id}`)
                .then(res =>{
                setLoan(res.data.results)
                console.log(res.data.results.payments)

        }).catch(err=>{ 
            console.log("error",err)
        })
                navigate(`/Prestamos/${id}`)
            }
        }).catch(err=>{ 
            console.log("error",err)
        })
    }


    const alertUser =()=>{
        // aria-label="Close"
         return(
            //<div className="alert alert-warning alert-dismissible fade show" role="alert">
        //         <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        //         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        //         <span aria-hidden="true">&times;</span>
        //         </button>
        //     </div>    alert-dismissible fade show    role="alert"
            <div className="alert alert-warning " >
                <a href='#' className='close'data-dismiss="alert" >&times</a>
                <strong>cuota {selected}!</strong> a sido anulada
        </div>
        )
    }

    const arePaid=()=>{
            let paid = payments.filter(p=> p.isPaid == true)
            return paid.length
    } 
    return (
        <div>

        <Button className="btn btn-danger mt-3 d-inline-flex" onClick={() =>{ setShow(true);} }> 
        Abono
        </Button>

    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header  closeButton>
        <Modal.Title  >Numero de cuotas: {arePaid()}  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <form onSubmit={e=>submitHandler(e,selected)}>
                    <>
                        {
                            payments.filter(p=> p.isPaid == true).map((p,idx)=>{
                                
                                return(
                                <div key={p._id}>
                                <ul key={p._id}>
                                <li value={p._id} key={p._id}>{`${p?._id}|${p?.paymentDate}|${numberWithCommas(p?.principalPayment.toFixed(2))}`}</li>
                                <button className="btn btn-success" value={p._id} onClick={e=>{changeHandler(e); alertUser()}} >anular cuota: {p?._id} </button>
                                </ul>
                                </div>
                                )
                            })
                        }
                    </>
                    {
                        error !== undefined || error !== null?<p className="text-danger">{error?.err}</p>:
                        selected !== null || selected !== undefined? null:
                        <p className="text-danger">{error?.err}</p>
                    }
                        
                    </form>
        </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
        <Button variant="danger text-center" onClick={() => setShow(false)}>
            volver a pago de cuotas
        </Button>
        </Modal.Footer>
    </Modal> 
            </div>
    )
};


export default Bonus;