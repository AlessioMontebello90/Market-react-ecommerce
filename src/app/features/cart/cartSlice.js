import { createSlice } from "@reduxjs/toolkit";

// Recupero lista prodotti dal localStorage o inizializzazione a lista vuota
const storedCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

// Stato iniziale del carrello con lista prodotti recuperata
const initialState = {
  cartList: storedCartList,
};

// Creazione di uno slice Redux per la gestione del carrello
export const cartSlice = createSlice({
  name: "cart", // Nome dello slice
  initialState, // Stato iniziale
  reducers: {
    // Aggiunge un prodotto al carrello
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productExit = state.cartList.find(
        (item) => item.id === productToAdd.id
      );
      // Se il prodotto esiste già, aggiorna la quantità
      if (productExit) {
        state.cartList = state.cartList.map((item) =>
          item.id === action.payload.product.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item
        );
      } else {
        // Altrimenti, aggiunge il prodotto come nuovo
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    // Diminuisce la quantità di un prodotto
    decreaseQty: (state, action) => {
      const productTodecreaseQnty = action.payload;
      const productExit = state.cartList.find(
        (item) => item.id === productTodecreaseQnty.id
      );
      // Se la quantità è 1, rimuove il prodotto
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter(
          (item) => item.id !== productExit.id
        );
      } else {
        // Altrimenti, diminuisce la quantità del prodotto
        state.cartList = state.cartList.map((item) =>
          item.id === productExit.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        );
      }
    },
    // Elimina completamente un prodotto dal carrello
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.id !== productToDelete.id
      );
    },
  },
});

// Middleware per salvare il carrello nel localStorage dopo ogni modifica
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  // Se l'azione riguarda il carrello, aggiorna il localStorage
  if (action.type?.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }
  return result;
};

// Esportazione delle azioni per l'uso nel componente
export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

// Esportazione del reducer del carrello
export default cartSlice.reducer;
