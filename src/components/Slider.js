import React from 'react';

function Slider({ label, value, onChange }) {
    return (
        <div className="slider">
            <label>{label}</label>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <span>{value}</span>
        </div>
    );
}

export default Slider;
