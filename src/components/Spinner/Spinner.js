import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Spinner.css';
import { useSpinner } from '../../api/spinnerService';
const Spinner = () => {
  const { loading } = useSpinner();

  if (!loading) return null;

  return (
    <div className="spinner-overlay">
      <ClipLoader size={50} color="#0000ff" />
    </div>
  );
};

export default Spinner;
