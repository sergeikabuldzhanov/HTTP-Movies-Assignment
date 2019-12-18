import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddMovie(props) {
  const [form, setForm] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.name === "stars"
          ? event.target.value.split(",")
          : event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, form)
      .then(response => {
        debugger;
      })
      .catch(error => {
        console.error(error);
      });
    props.history.push(`/`);
  }
  return (
    <form onSubmit={handleSubmit} className="update-form">
      <label>
        Title
        <input
          value={form.title}
          onChange={handleChange}
          name="title"
          type="text"
        />
      </label>
      <label>
        Director
        <input
          value={form.director}
          onChange={handleChange}
          name="director"
          type="text"
        />
      </label>
      <label>
        Metascore
        <input
          value={form.metascore}
          onChange={handleChange}
          name="metascore"
          type="number"
        />
      </label>
      <label>
        Stars(enter names separated by commas)
        <input
          value={form.stars.join(",")}
          onChange={handleChange}
          name="stars"
          type="text"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
