import { useState } from "react";
import axios from "axios";

function PostForm() {
  const [pass, setPass] = useState("");
  const [sect, setSect] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/validatePassword",
        { password: pass },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      if (data.validate) {
        setSect(true);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      alert("Error en la petición");
    }
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const res = await axios.post("/api/blog", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Error en la petición:", err);
    }
  }

  return (
    <>
      {sect ? (
        <form onSubmit={handlePostSubmit}>
          <input placeholder="Título" id="title" name="title" type="text" />
          <textarea
            placeholder="Descripción"
            id="description"
            name="description"
          ></textarea>
          <input
            placeholder="Imagenes"
            id="images"
            name="images"
            type="file"
            multiple
          />
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </>
  );
}

export default PostForm;
