import Header from "./Header.jsx";
import Menu from "./Menu.jsx";

export default function App() {
  const category = "All";

  return (
    <div className="app">
      <Header />
      <Menu category={category} />
    </div>
  );
}
