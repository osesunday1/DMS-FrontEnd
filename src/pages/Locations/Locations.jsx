import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getLocations } from "../../store/location/locationActions";

const Locations = ({ locations: { locations, loading, error }, getLocations }) => {
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading locations...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">All Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {locations.map((loc) => (
          <div
            key={loc._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border-r-4 border-l-4 border-[var(--color-primary-300)]"
          >
            <h2 className="font-bold text-gray-800 mb-1">{loc.unit}</h2>
            <p className="text-gray-600 text-sm"> <span> <b>State:</b> </span>{loc.state}</p>
            <p className="text-gray-600 text-sm "><b>Command:</b>{loc.command}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  locations: state.locations,
});

export default compose(connect(mapStateToProps, { getLocations }))(Locations);