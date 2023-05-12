// import { createContext, useState } from "react";

// export const cardContext = createContext({
//   items: [],
//   totalAmount: 0,
// });

// export const CardProvider = ({ children }) => {
//   const [cardState, setCardState] = useState([]);

//   const amount = cardState.reduce((prev, current) => prev + current.amount, 0);

//   function addItem(data) {
//     if (!cardState.length) {
//       return setCardState([data]);
//     }
//     const isExist = cardState.find((item) => item.title === data.title);

//     if (!isExist) {
//       return setCardState([...cardState, data]);
//     }
//     console.log(isExist, "isExist");

//     const updateItem = cardState.map((item) => {
//       if (item.id === data.id) {
//         return {
//           ...item,
//           amount: item.amount + data.amount,
//         };
//       }
//       return item;
//     });
//     setCardState([...updateItem]);
//   }
//   console.log(cardState);
//   const cardValue = {
//     items: cardState,
//     addItem,
//     totalAmount: amount,
//   };

//   return (
//     <cardContext.Provider value={cardValue}>{children}</cardContext.Provider>
//   );
// };

import { createContext, useEffect, useReducer } from "react";
import { fetchRequest } from "../lib/fetAPI";

export const CardContext = createContext({
  items: [],
  totalAmount: 0,
});

const ACTION_TYPES = {
  ADD: "ADD",
  DEC: "DECREMENT",
  INC: "INCREMENT",
  BASKET: "BASKET",
  
};

const reducerCard = (state, action) => {
  if (action.type === ACTION_TYPES.ADD) {
    return (state = action.payload);
  }
  if (action.type === ACTION_TYPES.BASKET) {
    return (state = action.payload);
  }
  if (action.type === ACTION_TYPES.INC) {
    return (state = action.payload);
  }
  if (action.type === ACTION_TYPES.DEC) {
    return (state = action.payload);
  }
  return state;
  // if (action.type === ACTION_TYPES.ADD) {
  //   const isExist = state.find((item) => item.title === action.payload.title);
  //   if (!state.length) {
  //     return [action.payload];
  //   }
  //   if (!isExist) {
  //     return (state = action.payload)
  //   }

  //   const updatedItems = state.map((item) => {
  //     if (item.title === action.payload.title) {
  //       return {
  //         ...item,
  //         amount: item.amount + action.payload.amount,
  //       };
  //     }
  //     return item;
  //   });
  //   return [...updatedItems];
  // }

  // if (action.type === ACTION_TYPES.INC) {
  //   const updatedIncItem = state.map((item) => {
  //     if (item.id === action.payload) {
  //       return {
  //         ...item,
  //         amount: item.amount + 1,
  //       };
  //     }
  //     return item;
  //   });
  //   return updatedIncItem;
  // }

  // if (action.type === ACTION_TYPES.DEC) {
  //   const updatedDecItem = state.map((item) => {
  //     if (item.id === action.payload && item.amount !== 0) {
  //       return {
  //         ...item,
  //         amount: item.amount - 1,
  //       };
  //     }
  //     return item;
  //   });
  //   return updatedDecItem;
  // }
  // return state;
};

export const CardProvider = ({ children }) => {
  const [cardState, dispatch] = useReducer(reducerCard, []);
  // console.log(cardState);

  const addItem = async (id, amount) => {
    console.log(id, "id");
    try {
      const response = await fetchRequest(`/foods/${id}/addToBasket`, {
        method: "POST",
        body: { amount: amount },
      });

      dispatch({ type: ACTION_TYPES.ADD, payload: response.items });
    } catch (error) {
      new Error(error);
    }
  };

  const addToBasket = async () => {
    try {
      const response = await fetchRequest("/basket");
      dispatch({ type: ACTION_TYPES.BASKET, payload: response.items });
    } catch (error) {
      new Error(error);
    }
  };

  const incrementAmountProduct = async (id, amount) => {
    console.log(amount, "yyyyy");
    console.log("id", id);

    try {
      const response = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount + 1 },
      });

      dispatch({ type: ACTION_TYPES.INC, payload: response.items });

      addToBasket();
    } catch (error) {
      new Error(error);
    }
  };

  const decrementAmountProduct = async (id, amount) => {
    if (amount !== 0) { 
      try {
        const response = await fetchRequest(`/basketItem/${id}/update`, {
          method: "PUT",
          body: { amount: amount },
        });
        dispatch({ type: ACTION_TYPES.DEC, payload: response.items });
        addToBasket();
      } catch (error) {
        new Error(error);
      }
    } else {
      try {
        const response = await fetchRequest(`/basketItem/${id}/delete`, {
          method: "DELETE",
        });
        dispatch({ type: ACTION_TYPES.DEC, payload: response.items });
      } catch (error) {
        new Error(error);
      }
    }
  };
  useEffect(() => {
    addToBasket();
  }, []);

  const amount = cardState?.reduce((prev, current) => prev + current.amount, 0);
  const getTotalPrice = cardState?.reduce(
    (sum, { price, amount }) => sum + amount * price,
    0
  );

  const cardValue = {
    items: cardState,
    totalAmount: amount,
    addItem,
    getTotalPrice,
    incrementAmountProduct,
    decrementAmountProduct,
    addToBasket,
  };

  return (
    <CardContext.Provider value={cardValue}>{children}</CardContext.Provider>
  );
};
