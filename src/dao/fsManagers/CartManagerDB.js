import  cartModel from '../models/cart.model.js';
import  productModel  from '../models/product.model.js';


export class CartManager{
  constructor(path,cart){
  //this.cuenta=0
  this.path=path
 
  
  }
  static cart=[];
  

  traeTodo = async (req, res)=> {
    let page= parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
      
    const filtroOpciones ={}
    if(req.query._id) filtroOpciones._id = req.query._id
    if (req.query.idCliente) filtroOpciones.idCliente= req.query.idCliente
  
    const paginacionOpciones= {lean:true,limit:limit,page:page}
    //sort
    if (req.query.sort == "asc") paginacionOpciones.sort ={  idCliente:1}
    if (req.query.sort == "desc") paginacionOpciones.sort ={  idCliente: -1}
    try{
     
     //const productos =await productModel.find(
   
    const carts =await cartModel.paginate(filtroOpciones, paginacionOpciones)
   
      return{
        statusCode:200,
        response:{payload:carts}
      }
    }
    catch (err) {
      return{
        statusCode:500,
        response:{status:err, error:err.message}
      }
      
    }  
       
   
  }
  
addCartProd = async(cid,pid)=>{
        
  try{       
        //let car = await cartModel.find(cid);
      // console.log("wwww")
         let car= await cartModel.updateOne({_id:cid},
          {$push:{"products":{product:pid, quantity:1}}})
          
          return car
         
          
  }
  catch(error){
    console.error(error);
  }

 }


traeCartBy = async(id) =>
 {

 
  try{
    const result=  await cartModel.findById(id).populate('products.product').lean().exec();
   
    if(result === null)
    { 
      return {
        statusCode:404,
        response:{status:'error', error:'no se encuenta'}
      }
    }
    return {statusCode:200,response:{status:'exito', payload:result}}
}
catch(e){
console.error(e);;
}

   
}

 BorrarCartProducto = async(_id,pid) =>{
      try{
        const result = await cartModel.findByIdAndDelete(_id)
     if(result== null){
      return false
     }
     const cart = await cartModel.find().lean().exec()
     return cart
                  
          
      }
      catch(error){
        console.error(error);;
        
      }

 }


modificarCart = async(cid, products) =>{
        try{
          const result= await cartModel.findByIdAndUpdate({_id:cid},{
            $set:products})
                

        }
        catch(error){
          console.error(error);;
        }

 }
}

