import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const OfficerCard = ({ officer }) => {
  const { 
    name, 
    rank, 
    serviceNumber, 
    dateOfBirth, 
    dateOfCommission, 
    image, 
    currentDeployment, 
    monthsServed, 
    deploymentStatus, 
    progress 
  } = officer;

  // ✅ Dynamic color based on deployment status
  const statusColor = 
    deploymentStatus === "OK" ? "#4CAF50" : 
    deploymentStatus === "Ready for Redeployment" ? "#FFC107" : 
    deploymentStatus === "Overdue" ? "#F44336" : "#9E9E9E";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition duration-300 relative">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      
      {/* Donut progress overlay */}
      <div className="absolute top-2 right-2 w-12 h-12">
        <CircularProgressbar
          value={progress}
          text={`${monthsServed}m`}
          styles={buildStyles({
            textSize: "28px",
            textColor: "#222",
            pathColor: statusColor,
            trailColor: "#eee",
          })}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-700">Rank: {rank}</p>
        <p className="text-sm text-gray-700">Service No: {serviceNumber}</p>
        <p className="text-sm text-gray-700">
          Date of Birth: {new Date(dateOfBirth).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-700">
          Date of Commission: {new Date(dateOfCommission).toLocaleDateString()}
        </p>

        {currentDeployment ? (
          <div className="mt-3 text-sm">
            <p><strong>Branch:</strong> {currentDeployment.branch}</p>
            <p className="truncate max-w-[200px]"><strong>Location:</strong> {currentDeployment.location}</p>
            <p><strong>Deployed:</strong> {new Date(currentDeployment.dateOfDeployment).toLocaleDateString()}</p>
            <p className="mt-1 font-semibold">
              Status:  <b style={{ color: statusColor }}>{deploymentStatus}</b>
            </p>
          </div>
        ) : (
          <p className="mt-3 text-gray-500 italic">No current deployment</p>
        )}
      </div>
    </div>
  );
};

export default OfficerCard;