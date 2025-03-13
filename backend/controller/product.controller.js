import Product from "../model/Product.js";
import mongoose from "mongoose";


export const getProducts =  async(req, res)=>{
    try{
    const products =  await Product.find({})
        res.status(200).json({success:true , data:products})
    }catch(err){
         console.log("error in fetching products" , err.message);
         res.status(404).json({success:false , message:"server error"})
    }
    
}

export const postProducts  = async(req , res)=>{
    const product = req.body

    if(!product.name || !product.price || !product.image){
       return  res.status(400).json({message:"require all fields"})
    }
    const newProduct = new Product(product)
    try{
        await newProduct.save()
        res.status(201).json({success:true , data:newProduct})
    }catch(err){
        console.log("error in create product",err.message);
         res.status(500).json({success:false , message:"server  error"})
    }
}


export const deleteProducts =async(req , res)=>{
    const {id} = req.params
     try{
        
     const deleteProduct =   await Product.findByIdAndDelete(id)
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:true , message:"invalid product id"})}  
        
        if(!deleteProduct){
            return res.status(400).json({success:false , message :"product not found"})
        }
       res.status(200).json({success:true , message:"product deleted"} 

     )
     }catch(err){
        console.log("error in deleting products" , err.message);
        
      res.status(500).json({success:false , message:"server error"})
     }
}

export const updateProducts = async(req , res)=>{
    const {id} = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:true , message:"invalid product id"})
    }try{
        const updateproducts = await Product.findByIdAndUpdate(id , product ,{new:true})
        res.status(200).json({success:true , data:updateproducts})
    }catch(err){
        res.status(500).json({success:false , message:"server error"})
    }
}