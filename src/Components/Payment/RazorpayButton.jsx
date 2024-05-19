import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const RazorpayButton = ({ order }) => {
    const { rzId, amount, _id } = order;
    const navigate = useNavigate();
    const orderId = rzId;
    const appOrderId = _id;
    const rzKey = import.meta.env.VITE_RZ_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;
    // const userId = '65c114022931680e9a1531ed';
    useEffect(() => {
        const loadRazorpay = async () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const options = {
                    key: rzKey,
                    amount: amount * 100,
                    currency: 'INR',
                    name: 'Brain Child',
                    description: 'Order Transaction',
                    image: 'https://static.vecteezy.com/system/resources/thumbnails/011/401/535/small/online-shopping-trolley-click-and-collect-order-logo-design-template-vector.jpg',
                    orderId,
                    handler: async function (response) {
                        try {
                            const resp = await axios.post(`${apiUrl}/parent/paymentsuccess/${rzId}`)
                            console.log(resp, "paymetn suces resp");
                            if (resp.status === 200) {
                                console.log("sucess");
                                navigate("/parentdashboard/courserequests")
                            }
                            else{
                                toast.error("something went wrong!");
                            }
                        } catch (error) {
                            toast.error("Payment failed");
                        }

                    }
                };

                const rzp1 = new window.Razorpay(options);

                rzp1.on('payment.failed', function (response) {
                    alert("payment failed")
                    // alert(response.error.code);
                    // alert(response.error.description);
                    // alert(response.error.source);
                    // alert(response.error.step);
                    // alert(response.error.reason);
                    // alert(response.error.metadata.order_id);
                    // alert(response.error.metadata.payment_id);
                });

                const button = document.getElementById('rzp-button1');
                if (button) {
                    button.onclick = (e) => {
                        rzp1.open();
                        e.preventDefault();
                    };
                }
            };
        };

        loadRazorpay();
    }, []);

    return (
        <>

            <button id="rzp-button1" className='py-2 px-3 bg-green-500 text-white font-bold text-lg rounded-md my-3'>Proceed To Pay</button>
            <ToastContainer />
        </>

    );
};

export default RazorpayButton;
