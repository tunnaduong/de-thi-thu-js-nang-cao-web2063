export const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const getProductById = async (id) => {
  try {
    const res = await fetch("http://localhost:3000/products/" + id);
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const addProduct = async (data) => {
  try {
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {}
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch("http://localhost:3000/products/" + id, {
      method: "DELETE",
    });
    return res;
  } catch (error) {}
};

export const updateProduct = async (id, data) => {
  try {
    const res = await fetch("http://localhost:3000/products/" + id, {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {}
};
