import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmLoan from "./ConfirmLoan"
import moment from 'moment';

const AddLoan = (props) => {
    // const {action} = props
    const navigate = useNavigate()
    const [info,setInfo] = useState({})//client_id:null
    const [formInfoErr,setFormInfoErr] = useState({})
    const [user,setUser] = useState({})
    const [person,setPerson] = useState([])
    const [loan,setLoan] = useState([])
    console.log("this is info",info)

    // const [clientFullName,setFullName] =useState({})
    // const [clientId,setClientId] = useState(clientFullName._id)
    // const theId =clientFullName._id

console.log(info.dateAdded)
    useEffect(()=>{
        axios.get("http://localhost:8000/api/User/loggedUser",{withCredentials:true})
            .then(res=>{
            if(res.data.result){
                setUser(res.data.result)
            }
            }).catch(
                err=>{console.log("error",err) 
            navigate("/")
                })
        },[])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/People")
                .then(res =>{
                // console.log("this is the result",res)
                    setPerson(res.data.results)
                }).catch(err =>{
                    console.log(err)})
                },[])


    const logout =()=>{
        axios.get("http://localhost:8000/api/User/logout",{withCredentials:true})
        .then(res=>{
            navigate("/")
        }).catch(
            err=>{console.log("error",err) 
            }
        )
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Loan`)
        .then(res =>{
            console.log("loan result", res)
            setLoan(res.data)
        }).catch(err=>{ 
            console.log("error",err)
        })
    },[])


    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/loan/new", info )
        .then(res =>{
            console.log(res)
            if(res.data.err?.errors){
                setFormInfoErr(res.data.err.errors)
            }else{
                setFormInfoErr()
                navigate("/Prestamos") //change this to 
            }
        }).catch(
            err =>{console.log("there was an error", err)}
        )
    }


    const changeHandler = (e)=>{
        if(info?.interest == null || info?.latenessInterest == null|| info.dateAdded == null){
            setInfo({
                ...info,
                [e.target.name]: e.target.value,
                loanIdNumber:loan.count +1,
                interest: 10,
                latenessInterest: 10,
                dateAdded: moment(Date()).format("YYYY-MM-DD")
            })
        }else{
            setInfo({
                ...info,
                [e.target.name]: e.target.value,
            })
        }
    }
    console.log("this is the whole info ",info)

    const  ZeroPaddedInput=(number)=> {
        let newNumber = ""
        if (number < 10) {
            newNumber = `00${number}`;
        } else {
            newNumber = `0${number}`;
        }
        return newNumber
        };

    return (
        <div>
            <Link to="/Dashboard"><button className=' btn btn-secondary text-white'>todos los clientes</button> </Link>
            pass the id insted of the full name than get the name gorm the id 
                    <h1>Numero de préstamo : {ZeroPaddedInput(loan.count +1)} </h1>
            <form className='from-group' onSubmit={submitHandler} >
            <div>

            </div>
                <div>
                    <label >Cliente</label>
                    <select className='form-control' name="client_id"  onChange={changeHandler }>
                        <option disabled selected >seleccionar cliente</option>
                        {
                            person.map((p,idx)=>{
                                // <input  type="text" name="client_id" value={p._id} onChange={changeHandler}/>
                                    return <option key={p._id} value={p._id}>{p.fullName}</option>
                            })
                        }
                    </select>
                    {info.clientName?.length > 0 && info.clientName?.length < 2?
                    <p style={{color:"red"}}  >nombre debe de ser por lo menos 2 letras</p>:
                    formInfoErr.clientName? <p style={{color:"red"}} > {formInfoErr.clientName.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >fecha</label>
                    <input type="date" name="dateAdded"  className='form-control'defaultValue={moment(Date()).format("YYYY-MM-DD")} onChange={changeHandler}/>
                    {info.dateAdded?.length > 0 && info.dateAdded?.length < 2?
                    <p style={{color:"red"}} >debes de agregar el dia que el préstamo fue echo</p>:
                    formInfoErr.dateAdded? <p style={{color:"red"}} > {formInfoErr.dateAdded.message} </p>:
                    null
                }
                </div>

                <div>
                    <label>Monto prestado</label>
                    <input type="number" name="loanAmount" step={0.01} className='form-control' onChange={changeHandler}/>
                    {/* {info.loanAmount?.length > 0 && info?.loanAmount >= 100.00?
                    <p style={{color:"red"}}  >Monto debe de ser de por lo menos 100.00 pesos</p>: */}
                    {formInfoErr.loanAmount? <p style={{color:"red"}} > {formInfoErr.loanAmount.message} </p>:
                    null
                }
                </div>

                <div>
                    <label>Tasa/Interés</label>
                    <input type="number" name="interest" defaultValue={parseInt(10)} placeholder={parseInt(10)}  className='form-control'step="any" onChange={changeHandler} />
                    { info.interest?.length > 0 && info?.interest < 0?
                    <p style={{color:"red"}}  >debes de poner la tasa de interés</p>:
                    formInfoErr.interest? <p style={{color:"red"}} > {formInfoErr.interest.message} </p>:
                    null
                }
                </div>

                <div>
                    <label>mora/interés</label>
                    <input type="number" name="latenessInterest" defaultValue={parseInt(10)} placeholder={parseInt(10)}   className='form-control'step="any" onChange={changeHandler} />
                    { info.latenessInterest?.length > 0 && info?.latenessInterest < 0?
                    <p style={{color:"red"}}  >debes de poner la tasa de interés por mora</p>:
                    formInfoErr.interest? <p style={{color:"red"}} > {formInfoErr.interest.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >cuotas</label>
                    <input type="number" name="cuotasNumber" className='form-control'  onChange={changeHandler} />
                    {
                    formInfoErr.cuotasNumber? <p style={{color:"red"}} > {formInfoErr.cuotasNumber.message} </p>:
                    null
                }
                </div>

                <div>
                    <label >Tipo</label>
                    <select type="text" name="timeType"  className='form-control' onChange={changeHandler}>
                        <option selected disabled value="">seleccionara tipo</option>
                        <option  value="Semanal">Semanal</option>
                        <option  value="Quincenal">Quincenal</option>
                        <option  value="Mensual">Mensual</option>

                    </select>
                    {info.idNum?.length > 0 && info.idNum?.length < 6?
                    <p style={{color:"red"}}  >numero de identificación debe de tener 6 o mas letras o números</p>:
                    formInfoErr.idNum? <p style={{color:"red"}} > {formInfoErr.idNum.message} </p>:
                    null
                }
                </div>
                {info?.client_id == null ||info?.client_id == null? "":<ConfirmLoan formInfo={info} id={info.client_id} date={info.dateAdded} Amount={info.loanAmount} int={info.interest} cuotas={info.cuotasNumber} type={info.timeType} />
                }
                {/* <button className='btn btn-success' > agregar cliente </button> */}
                </form>
        </div>
    );
    };


export default AddLoan;