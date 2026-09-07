import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Hero from "./components/Hero.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import Footer from "./components/Footer.jsx";
import Checkout from "./components/Checkout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import { CATEGORIES, PAYMENT_METHODS, categoryUrl, simulatedPrice, priceBucket, badgeFor, generateOrderNumber } from "./data.js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(() => new Set());
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(() => new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");

  const [cart, setCart] = useState({}); // { code: { product, qty, price } }
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const [favorites, setFavorites] = useState({}); // { code: product }

  // "shop" | "checkout" | "about" | "contact"
  const [view, setView] = useState("shop");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].key);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setStatus("loading");
        const results = await Promise.allSettled(
          CATEGORIES.map((c) => fetch(categoryUrl(c.slug)).then((r) => r.json()))
        );

        const seen = new Map();
        results.forEach((result, idx) => {
          if (result.status !== "fulfilled") return;
          const cat = CATEGORIES[idx];
          const list = result.value?.products || [];
          list.forEach((p) => {
            if (!p.code || !p.product_name) return;
            if (!seen.has(p.code)) {
              const price = simulatedPrice(p.code, cat.base);
              seen.set(p.code, {
                ...p,
                categorySlug: cat.slug,
                categoryLabel: cat.cardLabel,
                price,
                badge: badgeFor(p.code),
              });
            }
          });
        });

        if (!cancelled) {
          const list = Array.from(seen.values());
          if (list.length === 0) setStatus("error");
          else {
            setProducts(list);
            setStatus("ready");
          }
        }
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSetValue = (setter) => (value) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };
  const toggleCategory = toggleSetValue(setSelectedCategories);
  const togglePriceRange = toggleSetValue(setSelectedPriceRanges);

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedPriceRanges(new Set());
    setShowFavoritesOnly(false);
    setSearch("");
  };

  // ---------------- Cart ----------------

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev[product.code];
      return {
        ...prev,
        [product.code]: {
          product,
          price: product.price,
          qty: existing ? existing.qty + 1 : 1,
        },
      };
    });
  }, []);

  const increaseQty = useCallback((code) => {
    setCart((prev) => {
      if (!prev[code]) return prev;
      return { ...prev, [code]: { ...prev[code], qty: prev[code].qty + 1 } };
    });
  }, []);

  const decreaseQty = useCallback((code) => {
    setCart((prev) => {
      if (!prev[code]) return prev;
      const nextQty = prev[code].qty - 1;
      if (nextQty <= 0) {
        const next = { ...prev };
        delete next[code];
        return next;
      }
      return { ...prev, [code]: { ...prev[code], qty: nextQty } };
    });
  }, []);

  const removeFromCart = useCallback((code) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[code];
      return next;
    });
  }, []);

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.qty * i.price, 0);

  // ---------------- Favorites ----------------

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[product.code]) delete next[product.code];
      else next[product.code] = product;
      return next;
    });
  }, []);

  const favoritesCount = Object.keys(favorites).length;

  // ---------------- Checkout / navigation ----------------

  const goToCheckout = () => {
    setCartOpen(false);
    setConfirmedOrder(null);
    setView("checkout");
  };

  const navigate = (nextView) => {
    setConfirmedOrder(null);
    setView(nextView);
  };

  const placeOrder = () => {
    const order = {
      number: generateOrderNumber(),
      items: cartItems,
      total: cartTotal,
      method: PAYMENT_METHODS.find((m) => m.key === paymentMethod)?.label,
      date: new Date().toLocaleDateString(),
    };
    setConfirmedOrder(order);
    setCart({});
  };

  // ---------------- Filtering / sorting ----------------

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesTerm =
        !term ||
        p.product_name.toLowerCase().includes(term) ||
        (p.brands || "").toLowerCase().includes(term);
      const matchesCategory =
        selectedCategories.size === 0 || selectedCategories.has(p.categorySlug);
      const matchesPrice =
        selectedPriceRanges.size === 0 || selectedPriceRanges.has(priceBucket(p.price));
      const matchesFavorite = !showFavoritesOnly || !!favorites[p.code];
      return matchesTerm && matchesCategory && matchesPrice && matchesFavorite;
    });

    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest") list = [...list].sort((a, b) => (b.created_t || 0) - (a.created_t || 0));

    return list;
  }, [products, search, selectedCategories, selectedPriceRanges, showFavoritesOnly, favorites, sortBy]);

  return (
    <div className={`app ${view !== "shop" ? "checkout-mode" : ""}`}>
      <Header
        onNavigate={navigate}
        search={search}
        onSearchChange={setSearch}
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        cartOpen={cartOpen}
        onToggleCartOpen={() => setCartOpen((v) => !v)}
        cartRef={cartRef}
        onIncreaseQty={increaseQty}
        onDecreaseQty={decreaseQty}
        onRemoveFromCart={removeFromCart}
        onGoToCheckout={goToCheckout}
      />

      {view === "shop" && (
        <Sidebar
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          selectedPriceRanges={selectedPriceRanges}
          onTogglePriceRange={togglePriceRange}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly((v) => !v)}
          favoritesCount={favoritesCount}
          onClearFilters={clearFilters}
        />
      )}

      <main className="main-content">
        {view === "shop" && (
          <>
            <Hero />
            <ProductGrid
              status={status}
              filteredProducts={filtered}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFavoritesOnly={showFavoritesOnly}
              cart={cart}
              favorites={favorites}
              onAddToCart={addToCart}
              onIncreaseQty={increaseQty}
              onDecreaseQty={decreaseQty}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}

        {view === "checkout" && (
          <Checkout
            cartItems={cartItems}
            cartTotal={cartTotal}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onPlaceOrder={placeOrder}
            confirmedOrder={confirmedOrder}
            onBackToShop={() => navigate("shop")}
          />
        )}

        {view === "about" && <About onNavigate={navigate} />}
        {view === "contact" && <Contact />}
      </main>

      {view === "shop" && <Footer onNavigate={navigate} />}
    </div>
  );
}
