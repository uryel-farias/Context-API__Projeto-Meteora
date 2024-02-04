import React, { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = []

export const CarrinhoProvider =({ children }) => {
    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
    const [quantidade, setQuantidade] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)

    const {totalTemporario, quantidadeTemporario } = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
            quantidadeTemporario: acumulador.quantidadeTemporario + produto.quantidade,
            totalTemporario: acumulador.totalTemporario + produto.preco * produto.quantidade,
            }), {
                quantidadeTemporario: 0,
                totalTemporario: 0,
            }
        )
      }, [carrinho])
    
      useEffect(() => {
    
        setQuantidade(quantidadeTemporario)
        setValorTotal(totalTemporario)
      })

    return (
        <CarrinhoContext.Provider value={ 
            {   carrinho, 
                dispatch, 
                quantidade, 
                valorTotal} 
            }>
            {children}
        </CarrinhoContext.Provider>
    )
}