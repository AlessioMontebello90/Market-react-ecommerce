import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner"; // Importa il componente Banner
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList"; // Importa la lista dei prodotti
import { products } from "../utils/products"; // Importa i prodotti disponibili
import { useParams } from "react-router-dom"; // Per ottenere l'ID del prodotto dall'URL
import ProductDetails from "../components/ProductDetails/ProductDetails"; // Dettagli del prodotto
import ProductReviews from "../components/ProductReviews/ProductReviews"; // Recensioni del prodotto
import useWindowScrollToTop from "../hooks/useWindowScrollToTop"; // Hook per scrollare in alto

// Componente Product che visualizza i dettagli del prodotto selezionato
const Product = () => {
  const { id } = useParams(); // Recupera l'ID del prodotto dai parametri dell'URL
  const [selectedProduct, setSelectedProduct] = useState(
    // Trova il prodotto corrispondente all'ID passato
    products.filter((item) => parseInt(item.id) === parseInt(id))[0]
  );
  const [relatedProducts, setRelatedProducts] = useState([]); // Stato per i prodotti correlati

  // Effetto che si attiva ogni volta che cambia il prodotto selezionato o l'ID
  useEffect(() => {
    // Scorri la finestra verso l'alto all'apertura della pagina
    window.scrollTo(0, 0);
    // Aggiorna il prodotto selezionato
    setSelectedProduct(
      products.filter((item) => parseInt(item.id) === parseInt(id))[0]
    );
    // Trova i prodotti correlati della stessa categoria, escluso il prodotto corrente
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === selectedProduct?.category &&
          item.id !== selectedProduct?.id
      )
    );
  }, [selectedProduct, id]); // Dipendenze: cambia al variare di selectedProduct o id

  useWindowScrollToTop(); // Custom hook per scrollare sempre in cima

  return (
    <Fragment>
      {/* Banner con il nome del prodotto */}
      <Banner title={selectedProduct?.productName} />
      {/* Dettagli del prodotto selezionato */}
      <ProductDetails selectedProduct={selectedProduct} />
      {/* Recensioni del prodotto selezionato */}
      <ProductReviews selectedProduct={selectedProduct} />
      {/* Sezione per i prodotti correlati */}
      <section className="related-products">
        <Container>
          <h3>You might also like</h3> {/* Titolo della sezione */}
        </Container>
        {/* Lista dei prodotti correlati */}
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
