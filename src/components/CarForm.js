import React, { useState, useEffect } from 'react';

const CarForm = ({ onSave, editingCar }) => {
  const [car, setCar] = useState({
    id: null,
    brand: '',
    model: '',
    startYear: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (editingCar) {
      setCar(editingCar);
    }
  }, [editingCar]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1950; y--) {
    years.push(y);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(car);
    setCar({ brand: '', model: '', startYear: '', imageUrl: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <input
          name="brand"
          className="form-control"
          placeholder="ยี่ห้อรถ"
          value={car.brand}
          onChange={handleChange}
          required
        />

        <input
          name="model"
          className="form-control"
          placeholder="รุ่นรถ"
          value={car.model}
          onChange={handleChange}
          required
        />

        <select
          name="startYear"
          className="form-select"
          style={{
            backgroundColor: '#fff',
            color: '#495057',
            border: '1px solid #ced4da',
            borderRadius: '0.375rem',
            padding: '0.375rem 0.75rem'
          }}
          value={car.startYear}
          onChange={handleChange}
          required
        >
          <option value="">ปีที่เริ่มจำหน่าย</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <input
          name="imageUrl"
          className="form-control"
          placeholder="ลิงก์ภาพรถ"
          value={car.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn btn-primary mt-2" type="submit">บันทึก</button>
    </form>
  );
};

export default CarForm;
