import { AddToCart } from "components/cart/add-to-cart";
import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/shopify/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item
          key={product.handle}
          className="animate-fadeIn flex flex-col gap-2"
        >
          <Link
            className="relative inline-block h-full w-full flex-1"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
          <AddToCart product={product} compact />
        </Grid.Item>
      ))}
    </>
  );
}
