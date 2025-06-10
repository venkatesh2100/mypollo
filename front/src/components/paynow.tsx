import { useState } from 'react';
import toast from 'react-hot-toast';

const PayNow = ({ onClose, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointmentGetAdmin/${appointment.id}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     amount: 500,
      //     currency: 'Ruppe',
      //     paymentMethod: 'card'
      //   })
      // });

      // if (!paymentResponse.ok) {
      //   throw new Error('Payment failed');
      // }

      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success("Payment of $500 received successfully!");
      onPaymentSuccess();
      onClose();
    } catch (error) {
      console.log(error)
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Your Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <p className="text-lg font-semibold">Amount: ₹500.00</p>
            <p className="text-sm text-gray-600">For your appointment booking</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 2) {
                    value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                  }
                  e.target.value = value;
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isProcessing ? 'Processing...' : 'Pay ₹500'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayNow;
