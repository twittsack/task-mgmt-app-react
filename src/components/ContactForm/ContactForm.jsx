import { useState } from "react";
import { useForm } from '@formspree/react';
import './ContactForm.css';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("meagpvgo");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});

  if (state.succeeded) {
    return (
        <>
        <p class="contact-form">Thanks for contacting us!</p>
        <p><a href="task-mgmt-app-react/">Return to Home</a></p>
        </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First Name is required";

    if (!formData.last_name.trim())
      newErrors.last_name = "Last Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.comments.trim())
      newErrors.comments = "Comments are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    return validate();
  };

  const handleCancel = () => {
    setFormData({ 
        first_name: '', 
        last_name: '', 
        email: '', 
        comments: '' 
    });
    setErrors({});
  };

  return (
    <form 
        onSubmit={(e) => {
             e.preventDefault();
            if (!validateForm()) return;
            handleSubmit(e);
        }} 
        className="max-w-md mx-auto contact-form"
    >
      <h2>Contact Us</h2>
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.first_name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.first_name && <small className="text-red-500">{errors.first_name}</small>}
      </div>

      <div>
        <label htmlFor="last_name" className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.last_name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.last_name && <small className="text-red-500">{errors.last_name}</small>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <small className="text-red-500">{errors.email}</small>}
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium mb-1">Comments</label><br />
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.comments ? "border-red-500" : "border-gray-300"
          }`}
        ></textarea>
        {errors.comments && <small className="text-red-500">{errors.comments}</small>}
      </div>

      <button
        type="submit" disabled={state.submitting}
        className="text-white font-semibold px-4 py-2 rounded-lg mt-4"
      >
        Submit
      </button>
      <button
        type="button" onClick={handleCancel}
        className="text-white font-semibold px-4 py-2 rounded-lg mt-4"
      >
        Cancel
      </button>
    </form>
  );
}
