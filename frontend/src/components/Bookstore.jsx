import React, { useState } from 'react';
import { books } from '../booksData';
import BookCard from './BookCard';
import '../index.css';


const App = () => {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query.trim().toLowerCase()) ||
    book.author.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleAddToCart = (book) => {
    setCart(prev => [...prev, book]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const getTotal = () => {
    return cart.reduce((total, book) => {
      const price = parseInt(book.price.replace('₹', ''));
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  };

  return (
    <div>
      <header>
        <h1>📚 Brilliant Bookstore</h1>

        <div className="header-right">
          <div className="search-box">
            <input
              type="text"
              id="searchInput"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
            🛒 {cart.length}
          </div>
        </div>
      </header>

      <main id="bookContainer" className="grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </main>

      {/* 🛍️ Cart Sidebar */}
      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setCartOpen(false)}>❌</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Cart is empty.</p>
        ) : (
          <ul>
            {cart.map((book, index) => (
              <li key={index}>
                <span>{book.title}</span>
                <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="total">
            Total: ₹{getTotal()}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;