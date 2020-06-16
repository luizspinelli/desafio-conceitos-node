const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();
  const likes = 0;

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories.push(repositorie);

  response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);


  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  const { likes } = repositories.find(repositorie => repositorie.id === id);

  const repositorie = { id, title, url, techs, likes };

  repositories[repositorieIndex] = repositorie;

  response.json(repositorie);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    response.status(400).json({ error: "Repositorie not found" });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    response.status(400).json({ error: "Repositorie not found" });
  }

  const { title, url, techs } = repositories[repositorieIndex];
  let { likes } = repositories[repositorieIndex];

  likes++;

  repositorie = { id, url, techs, likes };

  repositories[repositorieIndex] = repositorie;

  response.json(repositorie);

});

module.exports = app;
