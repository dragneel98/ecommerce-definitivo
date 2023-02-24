import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}) {
    const [cart, setCart] = useState([])

    const addToCart = product => {
        // verifica si el producto ya esta en el carrito
        const productCartIdex = cart.findIndex(item => item.id === product.id)

        //alternativa usando structuredClone
        if (productCartIdex >= 0) {
            const newCart = structuredClone(cart)
            newCart[productCartIdex].quantity += 1
            return setCart(newCart)
        }

        // el producto no esta en el carrito
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }
    const clearCart = () => {setCart([])}
    return <CartContext.Provider value= {{cart, addToCart, clearCart}}>
        {children}
    </CartContext.Provider>
}