import { useState } from "react";
import "./App.css";
import { Basket } from "./components/basket/Basket";
import { Header } from "./components/header/Header";
import { MealsSummary } from "./components/meals-summary/MealsSummary";
import { Meals } from "./components/meals/Meals";
import { CardProvider } from "./store/card-context";
// import { useCounter } from "./hooks/counter";
// import { Button } from "./components/UI/Button";



function App() {
  const [toggle,setToggle]=useState(false)
  // const {count,inc,dec}=useCounter();

  const toogleHandler = ()=>{
    setToggle((prev) => !prev)
  }
 
  return (
    <CardProvider>
      {/* <h1>{count}</h1>
      <Button onClick={inc}>+</Button>
      <Button onClick={dec}>-</Button> */}
      <Header onToggle={toogleHandler} />
      <MealsSummary />
      <Meals />
      {toggle && <Basket onToggle={toogleHandler} />}
      
    </CardProvider>
  );
}

export default App;
