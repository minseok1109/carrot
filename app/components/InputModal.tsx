"use client";

import { BID, INPUT_BID, INPUT_COST, CLOSE } from "../constant";
import { MouseEventHandler, useState } from "react";

const InputModal = () => {
  const postPrice = (price: string): MouseEvent<HTMLButtonElement> => {
    console.log(BID, price);
  };
  const [input, setInput] = useState("");
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => window.my_modal_1.showModal()}
      >
        {BID}
      </button>
      <dialog id="my_modal_1" className="modal">
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
            <button className="btn" onClick={postPrice(input)}>
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
