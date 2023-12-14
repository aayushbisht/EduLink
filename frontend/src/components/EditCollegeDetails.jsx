import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const EditCollegeDetails = ({ closeModal, existingData }) => {
  const token = localStorage.getItem("collegetoken");

  const [formData, setFormData] = useState({
    ...existingData,
    domains: existingData.domains || [],
    companiesvisited: existingData.companiesvisited || [],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/college/updatedetails", {
        token,
        about: formData.about,
        moto: formData.moto,
        employees: formData.employees,
        ethics: formData.ethics,
        domains: formData.domains,
        location: formData.location,
        studentsplaced: formData.studentsplaced,
        naacranking: formData.naacranking,
        maxpackage: formData.maxpackage,
        averagepackage: formData.averagepackage,
        alumninetwork: formData.alumninetwork,
        foreigntieups: formData.foreigntieups,
        researchpapers: formData.researchpapers,
        internshipoffered: formData.internshipoffered,
        companiesvisited: formData.companiesvisited,
      });

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
  const handleCompaniesChange = (companys) => {
    setFormData((prevData) => ({ ...prevData, companiesvisited: companys }));
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
          <label htmlFor="studentsplaced">Student Placed:</label>
          <input
            type="text"
            className="form-control"
            id="studentsplaced"
            name="studentsplaced"
            value={formData.studentsplaced}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="naacranking">NAAC Ranking:</label>
          <input
            type="text"
            className="form-control"
            id="naacranking"
            name="naacranking"
            value={formData.naacranking}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="maxpackage">Max Package:</label>
          <input
            type="text"
            className="form-control"
            id="maxpackage"
            name="maxpackage"
            value={formData.maxpackage}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="averagepackage">Average Package:</label>
          <input
            type="text"
            className="form-control"
            id="averagepackage"
            name="averagepackage"
            value={formData.averagepackage}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="alumninetwork">Alumni Network:</label>
          <input
            type="text"
            className="form-control"
            id="alumninetwork"
            name="alumninetwork"
            value={formData.alumninetwork}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="foreigntieups">Foreign Tieups:</label>
          <input
            type="text"
            className="form-control"
            id="foreigntieups"
            name="foreigntieups"
            value={formData.foreigntieups}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="researchpapers">Reasearch Papers:</label>
          <input
            type="text"
            className="form-control"
            id="researchpapers"
            name="researchpapers"
            value={formData.researchpapers}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="internshipoffered">Internships Offered:</label>
          <input
            type="text"
            className="form-control"
            id="internshipoffered"
            name="internshipoffered"
            value={formData.internshipoffered}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="companiesvisited">Companies Visited:</label>
          <TagsInput
            value={formData.companiesvisited}
            onChange={handleCompaniesChange}
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

export default EditCollegeDetails;
