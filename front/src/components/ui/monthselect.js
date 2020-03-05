import React from "react";

export default function MonthSelect({
    value,
    onChange,
}) {
    return <select value={value} onChange={e => onChange(parseInt(e.target.value))}>
        <option value="0">Janvier</option>
        <option value="1">Fevrier</option>
        <option value="2">Mars</option>
        <option value="3">Avril</option>
        <option value="4">Mai</option>
        <option value="5">Juin</option>
        <option value="6">Juillet</option>
        <option value="7">Aout</option>
        <option value="8">Septembre</option>
        <option value="9">Octobre</option>
        <option value="10">Novembre</option>
        <option value="11">Decembre</option>
    </select>;
}