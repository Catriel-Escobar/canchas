import { Wallet } from '@mercadopago/sdk-react';

import { ShopStore } from '../../store/Shop.store';

const Payment = () => {
  const { preferenceId, order } = ShopStore();

  const renderCheckoutButton = (preferenceId: string) => {
    if (!preferenceId) return null;

    return <Wallet initialization={{ preferenceId: preferenceId }} />;
  };

  if (preferenceId && order)
    return (
      <div>
        <div className='container_payment'>
          <div className='block-heading'>
            <h2>Checkout Payment</h2>
            <p>This is an example of a Mercado Pago integration</p>
          </div>
          <div className='form-payment'>
            <div className='products'>
              <h2 className='title'>Summary</h2>
              <div className='item'>
                <span className='price' id='summary-price'>
                  ${order?.price}
                </span>
                <p className='item-name'>
                  Book X <span id='summary-quantity'>{order?.quantity}</span>
                </p>
              </div>
              <div className='total'>
                Total
                <span className='price' id='summary-total'>
                  ${order.amount}
                </span>
              </div>
            </div>
            <div className='payment-details'>
              <div className='form-group col-sm-12'>
                {renderCheckoutButton(preferenceId)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Payment;
