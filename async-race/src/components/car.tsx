import React, { useEffect, useState } from "react";
import { ICar } from "../interfaces";

export default function Car({ data }: { data: ICar }) {
    return (
        <div>
            <button>Edit</button>
            <button>Remove</button>
            <button>Start</button>
            <button>Stop</button>
            <div>{data.id}</div>
        </div>
    )
}