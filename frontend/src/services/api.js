const API_URL = "http://localhost:3000/api/cars";

export const getCars = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getCar = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createCar = async (car) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  });
};

export const updateCar = async (id, car) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  });
};

export const deleteCar = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
