import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { FaTrash } from "react-icons/fa";

const EditCompanyDetails = ({ closeModal, existingData }) => {
  const token = localStorage.getItem("companytoken");

  const [formData, setFormData] = useState({
    ...existingData,
    domains: existingData.domains || [],
    successstories: existingData.successstories || [],
    studentdomain: existingData.studentdomain || [
      "Details Will be Updated Soon",
    ],
    industrypartnership: existingData.industrypartnership || [],
  });
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [newStory, setNewStory] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/company/updatedetails",
        {
          token,
          about: formData.about,
          moto: formData.moto,
          employees: formData.employees,
          ethics: formData.ethics,
          domains: formData.domains,
          location: formData.location,
          studentdomain: formData.studentdomain,
          hiringperiod: formData.hiringperiod,
          successstories: formData.successstories,
          industrypartnership: formData.industrypartnership,
          workculture: formData.workculture,
        }
      );

      if (response.data.success) {
        window.location.reload();
        toast.success(response.data.message);
        setFormData({ ...response.data.data });
      } else {
        window.location.reload();
        toast.error(response.data.message);
      }
    } catch (error) {
      window.location.reload();
      toast.error("An error occurred while updating the details");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleTagsChange = (tags) => {
    setFormData((prevData) => ({ ...prevData, domains: tags }));
  };
  const handledomainsChange = (dom) => {
    setFormData((prevData) => ({ ...prevData, studentdomain: dom }));
  };
  const handleindustryChange = (Industry) => {
    setFormData((prevData) => ({ ...prevData, industrypartnership: Industry }));
  };

  const handleAddStory = () => {
    setIsAddingStory(true);
  };

  const handleSaveStory = () => {
    if (newStory) {
      setFormData((prevData) => ({
        ...prevData,
        successstories: [...prevData.successstories, newStory],
      }));
      setNewStory("");
      setIsAddingStory(false);
    }
  };

  const handleCancelAddStory = () => {
    setNewStory("");
    setIsAddingStory(false);
  };

  const handleDeleteStory = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      successstories: prevData.successstories.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="inputField">About Company:</label>
          <textarea
            className="form-control"
            name="about"
            id="inputField"
            cols="30"
            rows="3"
            value={formData.about}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="moto">Company's Moto:</label>
          <textarea
            className="form-control"
            name="moto"
            id="moto"
            cols="30"
            rows="2"
            value={formData.moto}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="employees">Number of Employes:</label>
          <input
            type="number"
            className="form-control"
            id="employees"
            name="employees"
            value={formData.employees}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="ethics">Company Values and Ethics:</label>
          <textarea
            className="form-control"
            name="ethics"
            id="ethics"
            cols="30"
            rows="2"
            value={formData.ethics}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="domains">Tech Domains:</label>
          <TagsInput
            value={formData.domains}
            onChange={handleTagsChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="location">Company's Location:</label>
          <input
            className="form-control"
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="studentdomain">Student Domains:</label>
          <TagsInput
            value={formData.studentdomain}
            onChange={handledomainsChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="hiringperiod">Hiring Period:</label>
          <input
            type="text"
            className="form-control"
            id="hiringperiod"
            name="hiringperiod"
            value={formData.hiringperiod}
            onChange={handleInputChange}
            required
          />
        </div>

        <div
          className="form-group my-3"
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "#f7f7f7",
          }}
        >
          <label
            htmlFor="successstories"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Success Stories:
          </label>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {formData.successstories.map((story, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "#fff",
                }}
              >
                <span style={{ flex: "1", fontSize: "16px" }}>{story}</span>
                <button
                  style={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => handleDeleteStory(index)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
            {isAddingStory ? (
              <li className="success-item">
                <input
                  type="text"
                  className="form-control story-input"
                  style={{
                    width: "100%",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "16px",
                  }}
                  placeholder="New Story"
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                />
                <button
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={handleSaveStory}
                >
                  Save
                </button>
                <button
                  style={{
                    backgroundColor: "#ccc",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={handleCancelAddStory}
                >
                  Cancel
                </button>
              </li>
            ) : (
              <li>
                <span
                  className="add-story-button"
                  style={{
                    backgroundColor: "#2196F3",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  onClick={handleAddStory}
                >
                  + Add Story
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="form-group my-3">
          <label htmlFor="industrypartnership">Industry Partnership:</label>
          <TagsInput
            value={formData.industrypartnership}
            onChange={handleindustryChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="workculture">Work Culture:</label>
          <input
            type="text"
            className="form-control"
            id="workculture"
            name="workculture"
            value={formData.workculture}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCompanyDetails;
