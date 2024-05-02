import currencyFormat from "@/helpers/currency-format";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

export default function ConfirmOrder() {
    const { cart } = useCart();

    const totalAmount = cart.reduce((acc, item) => {
        if (item.discount) {
            return (
                acc + ((item.price * (100 - item.discount!)) / 100) * item.quantity
            );
        } else {
            return acc + item.price * item.quantity;
        }
    }, 0);

    return (
        <div className="flex items-center justify-between pt-6">
            <Link
                href='/checkout'
                className="w-full max-w-[16.5rem] min-h-[4rem] bg-red-500 rounded-lg cursor-pointer text-white font-semibold text-lg uppercase mt-4 hover:bg-red-600 transition-all duration-300 items-center flex justify-center"
            >
                Finalizar Pedido
            </Link>
            <span className="font-semibold text-uppercase">
                Total <strong className="ml-3 font-bold text-2xl">{currencyFormat(totalAmount)}</strong>
            </span>
        </div>
    );
}
