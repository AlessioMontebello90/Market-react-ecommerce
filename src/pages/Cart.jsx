import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

// Componente Cart che visualizza gli articoli nel carrello
const Cart = () => {
  // Recupera la lista del carrello dallo store Redux
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calcola il prezzo totale degli articoli nel carrello
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  // Effettua lo scroll in alto quando il componente è montato
  useEffect(() => {
    window.scrollTo(0, 0);
    // Codice commentato per ripristinare il carrello dallo storage, se necessario
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Messaggio se il carrello è vuoto */}
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {/* Mappatura degli articoli presenti nel carrello */}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      {/* Immagine del prodotto */}
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span> {/* Prezzo per quantità */}
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          {/* Pulsante per incrementare la quantità */}
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          {/* Pulsante per diminuire la quantità */}
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    {/* Pulsante per rimuovere il prodotto dal carrello */}
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            {/* Sezione riepilogo del carrello */}
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice}.00</h3> {/* Visualizza il prezzo totale */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
