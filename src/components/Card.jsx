import "../styles/card.css";

export default function Card({
  amount,
  category,
  description,
  type,
  date,
  onEdit,
  onDelete
}) {
  return (
    <div className={`card ${type}`}>
      <h4>Category : {category}</h4>
      
      <p>Amount : ₹{amount}</p>
      <p>description: {description}</p>
      <p>Date : {new Date(date).toLocaleDateString("en-GB")}</p>
     
 


      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button className="danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

