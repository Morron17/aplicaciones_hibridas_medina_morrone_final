import Human from "../models/HumanModel.js";

export const getHumans = async (req, res) => {
  try {
    const { name, status } = req.query;
    let filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (status) filter.status = status;

    const humans = await Human.find(filter);
    res.json(humans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHumanById = async (req, res) => {
  try {
    const human = await Human.findById(req.params.id);
    if (!human) return res.status(404).json({ message: "Humano no encontrado" });
    res.json(human);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHuman = async (req, res) => {
  try {
    const newHuman = new Human(req.body);
    const savedHuman = await newHuman.save();
    res.status(201).json(savedHuman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateHuman = async (req, res) => {
  try {
    const updatedHuman = await Human.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHuman) return res.status(404).json({ message: "Humano no encontrado" });
    res.json(updatedHuman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHuman = async (req, res) => {
  try {
    const deletedHuman = await Human.findByIdAndDelete(req.params.id);
    if (!deletedHuman) return res.status(404).json({ message: "Humano no encontrado" });
    res.json({ message: "Humano eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
