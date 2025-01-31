import { ScrollView } from "react-native";
import CategoryList from "./CategoryList";
import HorizontalList from "./HorizontalList";
import ShopBrand from "./ShopBrand";

export default function ShoppingSection() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <CategoryList />
      <HorizontalList />
      <ShopBrand />
    </ScrollView>
  );
}
