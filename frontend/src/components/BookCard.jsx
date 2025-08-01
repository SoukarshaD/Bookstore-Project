import React from 'react';
import '../index.css';

const BookCard = ({ book, onAddToCart }) => (
  <div className="card">
    <img src={book.cover} alt={book.title} />
    <div className="card-content">
      <h2>{book.title}</h2>
      <p>by {book.author}</p>
      <p className="price">{book.price}</p>
      <button onClick={() => onAddToCart(book)}>Add to Cart</button>
    </div>
  </div>
);

export default BookCard;
 