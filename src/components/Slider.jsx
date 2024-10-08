import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Importazione del file CSS per la libreria slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Importazione del tema di slick-carousel
import { Container } from "react-bootstrap"; // Importazione del componente Container di react-bootstrap
import SlideCard from "./SliderCard/SlideCard"; // Importazione del componente SlideCard
import { SliderData } from "../utils/products"; // Importazione dei dati per lo slider

// Componente SliderHome che renderizza un carosello di SlideCard
const SliderHome = () => {
  // Configurazione delle opzioni per lo slider
  const settings = {
    nav: false, // Disabilita i controlli di navigazione
    infinite: true, // Abilita lo scorrimento infinito
    slidesToShow: 1, // Mostra una slide per volta
    slidesToScroll: 1, // Scorri una slide alla volta
    autoplay: true, // Abilita la riproduzione automatica
  };

  return (
    <section className='homeSlide'>
      <Container>
        {/* Slider con le impostazioni configurate */}
        <Slider {...settings}>
          {/* Mappatura dei dati dello slider per renderizzare le singole SlideCard */}
          {SliderData.map((value, index) => {
            return (
              <SlideCard 
                key={index} // Chiave univoca per ogni slide
                title={value.title} // Titolo della slide
                cover={value.cover} // Immagine di copertina
                desc={value.desc} // Descrizione della slide
              />
            );
          })}
        </Slider>
      </Container>
    </section>
  );
};

export default SliderHome;
