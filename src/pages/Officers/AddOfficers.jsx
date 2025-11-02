import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createOfficer } from "../../store/officer/officerActions";

const AddOfficer = ({ createOfficer, officers: { loading, success, error } }) => {

const RANKS = [
  "Midshipman",
  "Sub-Lieutenant",
  "Lieutenant",
  "Lieutenant Commander",
  "Commander",
  "Captain",
  "Commodore",
  "Rear Admiral",
  "Vice Admiral",
  "Admiral",
];

  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    serviceNumber: "",
    dateOfBirth: "",
    dateOfCommission:"",
    image: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createOfficer(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-[var(--color-secondary)]">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-4 text-center">
          Add Officer
        </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        {/* Name */}
        <div className="my-3">
          <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter officer’s full name"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>

        {/* Rank */}
        <div className="my-3">
          <label className="block text-gray-700 font-semibold mb-1">Rank</label>
          <select
            name="rank"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={formData.rank}
            required
          >
            <option value="">-- Select Rank --</option>
            {RANKS.map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>
        {/* Service Number */}
        <div className="my-3">
          <label className="block text-gray-700 font-semibold mb-1">Service Number</label>
          <input
            type="text"
            name="serviceNumber"
            placeholder="Enter service number (e.g., NAV12345)"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={formData.serviceNumber}
            required
          />
        </div>
        {/* Date of Birth */}
        <div className="my-3">
          <label className="block text-gray-700 font-semibold mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={formData.dateOfBirth}
            required
          />
        </div>
        
        {/* Date of Birth */}
        <div className="my-3">
          <label className="block text-gray-700 font-semibold mb-1">Date of Commission</label>
          <input
            type="date"
            name="dateOfCommission"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={formData.dateOfCommission}
            required
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold px-4 py-2 rounded hover:opacity-90 w-full"
        >
          {loading ? "Creating..." : "Create Officer"}
        </button>

        {success && (
          <p className="text-green-500 mt-3 text-center">Officer added successfully!</p>
        )}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  officers: state.officers,
});

export default compose(connect(mapStateToProps, { createOfficer }))(AddOfficer);