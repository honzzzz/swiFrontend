import {useState} from "react";

function ProductForm(props) {

    const [productName, setProductName] = useState("")
    const [productModel, setProductModel] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    const [image, setImage] = useState("")
    const [feedback, setFeedback] = useState(0)

    const onSubmitHandler = event => {
        event.preventDefault();

        const newProduct ={
            name:productName,
            model:productModel,
            price:productPrice,
            image
        }

        fetch('http://localhost:3001/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct), // body data type must match "Content-Type" header
        }).then(r=> r.json())
            .then(json=> setFeedback(json))
            .finally(()=>{
                props.onNewProduct(newProduct)
                setProductName("")
                setProductModel("")
                setImage("")
                setProductPrice(0)
            })


    }

    return(
        <>
        <form onSubmit={onSubmitHandler}>
            <input type={"text"} value={productName} placeholder={"Name"} onChange={(e)=> setProductName(e.target.value)}/>
            <input type={"text"} value={productModel} placeholder={"Model"} onChange={(e)=> setProductModel(e.target.value)}/>
            <input type={"text"} value={image} placeholder={"Image"} onChange={(e)=> setImage(e.target.value)}/>
            <input type={"number"} value={productPrice} placeholder={"Price"} onChange={(e)=> setProductPrice(e.target.value)}/>
            <input type={"submit"}/>
        </form>
            {feedback && <div>{JSON.stringify(feedback)}</div>}
        </>
    )
}

export default ProductForm;