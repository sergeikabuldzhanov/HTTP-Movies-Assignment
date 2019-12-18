import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateMovie(props) {
  const [form, setForm] = useState({
    id: Number(props.match.params.id),
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(response => {
        setForm(response.data);
      })
      .catch(error=>{
          console.error(error);
      });
  }, [props.match.params.id]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${props.movieId}`, form)
    .then(response => {
        debugger;
        })
        .catch(error=>{
            console.error(error);
        });
        props.history.push(`/movies`);
  }
  return (
    <form onSubmit={handleSubmit} className="update-form">
      <label>
        Title
        <input value = {form.title} onChange={handleChange} name="title" type="text" />
      </label>
      <label>
        Director
        <input value = {form.director} onChange={handleChange} name="director" type="text" />
      </label>
      <label>
        Metascore
        <input value = {form.metascore} onChange={handleChange} name="metascore" type="number" />
      </label>
      <label>
        Stars(enter names separated by commas)
        <input value = {form.stars.join(',')} onChange={handleChange} name="stars" type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
