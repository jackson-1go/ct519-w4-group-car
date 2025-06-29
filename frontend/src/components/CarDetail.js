import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCar } from '../services/api';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      const data = await getCar(id);
      setCar(data);
    };
    fetchCar();
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">← กลับไปหน้าหลัก</Link>
      <h2>{car.brand} {car.model}</h2>
      <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} style={{ maxWidth: '300px' }} />
      <p>ปีที่เริ่มจำหน่าย: {car.year}</p>
      {/* เพิ่มเติมข้อมูลอื่น ๆ ได้ตามต้องการ */}
    </div>
  );
};

export default CarDetail;
