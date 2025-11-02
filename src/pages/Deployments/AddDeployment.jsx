import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createDeployment } from "../../store/deployment/deploymentActions";
import { getOfficers } from "../../store/officer/officerActions";
import { getLocations } from "../../store/location/locationActions";
import { getBranches } from "../../store/branch/branchActions";


const AddDeployment = ({
  createDeployment,
  deployments: { loading, success, error },
  officers: { officers },
  locations: { locations },
  branches: { branches },
  getOfficers,
  getLocations,
  getBranches
}) => {
  const [formData, setFormData] = useState({
  officer: "",
  location: "",
  branch: "",
  appointmentTitle: "",
  dateOfDeployment: "",
  dateOfRelief: "",
});

  useEffect(() => {
    getOfficers();
    getLocations();
    getBranches()
  }, [getOfficers, getLocations]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createDeployment(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Create Deployment</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-5"
      >
        {/* Officer */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Officer</label>
          <select
            name="officer"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.officer}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Officer --</option>
            {officers.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name} ({o.rank})
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Location</label>
          <select
            name="location"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Location --</option>
            {locations.map((l) => (
              <option key={l._id} value={l._id}>
                {l.unit} ({l.state})
              </option>
            ))}
          </select>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Branch</label>
          <select
            name="branch"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.branch}
            onChange={(e) =>
              setFormData({
                ...formData,
                branch: e.target.value,
                appointmentTitle: "", // reset appointment on branch change
              })
            }
            required
          >
            <option value="">-- Select Branch --</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Appointment Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Appointment Title
          </label>
          <select
            name="appointmentTitle"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.appointmentTitle}
            onChange={handleChange}
            required
            disabled={!formData.branch}
          >
            <option value="">-- Select Appointment --</option>
            {branches
              .find((b) => b._id === formData.branch)
              ?.titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
          </select>
        </div>

        {/* Date of Deployment */}
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">
                  Date of Deployment
                </label>
                <input
                  type="date"
                  name="dateOfDeployment"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.dateOfDeployment}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date of Relief */}
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">
                  Date of Relief (optional)
                </label>
                <input
                  type="date"
                  name="dateOfRelief"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.dateOfRelief}
                  onChange={handleChange}
                />
              </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold px-4 py-2 rounded hover:opacity-90 w-full"
        >
          {loading ? "Saving..." : "Create Deployment"}
        </button>

        {success && (
          <p className="text-green-500 text-center mt-3">
            Deployment created successfully!
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  deployments: state.deployments,
  officers: state.officers,
  locations: state.locations,
  branches: state.branches,
});

export default compose(
  connect(mapStateToProps, { createDeployment, getOfficers, getLocations, getBranches })
)(AddDeployment);