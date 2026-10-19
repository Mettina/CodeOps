export default function Loading() {
  return (
    <main className="menu-page menu-loading" aria-busy="true" aria-label="Loading menu">
      <section className="menu-hero">
        <div className="hero-content">
          <p className="hero-eyebrow">AUTHENTIC ETHIOPIAN FLAVORS</p>
          <h1>Our Menu</h1>
          <p className="hero-description">
            Fresh ingredients, traditional recipes,
            unforgettable taste.
          </p>
        </div>
      </section>

      <section className="menu-content">
        <div className="dish-search">
          <span>Search dishes</span>
          <div className="menu-loading-input" aria-hidden="true" />
        </div>

        <div className="category-bar" aria-hidden="true">
          {["All", "Main", "Breakfast", "Lunch", "Dinner", "Drinks", "Pizza", "Burger"].map((category) => (
            <span className="chip" key={category}>{category}</span>
          ))}
        </div>

        <ul className="dish-list menu-dish-list" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <li className="dish-card menu-dish-card menu-loading-card" key={index}>
              <div className="dish-image-wrap" />
              <div className="dish-copy">
                <span className="menu-loading-line menu-loading-title" />
                <span className="menu-loading-line" />
                <span className="menu-loading-line menu-loading-line-short" />
                <span className="menu-loading-line menu-loading-price" />
              </div>
              <div className="dish-card-action">
                <span className="menu-loading-button" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}