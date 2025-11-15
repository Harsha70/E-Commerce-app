// import { Product } from "@/lib/mocks";
"use client";
import { Product } from "@/app/generated/prisma/client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card
        className="pt-0 overflow-hidden min-h-[300px]"
        onClick={async () => {
          console.log(await getProductBySlug(product.slug));
        }}
      >
        <div className="relative aspect-video">
          {product.image && (
            <Image
              src={`${product.image}`}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>

        <CardFooter>
          <p>{formatPrice(product.price)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
