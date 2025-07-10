import React from "react";
import { FaServer, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

function ModaleDetailsInfrastructure({ infrastructure, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-xl focus:outline-none">
          <FaTimes />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaServer className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-blue-700">{infrastructure.nom}</h2>
        </div>
        {infrastructure.images && infrastructure.images.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {infrastructure.images.map((img, index) => (
              <img key={index} src={img} alt={`${infrastructure.nom} ${index + 1}`} className="w-full h-32 object-cover rounded-xl shadow" />
            ))}
          </div>
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center text-slate-400 mb-4">
            <FaTools className="text-4xl" />
          </div>
        )}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-white text-sm">
            <FaMapMarkerAlt /> <span>Situation :</span> <span className="font-semibold">{infrastructure.situation || "Non spécifiée"}</span>
          </div>
          <div className="text-white text-sm">{infrastructure.description || "Aucune description"}</div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Type: {infrastructure.type || "Non spécifié"}</span>
            <span>Lat: {infrastructure.latitude || "-"}</span>
            <span>Lng: {infrastructure.longitude || "-"}</span>
          </div>
        </div>
        <button onClick={onClose} className="btn-primary w-full justify-center mt-4">Fermer</button>
      </div>
    </div>
  );
}

export default ModaleDetailsInfrastructure;
