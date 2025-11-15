import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions";
import { formatPrice, sleep } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function productPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: product.category?.name,
      href: `/search/${product.category?.slug}`,
    },
    {
      label: product.name,
      href: `/product/${product.slug}`,
      active: true,
    },
  ];

  await sleep(1000);

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={breadcrumbs} />
      <Card className="mx-auto">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="relative rounded-lg overflow-hidden h-[200px] md:h-[400px] ">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg">
                {formatPrice(product.price)}
              </span>

              <Badge variant="outline">{product.category?.name}</Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h2 className="font-medium">Description</h2>
              <p>{product.description}</p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h2 className="font-medium">Availability</h2>
              <div className="flex items-center gap-2">
                <p>
                  {product.inventory > 0 ? (
                    <Badge variant="outline">
                      In Stock ({product.inventory})
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <Button disabled={product.inventory === 0} className="w-full">
                <ShoppingCart className="mr-2 w-4 h-4" />
                {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
