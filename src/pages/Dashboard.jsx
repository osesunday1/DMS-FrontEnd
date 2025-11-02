import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardSummary } from "../store/dashboard/dashboardActions";
import { FaUserCheck, FaUserClock, FaUserTimes, FaUsers } from "react-icons/fa";

const Dashboard = ({
  dashboard: { loading, summary, error },
  getDashboardSummary,
}) => {
  useEffect(() => {
    getDashboardSummary();
  }, [getDashboardSummary]);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10">Loading dashboard...</p>
    );

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 text-white">
      {/* ✅ Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Deployment Summary
      </h1>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 🔹 Total Officers */}
        <div className="bg-blue-700 p-5 rounded-xl text-center shadow-md hover:shadow-lg transition">
          <FaUsers className="text-4xl mx-auto mb-2 text-white" />
          <h2 className="text-lg font-semibold">Total Officers</h2>
          <p className="text-3xl font-bold mt-2">{summary.totalOfficers}</p>
          <p className="text-sm text-gray-200 mt-1">
            All officers in the system
          </p>
        </div>

        {/* 🔹 OK Officers */}
        <div className="bg-green-600 p-5 rounded-xl text-center shadow-md hover:shadow-lg transition">
          <FaUserCheck className="text-4xl mx-auto mb-2 text-white" />
          <h2 className="text-lg font-semibold">
            OK (Deployed Less Than 12 Months)
          </h2>
          <p className="text-3xl font-bold mt-2">{summary.OK}</p>
          <p className="text-sm text-gray-200 mt-1">
            Currently within valid deployment
          </p>
        </div>

        {/* 🔹 Ready for Redeployment */}
        <div className="bg-yellow-500 p-5 rounded-xl text-center shadow-md hover:shadow-lg transition">
          <FaUserClock className="text-4xl mx-auto mb-2 text-white" />
          <h2 className="text-lg font-semibold">
            Ready for Redeployment (12–18 Months)
          </h2>
          <p className="text-3xl font-bold mt-2">
            {summary["Ready for Redeployment"]}
          </p>
          <p className="text-sm text-gray-800 mt-1">
            Eligible for transfer soon
          </p>
        </div>

        {/* 🔹 Overdue Officers */}
        <div className="bg-red-600 p-5 rounded-xl text-center shadow-md hover:shadow-lg transition">
          <FaUserTimes className="text-4xl mx-auto mb-2 text-white" />
          <h2 className="text-lg font-semibold">Overdue (18+ Months)</h2>
          <p className="text-3xl font-bold mt-2">{summary.Overdue}</p>
          <p className="text-sm text-gray-200 mt-1">
            Require immediate redeployment
          </p>
        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getDashboardSummary })(Dashboard);