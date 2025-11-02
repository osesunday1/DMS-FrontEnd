import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createLocation } from "../../store/location/locationActions";

const AddLocation = ({ createLocation, locations: { loading, success, error } }) => {
  const [formData, setFormData] = useState({
    command: "",
    state: "",
    unit: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createLocation(formData);
  };

  const COMMANDS = {
    "Eastern Naval Command (ENC)": [
      "Cross River",
      "Akwa Ibom",
      "Rivers",
      "Bayelsa",
      "Abia",
      "Imo",
    ],
    "Western Naval Command (WNC)": ["Lagos", "Ogun", "Ondo", "Edo", "Delta"],
    "Central Naval Command (CNC)": ["Bayelsa", "Delta", "Rivers", "Edo"],
    "Naval Training Command (NAVTRAC)": [
      "Lagos",
      "Rivers (Port Harcourt)",
      "Ondo (Okitipupa)",
      "Kaduna (Jaji)",
    ],
    "Naval Doctrine Command (NAVDOC)": ["Rivers"],
    "Logistics Command (LOG COMD)": ["Delta", "Lagos", "Rivers"],
    "Naval Headquarters (NHQ)": ["Abuja"],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Add New Location</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-5"
      >
        {/* Command */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Command</label>
          <select
            name="command"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.command}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Command --</option>
            {Object.keys(COMMANDS).map((cmd) => (
              <option key={cmd} value={cmd}>
                {cmd}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">State</label>
          <select
            name="state"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.state}
            onChange={handleChange}
            required
            disabled={!formData.command}
          >
            <option value="">-- Select State --</option>
            {formData.command &&
              COMMANDS[formData.command].map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Unit</label>
          <input
            type="text"
            name="unit"
            placeholder="Enter unit name (e.g. NNS Pathfinder)"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold px-4 py-2 rounded hover:opacity-90 w-full"
        >
          {loading ? "Saving..." : "Add Location"}
        </button>

        {success && (
          <p className="text-green-600 text-center mt-3">
            Location added successfully!
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  locations: state.locations,
});

export default compose(connect(mapStateToProps, { createLocation }))(AddLocation);
