import Expert from "../models/Expert.js";

export const getExperts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 5;

    const search = req.query.search || "";

    const category = req.query.category || "";

    const query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    const total = await Expert.countDocuments(query);

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      experts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalExperts: total,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({
        message: "Expert not found",
      });
    }

    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};