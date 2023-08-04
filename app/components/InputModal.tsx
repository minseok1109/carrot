"use client";

import socket from "@/utils/socket";
import {
    BID,
    INPUT_BID,
    INPUT_COST,
    CLOSE,
    LOWER_THAN_PRICE,
    ONLY_NUMBER,
} from "../constant";
import {useState, useEffect} from "react";

declare global {
    interface Window {
        inputPriceModal: HTMLDialogElement;
    }
}

const InputModal = ({
                        productPrice,
                        productId,
                        userId,
                    }: {
    productPrice: number;
    productId: number;
    userId: number;
}) => {
    const [bidPrice, setBidPrice] = useState("");

    const postPrice = (price: string) => {
        const numPrice = Number(price);
        const numProductPrice = Number(productPrice);

        if (numPrice < numProductPrice) {
            alert(LOWER_THAN_PRICE);
        } else if (isNaN(numPrice)) {
            alert(ONLY_NUMBER);
        } else {
            setBidPrice("");
        }
        socket.emit("sendPrice", {
            user_id: userId,
            post_id: productId,
            price: Number(bidPrice),
        });
    };

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
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        placeholder={INPUT_COST}
                        className="w-full max-w-lg input input-bordered"
                    />
                    <div className="modal-action">
                        <button className="btn" onClick={() => postPrice(bidPrice)}>
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
