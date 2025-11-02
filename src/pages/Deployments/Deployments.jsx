import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getDeployments } from "../../store/deployment/deploymentActions";

const Deployments = ({
  deployments: { deployments, loading, error },
  getDeployments,
}) => {
  useEffect(() => {
    getDeployments();
  }, [getDeployments]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading deployments...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">All Deployments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deployments.map((d) => (
          <div
            key={d._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border-b-4 border-[var(--color-primary-300)]"
          >
            <h2 className="font-bold text-gray-800 mb-1">
              {d.officer?.name || "Unknown Officer"}
            </h2>
            <p className="text-gray-600 text-sm">
              Command: {d.location?.command || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">Unit: {d.location?.unit}</p>
             <p className="text-gray-600 text-sm">Appointment: {d.appointmentTitle
}</p>
            

            <p className="text-gray-500 text-xs mt-2">
              Start Date: {new Date(d.dateOfDeployment).toLocaleDateString()}
            </p>
            {d.endDate && (
              <p className="text-gray-500 text-xs">
                End Date: {new Date(d.endDate).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  deployments: state.deployments,
});

export default compose(connect(mapStateToProps, { getDeployments }))(Deployments);
