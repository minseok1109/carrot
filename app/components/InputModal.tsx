"use client";

import {
  BID,
  INPUT_BID,
  INPUT_COST,
  CLOSE,
  LOWER_THAN_PRICE,
  ONLY_NUMBER,
} from "../constant";
import { useState } from "react";

declare global {
  interface Window {
    inputPriceModal: HTMLDialogElement;
  }
}

const InputModal = ({ productPrice }: { productPrice: string }) => {
  const postPrice = (price: string) => {
    const numPrice = Number(price);
    const numProductPrice = Number(productPrice);

    if (numPrice < numProductPrice) {
      alert(LOWER_THAN_PRICE);
    } else if (isNaN(numPrice)) {
      alert(ONLY_NUMBER);
    } else {
      setInput("");
    }
  };
  const [input, setInput] = useState("");
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => window.inputPriceModal.showModal()}
      >
        {BID}
      </button>
      <dialog id="inputPriceModal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="mb-3 text-lg font-bold">{INPUT_BID}</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={INPUT_COST}
            className="w-full max-w-lg input input-bordered"
          />
          <div className="modal-action">
            <button className="btn" onClick={() => postPrice(input)}>
              {BID}
            </button>
            <button className="btn">{CLOSE}</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default InputModal;
