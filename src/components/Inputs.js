import React, { useState } from 'react'
import parseForm from './parseForm'
import calcBoxes from './calcBoxes'

export default function Inputs({ title, value }) {

    const [inputsNum, inputsNumSet] = useState(1)
    const [boxesCalculated, boxesCalculatedSet] = useState([])

    let prodsArr
    function smth(e) {
        e.preventDefault()
        prodsArr = parseForm(e)
        const boxes = calcBoxes(prodsArr)
        boxesCalculatedSet(boxes)
    }

    return (
        <div style={{ margin: "0 auto", width: "fit-content" }}>
            {title.toUpperCase()}
            <form onSubmit={(e) => smth(e)}>
                {Array.from({ length: inputsNum }, (_, ind) => {
                    return (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <div style={{ width: "100%" }}>Product {ind + 1}</div>
                            <label><div>length</div><input style={{ width: 60 }} name="length" placeholder="length" type='number' value={value?.length} /></label>
                            <label><div>width</div><input style={{ width: 60 }} name="width" placeholder="width" type='number' value={value?.width} /></label>
                            <label><div>height</div><input style={{ width: 60 }} name="height" placeholder="height" type='number' value={value?.height} /></label>
                        </div>
                    )
                })}
                <button onClick={() => inputsNumSet(prev => prev + 1)}>add product</button>
                {/* <button type="submit">calculate boxes</button> */}
            </form>
            {boxesCalculated?.map((box, ind) => {
                return (
                    <div style={{ border: "2px dashed", margin: 5, padding: 5 }}>
                        <div>BOX NUMBER:{ind + 1}</div>
                        <div>length:{box.length}</div>
                        <div>width:{box.width}</div>
                        <div>height:{box.height}</div>
                        <div>girthPlusLength(MAX:274):{box.totalLengthWithGirth}</div>
                    </div>
                )
            })}
        </div>
    )
}
