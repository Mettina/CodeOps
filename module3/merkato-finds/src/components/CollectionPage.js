import ListingPage from "./ListingPage";

export default function CollectionPage({ category, title, intro }) {
  return <ListingPage category={category} title={title || category} intro={intro || `Explore our ${category.toLowerCase()} collection, selected for everyday life and little moments of joy.`}/>;
}
