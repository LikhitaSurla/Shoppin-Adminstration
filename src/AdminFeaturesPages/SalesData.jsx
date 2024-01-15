import React,{useState,useEffect} from 'react'
import { db } from '../config/firebase';
import fetchSales from '../FetchingData/Sales'
  

export default function SalesData() {
  const[salesCollection,setSalesCollection]=useState([]);

  const salesDetails=async()=>{
    try{
      const salesDb=await fetchSales();
       setSalesCollection(salesDb)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    salesDetails();
  },[])
  return (
    <>
   
    <div>SalesData</div>
    {salesCollection.map((data) => (
            <div key={data.billid}>
                <h1>{data.billid}</h1>
                <h3>{data.name}</h3>
                <h3>{data.purchase}</h3>
                <h3>{data.totalsales}</h3>
                
                
            </div>
        ))}   
    </>
  )
}
