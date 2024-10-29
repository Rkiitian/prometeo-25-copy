// import React from "react";

// const Modal = ({ isModalOpen, closeModal }) => {
//   return (
//     <>
//       {isModalOpen && (
//         <div className="modal-back">
//           <div className="modal-overlay" onClick={closeModal}>
//             <button className="close-button" onClick={closeModal}>
//               X
//             </button>
//             <div className="modal" onClick={(e) => e.stopPropagation()}>
//               <div className="ice-top"></div>
//               <h2 className="modal-title">PRE-REGISTER </h2>
//               <form>
//                 <input type="text" placeholder="Name" className="modal-input" />
//                 <input type="email" placeholder="Email" className="modal-input" />
//                 <input type="tel" placeholder="Phone" className="modal-input" />
//                 <button type="submit" className="modal-button">SUBMIT</button>
//               </form>
//               <p className="contact-link">Contact Us</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;

import React, { useState } from "react";
import axios from "axios";

const Modal = ({ isModalOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbwrf36IJRN-JD3fYxoMatPzpsWrp0Y8ZRtSfNPr_aOhin7gt8BQzRzQi_C1z1ehUrN9/exec",
        formData, // This is the JSON data being sent
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status === "success") {
        alert("Form submitted successfully!");
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      // Log error details for debugging
      console.error("Error submitting form:", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response data:", error.response.data);
        alert("Error: " + error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request details:", error.request);
        alert("Network error: No response received.");
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
        alert("Error: " + error.message);
      }
    }
  
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-back">
          <div className="modal-overlay" onClick={closeModal}>
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="ice-top"></div>
              <h2 className="modal-title">PRE-REGISTER </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="modal-input"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="modal-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="modal-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <button type="submit" className="modal-button">SUBMIT</button>
              </form>
              <p className="contact-link">Contact Us</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
