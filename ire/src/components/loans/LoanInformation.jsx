import React from 'react';


const LoanInformation = ({ payments, totalInterest, totalPrincipal, dates ,total,totalCapital}) => {


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='"row justify-content-center"' >
            <div className='col-auto'>
    <table className='table table-responsive ' style={{width:"75%"}}>
        <thead className='text-center'>
        <tr >
            <th >fecha de pago</th>
            <th >#cuota</th>
            <th >Pago a interés</th>
            <th >Pago a capital</th>
            <th>cuota</th>
            <th  >Balance</th>
        </tr>
        </thead>
        <tbody className='text-center'>
        {payments.map((payment, index) => (
            <tr key={index}>
            <td>{payment.paymentDate}</td>
            <td>{payment._id}</td>
            <td>{numberWithCommas(payment.interestPayment.toFixed(2))}</td>
            <td>{numberWithCommas(payment.capitalPayment.toFixed(2))}</td> 
            <td>{numberWithCommas(payment.principalPayment.toFixed(2))}</td>
            <td>{numberWithCommas(payment.balance.toFixed(2))}</td> 
            </tr>
        ))}
        </tbody>
        <tfoot className='text-center' >
        <tr>
            <td>Total</td>
            <td>{numberWithCommas(total.toFixed(2))}</td>
            <td>{numberWithCommas(totalInterest.toFixed(2))}</td>
             <td>{numberWithCommas(totalCapital.toFixed(2))}</td>
            <td>{numberWithCommas(totalPrincipal.toFixed(2))}</td>
            <td></td>
        </tr>
        </tfoot>
    </table>
    </div>
    </div>
    );
};

export default LoanInformation;
