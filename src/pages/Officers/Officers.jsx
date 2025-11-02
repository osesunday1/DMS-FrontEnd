import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getOfficers } from "../../store/officer/officerActions";
import { getBranches } from "../../store/branch/branchActions";
import { getLocations } from "../../store/location/locationActions";
import OfficerCard from "../../components/OfficerCard";

const Officers = ({
  officers: { officers, loading, error },
  branches: { branches },
  locations: { locations },
  getOfficers,
  getBranches,
  getLocations,
}) => {
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getOfficers(); // initial load
    getBranches();
    getLocations();
  }, [getOfficers, getBranches, getLocations]);

  // ✅ Build dropdown 2 values dynamically
  const getFilterValues = () => {
    switch (filterKey) {
      case "branch":
        return branches.map((b) => b.name);
      case "location":
        return locations.map((l) => `${l.unit}`);
      case "rank":
        return [...new Set(officers.map((o) => o.rank))];
      case "deploymentStatus":
        return [...new Set(officers.map((o) => o.deploymentStatus))];
      default:
        return [];
    }
  };

  const valueOptions = getFilterValues();

  // ✅ Handle search click
  const handleSearch = () => {
    if (filterKey && filterValue) {
      getOfficers({ [filterKey]: filterValue }); // pass params
    } else {
      getOfficers();
    }
  };

  // ✅ Handle reset click
  const handleReset = () => {
    setFilterKey("");
    setFilterValue("");
    getOfficers();
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading officers...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Officers</h1>

      {/* ✅ Filter Controls */}
      <div className="flex gap-3 mb-6 items-center">
        <select
          className="border border-gray-300 p-2 rounded bg-[var(--color-secondary)] "
          value={filterKey}
          onChange={(e) => {
            setFilterKey(e.target.value);
            setFilterValue("");
          }}
        >
          <option value="">----- Filter Key -----</option>
          <option value="branch">Branch</option>
          <option value="location">Location</option>
          <option value="rank">Rank</option>
          <option value="deploymentStatus">Deployment Status</option>
        </select>

        <select
          className="border border-gray-300 p-2 rounded bg-[var(--color-secondary)] "
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          disabled={!filterKey}
        >
          <option value="">-- Select Value --</option>
          {valueOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        {/* ✅ Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>

        {/* ✅ Reset Button */}
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Reset
        </button>
      </div>

      {/* ✅ Officers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(officers) && officers.length > 0 ? (
          officers.map((officer) => <OfficerCard key={officer._id} officer={officer} />)
        ) : (
          <p className="text-center text-gray-400 col-span-full">No officers found.</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  officers: state.officers,
  branches: state.branches,
  locations: state.locations,
});

export default compose(
  connect(mapStateToProps, { getOfficers, getBranches, getLocations })
)(Officers);
