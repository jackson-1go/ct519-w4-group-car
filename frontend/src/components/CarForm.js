import React, { useState, useEffect } from 'react';

const CarForm = ({ onSave, editingCar }) => {
  const [car, setCar] = useState({
    id: null,
    brand: '',
    model: '',
    year: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editingCar) {
      setCar({
        id: editingCar.id || null,
        brand: editingCar.brand || '',
        model: editingCar.model || '',
        year: editingCar.year || ''
      });
      setFile(null); // ถ้าแก้ไขเคลียร์ไฟล์ก่อน
    }
  }, [editingCar]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1950; y--) {
    years.push(y);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('brand', car.brand);
    formData.append('model', car.model);
    formData.append('year', car.year);
    if (file) {
      formData.append('image', file);
    }

    onSave(formData);

    setCar({ brand: '', model: '', year: '' });
    setFile(null);
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
          name="year"
          className="form-select"
          style={{
            backgroundColor: '#fff',
            color: '#495057',
            border: '1px solid #ced4da',
            borderRadius: '0.375rem',
            padding: '0.375rem 0.75rem'
          }}
          value={car.year}
          onChange={handleChange}
          required
        >
          <option value="">ปีที่เริ่มจำหน่าย</option>
          {years.map((y) => (
            <option key={y} value={y} selected={car.year == y}>{y}</option>
          ))}
        </select>

        <input
          type="file"
          name="image"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button className="btn btn-primary mt-2" type="submit">บันทึก</button>
    </form>
  );
};

export default CarForm;
