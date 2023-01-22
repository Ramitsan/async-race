import React, { useEffect, useState } from "react";
import { ICar } from "../../interfaces";

type EditPopupProps = {
    selectedCarData: ICar;
    onOk: (result: ICar) => void;
    onCancel: () => void;
}

export default function EditPopup({selectedCarData, onOk, onCancel}: EditPopupProps) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('black');
    useEffect(() => {
        setName(selectedCarData.name)
    }, [selectedCarData.name]);

    useEffect(() => {
        setColor(selectedCarData.color)
    }, [selectedCarData.color]);

    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            <button onClick={() => {onOk({id: selectedCarData.id, name: name, color: color})}}>Ok</button>
            <button onClick={() => onCancel()}>Cancel</button>
        </div>
    )
}