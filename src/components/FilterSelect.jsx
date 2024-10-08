import Select from 'react-select';
import { products } from '../utils/products';

// Opzioni di categorie disponibili per il filtro
const options = [
    { value: "sofa", label: "Sofa" },
    { value: "chair", label: "Chair" },
    { value: "watch", label: "Watch" },
    { value: "mobile", label: "Mobile" },
    { value: "wireless", label: "Wireless" },
];

// Stili personalizzati per il componente Select
const customStyles = {
    control: (provided) => ({
        // Stili per l'elemento di controllo principale (input del Select)
        ...provided,
        backgroundColor: "#0f3460", // Colore di sfondo
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px", // Larghezza del Select
        height: "40px", // Altezza del Select
    }),
    option: (provided, state) => ({
        // Stili per le opzioni nel menu a tendina
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white", // Colore di sfondo selezionato
        color: state.isSelected ? "white" : "#0f3460", // Colore del testo selezionato
        "&:hover": {
        backgroundColor: "#0f3460", // Colore di sfondo al passaggio del mouse
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        // Stile per il valore selezionato visualizzato
        ...provided,
        color: "white",
    }),
};

// Componente che rende il filtro Select e aggiorna la lista filtrata
const FilterSelect = ({setFilterList}) => {
    // Funzione che gestisce il cambiamento della selezione
    const handleChange = (selectedOption)=> {
        // Filtra i prodotti in base alla categoria selezionata
        setFilterList(products.filter(item => item.category ===selectedOption.value))
    }
    return (
    <Select
    options={options} // Opzioni di filtro
    defaultValue={{ value: "", label: "Filter By Category" }} // Valore predefinito del Select
    styles={customStyles} // Applica gli stili personalizzati
    onChange={handleChange} // Assegna l'handler per il cambiamento di selezione
    />
    );
};

export default FilterSelect;
