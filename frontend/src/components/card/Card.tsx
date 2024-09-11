import { ShopStore } from '../../store/Shop.store';
import Payment from '../mercadoPago/Payment';
import Spinner from '../Spinner';
import styles from './Card.module.css';

interface CardProps {
  quantity: number;
  price: number;
  amount: number;
  description: string;
}

const Card = (producto: CardProps) => {
  const { mpPreferenceId, isLoadingShop } = ShopStore();
  const handleBuyClick = async () => {
    if (!producto) return alert('Error falta de producto');
    await mpPreferenceId(producto);
  };

  return (
    <>
      {isLoadingShop && <Spinner />}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Product</div>
          <div className={styles.cardPrice}>${producto.price}</div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardDescription}>{producto.description}</div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardQuantity}>
            Quantity: {producto.quantity}
          </div>
          <div className={styles.cardAmount}>Total: ${producto.amount}</div>
        </div>
        <button className={styles.buyButton} onClick={handleBuyClick}>
          Comprar
        </button>
        <Payment />
      </div>
    </>
  );
};

export default Card;
