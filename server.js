import express from "express";
import cors from "cors";
import pkg from "@supabase/supabase-js";

const { createClient } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Config Supabase
const supabase = createClient(
  "SUA_SUPABASE_URL",
  "SUA_SUPABASE_CHAVE_ANON"
);

// Listar funções
app.get("/funcoes", async (req, res) => {
  const { data, error } = await supabase.from("funcoes").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Cadastrar função
app.post("/funcoes", async (req, res) => {
  const { nome, epis, treinamentos } = req.body;
  const { data, error } = await supabase.from("funcoes").insert([
    { nome, epis: JSON.stringify(epis), treinamentos: JSON.stringify(treinamentos) }
  ]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
