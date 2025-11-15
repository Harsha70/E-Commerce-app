import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { categories } from "./navbar";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant={"ghost"} size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-4 p-4">
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-2">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/product" className="flex items-center gap-2">
              Products
            </Link>
          </SheetClose>

          <div>
            <h3 className="text-xs font-medium mb-2 text-muted-foreground">
              Categories
            </h3>

            {categories.map((category) => (
              <SheetClose asChild key={category.id}>
                <Link
                  href={category.href}
                  className="block py-2 text-sm font-medium"
                >
                  {category.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
// className="md:hidden"
