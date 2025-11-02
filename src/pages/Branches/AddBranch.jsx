// src/pages/Branches/AddBranch.jsx
import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createBranch } from "../../store/branch/branchActions";

const AddBranch = ({ createBranch }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    titles: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatted = {
      ...form,
      titles: form.titles.split(",").map((t) => t.trim()),
    };
    createBranch(formatted);
    setForm({ name: "", description: "", titles: "" });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Branch</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Branch Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. IT Branch"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Brief description of the branch"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Titles (comma-separated)</label>
          <input
            name="titles"
            value={form.titles}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. Cyber Security, Web Development"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Branch
        </button>
      </form>
    </div>
  );
};

export default compose(connect(null, { createBranch }))(AddBranch);
