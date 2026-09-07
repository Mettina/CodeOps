import React from "react";

export default function Header({
  onNavigate,
  search,
  onSearchChange,
  cartItems,
  cartCount,
  cartTotal,
  cartOpen,
  onToggleCartOpen,
  cartRef,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveFromCart,
  onGoToCheckout,
}) {
  return (
    <header className="header">
      <nav className="navbar">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("shop");
          }}
        >
          Mettina <span>Skin Care</span>
        </a>

        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("shop"); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("shop"); }}>Products</a>
          <a href="About.jsx" onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>About</a>
          <a href="Contact.jsx" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>Contact</a>
        </div>

        <div className="nav-actions">
          <input
            type="search"
            placeholder="Search products"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <div className="dropdown-wrap" ref={cartRef}>
            <button className="cart" onClick={onToggleCartOpen}>
              Cart ({cartCount})
            </button>

            {cartOpen && (
              <div className="cart-panel">
                <h4>Your Cart</h4>
                {cartItems.length === 0 ? (
                  <p className="cart-empty">Your cart is empty.</p>
                ) : (
                  <>
                    {cartItems.map(({ product, qty }) => (
                      <div className="cart-item" key={product.code}>
                        <span className="name">{product.product_name}</span>
                        <div className="qty-control">
                          <button onClick={() => onDecreaseQty(product.code)}>−</button>
                          <span>{qty}</span>
                          <button onClick={() => onIncreaseQty(product.code)}>+</button>
                        </div>
                        <button className="remove-btn" onClick={() => onRemoveFromCart(product.code)}>
                          ×
                        </button>
                      </div>
                    ))}
                    <div className="cart-total">
                      <span>Total</span>
                      <span>{cartTotal.toLocaleString()} ETB</span>
                    </div>
                    <button className="checkout-btn" onClick={onGoToCheckout}>
                      Checkout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
