import { Product } from "src/modules/products/schemas/product.schema";
import { Cart } from "../schema/cart.schema";
import { ProductCartDto } from "../dto/product-cart.dto";

export const getIndexIfProductExistInCart = (cart: Cart, product: ProductCartDto): number => {
  const index = cart.items.findIndex((item: ProductCartDto) => {
    return item.productId.toString() === product.productId.toString();
  });

  return index;
};

export const canAddQuantityProductInCart = (productToAdd: ProductCartDto, productInCart: ProductCartDto, productInDb: Product): boolean => {
    const quantityProductToAdd = productToAdd.quantity;
    const quantityProductInCart = productInCart?.quantity || 0;

    return quantityProductToAdd + quantityProductInCart <= productInDb.stock;
}