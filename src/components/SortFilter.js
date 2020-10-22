import React from "react";

const SortFilter = ({ onSortBySelect }) => {
    return (
        <div className="form-group  filter-sort filter">
            <select
                name="contactType"
                id="inputState"
                className="form-control"
                defaultValue="default"
                onChange={(e) => onSortBySelect(e.target.value)}
            >
                <option value="default" disabled>
                    Sort By
                </option>
                <option value="lastname-asc">Lastname (A-Z)</option>
                <option value="lastname-desc">Lastname (Z-A)</option>
            </select>
        </div>
    );
};

export default SortFilter;
