// src/component/Model.tsx
import React, { useRef, ChangeEvent, ReactNode } from 'react';

interface ModelProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Model: React.FC<ModelProps> = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Model;
