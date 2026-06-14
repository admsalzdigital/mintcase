import { ProductDisplay } from "components/landing/product-display";
import { StaticProductDisplay } from "components/landing/static-product-display";
import { MINTCASE_PRODUCT_HANDLE } from "lib/landing";
import { getProduct, getProducts } from "lib/shopify";

export async function ProductSection() {
  try {
    let product = await getProduct(MINTCASE_PRODUCT_HANDLE);

    if (!product) {
      const products = await getProducts({});
      product = products[0];
    }

    if (!product) {
      return <StaticProductDisplay />;
    }

    return <ProductDisplay product={product} />;
  } catch (error) {
    console.error("ProductSection:", error);
    return <StaticProductDisplay />;
  }
}
