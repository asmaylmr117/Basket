
import React from "react";

export default function SortProducts({productLength, sortBy, sortDir, onChangeSort }) {
  return (
    <div className=" mx-auto rounded-lg bg-gray-100 my-6 px-7 py-4 flex justify-between w-[100%]">
      <div className="text-gray-500">
        <p className="font-normal text-xs/[18px]">{productLength} products</p>
      </div>
      <div className="font-medium">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">sort By :</span>
        <select
          value={sortBy}
          onChange={(e) => onChangeSort({ by: e.target.value, dir: sortDir })}
          className="rounded px-2 py-1 bg-transparent text-xs"
        >
          <option value="title">Alphabetically</option>
          <option value="price">Price</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest</option>
        </select>
        <select
          value={sortDir}
          onChange={(e) => onChangeSort({ by: sortBy, dir: e.target.value })}
          className="rounded px-2 py-1 bg-transparent text-xs"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      </div>
    </div>
  );
}