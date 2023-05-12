import React, { useEffect, useState } from "react";
import { MealsItem } from "./MealsItem";
import styled from "styled-components";
import { fetchRequest } from "../../lib/fetAPI";
// import { useSortData } from "../../hooks/sort";
// import { Button } from "../UI/Button";

export const Meals = React.memo(
  () => {
    const [meals,setMeals]=useState()
    // const {sortData,sort}=useSortData(meals)
     
    
     async function getFoods(){
      try{
       const response = await fetchRequest(`/foods`)
       console.log(response)
        setMeals(response)
       } catch(error){
        new Error (error)
       };
      }
       
      useEffect (()=>{
        getFoods();
      },[])
      return (
        <Container >
          {/* <div style={{display:"flex"}}>
            <Button onClick={()=>sort("ASC") }>ASC </Button>
            <Button onClick={()=>sort("DESC") }>DESC</Button>
          </div> */}
          {meals?.map((meal) => (
            <MealsItem key={meal._id} meal={meal} />
          ))}
        </Container>
      );
    }
) ;

const Container = styled.div`
  position: absolute;
  left: 250px;
  background-color: white;
  width: 70%;
  margin: 50px auto;
  border-radius: 16px;
  margin-top: 80px;
  padding: 40px;
`
