// src/pages/Branches/Branches.jsx
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getBranches } from "../../store/branch/branchActions";

const Branches = ({ branches: { branches, loading, error }, getBranches }) => {
  useEffect(() => {
    getBranches();
  }, [getBranches]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading branches...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Branches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch._id}
            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-[var(--color-primary-300)]"
          >
            <h2 className="font-semibold text-lg text-gray-800">{branch.name}</h2>
            <p className="text-sm text-gray-600">{branch.description}</p>
            {branch.titles && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                {branch.titles.map((title, i) => (
                  <li key={i}>{title}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  branches: state.branches,
});

export default compose(connect(mapStateToProps, { getBranches }))(Branches);
