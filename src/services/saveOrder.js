// src/services/saveOrder.js
import { db } from "../firebase";

export const saveOrder = async (userId, cart, totalPrice) => {
  const orderRef = db.collection("orders").doc();
  const orderId = orderRef.id;

  try {
    await orderRef.set({
      userId,
      orderId,
      totalPrice,
      createdAt: new Date().toISOString(),
    });
    return orderId;
  } catch (error) {
    console.error("Error al guardar la orden: ", error);
    throw new Error("No se pudo guardar la orden");
  }
};
