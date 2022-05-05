import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getUserOrdersDetails } from "../../../services/OrdersServices";
import { Orders } from "./Orders";

export function OrderDetails(props:any){
    console.log(props.showModal);
    const [showDetails, setShowDetails] = useState(props.showModal);
    const [order, setOrder] = useState({
        id:0,
        isFreeShipping:false,
        isPickupInStore:false,
        orderItems:[
            {
                id:0,
                discountPercentage:0,
                quantity:0,
                totalDiscountAmount:0,
                totalPrice:0,
                totalPriceTaxAmount:0,
                totalPriceWithoutTax:0,
                totalTaxPercentage:0,
                unitDiscountAmount:0,
                unitPrice:0,
                unitPriceTaxAmount:0,
                unitPriceWithoutTax:0,
            item:
            {
                id:0,
                code:"",
                images:[
                    {
                        id:0,
                        imageUrl:"",
                    }
                ],
            itemTranslations:[
                {
                    id:0,
                languageId:0,
                    name:""
                }
            ],
            category:{
                id:0,
                categoryTranslations:[
                    {
                        id:0,
                        languageId:0,
                        name:""
                    }
                ]
            }
        }
    }
        ],
        orderStatus:{
            id:0,
            orderStatusTranslations:[
                {
                id:0,
                languageId:0,
                name:""
                },
            ]
        },
        orderTax:0,
        orderTotal:0,
        paymentStatusId:0,
        paymentType:{
            id:0,
            paymentTypeTranslations:[
                {
                    id:0,
                    languageId:0,
                    name:""
                }
            ]
        },
        paymentTypeId:0,
        pointsLogs:[
            {
                id:0,
                points:0,
                ratio:0
            }
        ],
        shippingCosts:0,
            storeId:0,
            tentantId:0
    });
    const handleClose = () => {
        setShowDetails(false)
        props.handler(false)
    };

    useEffect(()=>{
       getUserOrdersDetails(props.order.id).then(response =>{ console.log(response.data)
    setOrder(response.data)
}).catch(err => console.log(err));
     },[])
        
    return (
        <>

<Modal show={showDetails} onHide={handleClose}  size="lg"    aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalji</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="row">
    <div className="col-md-8 cart">
        <div className="title">
            <div className="row">
                <div className="col">
                    <h4><b>Proizvodi</b></h4>
                </div>
                {order.orderItems.length == 1 &&
                <div className="col align-self-center text-right text-muted">{order.orderItems.length} proizvod</div>
                }
                 {order.orderItems.length > 1 &&
                <div className="col align-self-center text-right text-muted">{order.orderItems.length} proizvoda</div>
                }
            </div>
        </div>
        {order.orderItems.map((orderItem,key)=>{
            {console.log(orderItem)}
  return <div className="row border-top mt-1" key={orderItem.id}>
   <div className="row main align-items-center mt-5 mb-3">
       {orderItem.item.images.length ==0  &&
       <div className="col-3"><img loading="lazy" className="img-fluid " src="" alt="Product image"/></div>
        }
         {orderItem.item.images.length > 0  &&
       <div className="col-3"><img loading="lazy" style={{"width":"100px","height":"100px","objectFit":"cover"}} src={orderItem.item.images[0]?.imageUrl}  alt="Product image"/></div>
        }


       <div className="col">
           {orderItem.item.category == null   &&
           <div className="row text-muted">Nema kategorije</div>
        }
         {orderItem.item.category?.categoryTranslations?.length > 0  &&
           <div className="row text-muted">{orderItem.item.category?.categoryTranslations.find(x=>x.languageId == 1)?.name}</div>
        }
           {orderItem.item.itemTranslations.length == 0 &&   
           <div className="row">Nema imena</div>
           }
           {orderItem.item.itemTranslations.length > 0 &&   
           <div className="row">{orderItem.item.itemTranslations.find(x=>x.languageId == 1)?.name}</div>
        }


       </div>
       <div className="col" style={{"color":"blue"}}> {orderItem.quantity}x </div>
       <div className="col">{orderItem.unitPrice} KM<span className="close"></span></div>
   </div>
</div>

        })}
   
    </div>
    <div className="col-md-4 summary">
        <div>
            <h5><b>Informacije o dostavi</b></h5>
        <hr/>

            <p>Besplantna dostava: <b> {order.isFreeShipping?"Da":"Ne"}</b></p>
            <p>Cijena dostave: <b>{order.shippingCosts} KM</b></p>
            <p>Preuzimanje u prodavnici:<b> {order.isPickupInStore?"Da":"Ne"} </b></p>
        </div>

       

        <div>
            <h5><b>Informacije o plaćanju</b></h5>
        <hr/>
            <p>Način plaćanja : <b>{order.paymentType.paymentTypeTranslations.find(x=>x.languageId == 1)?.name}  </b></p>
            <p>Ukupno za platiti : <b>{order.orderTotal} KM </b></p>
        </div>
       
        <div>
            <h5><b>Loyalty informacije</b></h5>
        <hr/>

            <p>Plaćeno bodovima : <b>  {order.pointsLogs[0].points > 0 ? "Ne":"Da"} </b></p>
            {order.pointsLogs[0].points > 0  &&
            <p>Dobijeni bodovi za narudžbu: <b>{order.pointsLogs[0].points} </b>  </p>}
            {order.pointsLogs[0].points < 0 && 
            <p>Potrošeni bodovi za narudžbu: <b>{order.pointsLogs[0].points * -1} </b>  </p>}
            
            

        </div>
     
    </div>
</div>
 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
          <Button variant="danger" onClick={handleClose}>
           Otkaži narudžbu
          </Button>
        </Modal.Footer>
      </Modal>

 

      
           
</>
    )
}

    
