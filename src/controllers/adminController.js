import Product from "../models/Product";

export const createProduct = async (req, res) => {
  const { name, price, description, image, featured, categories, colors } =
    req.body;

  if (
    !name ||
    !price ||
    !description ||
    !image ||
    !featured ||
    !categories ||
    !colors
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      featured,
      categories,
      colors,
    });
    const savedProduct = await newProduct.save();
    return res.status(201).json({ product: savedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res.status(400).json({ message: "ProductID is required" });

  try {
    try {
      const product = await Product.deleteOne({ _id: new ObjectId(productId) });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const {
    productId,
    name,
    price,
    description,
    image,
    featured,
    categories,
    colors,
  } = req.body;

  if (!productId)
    return res.status(400).json({ message: "ProductID is required" });

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.featured = featured || product.featured;
    product.categories = categories || product.categories;
    product.colors = colors || product.colors;

    await product.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const featureProduct = async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res.status(400).json({ message: "ProductID is required" });

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.featured = !product.featured;
    await product.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};