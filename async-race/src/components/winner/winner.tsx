import React, { useEffect, useState } from "react";
import { IWinner } from "../../interfaces";

type WinnerProps = {
    data: IWinner;
}

export default function Winner({data}: WinnerProps) {
    return (
        <div>
            <span>{data.id}</span>
        </div>
    )
}